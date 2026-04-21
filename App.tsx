
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Timeline } from './components/Timeline';
import { Controls } from './components/Controls';
import { PlayState, Note, ToolOption, TimeSignature, Track } from './types';
import { audioEngine } from './services/audioEngine';
import { RHYTHM_PRESETS } from './services/geminiService';
import { Music4, Globe, Moon, Sun, Plus, LayoutGrid, Check, MoreHorizontal, Circle } from 'lucide-react';

type Language = 'en' | 'zh';
type Theme = 'light' | 'dark';

const TRANSLATIONS = {
  en: {
    title: "Free Metronome",
    subtitle: "Draw your rhythms, practice your beats",
    timeSig: "Time Sig",
    palette: "Note Palette",
    paletteHint: "Click to add",
    timeline: "Tracks (Sequential Playback)",
    measure: "Measure",
    genModalTitle: "Rhythm Library",
    genModalDesc: "Choose a preset rhythm to apply to the active track.",
    cancel: "Cancel",
    apply: "Apply",
    addTrack: "Add Track",
    accent: "Downbeat Accent",
    loop: "Loops",
    skip: "Skip",
    trackClickHint: "Tap specific notes above to add",
    tools: {
        'quarter': 'Quarter Note',
        'dotted-quarter': 'Dotted Quarter',
        'half': 'Half Note',
        'whole': 'Whole Note',
        'eighth': 'Eighth Note',
        'dotted-eighth': 'Dotted Eighth',
        'sixteenth': '16th Note',
        'triplet': 'Triplet (3 in 1)',
        '4-16ths': 'Four 16th Notes',
        '8th-2-16ths': 'Eighth + Two 16ths',
        '2-16ths-8th': 'Two 16ths + Eighth',
        'syncopation': 'Syncopation (16-8-16)',
        'dotted-8th-16th': 'Dotted Eighth + 16th',
        'rest-whole': 'Whole Rest',
        'rest-half': 'Half Rest',
        'rest-quarter': 'Quarter Rest',
        'rest-eighth': 'Eighth Rest',
        'rest-sixteenth': '16th Rest'
    },
    controls: {
       tempo: "Tempo",
       ai: "Rhythm Presets",
       clearNotes: "Clear"
    }
  },
  zh: {
    title: "自由节拍器",
    subtitle: "自己画节奏，自己练拍子",
    timeSig: "拍号",
    palette: "音符库",
    paletteHint: "点选音符添加到音轨",
    timeline: "音轨 (顺序播放)",
    measure: "小节",
    genModalTitle: "节奏预设库",
    genModalDesc: "选择一个预设节奏应用到当前选中的音轨。",
    cancel: "取消",
    apply: "应用",
    addTrack: "添加音轨",
    accent: "首拍重音提示",
    loop: "循环次数",
    skip: "跳过",
    trackClickHint: "点选上方音符库添加音符",
    tools: {
        'quarter': '四分音符',
        'dotted-quarter': '附点四分音符',
        'half': '二分音符',
        'whole': '全音符',
        'eighth': '八分音符',
        'dotted-eighth': '附点八分音符',
        'sixteenth': '十六分音符',
        'triplet': '三连音',
        '4-16ths': '十六分音符*4',
        '8th-2-16ths': '前十六',
        '2-16ths-8th': '后十六',
        'syncopation': '切分音',
        'dotted-8th-16th': '附点节奏',
        'rest-whole': '全个休止符',
        'rest-half': '二分休止符',
        'rest-quarter': '四分休止符',
        'rest-eighth': '八分休止符',
        'rest-sixteenth': '十六分休止符'
    },
    controls: {
       tempo: "速度",
       ai: "节奏预设",
       clearNotes: "清空"
    }
  }
};

const TOOLS: ToolOption[] = [
  { id: 'quarter', name: 'Quarter Note', beats: 1, isRest: false, symbol: '♩' },
  { id: 'eighth', name: 'Eighth Note', beats: 0.5, isRest: false, symbol: '♪' },
  { id: 'sixteenth', name: '16th Note', beats: 0.25, isRest: false, symbol: '𝅘𝅥𝅯' },
  { id: 'rest-quarter', name: 'Quarter Rest', beats: 1, isRest: true, symbol: '𝄽' },
  { id: 'half', name: 'Half Note', beats: 2, isRest: false, symbol: '𝅗𝅥' },
  { id: 'dotted-quarter', name: 'Dotted Quarter', beats: 1.5, isRest: false, symbol: '♩.' },
  { 
    id: 'triplet', 
    name: '8th Triplet', 
    beats: 1, 
    isRest: false, 
    symbol: '♪3♪',
    pattern: [
      { relStart: 0, relDuration: 0.3333 },
      { relStart: 0.3333, relDuration: 0.3333 },
      { relStart: 0.6666, relDuration: 0.3334 },
    ]
  },
  { 
    id: '4-16ths', 
    name: '4x 16th Notes', 
    beats: 1, 
    isRest: false, 
    symbol: '𝅘𝅥𝅯𝅘𝅥𝅯𝅘𝅥𝅯𝅘𝅥𝅯',
    pattern: [
      { relStart: 0, relDuration: 0.25 },
      { relStart: 0.25, relDuration: 0.25 },
      { relStart: 0.5, relDuration: 0.25 },
      { relStart: 0.75, relDuration: 0.25 },
    ]
  },
  { 
    id: '8th-2-16ths', 
    name: '8th + 2x 16th', 
    beats: 1, 
    isRest: false, 
    symbol: '♪𝅘𝅥𝅯𝅘𝅥𝅯',
    pattern: [
      { relStart: 0, relDuration: 0.5 },
      { relStart: 0.5, relDuration: 0.25 },
      { relStart: 0.75, relDuration: 0.25 },
    ]
  },
  { 
    id: '2-16ths-8th', 
    name: '2x 16th + 8th', 
    beats: 1, 
    isRest: false, 
    symbol: '𝅘𝅥𝅯𝅘𝅥𝅯♪',
    pattern: [
      { relStart: 0, relDuration: 0.25 },
      { relStart: 0.25, relDuration: 0.25 },
      { relStart: 0.5, relDuration: 0.5 },
    ]
  },
  { 
    id: 'syncopation', 
    name: '16th + 8th + 16th', 
    beats: 1, 
    isRest: false, 
    symbol: '𝅘𝅥𝅯♪𝅘𝅥𝅯',
    pattern: [
      { relStart: 0, relDuration: 0.25 },
      { relStart: 0.25, relDuration: 0.5 },
      { relStart: 0.75, relDuration: 0.25 },
    ]
  },
  { 
    id: 'dotted-8th-16th', 
    name: 'Dotted 8th + 16th', 
    beats: 1, 
    isRest: false, 
    symbol: '♪.𝅘𝅥𝅯',
    pattern: [
      { relStart: 0, relDuration: 0.75 },
      { relStart: 0.75, relDuration: 0.25 },
    ]
  },
  { id: 'dotted-eighth', name: 'Dotted Eighth', beats: 0.75, isRest: false, symbol: '♪.' },
  { id: 'rest-eighth', name: 'Eighth Rest', beats: 0.5, isRest: true, symbol: '𝄾' },
  { id: 'rest-sixteenth', name: '16th Rest', beats: 0.25, isRest: true, symbol: '𝄿' },
  { id: 'whole', name: 'Whole Note', beats: 4, isRest: false, symbol: '𝅝' },
  { id: 'rest-half', name: 'Half Rest', beats: 2, isRest: true, symbol: '𝄼' },
  { id: 'rest-whole', name: 'Whole Rest', beats: 4, isRest: true, symbol: '𝄻' },
];

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh');
  const [theme, setTheme] = useState<Theme>('light');
  const t = TRANSLATIONS[lang];

  const [playState, setPlayState] = useState<PlayState>(PlayState.STOPPED);
  const [bpm, setBpm] = useState<number>(100);
  const [accentFirstBeat, setAccentFirstBeat] = useState<boolean>(true);
  const [timeSignature, setTimeSignature] = useState<TimeSignature>({ numerator: 4, denominator: 4 });

  const [tracks, setTracks] = useState<Track[]>([
    {
      id: '1',
      name: 'Track 1',
      loopCount: 1,
      notes: [
        { id: 'initial-1', start: 0, duration: 0.25, pitch: 1200, velocity: 1.0 },
        { id: 'initial-2', start: 0.25, duration: 0.25, pitch: 1200, velocity: 1.0 },
        { id: 'initial-3', start: 0.5, duration: 0.25, pitch: 1200, velocity: 1.0 },
        { id: 'initial-4', start: 0.75, duration: 0.25, pitch: 1200, velocity: 1.0 },
      ]
    }
  ]);
  const [activeTrackId, setActiveTrackId] = useState<string>('1');
  const [playingTrackIndex, setPlayingTrackIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  
  const [selectedTool, setSelectedTool] = useState<ToolOption>(TOOLS[0]);

  const currentPlayingNotes = useMemo(() => {
    return tracks[playingTrackIndex]?.notes || [];
  }, [tracks, playingTrackIndex]);

  useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    audioEngine.setTracks(tracks);
    audioEngine.setBpm(bpm);
    audioEngine.setTimeSignature(timeSignature.numerator);
    audioEngine.setAccentFirstBeat(accentFirstBeat);
  }, [tracks, bpm, timeSignature, accentFirstBeat]);

  useEffect(() => {
    audioEngine.setOnTick((p, trackIndex) => {
      setPlayingTrackIndex(trackIndex);
      setProgress(p);
    });
  }, [tracks.length]); 

  const togglePlay = () => {
    if (playState === PlayState.STOPPED) {
      audioEngine.start();
      setPlayState(PlayState.PLAYING);
    } else {
      audioEngine.stop();
      setPlayState(PlayState.STOPPED);
      setProgress(0);
      setPlayingTrackIndex(0);
    }
  };

  const handleAddTrack = () => {
    const newId = Math.random().toString(36).substring(7);
    const newTrack: Track = {
      id: newId,
      name: `Track ${tracks.length + 1}`,
      loopCount: 1,
      notes: []
    };
    setTracks([...tracks, newTrack]);
    setActiveTrackId(newId);
  };

  const handleRemoveTrack = (id: string) => {
    if (tracks.length <= 1) return;
    const newTracks = tracks.filter(t => t.id !== id);
    setTracks(newTracks);
    if (activeTrackId === id) setActiveTrackId(newTracks[0].id);
  };

  const handleUpdateTrackNotes = (trackId: string, update: Note[] | ((prev: Note[]) => Note[])) => {
    setTracks(prevTracks => prevTracks.map(track => {
      if (track.id !== trackId) return track;
      const newNotes = typeof update === 'function' ? (update as (prev: Note[]) => Note[])(track.notes) : update;
      return { ...track, notes: newNotes };
    }));
  };

  const handleUpdateTrackLoops = (trackId: string, loops: number) => {
    setTracks(prevTracks => prevTracks.map(track => {
      if (track.id !== trackId) return track;
      return { ...track, loopCount: Math.max(1, loops) };
    }));
  };

  const handleToggleSkipTrack = (trackId: string) => {
    setTracks(prevTracks => prevTracks.map(track => {
      if (track.id !== trackId) return track;
      return { ...track, skipTrack: !track.skipTrack };
    }));
  };

  const handleApplyPreset = () => {
    if (!selectedPresetId) return;
    const preset = RHYTHM_PRESETS.find(p => p.id === selectedPresetId);
    if (preset) {
      const newNotes = preset.notes.map(n => ({
        ...n,
        id: Math.random().toString(36).substring(7),
      }));
      handleUpdateTrackNotes(activeTrackId, newNotes);
    }
    setShowPresetModal(false);
  };

  const handleTimeSignatureChange = (numerator: number) => {
      audioEngine.stop();
      setPlayState(PlayState.STOPPED);
      setProgress(0);
      setTimeSignature({ numerator, denominator: 4 });
      setTracks(tracks.map(t => ({...t, notes: []})));
  };

  const handleAddNoteFromTool = (tool: ToolOption) => {
      setSelectedTool(tool);
      const activeTrack = tracks.find(t => t.id === activeTrackId);
      if (!activeTrack) return;
      const currentNotes = activeTrack.notes;
      const singleDuration = tool.beats / timeSignature.numerator;
      const sortedNotes = [...currentNotes].sort((a, b) => a.start - b.start);
      let insertTime = -1;
      const EPSILON = 0.0001;

      if (sortedNotes.length === 0) {
          if (singleDuration <= 1.0 + EPSILON) insertTime = 0.0;
      } else {
          if (sortedNotes[0].start >= singleDuration - EPSILON) insertTime = 0.0;
      }

      if (insertTime === -1 && sortedNotes.length > 0) {
          for (let i = 0; i < sortedNotes.length; i++) {
              const currentEnd = sortedNotes[i].start + sortedNotes[i].duration;
              const nextStart = (i === sortedNotes.length - 1) ? 1.0 : sortedNotes[i+1].start;
              if (nextStart - currentEnd >= singleDuration - EPSILON) {
                  insertTime = currentEnd;
                  break;
              }
          }
      }

      if (insertTime === -1) return; 

      insertTime = Math.round(insertTime * 10000) / 10000;
      const noteStart = insertTime;
      if (noteStart + singleDuration > 1.0001) return;

      if (tool.pattern) {
        const newNotes: Note[] = tool.pattern.map(p => ({
            id: Math.random().toString(36).substring(7),
            start: noteStart + (p.relStart * tool.beats) / timeSignature.numerator,
            duration: (p.relDuration * tool.beats) / timeSignature.numerator,
            pitch: p.isRest ? 0 : 1200,
            velocity: p.isRest ? 0 : 1.0,
            isRest: !!p.isRest,
            selected: false,
        }));
        handleUpdateTrackNotes(activeTrackId, [...currentNotes, ...newNotes]);
      } else {
        const pitch = tool.isRest ? 0 : 1200;
        const velocity = tool.isRest ? 0 : 1.0;

        const newNote: Note = {
            id: Math.random().toString(36).substring(7),
            start: noteStart,
            duration: singleDuration,
            pitch: pitch,
            velocity: velocity,
            isRest: tool.isRest,
            selected: false,
        };

        handleUpdateTrackNotes(activeTrackId, [...currentNotes, newNote]);
      }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#111111] text-[#191919] dark:text-[#E6E6E6] font-sans selection:bg-wechat-green/20 transition-colors duration-300">
      {/* WeChat Style Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md border-b border-[#E6E6E6] dark:border-[#2C2C2C] h-[36px] flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
            <h1 className="text-[13px] font-semibold text-[#191919] dark:text-white leading-tight">{t.title}</h1>
        </div>

        {/* The "Capsule" button (Simulated) */}
        <div className="flex items-center gap-1 bg-white/50 dark:bg-black/50 border border-[#E6E6E6] dark:border-[#2C2C2C] rounded-full h-[24px] px-1.5 shadow-sm">
            <button className="p-0.5 hover:opacity-70 transition-opacity">
                <MoreHorizontal size={14} className="text-[#191919] dark:text-white" />
            </button>
            <div className="w-[1px] h-[10px] bg-[#E6E6E6] dark:bg-[#2C2C2C] mx-0.5" />
            <button className="p-0.5 hover:opacity-70 transition-opacity flex items-center justify-center">
                <div className="w-[14px] h-[14px] border-2 border-[#191919] dark:border-white rounded-full flex items-center justify-center p-[1px]">
                   <div className="w-full h-full border border-[#191919] dark:border-white rounded-full flex items-center justify-center">
                      <div className="w-[2px] h-[2px] bg-[#191919] dark:bg-white rounded-full" />
                   </div>
                </div>
            </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-3 pb-4 pt-1">
        {/* Sticky Note Palette Section */}
        <section className="sticky top-[36px] z-40 bg-[#F7F7F7]/95 dark:bg-[#111111]/95 backdrop-blur-sm pt-1 pb-2 mb-1">
            <div className="bg-white dark:bg-[#1A1A1A] rounded-lg p-2 shadow-sm border border-[#E6E6E6] dark:border-[#2C2C2C]">
                <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t.palette}</span>
                    <div className="flex items-center gap-1 bg-[#F7F7F7] dark:bg-[#2C2C2C] rounded-md px-1.5 py-0.5 border border-[#E6E6E6] dark:border-[#333]">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{t.accent}</span>
                        <button 
                            onClick={() => setAccentFirstBeat(!accentFirstBeat)}
                            className={`w-6 h-3.5 rounded-full relative transition-colors ${accentFirstBeat ? 'bg-[#07C160]' : 'bg-gray-300 dark:bg-gray-600'}`}
                        >
                            <div className={`absolute top-0.5 w-2.5 h-2.5 bg-white rounded-full transition-all ${accentFirstBeat ? 'left-3' : 'left-0.5'}`} />
                        </button>
                    </div>
                    <div className="flex items-center gap-1 bg-[#F7F7F7] dark:bg-[#2C2C2C] rounded-md px-1.5 py-0.5 border border-[#E6E6E6] dark:border-[#333]">
                        <span className="text-[9px] font-bold text-gray-400">{t.timeSig}</span>
                        <select 
                            value={timeSignature.numerator}
                            onChange={(e) => handleTimeSignatureChange(parseInt(e.target.value))}
                            className="bg-transparent text-[#191919] dark:text-[#E6E6E6] text-[9px] font-bold font-mono outline-none cursor-pointer"
                        >
                            <option value={3}>3/4</option>
                            <option value={4}>4/4</option>
                            <option value={5}>5/4</option>
                            <option value={6}>6/4</option>
                            <option value={7}>7/4</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-1">
                    {TOOLS.map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => handleAddNoteFromTool(tool)}
                            title={t.tools[tool.id as keyof typeof t.tools]}
                            className={`flex flex-col items-center justify-center h-8 rounded-md border transition-all relative ${selectedTool.id === tool.id ? 'bg-[#07C160] text-white border-[#07C160] shadow shadow-[#07C160]/10 scale-[1.01]' : 'bg-[#F7F7F7] dark:bg-[#2C2C2C] text-[#191919] dark:text-[#E6E6E6] border-transparent hover:border-gray-200 dark:hover:border-gray-700'}`}
                        >
                            <span className="text-sm leading-none font-serif mb-0.5">{tool.symbol}</span>
                            <span className={`text-[5px] font-mono font-bold ${selectedTool.id === tool.id ? 'text-white/80' : 'text-gray-400'}`}>{tool.beats}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>

        {/* Tracks List */}
        <section className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t.timeline}</h2>
            <button 
                onClick={handleAddTrack} 
                className="flex items-center gap-1 px-2 py-0.5 bg-[#07C160]/10 text-[#07C160] rounded-full text-[9px] font-bold hover:bg-[#07C160]/20 transition-colors"
            >
                <Plus size={10} />
                {t.addTrack}
            </button>
          </div>
          
          <div className="space-y-2">
            {tracks.map((track, index) => (
                <Timeline 
                    key={track.id}
                    trackId={track.id}
                    trackName={track.name}
                    notes={track.notes} 
                    setNotes={(newNotes) => handleUpdateTrackNotes(track.id, newNotes)} 
                    progress={progress} 
                    isPlaying={playState === PlayState.PLAYING} 
                    isPlayingTrack={index === playingTrackIndex}
                    selectedTool={selectedTool}
                    timeSignature={timeSignature}
                    isActive={activeTrackId === track.id}
                    onTrackSelect={() => setActiveTrackId(track.id)}
                    onDeleteTrack={() => handleRemoveTrack(track.id)}
                    canDelete={tracks.length > 1}
                    loopCount={track.loopCount || 1}
                    onLoopCountChange={(count) => handleUpdateTrackLoops(track.id, count)}
                    onClearTrack={() => handleUpdateTrackNotes(track.id, [])}
                    onToggleSkip={() => handleToggleSkipTrack(track.id)}
                    isSkipped={!!track.skipTrack}
                    loopLabel={t.loop}
                    clearLabel={t.controls.clearNotes}
                    skipLabel={t.skip}
                    clickHint={t.trackClickHint}
                />
            ))}
          </div>
          <div className="pt-2">
            <Controls
              playState={playState}
              bpm={bpm}
              onTogglePlay={togglePlay}
              onBpmChange={setBpm}
              onGenerate={() => setShowPresetModal(true)}
              labels={t.controls}
            />
          </div>
        </section>
        
        <footer className="mt-8 mb-4 flex flex-col items-center justify-center gap-1 opacity-50">
          <p className="text-[10px] text-gray-400 font-medium">
            {lang === 'zh' ? '给作者提建议 / 加学习群 +v：nananalalalahahaha' : 'Suggestions / Join Study Group +v: nananalalalahahaha'}
          </p>
        </footer>
      </main>

      {showPresetModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1A] w-full max-w-md p-4 rounded-2xl border border-[#E6E6E6] dark:border-[#2C2C2C] shadow-2xl space-y-3 animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold text-[#191919] dark:text-white flex items-center gap-2"><LayoutGrid className="text-[#07C160]" size={18} /> {t.genModalTitle}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{t.genModalDesc}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[35vh] overflow-y-auto p-0.5">
               {RHYTHM_PRESETS.map(preset => (
                   <button 
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${selectedPresetId === preset.id ? 'border-[#07C160] bg-[#07C160]/5 dark:bg-[#07C160]/10' : 'border-[#F7F7F7] dark:border-[#2C2C2C] hover:border-[#07C160]/30 bg-[#F7F7F7] dark:bg-[#111111]'}`}
                   >
                       <div>
                           <div className="font-bold text-[#191919] dark:text-[#E6E6E6] text-[13px]">{lang === 'zh' ? preset.nameZh : preset.nameEn}</div>
                           <div className="text-[10px] text-gray-400">{preset.notes.length} {lang === 'zh' ? '个音符' : 'notes'}</div>
                       </div>
                       {selectedPresetId === preset.id && <Check className="text-[#07C160]" size={16} />}
                   </button>
               ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button onClick={() => setShowPresetModal(false)} className="px-4 py-1.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">
                {t.cancel}
              </button>
              <button 
                onClick={handleApplyPreset}
                disabled={!selectedPresetId}
                className="px-6 py-2 bg-[#07C160] hover:opacity-90 active:scale-95 text-white rounded-full text-xs font-bold disabled:opacity-50 shadow-md shadow-[#07C160]/10 transition-all"
              >
                {t.apply}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
