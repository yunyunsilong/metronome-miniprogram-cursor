const TOOLS = [
  { id: "quarter", name: "四分音符", beats: 1, isRest: false, symbol: "♩", icon: "/assets/note-icons/quarter.svg" },
  { id: "dotted-quarter", name: "附点四分音符", beats: 1.5, isRest: false, symbol: "♩.", icon: "/assets/note-icons/dotted-quarter.svg" },
  { id: "half", name: "二分音符", beats: 2, isRest: false, symbol: "♩ —", icon: "/assets/note-icons/half.svg" },
  { id: "whole", name: "全音符", beats: 4, isRest: false, symbol: "○", icon: "/assets/note-icons/whole.svg" },
  { id: "eighth", name: "八分音符", beats: 0.5, isRest: false, symbol: "♪", icon: "/assets/note-icons/eighth.svg" },
  { id: "dotted-eighth", name: "附点八分音符", beats: 0.75, isRest: false, symbol: "♪.", icon: "/assets/note-icons/dotted-eighth.svg" },
  { id: "sixteenth", name: "十六分音符", beats: 0.25, isRest: false, symbol: "♫", icon: "/assets/note-icons/sixteenth.svg" },
  { id: "triplet", name: "三连音", beats: 1, isRest: false, symbol: "♪3♪", icon: "/assets/note-icons/triplet.svg", iconSize: "wide", pattern: [{ relStart: 0, relDuration: 0.3333 }, { relStart: 0.3333, relDuration: 0.3333 }, { relStart: 0.6666, relDuration: 0.3334 }] },
  { id: "4-16ths", name: "十六分*4", beats: 1, isRest: false, symbol: "♫♫♫♫", icon: "/assets/note-icons/four-16ths.svg", iconSize: "wide", pattern: [{ relStart: 0, relDuration: 0.25 }, { relStart: 0.25, relDuration: 0.25 }, { relStart: 0.5, relDuration: 0.25 }, { relStart: 0.75, relDuration: 0.25 }] },
  { id: "8th-2-16ths", name: "前十六", beats: 1, isRest: false, symbol: "♪♫♫", icon: "/assets/note-icons/eighth-2-16ths.svg", iconSize: "wide", pattern: [{ relStart: 0, relDuration: 0.5 }, { relStart: 0.5, relDuration: 0.25 }, { relStart: 0.75, relDuration: 0.25 }] },
  { id: "2-16ths-8th", name: "后十六", beats: 1, isRest: false, symbol: "♫♫♪", icon: "/assets/note-icons/2-16ths-eighth.svg", iconSize: "wide", pattern: [{ relStart: 0, relDuration: 0.25 }, { relStart: 0.25, relDuration: 0.25 }, { relStart: 0.5, relDuration: 0.5 }] },
  { id: "syncopation", name: "切分音", beats: 1, isRest: false, symbol: "♫♪♫", icon: "/assets/note-icons/syncopation.svg", iconSize: "wide", pattern: [{ relStart: 0, relDuration: 0.25 }, { relStart: 0.25, relDuration: 0.5 }, { relStart: 0.75, relDuration: 0.25 }] },
  { id: "dotted-8th-16th", name: "附点节奏", beats: 1, isRest: false, symbol: "♪.♫", icon: "/assets/note-icons/dotted-8th-16th.svg", iconSize: "wide", pattern: [{ relStart: 0, relDuration: 0.75 }, { relStart: 0.75, relDuration: 0.25 }] },
  { id: "rest-whole", name: "全休止符", beats: 4, isRest: true, symbol: "—", icon: "/assets/note-icons/rest-whole.svg" },
  { id: "rest-half", name: "二分休止符", beats: 2, isRest: true, symbol: "—", icon: "/assets/note-icons/rest-half.svg" },
  { id: "rest-quarter", name: "四分休止符", beats: 1, isRest: true, symbol: "—", icon: "/assets/note-icons/rest-quarter.svg" },
  { id: "rest-eighth", name: "八分休止符", beats: 0.5, isRest: true, symbol: "—", icon: "/assets/note-icons/rest-eighth.svg" },
  { id: "rest-sixteenth", name: "十六分休止符", beats: 0.25, isRest: true, symbol: "—", icon: "/assets/note-icons/rest-sixteenth.svg" }
];

const RHYTHM_PRESETS = [
  { id: "basic-44", nameZh: "基础 4/4", notes: [{ start: 0, duration: 0.25, isRest: false }, { start: 0.25, duration: 0.25, isRest: false }, { start: 0.5, duration: 0.25, isRest: false }, { start: 0.75, duration: 0.25, isRest: false }] },
  { id: "eighth-notes", nameZh: "八分音符", notes: [{ start: 0, duration: 0.125, isRest: false }, { start: 0.125, duration: 0.125, isRest: false }, { start: 0.25, duration: 0.125, isRest: false }, { start: 0.375, duration: 0.125, isRest: false }, { start: 0.5, duration: 0.125, isRest: false }, { start: 0.625, duration: 0.125, isRest: false }, { start: 0.75, duration: 0.125, isRest: false }, { start: 0.875, duration: 0.125, isRest: false }] },
  { id: "rock-groove", nameZh: "标准摇滚", notes: [{ start: 0, duration: 0.125, isRest: false }, { start: 0.125, duration: 0.125, isRest: false }, { start: 0.25, duration: 0.25, isRest: false }, { start: 0.5, duration: 0.125, isRest: false }, { start: 0.625, duration: 0.125, isRest: false }, { start: 0.75, duration: 0.25, isRest: false }] },
  { id: "funk-syncopation", nameZh: "Funk 切分", notes: [{ start: 0, duration: 0.0625, isRest: false }, { start: 0.1875, duration: 0.0625, isRest: false }, { start: 0.25, duration: 0.125, isRest: false }, { start: 0.4375, duration: 0.0625, isRest: false }, { start: 0.5, duration: 0.0625, isRest: false }, { start: 0.6875, duration: 0.125, isRest: false }, { start: 0.8125, duration: 0.0625, isRest: false }, { start: 0.9375, duration: 0.0625, isRest: false }] },
  { id: "bossa-nova", nameZh: "波萨诺瓦", notes: [{ start: 0, duration: 0.125, isRest: false }, { start: 0.1875, duration: 0.125, isRest: false }, { start: 0.375, duration: 0.125, isRest: false }, { start: 0.5, duration: 0.125, isRest: true }, { start: 0.625, duration: 0.125, isRest: false }, { start: 0.8125, duration: 0.125, isRest: false }] },
  { id: "reggae-skank", nameZh: "雷鬼反拍", notes: [{ start: 0, duration: 0.125, isRest: true }, { start: 0.125, duration: 0.125, isRest: false }, { start: 0.25, duration: 0.125, isRest: true }, { start: 0.375, duration: 0.125, isRest: false }, { start: 0.5, duration: 0.125, isRest: true }, { start: 0.625, duration: 0.125, isRest: false }, { start: 0.75, duration: 0.125, isRest: true }, { start: 0.875, duration: 0.125, isRest: false }] },
  { id: "shuffle", nameZh: "摇摆律动", notes: [{ start: 0, duration: 0.166, isRest: false }, { start: 0.166, duration: 0.083, isRest: false }, { start: 0.25, duration: 0.166, isRest: false }, { start: 0.416, duration: 0.083, isRest: false }, { start: 0.5, duration: 0.166, isRest: false }, { start: 0.666, duration: 0.083, isRest: false }, { start: 0.75, duration: 0.166, isRest: false }, { start: 0.916, duration: 0.083, isRest: false }] },
  { id: "waltz-34", nameZh: "华尔兹 (3/4)", notes: [{ start: 0, duration: 0.333, isRest: false }, { start: 0.333, duration: 0.333, isRest: false }, { start: 0.666, duration: 0.333, isRest: false }] },
  { id: "take-five", nameZh: "五拍子 (5/4)", notes: [{ start: 0, duration: 0.2, isRest: false }, { start: 0.2, duration: 0.2, isRest: false }, { start: 0.4, duration: 0.2, isRest: false }, { start: 0.6, duration: 0.2, isRest: false }, { start: 0.8, duration: 0.2, isRest: false }] }
];

function genId(prefix) {
  return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
}

Page({
  data: {
    bpm: 100,
    bpmInputValue: "100",
    timeSignatureNumerator: 4,
    numeratorOptions: ["3", "4", "5", "6", "7"],
    numeratorIndex: 1,
    accentFirstBeat: true,
    isPlaying: false,
    currentBeat: 1,
    beatDots: [],
    selectedToolId: "quarter",
    tools: TOOLS,
    presets: RHYTHM_PRESETS,
    showPresetPanel: false,
    isPaletteCollapsed: false,
    scrollTop: 0,
    playingTrackIndex: 0,
    progressPercent: 0,
    tracks: [
      {
        id: "1",
        name: "音轨 1",
        loopCount: 1,
        skipTrack: false,
        notes: [
          { id: genId("note"), start: 0, duration: 0.25, isRest: false, symbol: "♩", icon: "/assets/note-icons/quarter.svg" },
          { id: genId("note"), start: 0.25, duration: 0.25, isRest: false, symbol: "♩", icon: "/assets/note-icons/quarter.svg" },
          { id: genId("note"), start: 0.5, duration: 0.25, isRest: false, symbol: "♩", icon: "/assets/note-icons/quarter.svg" },
          { id: genId("note"), start: 0.75, duration: 0.25, isRest: false, symbol: "♩", icon: "/assets/note-icons/quarter.svg" }
        ]
      }
    ],
    activeTrackId: "1"
  },

  _ticker: null,
  _measureStartTs: 0,
  _absoluteMeasureIndex: 0,
  _measureDurationMs: 0,
  _playedNoteIdsInMeasure: null,
  _normalClickPath: "",
  _accentClickPath: "",
  _normalAudioPool: null,
  _accentAudioPool: null,
  _normalAudioIndex: 0,
  _accentAudioIndex: 0,
  _audioErrorShown: false,
  _lastAutoScrolledTrackIndex: -1,
  _currentScrollTop: 0,
  _viewportHeight: 0,

  onLoad() {
    this.configureAudioOptions();
    this.prepareClickSounds();
    this.refreshTrackVisuals(0, 0, false);
    this.resetBeatDots(1);
  },

  onUnload() {
    this.stopMetronome();
    this.destroyClickSounds();
  },

  stopPlaybackForUserAction() {
    if (this.data.isPlaying) this.stopMetronome();
  },

  onBpmChange(e) {
    const bpm = Number(e.detail.value);
    this.applyBpmValue(bpm);
  },

  onBpmInput(e) {
    const value = (e.detail && e.detail.value) || "";
    this.setData({ bpmInputValue: value });
  },

  onBpmInputConfirm(e) {
    this.stopPlaybackForUserAction();
    const rawValue = e && e.detail ? e.detail.value : this.data.bpmInputValue;
    const parsed = Number(rawValue);
    if (Number.isNaN(parsed)) {
      this.setData({ bpmInputValue: String(this.data.bpm) });
      return;
    }
    this.applyBpmValue(parsed);
  },

  applyBpmValue(nextBpm) {
    const bpm = Math.max(20, Math.min(300, Math.round(nextBpm)));
    this.setData({
      bpm,
      bpmInputValue: String(bpm)
    });
    if (this.data.isPlaying) this.stopMetronome();
  },

  onBpmMinus() {
    this.stopPlaybackForUserAction();
    const bpm = Math.max(20, this.data.bpm - 5);
    this.applyBpmValue(bpm);
  },

  onBpmPlus() {
    this.stopPlaybackForUserAction();
    const bpm = Math.min(300, this.data.bpm + 5);
    this.applyBpmValue(bpm);
  },

  onNumeratorChange(e) {
    this.stopPlaybackForUserAction();
    const numeratorIndex = Number(e.detail.value);
    const timeSignatureNumerator = Number(this.data.numeratorOptions[numeratorIndex]);
    const clearedTracks = this.data.tracks.map((track) => ({ ...track, notes: [] }));
    this.setData({
      numeratorIndex,
      timeSignatureNumerator,
      currentBeat: 1,
      tracks: this.decorateTracksForPlayback(clearedTracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying)
    });
    this.resetBeatDots(1);
  },

  onToggleAccent(e) {
    this.stopPlaybackForUserAction();
    this.setData({ accentFirstBeat: e.detail.value });
    this.resetBeatDots(this.data.currentBeat);
  },

  onSelectTool(e) {
    this.stopPlaybackForUserAction();
    const toolId = e.currentTarget.dataset.toolId;
    this.setData({ selectedToolId: toolId });
    this.addNoteFromTool(toolId);
  },

  onSelectTrack(e) {
    this.stopPlaybackForUserAction();
    const trackId = e.currentTarget.dataset.trackId;
    if (!trackId) return;
    this.setData({ activeTrackId: trackId });
    wx.showToast({
      title: "点击上方音符库中的音符添加",
      icon: "none",
      duration: 1200
    });
  },

  onAddTrack() {
    this.stopPlaybackForUserAction();
    const tracks = this.data.tracks.slice();
    const newTrackId = genId("track");
    tracks.push({
      id: newTrackId,
      name: "音轨 " + (tracks.length + 1),
      loopCount: 1,
      skipTrack: false,
      notes: []
    });
    this.setData({
      tracks: this.decorateTracksForPlayback(tracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying),
      activeTrackId: newTrackId
    });
  },

  onDeleteTrack(e) {
    this.stopPlaybackForUserAction();
    const trackId = e.currentTarget.dataset.trackId;
    if (this.data.tracks.length <= 1) return;
    const tracks = this.data.tracks.filter((track) => track.id !== trackId);
    const activeTrackId = this.data.activeTrackId === trackId ? tracks[0].id : this.data.activeTrackId;
    this.setData({
      tracks: this.decorateTracksForPlayback(tracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying),
      activeTrackId
    });
  },

  onClearTrack(e) {
    this.stopPlaybackForUserAction();
    const trackId = e.currentTarget.dataset.trackId;
    const tracks = this.data.tracks.map((track) => (track.id === trackId ? { ...track, notes: [] } : track));
    this.setData({
      tracks: this.decorateTracksForPlayback(tracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying)
    });
  },

  onToggleSkipTrack(e) {
    this.stopPlaybackForUserAction();
    const trackId = e.currentTarget.dataset.trackId;
    const tracks = this.data.tracks.map((track) => (track.id === trackId ? { ...track, skipTrack: !track.skipTrack } : track));
    this.setData({
      tracks: this.decorateTracksForPlayback(tracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying)
    });
  },

  onLoopMinus(e) {
    this.stopPlaybackForUserAction();
    const trackId = e.currentTarget.dataset.trackId;
    const tracks = this.data.tracks.map((track) => {
      if (track.id !== trackId) return track;
      return { ...track, loopCount: Math.max(1, (track.loopCount || 1) - 1) };
    });
    this.setData({
      tracks: this.decorateTracksForPlayback(tracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying)
    });
  },

  onLoopPlus(e) {
    this.stopPlaybackForUserAction();
    const trackId = e.currentTarget.dataset.trackId;
    const tracks = this.data.tracks.map((track) => {
      if (track.id !== trackId) return track;
      return { ...track, loopCount: Math.min(99, (track.loopCount || 1) + 1) };
    });
    this.setData({
      tracks: this.decorateTracksForPlayback(tracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying)
    });
  },

  onDeleteLastNote(e) {
    this.stopPlaybackForUserAction();
    const trackId = e.currentTarget.dataset.trackId;
    const tracks = this.data.tracks.map((track) => {
      if (track.id !== trackId) return track;
      const notes = track.notes.slice(0, -1);
      return { ...track, notes };
    });
    this.setData({
      tracks: this.decorateTracksForPlayback(tracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying)
    });
  },

  onTogglePresetPanel() {
    this.stopPlaybackForUserAction();
    this.setData({ showPresetPanel: !this.data.showPresetPanel });
  },

  onTogglePaletteCollapse() {
    this.stopPlaybackForUserAction();
    this.setData({ isPaletteCollapsed: !this.data.isPaletteCollapsed });
  },

  onApplyPreset(e) {
    this.stopPlaybackForUserAction();
    const presetId = e.currentTarget.dataset.presetId;
    const preset = RHYTHM_PRESETS.find((item) => item.id === presetId);
    if (!preset) return;
    const activeTrackId = this.data.activeTrackId;
    const notes = preset.notes.map((note) => ({
      id: genId("note"),
      start: note.start,
      duration: note.duration,
      isRest: !!note.isRest,
      symbol: this.getSymbolByDuration(note.duration, !!note.isRest),
      icon: this.getIconByDuration(note.duration, !!note.isRest)
    }));
    const tracks = this.data.tracks.map((track) => (track.id === activeTrackId ? { ...track, notes } : track));
    this.setData({
      tracks: this.decorateTracksForPlayback(tracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying),
      showPresetPanel: false
    });
  },

  noop() {},

  addNoteFromTool(toolId) {
    const tool = TOOLS.find((item) => item.id === toolId);
    if (!tool) return;
    const activeTrack = this.data.tracks.find((track) => track.id === this.data.activeTrackId);
    if (!activeTrack) return;
    const currentNotes = activeTrack.notes || [];
    const singleDuration = tool.beats / this.data.timeSignatureNumerator;
    const sorted = currentNotes.slice().sort((a, b) => a.start - b.start);
    let insertTime = -1;
    const EPSILON = 0.0001;
    if (sorted.length === 0) {
      if (singleDuration <= 1 + EPSILON) insertTime = 0;
    } else if (sorted[0].start >= singleDuration - EPSILON) {
      insertTime = 0;
    }
    if (insertTime === -1 && sorted.length > 0) {
      for (let i = 0; i < sorted.length; i += 1) {
        const currentEnd = sorted[i].start + sorted[i].duration;
        const nextStart = i === sorted.length - 1 ? 1 : sorted[i + 1].start;
        if (nextStart - currentEnd >= singleDuration - EPSILON) {
          insertTime = currentEnd;
          break;
        }
      }
    }
    if (insertTime === -1) return;
    insertTime = Math.round(insertTime * 10000) / 10000;
    if (insertTime + singleDuration > 1.0001) return;

    let generatedNotes = [];
    if (tool.pattern && tool.pattern.length) {
      generatedNotes = tool.pattern.map((item) => {
        const duration = (item.relDuration * tool.beats) / this.data.timeSignatureNumerator;
        const isRest = !!item.isRest || tool.isRest;
        return {
          id: genId("note"),
          start: insertTime + (item.relStart * tool.beats) / this.data.timeSignatureNumerator,
          duration,
          isRest,
          symbol: this.getSymbolByDuration(duration, isRest),
          icon: this.getIconByDuration(duration, isRest)
        };
      });
    } else {
      generatedNotes = [
        {
          id: genId("note"),
          start: insertTime,
          duration: singleDuration,
          isRest: tool.isRest,
          symbol: tool.symbol,
          icon: tool.icon || this.getIconByDuration(singleDuration, tool.isRest)
        }
      ];
    }

    const tracks = this.data.tracks.map((track) => {
      if (track.id !== this.data.activeTrackId) return track;
      return { ...track, notes: track.notes.concat(generatedNotes) };
    });
    this.setData({
      tracks: this.decorateTracksForPlayback(tracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying)
    });
  },

  getSymbolByDuration(duration, isRest) {
    const beats = duration * this.data.timeSignatureNumerator;
    const near = (value, target) => Math.abs(value - target) < 0.1;
    if (isRest) {
      return "—";
    }
    if (near(beats, 4)) return "○";
    if (near(beats, 2)) return "♩ —";
    if (near(beats, 1.5)) return "♩.";
    if (near(beats, 1)) return "♩";
    if (near(beats, 0.75)) return "♪.";
    if (near(beats, 0.5)) return "♪";
    return "♫";
  },

  getIconByDuration(duration, isRest) {
    const beats = duration * this.data.timeSignatureNumerator;
    const near = (value, target) => Math.abs(value - target) < 0.1;
    if (isRest) {
      if (near(beats, 4)) return "/assets/note-icons/rest-whole.svg";
      if (near(beats, 2)) return "/assets/note-icons/rest-half.svg";
      if (near(beats, 1)) return "/assets/note-icons/rest-quarter.svg";
      if (near(beats, 0.5)) return "/assets/note-icons/rest-eighth.svg";
      return "/assets/note-icons/rest-sixteenth.svg";
    }
    if (near(beats, 4)) return "/assets/note-icons/whole.svg";
    if (near(beats, 2)) return "/assets/note-icons/half.svg";
    if (near(beats, 1)) return "/assets/note-icons/quarter.svg";
    if (near(beats, 0.75)) return "/assets/note-icons/dotted-eighth.svg";
    if (near(beats, 0.5)) return "/assets/note-icons/eighth.svg";
    if (near(beats, 1.5)) return "/assets/note-icons/dotted-quarter.svg";
    if (near(beats, 0.25)) return "/assets/note-icons/sixteenth.svg";
    return "";
  },

  togglePlay() {
    if (this.data.isPlaying) {
      this.stopMetronome();
      return;
    }
    this.startMetronome();
  },

  startMetronome() {
    this._absoluteMeasureIndex = 0;
    this._measureStartTs = Date.now();
    this._measureDurationMs = this.getMeasureDurationMs();
    this._playedNoteIdsInMeasure = {};
    const firstTrackIndex = this.getTrackInfoForMeasure(0).trackIndex;
    this._lastAutoScrolledTrackIndex = -1;
    this.setData({
      isPlaying: true,
      playingTrackIndex: firstTrackIndex,
      progressPercent: 0,
      currentBeat: 1,
      tracks: this.decorateTracksForPlayback(this.data.tracks, firstTrackIndex, 0, true)
    });
    this.resetBeatDots(1);
    this.scrollToPlayingTrack(firstTrackIndex);
    this.scheduleLoop();
  },

  stopMetronome() {
    if (this._ticker) {
      clearTimeout(this._ticker);
      this._ticker = null;
    }
    this._lastAutoScrolledTrackIndex = -1;
    this.setData({
      isPlaying: false,
      currentBeat: 1,
      progressPercent: 0,
      playingTrackIndex: 0,
      tracks: this.decorateTracksForPlayback(this.data.tracks, 0, 0, false)
    });
    this.resetBeatDots(1);
  },

  restartMetronome() {
    this.stopMetronome();
    this.startMetronome();
  },

  scheduleLoop() {
    if (!this.data.isPlaying) return;
    const now = Date.now();
    const elapsed = now - this._measureStartTs;
    const progress = Math.max(0, Math.min(1, elapsed / this._measureDurationMs));
    const trackInfo = this.getTrackInfoForMeasure(this._absoluteMeasureIndex);
    const track = this.data.tracks[trackInfo.trackIndex];
    const currentBeat = Math.min(this.data.timeSignatureNumerator, Math.floor(progress * this.data.timeSignatureNumerator) + 1);
    this.triggerNotes(track, progress);

    this.setData({
      progressPercent: Math.floor(progress * 100),
      playingTrackIndex: trackInfo.trackIndex,
      currentBeat,
      tracks: this.decorateTracksForPlayback(this.data.tracks, trackInfo.trackIndex, progress, true)
    });
    this.scrollToPlayingTrack(trackInfo.trackIndex);
    this.resetBeatDots(currentBeat);

    if (elapsed >= this._measureDurationMs) {
      this._absoluteMeasureIndex += 1;
      this._measureStartTs = now;
      this._measureDurationMs = this.getMeasureDurationMs();
      this._playedNoteIdsInMeasure = {};
      const nextTrackInfo = this.getTrackInfoForMeasure(this._absoluteMeasureIndex);
      this.setData({
        playingTrackIndex: nextTrackInfo.trackIndex,
        progressPercent: 0,
        currentBeat: 1,
        tracks: this.decorateTracksForPlayback(this.data.tracks, nextTrackInfo.trackIndex, 0, true)
      });
      this.scrollToPlayingTrack(nextTrackInfo.trackIndex);
      this.resetBeatDots(1);
    }

    this._ticker = setTimeout(() => this.scheduleLoop(), 25);
  },

  triggerNotes(track, progress) {
    if (!track || !track.notes || !this._playedNoteIdsInMeasure) return;
    for (let i = 0; i < track.notes.length; i += 1) {
      const note = track.notes[i];
      if (note.isRest) continue;
      if (progress + 0.003 < note.start) continue;
      if (this._playedNoteIdsInMeasure[note.id]) continue;
      this._playedNoteIdsInMeasure[note.id] = true;
      const isAccent = this.data.accentFirstBeat && Math.abs(note.start) < 0.001;
      this.playClick(isAccent);
    }
  },

  playClick(isAccent) {
    const pool = isAccent ? this._accentAudioPool : this._normalAudioPool;
    if (!pool || !pool.length) return;
    const indexKey = isAccent ? "_accentAudioIndex" : "_normalAudioIndex";
    const currentIndex = this[indexKey] || 0;
    const audio = pool[currentIndex % pool.length];
    this[indexKey] = (currentIndex + 1) % pool.length;
    try {
      // Try replay from the beginning without rebuilding context.
      audio.seek(0);
      audio.play();
    } catch (err) {
      console.error("playClick failed", err);
      this.showAudioErrorHint();
    }
  },

  prepareClickSounds() {
    try {
      const fs = wx.getFileSystemManager();
      const baseDir = `${wx.env.USER_DATA_PATH}/metronome`;
      const normalPath = `${baseDir}/click-normal.wav`;
      const accentPath = `${baseDir}/click-accent.wav`;
      try {
        fs.mkdirSync(baseDir, true);
      } catch (err) {
        // Directory may already exist
      }

      // Use longer click samples so real phone speakers can reproduce clearly.
      this.ensureWavFile(fs, normalPath, 980, 95);
      this.ensureWavFile(fs, accentPath, 1560, 120);
      this._normalClickPath = normalPath;
      this._accentClickPath = accentPath;
      // A small audio pool avoids stutter on real phones at higher BPM.
      this._normalAudioPool = this.createClickAudioPool(normalPath, 6);
      this._accentAudioPool = this.createClickAudioPool(accentPath, 4);
      this._normalAudioIndex = 0;
      this._accentAudioIndex = 0;
    } catch (err) {
      console.error("prepareClickSounds failed", err);
      this.showAudioErrorHint();
    }
  },

  configureAudioOptions() {
    try {
      wx.setInnerAudioOption({
        mixWithOther: true,
        obeyMuteSwitch: false,
        success: () => {},
        fail: (err) => {
          console.error("setInnerAudioOption failed", err);
        }
      });
    } catch (err) {
      console.error("configureAudioOptions failed", err);
    }
  },

  ensureWavFile(fs, path, frequency, durationMs) {
    let exists = true;
    try {
      fs.accessSync(path);
    } catch (err) {
      exists = false;
    }
    if (exists) return;
    const wav = this.buildSineWav(frequency, durationMs);
    try {
      // Most real devices accept ArrayBuffer directly.
      fs.writeFileSync(path, wav);
    } catch (err) {
      // Fallback for some runtimes that are picky about binary type.
      fs.writeFileSync(path, new Uint8Array(wav));
    }
  },

  createClickAudioPool(src, count) {
    const pool = [];
    for (let i = 0; i < count; i += 1) {
      const audio = wx.createInnerAudioContext();
      audio.src = src;
      audio.volume = 1.0;
      audio.autoplay = false;
      audio.loop = false;
      audio.obeyMuteSwitch = false;
      audio.onError((err) => {
        console.error("audio onError", err);
        this.showAudioErrorHint();
      });
      pool.push(audio);
    }
    return pool;
  },

  destroyClickSounds() {
    const destroyPool = (pool) => {
      if (!pool || !pool.length) return;
      for (let i = 0; i < pool.length; i += 1) {
        try {
          pool[i].destroy();
        } catch (err) {}
      }
    };
    destroyPool(this._normalAudioPool);
    destroyPool(this._accentAudioPool);
    this._normalAudioPool = null;
    this._accentAudioPool = null;
    this._normalAudioIndex = 0;
    this._accentAudioIndex = 0;
  },

  showAudioErrorHint() {
    if (this._audioErrorShown) return;
    this._audioErrorShown = true;
    wx.showToast({
      title: "声音初始化失败，请关闭静音后重试",
      icon: "none",
      duration: 1800
    });
  },

  buildSineWav(frequency, durationMs) {
    // 44.1kHz is broadly compatible on real devices.
    const sampleRate = 44100;
    const numChannels = 1;
    const bitsPerSample = 16;
    const numSamples = Math.floor((sampleRate * durationMs) / 1000);
    const dataSize = numSamples * numChannels * (bitsPerSample / 8);
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    this.writeAscii(view, 0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    this.writeAscii(view, 8, "WAVE");
    this.writeAscii(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true);
    view.setUint16(32, numChannels * (bitsPerSample / 8), true);
    view.setUint16(34, bitsPerSample, true);
    this.writeAscii(view, 36, "data");
    view.setUint32(40, dataSize, true);

    const fadeOutStart = Math.floor(numSamples * 0.72);
    for (let i = 0; i < numSamples; i += 1) {
      const t = i / sampleRate;
      const base = Math.sin(2 * Math.PI * frequency * t);
      const env = i < 20 ? i / 20 : 1;
      const decay = i > fadeOutStart ? Math.max(0, (numSamples - i) / (numSamples - fadeOutStart)) : 1;
      const overtone = Math.sin(2 * Math.PI * frequency * 2 * t) * 0.25;
      const sample = Math.max(-1, Math.min(1, (base + overtone) * env * decay * 0.88));
      view.setInt16(44 + i * 2, sample * 32767, true);
    }
    return buffer;
  },

  writeAscii(view, offset, str) {
    for (let i = 0; i < str.length; i += 1) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  },

  onPageScroll(e) {
    if (e && e.detail) {
      this._currentScrollTop = e.detail.scrollTop || 0;
    }
  },

  scrollToPlayingTrack(trackIndex) {
    if (trackIndex === this._lastAutoScrolledTrackIndex) return;
    this._lastAutoScrolledTrackIndex = trackIndex;

    const query = wx.createSelectorQuery().in(this);
    query.select(`#track-${trackIndex}`).boundingClientRect();
    query.select(".page").boundingClientRect();
    query.select(".page").scrollOffset();
    query.exec((res) => {
      if (!res || !res[0] || !res[1] || !res[2]) return;
      const trackRect = res[0];
      const pageRect = res[1];
      const pageScroll = res[2];
      const currentScrollTop = pageScroll.scrollTop || 0;
      const trackTopInContent = trackRect.top - pageRect.top + currentScrollTop;
      let targetScrollTop = trackTopInContent - (pageRect.height - trackRect.height) / 2;
      if (targetScrollTop < 0) targetScrollTop = 0;
      if (Math.abs(targetScrollTop - currentScrollTop) < 1) {
        targetScrollTop = currentScrollTop + (targetScrollTop >= currentScrollTop ? 1 : -1);
      }
      this.setData({ scrollTop: targetScrollTop });
    });
  },

  refreshTrackVisuals(progress, playingTrackIndex, isPlaying) {
    this.setData({
      tracks: this.decorateTracksForPlayback(this.data.tracks, playingTrackIndex, progress, isPlaying)
    });
  },

  decorateTracksForPlayback(tracks, playingTrackIndex, progress, isPlaying) {
    return tracks.map((track, index) => {
      const notes = (track.notes || []).map((note) => {
        const noteEnd = note.start + note.duration;
        const isPlayingNote = isPlaying && index === playingTrackIndex && progress >= note.start && progress <= noteEnd;
        let fill = 0;
        if (isPlaying && index === playingTrackIndex) {
          if (progress >= note.start && progress <= noteEnd) {
            fill = Math.floor(((progress - note.start) / note.duration) * 100);
          } else if (progress > noteEnd) {
            fill = 0;
          }
        }
        return {
          ...note,
          _playing: isPlayingNote,
          _fill: Math.max(0, Math.min(100, fill))
        };
      });
      return { ...track, notes };
    });
  },

  getTrackInfoForMeasure(absoluteMeasureIndex) {
    const tracks = this.data.tracks || [];
    const activeTracks = tracks.filter((track) => !track.skipTrack);
    if (!activeTracks.length) return { trackIndex: 0, loopIndex: 0 };
    const totalCycleMeasures = activeTracks.reduce((sum, track) => sum + (track.loopCount || 1), 0);
    const measureInCycle = absoluteMeasureIndex % totalCycleMeasures;
    let totalMeasuresBefore = 0;
    for (let i = 0; i < tracks.length; i += 1) {
      const track = tracks[i];
      if (track.skipTrack) continue;
      const loopCount = track.loopCount || 1;
      if (measureInCycle < totalMeasuresBefore + loopCount) {
        return { trackIndex: i, loopIndex: measureInCycle - totalMeasuresBefore };
      }
      totalMeasuresBefore += loopCount;
    }
    return { trackIndex: 0, loopIndex: 0 };
  },

  getMeasureDurationMs() {
    return Math.floor((60000 / this.data.bpm) * this.data.timeSignatureNumerator);
  },

  resetBeatDots(activeBeat) {
    const beatDots = Array.from({ length: this.data.timeSignatureNumerator }, (_, index) => {
      const beatNumber = index + 1;
      return {
        active: beatNumber === activeBeat,
        isAccent: beatNumber === 1 && this.data.accentFirstBeat
      };
    });
    this.setData({ beatDots });
  }
});
