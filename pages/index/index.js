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
  _webAudioContext: null,
  _normalClickBuffer: null,
  _accentClickBuffer: null,
  _audioClockBaseMs: 0,
  _audioClockBaseTime: 0,
  _lookaheadMs: 100,
  _minScheduleLeadMs: 12,
  _audioReady: false,
  _scheduleMonitorEnabled: false,
  _leadTimes: null,
  _leadTimesSize: 50,
  _leadTimesCount: 0,
  _leadTimesWriteIndex: 0,
  _monitorTimer: null,
  _intervalMonitorEnabled: false,
  _intervals: null,
  _intervalsSize: 64,
  _intervalsCount: 0,
  _intervalsWriteIndex: 0,
  _lastScheduledClickMs: null,
  _intervalWarnThresholdMs: 8,
  _intervalWarmupRemaining: 0,
  _audioErrorShown: false,
  _lastAutoScrolledTrackIndex: -1,
  _currentScrollTop: 0,
  _viewportHeight: 0,
  _lastProgressInMeasure: 0,
  _lastUiUpdateTs: 0,
  _lastUiBeat: 1,
  _lastUiTrackIndex: 0,
  _clockNow: null,
  _audioPrimed: false,
  _lastElapsedInMeasureMs: 0,
  _tickIntervalMs: 8,
  _nextTickTs: 0,
  _uiSyncDelayMs: 18,

  onLoad() {
    this._clockNow = this.createClockNow();
    this.initScheduleMonitor();
    this.configureAudioOptions();
    this.enableShareCapabilities();
    this.prepareClickSounds();
    this.refreshTrackVisuals(0, 0, false);
    this.resetBeatDots(1);
  },

  onUnload() {
    this.stopMetronome();
    this.destroyClickSounds();
    this.stopScheduleMonitorLogger();
    this._clockNow = null;
  },

  initScheduleMonitor() {
    this._leadTimes = new Array(this._leadTimesSize);
    this._leadTimesCount = 0;
    this._leadTimesWriteIndex = 0;
    this._intervals = new Array(this._intervalsSize);
    this._intervalsCount = 0;
    this._intervalsWriteIndex = 0;
    this._lastScheduledClickMs = null;
    if (typeof wx !== "undefined") {
      // Hidden debug switch for on-device troubleshooting.
      wx.__METRONOME_SET_SCHEDULE_MONITOR__ = (enabled) => {
        this.setScheduleMonitorEnabled(!!enabled);
      };
      wx.__METRONOME_SET_INTERVAL_MONITOR__ = (enabled) => {
        this.setIntervalMonitorEnabled(!!enabled);
      };
    }
  },

  setScheduleMonitorEnabled(enabled) {
    this._scheduleMonitorEnabled = !!enabled;
    if (this._scheduleMonitorEnabled) {
      this.startScheduleMonitorLogger();
    } else {
      this.stopScheduleMonitorLogger();
    }
  },

  startScheduleMonitorLogger() {
    if (this._monitorTimer) return;
    this._monitorTimer = setInterval(() => {
      if (!this.data.isPlaying) return;
      const stats = this.getLeadTimeStats();
      if (stats) {
        console.log(
          `[MetronomeMonitor] leadTime(ms) avg=${stats.avgMs.toFixed(2)} min=${stats.minMs.toFixed(2)} max=${stats.maxMs.toFixed(2)} samples=${stats.samples}`
        );
      }
      if (this._intervalMonitorEnabled) {
        const intervalStats = this.getIntervalStats();
        if (intervalStats) {
          console.log(
            `[MetronomeMonitor] interval(ms) avg=${intervalStats.avgMs.toFixed(2)} min=${intervalStats.minMs.toFixed(2)} max=${intervalStats.maxMs.toFixed(2)} jitter=${intervalStats.jitterMs.toFixed(2)} samples=${intervalStats.samples}`
          );
          if (intervalStats.jitterMs > this._intervalWarnThresholdMs) {
            console.warn(
              `[MetronomeMonitor][WARN] jitter ${intervalStats.jitterMs.toFixed(2)}ms exceeded threshold ${this._intervalWarnThresholdMs}ms`
            );
          }
        }
      }
    }, 1000);
  },

  stopScheduleMonitorLogger() {
    if (!this._monitorTimer) return;
    clearInterval(this._monitorTimer);
    this._monitorTimer = null;
  },

  recordLeadTime(leadTimeMs) {
    if (!this._leadTimes) return;
    this._leadTimes[this._leadTimesWriteIndex] = leadTimeMs;
    this._leadTimesWriteIndex = (this._leadTimesWriteIndex + 1) % this._leadTimesSize;
    if (this._leadTimesCount < this._leadTimesSize) {
      this._leadTimesCount += 1;
    }
  },

  getLeadTimeStats() {
    const count = this._leadTimesCount || 0;
    if (!count || !this._leadTimes) return null;
    let minMs = Number.POSITIVE_INFINITY;
    let maxMs = Number.NEGATIVE_INFINITY;
    let sumMs = 0;
    for (let i = 0; i < count; i += 1) {
      const value = this._leadTimes[i];
      if (typeof value !== "number") continue;
      if (value < minMs) minMs = value;
      if (value > maxMs) maxMs = value;
      sumMs += value;
    }
    return {
      avgMs: sumMs / count,
      minMs,
      maxMs,
      samples: count
    };
  },

  setIntervalMonitorEnabled(enabled) {
    this._intervalMonitorEnabled = !!enabled;
    if (this._intervalMonitorEnabled) {
      this.resetIntervalStats(4);
      this.startScheduleMonitorLogger();
    }
  },

  resetIntervalStats(warmupCount) {
    this._intervalsCount = 0;
    this._intervalsWriteIndex = 0;
    this._lastScheduledClickMs = null;
    this._intervalWarmupRemaining = Math.max(0, warmupCount || 0);
  },

  recordScheduledInterval(scheduledMs) {
    if (!this._intervalMonitorEnabled || !Number.isFinite(scheduledMs)) return;
    if (Number.isFinite(this._lastScheduledClickMs)) {
      const delta = scheduledMs - this._lastScheduledClickMs;
      if (delta > 1 && delta < 5000) {
        if (this._intervalWarmupRemaining > 0) {
          this._intervalWarmupRemaining -= 1;
          this._lastScheduledClickMs = scheduledMs;
          return;
        }
        this._intervals[this._intervalsWriteIndex] = delta;
        this._intervalsWriteIndex = (this._intervalsWriteIndex + 1) % this._intervalsSize;
        if (this._intervalsCount < this._intervalsSize) {
          this._intervalsCount += 1;
        }
      }
    }
    this._lastScheduledClickMs = scheduledMs;
  },

  getIntervalStats() {
    const count = this._intervalsCount || 0;
    if (!count || !this._intervals) return null;
    let minMs = Number.POSITIVE_INFINITY;
    let maxMs = Number.NEGATIVE_INFINITY;
    let sumMs = 0;
    for (let i = 0; i < count; i += 1) {
      const value = this._intervals[i];
      if (typeof value !== "number") continue;
      if (value < minMs) minMs = value;
      if (value > maxMs) maxMs = value;
      sumMs += value;
    }
    const avgMs = sumMs / count;
    return {
      avgMs,
      minMs,
      maxMs,
      jitterMs: maxMs - minMs,
      samples: count
    };
  },

  createClockNow() {
    try {
      if (wx.getPerformance) {
        const perf = wx.getPerformance();
        if (perf && typeof perf.now === "function") {
          const base = Date.now();
          return () => base + perf.now();
        }
      }
    } catch (err) {}
    return () => Date.now();
  },

  nowMs() {
    if (!this._clockNow) {
      this._clockNow = this.createClockNow();
    }
    return this._clockNow();
  },

  enableShareCapabilities() {
    if (!wx.showShareMenu) return;
    try {
      wx.showShareMenu({
        menus: ["shareAppMessage", "shareTimeline"]
      });
    } catch (err) {
      console.warn("showShareMenu failed", err);
    }
  },

  onShareAppMessage() {
    return {
      title: "自由节拍器 - 可自定义音轨与节奏",
      path: "/pages/index/index"
    };
  },

  onShareTimeline() {
    return {
      title: "自由节拍器 - 可自定义音轨与节奏",
      query: ""
    };
  },

  stopPlaybackForUserAction() {
    if (this.data.isPlaying) this.stopMetronome();
  },

  onBpmChange(e) {
    this.stopPlaybackForUserAction();
    const bpm = Number(e.detail.value);
    this.applyBpmValue(bpm);
  },

  onBpmInput(e) {
    this.stopPlaybackForUserAction();
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
    if (bpm !== this.data.bpm && this._intervalMonitorEnabled) {
      // Avoid false jitter alarms when mixing pre/post BPM intervals.
      this.resetIntervalStats(4);
    }
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
    const clearedTracks = this.data.tracks.map((track) => Object.assign({}, track, { notes: [] }));
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
    const tracks = this.data.tracks.map((track) => (track.id === trackId ? Object.assign({}, track, { notes: [] }) : track));
    this.setData({
      tracks: this.decorateTracksForPlayback(tracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying)
    });
  },

  onToggleSkipTrack(e) {
    this.stopPlaybackForUserAction();
    const trackId = e.currentTarget.dataset.trackId;
    const tracks = this.data.tracks.map((track) => (track.id === trackId ? Object.assign({}, track, { skipTrack: !track.skipTrack }) : track));
    this.setData({
      tracks: this.decorateTracksForPlayback(tracks, this.data.playingTrackIndex, this.data.progressPercent / 100, this.data.isPlaying)
    });
  },

  onLoopMinus(e) {
    this.stopPlaybackForUserAction();
    const trackId = e.currentTarget.dataset.trackId;
    const tracks = this.data.tracks.map((track) => {
      if (track.id !== trackId) return track;
      return Object.assign({}, track, { loopCount: Math.max(1, (track.loopCount || 1) - 1) });
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
      return Object.assign({}, track, { loopCount: Math.min(99, (track.loopCount || 1) + 1) });
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
      return Object.assign({}, track, { notes });
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
    const tracks = this.data.tracks.map((track) => (track.id === activeTrackId ? Object.assign({}, track, { notes }) : track));
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
      return Object.assign({}, track, { notes: track.notes.concat(generatedNotes) });
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
    if (!this._audioReady || !this._normalClickBuffer || !this._accentClickBuffer) {
      wx.showToast({
        title: "声音采样加载中",
        icon: "none",
        duration: 1000
      });
      return;
    }
    const startDelayMs = this.ensureAudioPrimedBeforeStart();
    if (this._webAudioContext && typeof this._webAudioContext.resume === "function") {
      try {
        this._webAudioContext.resume();
      } catch (err) {}
    }
    this._audioClockBaseMs = this.nowMs();
    this._audioClockBaseTime = this._webAudioContext ? this._webAudioContext.currentTime || 0 : 0;
    this._absoluteMeasureIndex = 0;
    this._measureStartTs = this.nowMs() + startDelayMs;
    this._measureDurationMs = this.getMeasureDurationMs();
    this._playedNoteIdsInMeasure = {};
    this._lastProgressInMeasure = 0;
    this._lastElapsedInMeasureMs = 0;
    this._lastUiUpdateTs = 0;
    this._lastUiBeat = 1;
    this._nextTickTs = this._measureStartTs;
    const firstTrackIndex = this.getTrackInfoForMeasure(0).trackIndex;
    this._lastUiTrackIndex = firstTrackIndex;
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
    this.scheduleMeasureDownbeat(this._absoluteMeasureIndex, this._measureStartTs, this._measureDurationMs);
    this.scheduleLoop();
  },

  stopMetronome() {
    if (this._ticker) {
      clearTimeout(this._ticker);
      this._ticker = null;
    }
    this._lastAutoScrolledTrackIndex = -1;
    this._lastProgressInMeasure = 0;
    this._lastElapsedInMeasureMs = 0;
    this._lastUiUpdateTs = 0;
    this._lastUiBeat = 1;
    this._lastUiTrackIndex = 0;
    this._nextTickTs = 0;
    this.resetIntervalStats(0);
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
    const now = this.nowMs();
    let elapsed = now - this._measureStartTs;
    if (elapsed < 0) {
      const waitMs = Math.max(1, Math.ceil(-elapsed));
      this._ticker = setTimeout(() => this.scheduleLoop(), waitMs);
      return;
    }

    // Keep a fixed time axis by incrementing measure start with duration
    // instead of resetting to "now", which can import timer jitter.
    while (elapsed >= this._measureDurationMs) {
      const finishingTrackInfo = this.getTrackInfoForMeasure(this._absoluteMeasureIndex);
      const finishingTrack = this.data.tracks[finishingTrackInfo.trackIndex];
      this.triggerNotes(finishingTrack, this._lastElapsedInMeasureMs, this._measureDurationMs, this._measureDurationMs);

      this._absoluteMeasureIndex += 1;
      this._measureStartTs += this._measureDurationMs;
      this._measureDurationMs = this.getMeasureDurationMs();
      this._playedNoteIdsInMeasure = {};
      this._lastProgressInMeasure = 0;
      this._lastElapsedInMeasureMs = 0;
      this.scheduleMeasureDownbeat(this._absoluteMeasureIndex, this._measureStartTs, this._measureDurationMs);
      elapsed = now - this._measureStartTs;
    }

    // Keep audio scheduling untouched; only delay UI timeline slightly so
    // visual beat aligns with actual audible onset on real devices.
    const uiElapsed = Math.max(0, elapsed - this._uiSyncDelayMs);
    const progress = Math.max(0, Math.min(1, uiElapsed / this._measureDurationMs));
    const trackInfo = this.getTrackInfoForMeasure(this._absoluteMeasureIndex);
    const track = this.data.tracks[trackInfo.trackIndex];
    const currentBeat = Math.min(this.data.timeSignatureNumerator, Math.floor(progress * this.data.timeSignatureNumerator) + 1);
    const windowStart = Math.max(0, Math.min(this._measureDurationMs, this._lastElapsedInMeasureMs));
    const windowEnd = Math.min(this._measureDurationMs, Math.max(elapsed, windowStart) + this._lookaheadMs);
    this.triggerNotes(track, windowStart, windowEnd, this._measureDurationMs);
    this._lastProgressInMeasure = progress;
    this._lastElapsedInMeasureMs = elapsed;

    const shouldRenderUi =
      now - this._lastUiUpdateTs >= 33 ||
      this._lastUiTrackIndex !== trackInfo.trackIndex ||
      this._lastUiBeat !== currentBeat;

    if (shouldRenderUi) {
      this._lastUiUpdateTs = now;
      this._lastUiTrackIndex = trackInfo.trackIndex;
      this._lastUiBeat = currentBeat;
      this.setData({
        progressPercent: Math.floor(progress * 100),
        playingTrackIndex: trackInfo.trackIndex,
        currentBeat,
        tracks: this.decorateTracksForPlayback(this.data.tracks, trackInfo.trackIndex, progress, true)
      });
      this.scrollToPlayingTrack(trackInfo.trackIndex);
      this.resetBeatDots(currentBeat);
    }

    if (!this._nextTickTs) {
      this._nextTickTs = now + this._tickIntervalMs;
    }
    while (this._nextTickTs <= now) {
      this._nextTickTs += this._tickIntervalMs;
    }
    const nextDelay = Math.max(1, Math.round(this._nextTickTs - now));
    this._ticker = setTimeout(() => this.scheduleLoop(), nextDelay);
  },

  ensureAudioPrimedBeforeStart() {
    if (this._audioPrimed) return 0;
    if (!this._webAudioContext || !this._normalClickBuffer || !this._accentClickBuffer) {
      return 0;
    }
    this._audioPrimed = true;
    return 20;
  },

  triggerNotes(track, fromElapsedMs, toElapsedMs, measureDurationMs) {
    if (!track || !track.notes || !this._playedNoteIdsInMeasure) return;
    if (!Number.isFinite(measureDurationMs) || measureDurationMs <= 0) return;
    const start = Math.max(0, fromElapsedMs || 0);
    const end = Math.max(start, Math.min(measureDurationMs || 0, toElapsedMs || 0));
    for (let i = 0; i < track.notes.length; i += 1) {
      const note = track.notes[i];
      if (note.isRest) continue;
      const noteAtMs = note.start * measureDurationMs;
      if (!Number.isFinite(noteAtMs)) continue;
      if (noteAtMs > end + 1 || noteAtMs < start - 1) continue;
      if (this._playedNoteIdsInMeasure[note.id]) continue;
      this._playedNoteIdsInMeasure[note.id] = true;
      const isAccent = this.data.accentFirstBeat && Math.abs(note.start) < 0.001;
      this.playClick(isAccent, this._measureStartTs + noteAtMs);
    }
  },

  playClick(isAccent, scheduledMs) {
    if (!this._webAudioContext) return;
    const buffer = isAccent ? this._accentClickBuffer : this._normalClickBuffer;
    if (!buffer) return;
    try {
      const source = this._webAudioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this._webAudioContext.destination);
      const currentTime = this._webAudioContext.currentTime;
      if (!Number.isFinite(currentTime)) return;
      const leadSec = Number.isFinite(this._minScheduleLeadMs) ? this._minScheduleLeadMs / 1000 : 0.012;

      // Start with a guaranteed-valid near-future time.
      let when = currentTime + leadSec;
      if (!Number.isFinite(when)) return;

      // Try mapping the scheduled ms into audio timeline.
      const mappedAudioTime = this.toAudioTime(scheduledMs);
      if (Number.isFinite(mappedAudioTime) && mappedAudioTime > when) {
        when = mappedAudioTime;
      } else if (!Number.isFinite(mappedAudioTime)) {
        // Repair timeline mapping when inputs are invalid.
        this._audioClockBaseMs = this.nowMs();
        this._audioClockBaseTime = currentTime;
      }

      if (!Number.isFinite(when)) return;
      if (this._scheduleMonitorEnabled) {
        this.recordLeadTime((when - currentTime) * 1000);
      }
      this.recordScheduledInterval(scheduledMs);
      source.start(when);
    } catch (err) {
      console.error("playClick failed", err);
      this.showAudioErrorHint();
    }
  },

  scheduleMeasureDownbeat(measureIndex, measureStartTs, measureDurationMs) {
    if (!this._playedNoteIdsInMeasure) return;
    const trackInfo = this.getTrackInfoForMeasure(measureIndex);
    const track = this.data.tracks[trackInfo.trackIndex];
    if (!track || !track.notes || !track.notes.length) return;
    for (let i = 0; i < track.notes.length; i += 1) {
      const note = track.notes[i];
      if (note.isRest) continue;
      if (note.start > 0.001) continue;
      if (this._playedNoteIdsInMeasure[note.id]) continue;
      this._playedNoteIdsInMeasure[note.id] = true;
      const scheduledMs = measureStartTs + note.start * measureDurationMs;
      const isAccent = this.data.accentFirstBeat;
      this.playClick(isAccent, scheduledMs);
    }
  },

  prepareClickSounds() {
    this._audioReady = false;
    const bootstrap = async () => {
      if (!wx.createWebAudioContext) {
        throw new Error("createWebAudioContext unavailable");
      }
      this._webAudioContext = wx.createWebAudioContext();
      const loaded = await this.loadClickSampleBuffers(this._webAudioContext);
      if (!loaded) {
        // Fallback to synthesized click buffers when sample files are unavailable.
        this._normalClickBuffer = this.createClickBuffer(this._webAudioContext, {
          carrierHz: 1200,
          durationMs: 60,
          modulationRatio: 2.14,
          modulationIndexMax: 2.5,
          peakGain: 0.5
        });
        this._accentClickBuffer = this.createClickBuffer(this._webAudioContext, {
          carrierHz: 1600,
          durationMs: 60,
          modulationRatio: 2.14,
          modulationIndexMax: 5.5,
          peakGain: 1.0
        });
      }
      this._audioClockBaseMs = this.nowMs();
      this._audioClockBaseTime = this._webAudioContext.currentTime || 0;
      this._audioReady = true;
    };
    bootstrap().catch((err) => {
      console.error("prepareClickSounds failed", err);
      this.showAudioErrorHint();
    });
  },

  async loadClickSampleBuffers(context) {
    const normalCandidates = [
      "/assets/audio/normal-click.wav",
      "assets/audio/normal-click.wav",
      "/assets/audio/normal-click.mp3",
      "assets/audio/normal-click.mp3"
    ];
    const accentCandidates = [
      "/assets/audio/accent-click.wav",
      "assets/audio/accent-click.wav",
      "/assets/audio/accent-click.mp3",
      "assets/audio/accent-click.mp3"
    ];
    const normalBuffer = await this.tryLoadBufferFromCandidates(context, normalCandidates);
    const accentBuffer = await this.tryLoadBufferFromCandidates(context, accentCandidates);
    if (!normalBuffer || !accentBuffer) return false;
    this._normalClickBuffer = normalBuffer;
    this._accentClickBuffer = accentBuffer;
    return true;
  },

  async tryLoadBufferFromCandidates(context, candidates) {
    for (let i = 0; i < candidates.length; i += 1) {
      const buffer = await this.loadAudioBufferFromPath(context, candidates[i]);
      if (buffer) return buffer;
    }
    return null;
  },

  async loadAudioBufferFromPath(context, filePath) {
    try {
      const fs = wx.getFileSystemManager();
      const arrayBuffer = await new Promise((resolve, reject) => {
        fs.readFile({
          filePath,
          success: (res) => resolve(res.data),
          fail: (err) => reject(err)
        });
      });
      return await this.decodeAudioDataCompat(context, arrayBuffer);
    } catch (err) {
      return null;
    }
  },

  async decodeAudioDataCompat(context, arrayBuffer) {
    try {
      const maybePromise = context.decodeAudioData(arrayBuffer);
      if (maybePromise && typeof maybePromise.then === "function") {
        return await maybePromise;
      }
      return await new Promise((resolve, reject) => {
        context.decodeAudioData(arrayBuffer, resolve, reject);
      });
    } catch (err) {
      return null;
    }
  },

  configureAudioOptions() {
    // WebAudio scheduling is used for stable click timing; no InnerAudio options needed.
  },

  createClickBuffer(context, options) {
    const carrierHz = options.carrierHz;
    const durationMs = options.durationMs;
    const modulationRatio = options.modulationRatio;
    const modulationIndexMax = options.modulationIndexMax;
    const peakGain = options.peakGain || 0.9;
    const sampleRate = 44100;
    const numSamples = Math.floor((sampleRate * durationMs) / 1000);
    const buffer = context.createBuffer(1, numSamples, sampleRate);
    const channel = buffer.getChannelData(0);
    const attackSamples = Math.max(1, Math.floor(sampleRate * 0.003)); // 3ms attack
    const modulatorHz = carrierHz * modulationRatio;
    const ampDecayK = 12.0; // immediate post-attack decay
    const modDecayK = 9.0; // immediate index decay

    for (let i = 0; i < numSamples; i += 1) {
      const t = i / sampleRate;
      const attack = i < attackSamples ? i / attackSamples : 1;
      const decayProgress = i <= attackSamples ? 0 : (i - attackSamples) / Math.max(1, numSamples - attackSamples);
      const mainEnvelope = i < attackSamples
        ? peakGain * attack
        : peakGain * Math.exp(-ampDecayK * decayProgress);
      const currentIndex = modulationIndexMax * Math.exp(-modDecayK * (i / Math.max(1, numSamples - 1)));

      const modulator = Math.sin(2 * Math.PI * modulatorHz * t) * currentIndex;
      const sample = Math.sin(2 * Math.PI * carrierHz * t + modulator) * mainEnvelope;
      channel[i] = Math.max(-1, Math.min(1, sample));
    }
    return buffer;
  },

  toAudioTime(scheduledMs) {
    if (!Number.isFinite(scheduledMs)) return Number.NaN;
    if (!Number.isFinite(this._audioClockBaseMs) || !Number.isFinite(this._audioClockBaseTime)) {
      return Number.NaN;
    }
    return this._audioClockBaseTime + (scheduledMs - this._audioClockBaseMs) / 1000;
  },

  destroyClickSounds() {
    this._audioReady = false;
    this._normalClickBuffer = null;
    this._accentClickBuffer = null;
    if (this._webAudioContext && typeof this._webAudioContext.close === "function") {
      try {
        this._webAudioContext.close();
      } catch (err) {}
    }
    this._webAudioContext = null;
    this._audioClockBaseMs = 0;
    this._audioClockBaseTime = 0;
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
        return Object.assign({}, note, {
          _playing: isPlayingNote,
          _fill: Math.max(0, Math.min(100, fill))
        });
      });
      return Object.assign({}, track, { notes });
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
