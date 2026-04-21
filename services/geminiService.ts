
import { Note } from '../types';

export interface RhythmPreset {
  id: string;
  nameEn: string;
  nameZh: string;
  notes: Omit<Note, 'id'>[];
}

// Removing accents: All notes use 1200Hz and 1.0 velocity (unless they are rests)
export const RHYTHM_PRESETS: RhythmPreset[] = [
  {
    id: 'basic-44',
    nameEn: 'Basic 4/4',
    nameZh: '基础 4/4',
    notes: [
      { start: 0, duration: 0.25, pitch: 1200, velocity: 1.0 },
      { start: 0.25, duration: 0.25, pitch: 1200, velocity: 1.0 },
      { start: 0.5, duration: 0.25, pitch: 1200, velocity: 1.0 },
      { start: 0.75, duration: 0.25, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'eighth-notes',
    nameEn: 'Eighth Notes',
    nameZh: '八分音符',
    notes: [
      { start: 0, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.125, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.25, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.375, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.5, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.625, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.75, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.875, duration: 0.125, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'rock-groove',
    nameEn: 'Standard Rock',
    nameZh: '标准摇滚',
    notes: [
      { start: 0, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.125, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.25, duration: 0.25, pitch: 1200, velocity: 1.0 },
      { start: 0.5, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.625, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.75, duration: 0.25, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'funk-syncopation',
    nameEn: 'Funk Syncopation',
    nameZh: 'Funk 切分',
    notes: [
      { start: 0, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.1875, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.25, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.4375, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.5, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.6875, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.8125, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.9375, duration: 0.0625, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'bossa-nova',
    nameEn: 'Bossa Nova Clave',
    nameZh: '波萨诺瓦',
    notes: [
      { start: 0, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.1875, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.375, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.5, duration: 0.125, isRest: true, pitch: 0, velocity: 0 },
      { start: 0.625, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.8125, duration: 0.125, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'reggae-skank',
    nameEn: 'Reggae Skank',
    nameZh: '雷鬼反拍',
    notes: [
      { start: 0, duration: 0.125, isRest: true, pitch: 0, velocity: 0 },
      { start: 0.125, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.25, duration: 0.125, isRest: true, pitch: 0, velocity: 0 },
      { start: 0.375, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.5, duration: 0.125, isRest: true, pitch: 0, velocity: 0 },
      { start: 0.625, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.75, duration: 0.125, isRest: true, pitch: 0, velocity: 0 },
      { start: 0.875, duration: 0.125, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'paradiddle',
    nameEn: 'Paradiddle',
    nameZh: '单双打技术',
    notes: [
      { start: 0, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.125, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.25, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.375, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.5, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.625, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.75, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.875, duration: 0.125, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'shuffle',
    nameEn: 'Shuffle Feel',
    nameZh: '摇摆律动',
    notes: [
      { start: 0, duration: 0.166, pitch: 1200, velocity: 1.0 },
      { start: 0.166, duration: 0.083, pitch: 1200, velocity: 1.0 },
      { start: 0.25, duration: 0.166, pitch: 1200, velocity: 1.0 },
      { start: 0.416, duration: 0.083, pitch: 1200, velocity: 1.0 },
      { start: 0.5, duration: 0.166, pitch: 1200, velocity: 1.0 },
      { start: 0.666, duration: 0.083, pitch: 1200, velocity: 1.0 },
      { start: 0.75, duration: 0.166, pitch: 1200, velocity: 1.0 },
      { start: 0.916, duration: 0.083, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'gallop',
    nameEn: 'Gallop Rhythm',
    nameZh: '马蹄节奏',
    notes: [
      { start: 0, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.125, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.1875, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.25, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.375, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.4375, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.5, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.625, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.6875, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.75, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.875, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.9375, duration: 0.0625, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'waltz-34',
    nameEn: 'Waltz (3/4)',
    nameZh: '华尔兹 (3/4)',
    notes: [
      { start: 0, duration: 0.333, pitch: 1200, velocity: 1.0 },
      { start: 0.333, duration: 0.333, pitch: 1200, velocity: 1.0 },
      { start: 0.666, duration: 0.333, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'take-five',
    nameEn: 'Five-Beat (5/4)',
    nameZh: '五拍子 (5/4)',
    notes: [
      { start: 0, duration: 0.2, pitch: 1200, velocity: 1.0 },
      { start: 0.2, duration: 0.2, pitch: 1200, velocity: 1.0 },
      { start: 0.4, duration: 0.2, pitch: 1200, velocity: 1.0 },
      { start: 0.6, duration: 0.2, pitch: 1200, velocity: 1.0 },
      { start: 0.8, duration: 0.2, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'clave-son',
    nameEn: 'Son Clave (3-2)',
    nameZh: '颂克拉维 (3-2)',
    notes: [
      { start: 0, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.1875, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.375, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.625, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.75, duration: 0.125, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'trap-hihat',
    nameEn: 'Trap Hi-Hats',
    nameZh: 'Trap 踩镲滚奏',
    notes: [
      { start: 0, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.125, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.25, duration: 0.03125, pitch: 1200, velocity: 1.0 },
      { start: 0.28125, duration: 0.03125, pitch: 1200, velocity: 1.0 },
      { start: 0.3125, duration: 0.03125, pitch: 1200, velocity: 1.0 },
      { start: 0.34375, duration: 0.03125, pitch: 1200, velocity: 1.0 },
      { start: 0.375, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.5, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.625, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.6875, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.75, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.875, duration: 0.125, pitch: 1200, velocity: 1.0 },
    ]
  },
  {
    id: 'dnb-break',
    nameEn: 'Drum & Bass',
    nameZh: '鼓与贝斯',
    notes: [
      { start: 0, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.125, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.25, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.375, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.4375, duration: 0.0625, pitch: 1200, velocity: 1.0 },
      { start: 0.5, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.625, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.75, duration: 0.125, pitch: 1200, velocity: 1.0 },
      { start: 0.875, duration: 0.125, pitch: 1200, velocity: 1.0 },
    ]
  }
];

export const generateRhythm = async (description: string, currentBpm: number): Promise<Note[]> => {
  return [];
};
