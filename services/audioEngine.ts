
import { Track } from '../types';

// Web Audio API Context singleton
let audioContext: AudioContext | null = null;

// Scheduling constants
const LOOKAHEAD = 25.0; // milliseconds
const SCHEDULE_AHEAD_TIME = 0.1; // seconds

export class AudioEngine {
  private nextNoteTime: number = 0.0;
  private startTime: number = 0.0; // Anchor for visual sync
  private timerID: number | null = null;
  
  // Changed from flat notes to tracks for sequential playback
  private tracks: Track[] = [];
  private currentScheduleTrackIndex: number = 0; // For the scheduler logic

  private bpm: number = 100;
  private beatsPerMeasure: number = 4; // Default 4/4
  private accentFirstBeat: boolean = false;
  private isPlaying: boolean = false;
  
  // Track active oscillators to cancel them immediately on stop
  private activeOscillators: OscillatorNode[] = [];

  // Callback for UI updates (passed the current progress 0-1 and current track index)
  private onTick: ((progress: number, trackIndex: number) => void) | null = null;

  constructor() {
    // Lazy load audio context
  }

  private initAudioContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  public setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }

  // Deprecated but kept for compatibility if needed, though we use setTracks now
  public setNotes(notes: any[]) {
      // no-op or handle single track
  }

  public setBpm(bpm: number) {
    this.bpm = bpm;
  }

  public setTimeSignature(numerator: number) {
    this.beatsPerMeasure = numerator;
  }

  public setAccentFirstBeat(enabled: boolean) {
    this.accentFirstBeat = enabled;
  }

  public setOnTick(callback: (progress: number, trackIndex: number) => void) {
    this.onTick = callback;
  }

  public start() {
    this.initAudioContext();
    if (audioContext?.state === 'suspended') {
      audioContext.resume();
    }

    if (this.isPlaying) return;

    this.isPlaying = true;
    
    // Reset the timing anchor to NOW. 
    this.startTime = audioContext!.currentTime;
    this.nextNoteTime = this.startTime;
    
    // Reset scheduler index to start from the first track
    this.currentScheduleTrackIndex = 0;

    this.scheduler();
    this.startAnimationLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerID) {
      window.clearTimeout(this.timerID);
      this.timerID = null;
    }

    // Immediately stop all scheduled sounds
    this.activeOscillators.forEach((osc) => {
        try {
            osc.stop();
            osc.disconnect();
        } catch (e) {
            // Ignore if already stopped
        }
    });
    this.activeOscillators = [];
  }

  private scheduler() {
    if (!this.isPlaying || !audioContext) return;

    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    while (this.nextNoteTime < audioContext.currentTime + SCHEDULE_AHEAD_TIME) {
      this.scheduleNotesForMeasure(this.nextNoteTime);
      this.advanceNote();
    }

    this.timerID = window.setTimeout(() => this.scheduler(), LOOKAHEAD);
  }

  private getTrackInfoForMeasure(absoluteMeasureIndex: number): { trackIndex: number; loopIndex: number } {
    const activeTracks = this.tracks.filter(t => !t.skipTrack);
    if (activeTracks.length === 0) return { trackIndex: 0, loopIndex: 0 };

    const totalCycleMeasures = activeTracks.reduce((sum, t) => sum + (t.loopCount || 1), 0);
    const measureInCycle = absoluteMeasureIndex % totalCycleMeasures;

    let totalMeasuresBefore = 0;
    for (let i = 0; i < this.tracks.length; i++) {
        const track = this.tracks[i];
        if (track.skipTrack) continue;

        const trackLoops = track.loopCount || 1;
        if (measureInCycle < totalMeasuresBefore + trackLoops) {
            return {
                trackIndex: i,
                loopIndex: measureInCycle - totalMeasuresBefore
            };
        }
        totalMeasuresBefore += trackLoops;
    }

    // Fallback to find the first non-skipped track
    const firstActiveIndex = this.tracks.findIndex(t => !t.skipTrack);
    return { trackIndex: firstActiveIndex > -1 ? firstActiveIndex : 0, loopIndex: 0 };
  }

  private advanceNote() {
    // Advance time by a full measure based on Time Signature
    const secondsPerBeat = 60.0 / this.bpm;
    const measureDuration = secondsPerBeat * this.beatsPerMeasure; 
    
    this.nextNoteTime += measureDuration;

    // Advance to the next measure in the global timeline
    this.currentScheduleTrackIndex++; // This actually represents the absolute measure count from start
  }

  private scheduleNotesForMeasure(time: number) {
    if (!audioContext || this.tracks.length === 0) return;

    const secondsPerBeat = 60.0 / this.bpm;
    const measureDuration = secondsPerBeat * this.beatsPerMeasure;

    // Map the current schedule pointer (which track measure) to the actual track
    const { trackIndex } = this.getTrackInfoForMeasure(this.currentScheduleTrackIndex);
    const currentTrack = this.tracks[trackIndex];
    if (!currentTrack) return;

    const notes = currentTrack.notes;

    notes.forEach(note => {
      // STRICT CHECK: If explicitly a rest or velocity is near zero, do NOT play.
      if (note.isRest === true || note.velocity < 0.01) return;

      // Calculate start time
      const noteStartTime = time + (note.start * measureDuration);

      const osc = audioContext!.createOscillator();
      const gainNode = audioContext!.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioContext!.destination);

      // Sound Design: "Modern Digital Click"
      osc.type = 'sine'; 
      
      // Pitch Envelope
      let startFreq = note.pitch;
      
      // Apply accent to the absolute first note of the measure if enabled
      const isAccent = this.accentFirstBeat && Math.abs(note.start) < 0.001;
      if (isAccent) {
        startFreq *= 1.8; // Bright sharp accent
      }

      osc.frequency.setValueAtTime(startFreq, noteStartTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(100, startFreq * 0.9), noteStartTime + (isAccent ? 0.06 : 0.05));

      // Amplitude Envelope
      gainNode.gain.setValueAtTime(0, noteStartTime);
      gainNode.gain.linearRampToValueAtTime(isAccent ? note.velocity * 1.2 : note.velocity, noteStartTime + 0.001);
      
      // Decay
      const clickDuration = isAccent ? 0.12 : 0.08; 
      gainNode.gain.exponentialRampToValueAtTime(0.001, noteStartTime + clickDuration);

      // Track the oscillator
      osc.onended = () => {
          const index = this.activeOscillators.indexOf(osc);
          if (index > -1) {
              this.activeOscillators.splice(index, 1);
          }
      };
      this.activeOscillators.push(osc);

      osc.start(noteStartTime);
      osc.stop(noteStartTime + clickDuration + 0.05); // Cleanup
    });
  }

  private startAnimationLoop() {
    if (!audioContext) return;

    const loop = () => {
      if (!this.isPlaying) return;

      const secondsPerBeat = 60.0 / this.bpm;
      const measureDuration = secondsPerBeat * this.beatsPerMeasure;
      const numTracks = this.tracks.length || 1;
      
      // Calculate global time since start
      const timeSinceStart = audioContext!.currentTime - this.startTime;
      
      // Determine which measure index (absolute) we are in
      const absoluteMeasureIndex = Math.floor(timeSinceStart / measureDuration);
      
      // Map absolute measure to track index (looping) using loop counts
      const { trackIndex } = this.getTrackInfoForMeasure(absoluteMeasureIndex);
      const currentTrackIndex = trackIndex;

      // Calculate progress within that specific measure (0.0 to 1.0)
      const currentCycleTime = timeSinceStart % measureDuration;
      const progress = currentCycleTime / measureDuration;

      if (this.onTick) {
        this.onTick(progress, currentTrackIndex);
      }

      requestAnimationFrame(loop);
    };
    loop();
  }
}

export const audioEngine = new AudioEngine();
