export type EntryCategory = 'ALL' | 'ARCHITECTURE' | 'THEORY' | 'AUDIO' | 'INTERVIEWS' | 'MONOGRAPHS';

export interface MonographPlate {
  id: number;
  plateNumber: string;
  title: string;
  location: string;
  year: string;
  architect?: string;
  description: string;
  materials: string;
  image: string;
}

export interface InterviewExchange {
  speaker: string;
  role: string;
  timestamp: string;
  dialogue: string;
}

export interface MonographEntry {
  id: string;
  slug?: string;
  folioNumber: string; // e.g. "01 / 24"
  indexCode: string; // e.g. "16.08 — Nº41"
  dateOrMeta: string; // e.g. "17.00 hs", "2025.02.14", "CURATOR'S PICK", "BERLIN / BASEL"
  date?: string;
  metaType?: 'time' | 'date' | 'curator' | 'location';
  title: string;
  description: string;
  category: EntryCategory | string;
  tags?: string[];
  badges: string[];
  refCode?: string; // e.g. "REF [VO-09]"
  imageUrl?: string;
  coverImage?: string;
  imageAlt?: string;
  hasAudioPlay?: boolean;
  audioTrackId?: string;
  actionText: string; // e.g. "READ ESSAY —", "VIEW MONOGRAPH —", "EXPLORE —"
  hideImageOnFeed?: boolean;
  author: string;
  readingTime?: string;
  contentHtml?: string;
  rawContent?: string;
  frontmatter?: Record<string, any>;
  essayBody?: {
    lead: string;
    sections: {
      heading?: string;
      content: string;
    }[];
    pullQuote?: string;
    pullQuoteAttribution?: string;
    footnotes?: string[];
  };
  plates?: MonographPlate[];
  interview?: InterviewExchange[];
}

export interface AudioTrack {
  id: string;
  title: string;
  subtitle: string;
  bitrate: string;
  bpm?: number;
  key?: string;
  droneFreq: number; // base Hz for WebAudio synthesized dark drone
  noiseLevel: number;
}

export type TabView = 'HOME' | 'BLOG' | 'ABOUT' | 'CONTACT';
