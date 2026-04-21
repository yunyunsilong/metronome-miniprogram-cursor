
export interface Note {
  id: string;
  start: number; // 0.0 to 1.0 (percentage of the measure)
  duration: number; // 0.0 to 1.0 (percentage of the measure)
  pitch: number; // Frequency in Hz
  velocity: number; // 0.0 to 1.0
  selected?: boolean;
  isRest?: boolean; // Helper to identify visual rests
}

export interface Track {
  id: string;
  name: string;
  notes: Note[];
  isMuted?: boolean;
  color?: string; // Optional for visual distinction
  loopCount?: number; // Number of times to repeat this track in sequential mode
  skipTrack?: boolean; // Whether to skip this track during sequential playback
}

export interface AudioSettings {
  bpm: number;
  subdivision: number; // Visual grid subdivision (e.g., 16 for 16th notes)
  swing: number; // 0.0 to 1.0
}

export enum PlayState {
  STOPPED = 'STOPPED',
  PLAYING = 'PLAYING',
}

export interface Preset {
  name: string;
  notes: Note[];
}

export interface ToolOption {
  id: string;
  name: string;
  beats: number; // Musical duration in beats (e.g., 1 for Quarter, 0.5 for Eighth)
  isRest: boolean;
  symbol: string;
  pattern?: { relStart: number; relDuration: number; isRest?: boolean }[]; 
}

export interface TimeSignature {
  numerator: number; // e.g., 4 in 4/4
  denominator: number; // e.g., 4 in 4/4
}
