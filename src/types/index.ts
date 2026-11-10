export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  url: string;
  coverImg: string;
  duration?: string;
  category?: 'mubashir' | 'swalih' | 'shaheer' | 'madheena' | 'mappila' | 'duff' | 'custom';
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
  isCustom?: boolean;
}

export interface WrittenSong {
  id: string;
  title: string;
  author: string;
  category: string;
  ishalType?: string; // e.g. 'കമ്പ്', 'തൊങ്ങൽ', 'മുറുക്കം', 'കപ്പപ്പാട്ട്'
  lyrics: string;
  createdAt: string;
  audioRecordingUrl?: string; // voice hum / recording memo
  notes?: string;
}

export type RepeatMode = 'off' | 'all' | 'one';

