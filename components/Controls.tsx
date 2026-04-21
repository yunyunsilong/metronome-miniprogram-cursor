
import React, { useState, useEffect } from 'react';
import { Play, Square, LayoutGrid } from 'lucide-react';
import { PlayState } from '../types';

interface ControlsProps {
  playState: PlayState;
  bpm: number;
  onTogglePlay: () => void;
  onBpmChange: (bpm: number) => void;
  onGenerate: () => void;
  labels: {
      tempo: string;
      ai: string;
  };
}

export const Controls: React.FC<ControlsProps> = ({
  playState,
  bpm,
  onTogglePlay,
  onBpmChange,
  onGenerate,
  labels
}) => {
  const [localBpm, setLocalBpm] = useState(bpm.toString());

  useEffect(() => {
    setLocalBpm(bpm.toString());
  }, [bpm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalBpm(e.target.value);
  };

  const commitBpm = () => {
    let val = parseInt(localBpm);
    if (isNaN(val)) val = bpm;
    if (val < 20) val = 20;
    if (val > 300) val = 300;
    onBpmChange(val);
    setLocalBpm(val.toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        commitBpm();
        (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-[#2C2C2C] p-1 rounded-lg border border-[#E6E6E6] dark:border-[#333] shadow-lg shadow-black/5 transition-all duration-300 w-full lg:max-w-xl mx-auto">
      <div className="flex items-center gap-1.5">
        {/* Play Button */}
        <button
          onClick={onTogglePlay}
          className={`w-9 h-9 rounded-md transition-all duration-200 flex items-center justify-center shrink-0 ${playState === PlayState.PLAYING ? 'bg-[#FA5151] text-white' : 'bg-[#07C160] text-white shadow shadow-[#07C160]/10 active:scale-95'}`}
        >
          {playState === PlayState.PLAYING ? <Square size={14} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
        </button>

        <div className="w-[1px] h-5 bg-gray-100 dark:bg-gray-800 hidden sm:block" />

        {/* BPM Control */}
        <div className="flex items-center gap-0.5 bg-[#F7F7F7] dark:bg-[#1A1A1A] p-0.5 rounded-md border border-[#E6E6E6] dark:border-[#333]">
          <button onClick={() => onBpmChange(Math.max(20, bpm - 5))} className="w-6 h-6 flex items-center justify-center rounded-sm text-gray-400 hover:text-[#07C160] active:bg-gray-200 dark:active:bg-gray-800 transition-colors font-bold text-[10px]">-</button>
          
          <div className="flex flex-col items-center justify-center min-w-[2.2rem]">
            <input 
              type="number" 
              value={localBpm} 
              onChange={handleInputChange} 
              onBlur={commitBpm} 
              onKeyDown={handleKeyDown} 
              className="w-full bg-transparent text-[13px] font-bold text-[#191919] dark:text-[#E6E6E6] text-center outline-none p-0 leading-none" 
            />
            <span className="text-[7px] text-gray-400 font-bold uppercase tracking-tight">BPM</span>
          </div>

          <button onClick={() => onBpmChange(Math.min(300, bpm + 5))} className="w-6 h-6 flex items-center justify-center rounded-sm text-gray-400 hover:text-[#07C160] active:bg-gray-200 dark:active:bg-gray-800 transition-colors font-bold text-[10px]">+</button>
        </div>
      </div>

      {/* Preset Button */}
      <button
        onClick={onGenerate}
        className="flex items-center gap-1 px-2 py-1.5 bg-[#F7F7F7] dark:bg-[#1A1A1A] text-[#191919] dark:text-[#E6E6E6] rounded-md border border-[#E6E6E6] dark:border-[#333] transition-all hover:bg-gray-100 dark:hover:bg-[#2C2C2C] active:scale-95 group font-bold text-[11px]"
      >
        <LayoutGrid size={14} className="text-[#07C160]" />
        <span>{labels.ai}</span>
      </button>
    </div>
  );
};
