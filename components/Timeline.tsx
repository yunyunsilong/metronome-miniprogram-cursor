
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Note, ToolOption, TimeSignature } from '../types';
import { X, Trash2, Eraser, FastForward, Plus } from 'lucide-react';

interface TimelineProps {
  trackId: string;
  trackName: string;
  notes: Note[];
  setNotes: (notes: Note[] | ((prev: Note[]) => Note[])) => void;
  progress: number; // 0.0 to 1.0
  isPlaying: boolean;
  isPlayingTrack?: boolean; // New prop to indicate if this specific track is currently playing in sequence
  selectedTool: ToolOption;
  timeSignature: TimeSignature;
  measureLabel?: string;
  isActive: boolean;
  onTrackSelect: () => void;
  onDeleteTrack: () => void;
  canDelete: boolean;
  loopCount: number;
  onLoopCountChange: (count: number) => void;
  onClearTrack: () => void;
  onToggleSkip: () => void;
  isSkipped: boolean;
  loopLabel: string;
  clearLabel: string;
  skipLabel: string;
  clickHint?: string;
}

// Helper to determine symbol based on BEAT length (not percentage)
const getNoteSymbol = (durationPercentage: number, isRest: boolean, numerator: number) => {
  const beats = durationPercentage * numerator;
  const isApprox = (val: number, target: number) => Math.abs(val - target) < 0.1;

  if (isRest) {
    if (isApprox(beats, 1)) return '𝄽';      // Quarter Rest
    if (isApprox(beats, 0.5)) return '𝄾';     // Eighth Rest
    if (isApprox(beats, 0.25)) return '𝄿';    // 16th Rest
    return '𝄽'; 
  }

  if (isApprox(beats, 1.5)) return '♩.';      // Dotted Quarter
  if (isApprox(beats, 1)) return '♩';         // Quarter Note
  if (isApprox(beats, 0.75)) return '♪.';     // Dotted Eighth
  if (isApprox(beats, 0.5)) return '♪';       // Eighth Note
  if (isApprox(beats, 0.25)) return '𝅘𝅥𝅯';      // 16th Note (Single)
  
  return '♩'; 
};

export const Timeline: React.FC<TimelineProps> = ({ 
    trackId,
    trackName,
    notes, 
    setNotes, 
    progress, 
    isPlaying, 
    isPlayingTrack = true, // Default to true if not provided (backward compatibility)
    selectedTool, 
    timeSignature,
    measureLabel = "Measure",
    isActive,
    onTrackSelect,
    onDeleteTrack,
    canDelete,
    loopCount,
    onLoopCountChange,
    onClearTrack,
    onToggleSkip,
    isSkipped,
    loopLabel,
    clearLabel,
    skipLabel,
    clickHint
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ref to access latest notes inside stable callbacks without re-triggering effects
  const notesRef = useRef(notes);
  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  const [dragState, setDragState] = useState<{
    noteId: string | null;
    startX: number;
    initialStart: number;
  } | null>(null);

  // Visual Snap Indicator State
  const [snapIndicator, setSnapIndicator] = useState<number | null>(null);

  // Click Feedback Ripple / Hint
  const [activeHint, setActiveHint] = useState<{ x: number, y: number } | null>(null);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate Subdivisions based on Time Signature Numerator
  // We want 4 subdivisions (16th notes) per beat.
  // Total subdivisions = numerator * 4.
  const totalSubdivisions = timeSignature.numerator * 4;
  const subdivisions = Array.from({ length: totalSubdivisions }).map((_, i) => i / totalSubdivisions);

  // Magnetic Snap Logic
  // snaps to Grid (1/16) and Adjacent Note Edges
  const getSnapPosition = (rawPos: number, ignoreNoteId: string | null, currentNotes: Note[]) => {
      const SNAP_THRESHOLD = 0.025; 
      const GRID_SIZE = 1 / totalSubdivisions; 
      
      let bestSnap = rawPos;
      let minDst = SNAP_THRESHOLD;

      // 1. Grid Snapping
      const gridPoint = Math.round(rawPos / GRID_SIZE) * GRID_SIZE;
      if (Math.abs(gridPoint - rawPos) < minDst) {
          minDst = Math.abs(gridPoint - rawPos);
          bestSnap = gridPoint;
      }

      // 2. Adjacent Note Snapping (Start & End)
      currentNotes.forEach(n => {
          if (n.id === ignoreNoteId) return;
          
          // Snap to Note Start
          const dstStart = Math.abs(n.start - rawPos);
          if (dstStart < minDst) {
              minDst = dstStart;
              bestSnap = n.start;
          }
          
          // Snap to Note End
          const noteEnd = n.start + n.duration;
          const dstEnd = Math.abs(noteEnd - rawPos);
          if (dstEnd < minDst) {
              minDst = dstEnd;
              bestSnap = noteEnd;
          }
      });

      return bestSnap;
  };

  const handlePointerDown = (e: React.PointerEvent, noteId: string | null) => {
    // Only allow interaction if we select the track first
    onTrackSelect();
    
    e.preventDefault();
    e.stopPropagation();

    if (!noteId) {
        // Deselect all notes when clicking empty space, but don't create a new one
        const updated = notes.map(n => ({ ...n, selected: false }));
        setNotes(updated);
        
        // Trigger Click Hint Feedback
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            setActiveHint({ x, y });
            
            if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
            hintTimeoutRef.current = setTimeout(() => setActiveHint(null), 1000);
        }
        return;
    }

    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    // Deselect others, select this one
    const updated = notes.map(n => ({ ...n, selected: n.id === noteId }));
    setNotes(updated);

    setDragState({
      noteId,
      startX: e.clientX,
      initialStart: note.start,
    });
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragState || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const currentNotes = notesRef.current;
    
    // Find note being dragged to get its duration for clamping
    const note = currentNotes.find(n => n.id === dragState.noteId);
    if (!note) return;

    setNotes(prevNotes => prevNotes.map(n => {
      if (n.id !== dragState.noteId) return n;

      const deltaX = (e.clientX - dragState.startX) / rect.width;
      const rawNewStart = dragState.initialStart + deltaX;

      // Magnetic Snap for Move
      const snappedStart = getSnapPosition(rawNewStart, n.id, currentNotes);
      const clampedStart = Math.max(0, Math.min(1 - n.duration, snappedStart));
      
      // Visual Snap Feedback Logic
      if (Math.abs(snappedStart - rawNewStart) > 0.001) {
          setSnapIndicator(clampedStart);
      } else {
          setSnapIndicator(null);
      }

      // Maintain uniform pitch/velocity even when moving: accents removed.
      let nextPitch = n.pitch;
      let nextVelocity = n.velocity;
      
      if (!n.isRest) {
          nextPitch = 1200;
          nextVelocity = 1.0;
      }

      return { ...n, start: clampedStart, pitch: nextPitch, velocity: nextVelocity };
    }));
  }, [dragState, setNotes, timeSignature.numerator]); 

  const handlePointerUp = useCallback(() => {
    setDragState(null);
    setSnapIndicator(null); 
  }, []);

  useEffect(() => {
    if (dragState) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    } else {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragState, handlePointerMove, handlePointerUp]);

  // Handle Note Deletion - Only allowed for the last note in array
  const handleDelete = (id: string, e: React.SyntheticEvent) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (notes.length > 0 && notes[notes.length - 1].id === id) {
          setNotes(notes.filter(n => n.id !== id));
      }
  };

  // Generate Beat Labels (1, 2, 3...)
  const beatLabels = Array.from({ length: timeSignature.numerator }).map((_, i) => i + 1);

  return (
    <div 
        className={`
            relative w-full rounded-lg transition-all duration-200 group overflow-hidden
            ${isActive 
                ? 'ring-1 ring-[#07C160] bg-white dark:bg-[#1A1A1A] shadow shadow-[#07C160]/10 scale-[1.005] z-10' 
                : 'bg-white dark:bg-[#1A1A1A] border border-[#E6E6E6] dark:border-[#2C2C2C] opacity-95 hover:opacity-100 shadow-sm'
            }
        `}
        onPointerDown={onTrackSelect}
    >
        {/* Track Header */}
        <div className="flex items-center justify-between px-2 py-1 border-b border-[#F7F7F7] dark:border-[#2C2C2C]">
            <div className="flex items-center gap-1">
                <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-[#07C160]' : 'text-gray-400'}`}>
                    {trackName}
                </span>
                {isPlaying && isPlayingTrack && (
                   <span className="flex h-1 w-1 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#07C160] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1 w-1 bg-[#07C160]"></span>
                   </span>
                )}
            </div>
            
            <div className="flex items-center gap-1">
                <button 
                    onClick={(e) => { e.stopPropagation(); onToggleSkip(); }}
                    className={`flex items-center gap-0.5 px-1 py-0.5 rounded-sm border transition-colors ${
                        isSkipped 
                        ? 'bg-[#FA5151]/10 border-[#FA5151]/20 text-[#FA5151]' 
                        : 'bg-[#F7F7F7] dark:bg-[#2C2C2C] border-transparent text-gray-400 hover:text-[#FA5151]'
                    }`}
                    title={skipLabel}
                >
                    <FastForward size={9} className={isSkipped ? 'fill-current' : ''} />
                    <span className="text-[8px] font-bold uppercase">{skipLabel}</span>
                </button>

             <div 
                    className="flex items-center gap-0.5 px-1 py-0.5 rounded-sm bg-[#F7F7F7] dark:bg-[#2C2C2C] border border-transparent hover:border-[#07C160]/30 transition-colors"
                >
                    <span className="text-[8px] font-bold text-gray-400 uppercase">{loopLabel}</span>
                    <input 
                        type="number" 
                        min="1" 
                        max="99"
                        value={loopCount}
                        onChange={(e) => onLoopCountChange(parseInt(e.target.value) || 1)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 bg-transparent text-[8px] font-bold text-[#07C160] outline-none text-center"
                    />
                </div>
                
                <button 
                    onClick={(e) => { e.stopPropagation(); onClearTrack(); }}
                    className="flex items-center gap-0.5 px-1 py-0.5 text-gray-400 hover:text-[#FA5151] hover:bg-[#FA5151]/10 rounded-sm transition-colors"
                    title={clearLabel}
                >
                    <Eraser size={10} />
                    <span className="text-[8px] font-bold uppercase">{clearLabel}</span>
                </button>

                {canDelete && (
                <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteTrack(); }}
                    className="p-0.5 text-gray-400 hover:text-[#FA5151] hover:bg-[#FA5151]/10 rounded-sm transition-colors"
                >
                    <Trash2 size={10} />
                </button>
            )}
            </div>
        </div>

      {/* Progress Bar Container */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-crosshair h-[44px] md:h-12 bg-[#F7F7F7]/50 dark:bg-[#111111]/50"
        onPointerDown={(e) => handlePointerDown(e, null)}
      >
        {/* Background Grid */}
        {subdivisions.map((pos) => {
            // Is this a beat line? (every 4 subdivisions)
            const isBeatLine = Math.abs((pos * totalSubdivisions) % 4) < 0.1;
            return (
                <div
                    key={pos}
                    className={`absolute top-0 bottom-0 pointer-events-none transition-colors ${
                    isBeatLine 
                        ? 'border-r border-gray-200 dark:border-gray-800 w-[1px]' 
                        : 'border-r border-gray-100 dark:border-gray-900 w-[1px] border-dashed opacity-50'
                    }`}
                    style={{ left: `${pos * 100}%` }}
                />
            );
        })}

        {/* Snap Indicator Line */}
        {snapIndicator !== null && (
            <div 
                className="absolute top-0 bottom-0 w-[2px] bg-[#07C160] z-50 pointer-events-none shadow-[0_0_8px_rgba(7,193,96,0.4)] animate-in fade-in duration-75"
                style={{ left: `${snapIndicator * 100}%` }}
            />
        )}

        {/* Beats Labels */}
        <div className="absolute bottom-1.5 left-0 right-0 h-3 pointer-events-none text-gray-300 dark:text-gray-600 font-bold text-[10px] z-10 transition-colors">
            {beatLabels.map((beat, i) => (
                <span 
                    key={beat} 
                    className={`absolute bottom-0 ${i === 0 ? 'left-1' : '-translate-x-1/2'}`}
                    style={i === 0 ? {} : { left: `${(i / timeSignature.numerator) * 100}%` }}
                >
                    {beat}
                </span>
            ))}
        </div>

        {/* Click Hint Feedback */}
        <AnimatePresence>
            {activeHint && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: -10 }}
                    exit={{ opacity: 0, scale: 1.1, y: -30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute z-[100] pointer-events-none flex flex-col items-center"
                    style={{ left: activeHint.x, top: activeHint.y }}
                >
                    <div className="bg-[#07C160] rounded-full p-0.5 shadow-lg relative">
                        <Plus size={10} className="text-white" />
                        <motion.div 
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="bg-[#07C160] rounded-full absolute inset-0 -z-10"
                        />
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-2 whitespace-nowrap bg-black/80 backdrop-blur-md text-white text-[9px] px-2 py-1 rounded-full font-bold shadow-xl"
                    >
                        {clickHint}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Notes */}
        {notes.map((note, index) => {
           const isLastNote = index === notes.length - 1;
           // Only show progress fill if the timeline is currently playing AND play state is active
           const isPlayingNote = isPlaying && isPlayingTrack && progress >= note.start && progress <= (note.start + note.duration);
           
           const isRest = note.isRest || note.velocity < 0.01;
           const symbol = getNoteSymbol(note.duration, isRest, timeSignature.numerator);

           // Calculate fill width for progress effect
           let fillWidth = '0%';
           if (isPlayingNote) {
               fillWidth = `${((progress - note.start) / note.duration) * 100}%`;
           } else if (isPlaying && isPlayingTrack && progress > (note.start + note.duration)) {
             fillWidth = '0%'; // Reset when passed
           }

           return (
            <div
                key={note.id}
                className={`
                    absolute top-1/2 -translate-y-1/2 h-6 rounded-md
                    flex items-center justify-between overflow-hidden
                    transition-all duration-100 cursor-move
                    ${isPlayingNote
                        ? 'bg-[#07C160]/10 text-[#07C160] border-[#07C160] shadow-sm scale-[1.01] z-50'
                        : isRest 
                            ? 'bg-[#EDEDED] dark:bg-[#2C2C2C] text-gray-400 dark:text-gray-500 border-transparent' 
                            : 'bg-white dark:bg-[#333] text-[#07C160] border-[#F0F0F0] dark:border-[#444] shadow-sm'
                    }
                    ${note.selected ? 'ring-1 ring-[#07C160] z-[60]' : isPlayingNote ? '' : 'z-20 border'}
                `}
                style={{
                    left: `${note.start * 100}%`,
                    width: `${note.duration * 100}%`,
                }}
                onPointerDown={(e) => handlePointerDown(e, note.id)}
            >
                {/* PROGRESS FILL BAR */}
                <div 
                    className={`absolute left-0 top-0 bottom-0 pointer-events-none transition-none will-change-[width] border-r-[1.5px] ${
                        isPlayingNote
                          ? 'bg-[#07C160]/20 border-[#07C160]'
                          : isRest 
                            ? 'bg-gray-400/10 border-gray-400' 
                            : 'bg-[#07C160]/10 border-[#07C160]'
                    }`}
                    style={{ width: fillWidth }}
                />

                {/* Note Content (Symbol) */}
                <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                     <span className={`text-[15px] font-serif select-none ${
                        isPlayingNote
                          ? 'text-[#07C160]'
                          : isRest 
                            ? 'text-gray-400' 
                            : 'text-[#07C160]'
                     }`}>
                        {symbol}
                     </span>
                </div>

                {/* Delete Button - Only allowed for the last note */}
                {isLastNote && (
                    <button
                        onPointerDown={(e) => handleDelete(note.id, e)}
                        className="absolute top-0.5 right-0.5 w-3.5 h-3.5 flex items-center justify-center text-gray-400 hover:text-[#FA5151] hover:bg-white active:scale-90 rounded-full z-50 transition-all bg-white/80 dark:bg-black/50 backdrop-blur-sm shadow-sm"
                        title="Remove Note"
                    >
                        <X size={8} strokeWidth={3} />
                    </button>
                )}
            </div>
          );
        })}

      </div>
    </div>
  );
};
