import { MonographEntry, AudioTrack } from '../types';
import { loadAllPosts } from '../utils/contentLoader';

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'freq-04',
    title: 'LOTURA FREQ 04',
    subtitle: 'Streaming preview · 128 kbps',
    bitrate: '128 kbps',
    droneFreq: 48.0,
    noiseLevel: 0.04,
    bpm: 118,
    key: 'D Minor'
  },
  {
    id: 'freq-03',
    title: 'LOTURA FREQ 03',
    subtitle: 'Sub-bass dissipation · 320 kbps',
    bitrate: '320 kbps',
    droneFreq: 43.65, // F
    noiseLevel: 0.03,
    bpm: 114,
    key: 'F Minor'
  },
  {
    id: 'void-09',
    title: 'VOID RESIDUALS [VO-09]',
    subtitle: 'Nocturnal tape study · 192 kbps',
    bitrate: '192 kbps',
    droneFreq: 36.7, // D
    noiseLevel: 0.06,
    bpm: 72,
    key: 'A Minor'
  },
  {
    id: 'monolith-echo',
    title: 'MONOLITH ECHOES',
    subtitle: 'Acoustic impulse response · 256 kbps',
    bitrate: '256 kbps',
    droneFreq: 55.0, // A
    noiseLevel: 0.02,
    bpm: 96,
    key: 'C Minor'
  }
];

// Dynamically load all markdown/mdx posts from /src/content/posts/
const loadedPosts = loadAllPosts();

export const MONOGRAPH_ENTRIES: MonographEntry[] = loadedPosts.length > 0 ? loadedPosts : [
  {
    id: 'hypnotic-minimalism',
    folioNumber: '01 / 01',
    indexCode: '16.08 — Nº41',
    dateOrMeta: '17.00 hs',
    metaType: 'time',
    title: 'HYPNOTIC MINIMALISM',
    description: 'The sound of deep exploratory electronic music and atmospheric techno as expressive mediums. An investigation into subterranean frequencies, spatial panning, and cyclical duration.',
    category: 'AUDIO',
    badges: ['ESSAY / AUDIO', '8 MIN READ'],
    imageUrl: '/src/assets/images/hypnotic_minimalism_synth_1790588947635.jpg',
    imageAlt: 'Hands adjusting potentiometers and patch cords on an analog modular audio console in black and white',
    hasAudioPlay: true,
    audioTrackId: 'freq-04',
    actionText: 'READ ESSAY —',
    author: 'Kaelen Richter',
    readingTime: '8 min read',
  }
];
