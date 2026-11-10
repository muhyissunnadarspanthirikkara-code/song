export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  url: string;
  coverImg: string;
  duration?: string;
  category?: 'mubashir' | 'madheena' | 'mappila' | 'duff' | 'custom';
  lyrics?: string;
  isCustom?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  malayalamName?: string;
  img: string;
  description?: string;
  songCount?: number;
}

export type RepeatMode = 'off' | 'all' | 'one';
