import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { INITIAL_ARTISTS, INITIAL_SONGS, INITIAL_WRITTEN_SONGS } from '../data/songs';
import { Artist, RepeatMode, Song, WrittenSong } from '../types';

interface PlayerContextType {
  // Songs & Artists
  allSongs: Song[];
  artists: Artist[];
  addCustomArtist: (artist: Omit<Artist, 'id' | 'isCustom'>) => void;
  deleteArtist: (artistId: string) => void;
  currentSong: Song | null;
  currentSongIndex: number;
  playlist: Song[];
  favorites: string[];
  isFavorite: (songId: string) => boolean;
  toggleFavorite: (songId: string) => void;
  addCustomSong: (song: Omit<Song, 'id' | 'isCustom'>) => void;
  deleteSong: (songId: string) => void;
  resetDefaultCatalog: () => void;

  // Songwriting Studio (പാട്ടെഴുത്ത്)
  writtenSongs: WrittenSong[];
  addWrittenSong: (song: Omit<WrittenSong, 'id' | 'createdAt'>) => void;
  updateWrittenSong: (song: WrittenSong) => void;
  deleteWrittenSong: (id: string) => void;
  convertWrittenToPlayable: (writtenSong: WrittenSong, audioUrl: string, coverImg?: string) => void;

  // Playback Controls
  isPlaying: boolean;
  playSong: (song: Song, customPlaylist?: Song[]) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (seconds: number) => void;
  skipForward10: () => void;
  skipBackward10: () => void;

  // Track progress & volume
  currentTime: number;
  duration: number;
  volume: number;
  setVolume: (val: number) => void;
  isMuted: boolean;
  toggleMute: () => void;

  // Modes & Options
  repeatMode: RepeatMode;
  toggleRepeat: () => void;
  isShuffle: boolean;
  toggleShuffle: () => void;
  playbackRate: number;
  setPlaybackRate: (rate: number) => void;

  // Sleep Timer
  sleepTimerSeconds: number | null;
  setSleepTimer: (minutes: number | null) => void;

  // Navigation & UI state
  activeTab: 'home' | 'songs' | 'artists' | 'favorites' | 'writer';
  setActiveTab: (tab: 'home' | 'songs' | 'artists' | 'favorites' | 'writer') => void;
  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;
  isPlayerExpanded: boolean;
  setIsPlayerExpanded: (expanded: boolean) => void;
  showLyrics: boolean;
  setShowLyrics: (show: boolean) => void;
  showQueue: boolean;
  setShowQueue: (show: boolean) => void;
  showAddSong: boolean;
  setShowAddSong: (show: boolean) => void;
  showAddArtist: boolean;
  setShowAddArtist: (show: boolean) => void;
  showSleepTimerModal: boolean;
  setShowSleepTimerModal: (show: boolean) => void;
  showWebsiteModal: boolean;
  setShowWebsiteModal: (show: boolean) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  filteredSongs: Song[];
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Deleted built-in artists IDs
  const [deletedArtistIds, setDeletedArtistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kelkaam_deleted_artists');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom artists from local storage
  const [customArtists, setCustomArtists] = useState<Artist[]>(() => {
    try {
      const saved = localStorage.getItem('kelkaam_custom_artists');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const artists = [
    ...INITIAL_ARTISTS.filter(a => !deletedArtistIds.includes(a.id)),
    ...customArtists
  ];

  const addCustomArtist = (artistData: Omit<Artist, 'id' | 'isCustom'>) => {
    const newArtist: Artist = {
      ...artistData,
      id: `artist-${Date.now()}`,
      isCustom: true,
      songCount: 0
    };
    const updated = [newArtist, ...customArtists];
    setCustomArtists(updated);
    try {
      localStorage.setItem('kelkaam_custom_artists', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteArtist = (artistId: string) => {
    // If it's a custom artist
    const isCustom = customArtists.some(a => a.id === artistId);
    if (isCustom) {
      const updated = customArtists.filter(a => a.id !== artistId);
      setCustomArtists(updated);
      try {
        localStorage.setItem('kelkaam_custom_artists', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    } else {
      // It's a built-in artist, track deletion
      const updated = [...deletedArtistIds, artistId];
      setDeletedArtistIds(updated);
      try {
        localStorage.setItem('kelkaam_deleted_artists', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }

    if (selectedArtist?.id === artistId) {
      setSelectedArtist(null);
    }
  };

  // Deleted built-in songs IDs
  const [deletedSongIds, setDeletedSongIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kelkaam_deleted_songs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom songs from local storage
  const [customSongs, setCustomSongs] = useState<Song[]>(() => {
    try {
      const saved = localStorage.getItem('kelkaam_custom_songs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const allSongs = [
    ...INITIAL_SONGS.filter(s => !deletedSongIds.includes(s.id)),
    ...customSongs
  ];

  const addCustomSong = (songData: Omit<Song, 'id' | 'isCustom'>) => {
    const newSong: Song = {
      ...songData,
      id: `custom-${Date.now()}`,
      isCustom: true
    };
    const updated = [newSong, ...customSongs];
    setCustomSongs(updated);
    try {
      localStorage.setItem('kelkaam_custom_songs', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    playSong(newSong, [newSong, ...playlist]);
  };

  const deleteSong = (songId: string) => {
    // Check if it is a custom song
    const isCustom = customSongs.some(s => s.id === songId);
    if (isCustom) {
      const updated = customSongs.filter(s => s.id !== songId);
      setCustomSongs(updated);
      try {
        localStorage.setItem('kelkaam_custom_songs', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    } else {
      // It's a built-in song, track in deletedSongIds
      const updated = [...deletedSongIds, songId];
      setDeletedSongIds(updated);
      try {
        localStorage.setItem('kelkaam_deleted_songs', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }

    // Remove from favorites
    setFavorites(prev => {
      const updatedFav = prev.filter(id => id !== songId);
      try {
        localStorage.setItem('kelkaam_favorites', JSON.stringify(updatedFav));
      } catch (e) {
        console.error(e);
      }
      return updatedFav;
    });

    // Remove from current playlist
    setPlaylist(prev => prev.filter(s => s.id !== songId));

    // If currently playing song is being deleted
    if (currentSong?.id === songId) {
      const remainingSongs = allSongs.filter(s => s.id !== songId);
      if (remainingSongs.length > 0) {
        playSong(remainingSongs[0], remainingSongs);
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
        }
        setCurrentSong(null);
        setIsPlaying(false);
      }
    }
  };

  // Reset all to default factory songs and artists
  const resetDefaultCatalog = () => {
    setDeletedSongIds([]);
    setDeletedArtistIds([]);
    try {
      localStorage.removeItem('kelkaam_deleted_songs');
      localStorage.removeItem('kelkaam_deleted_artists');
    } catch (e) {
      console.error(e);
    }
    setPlaylist(INITIAL_SONGS);
    if (INITIAL_SONGS.length > 0) {
      setCurrentSong(INITIAL_SONGS[0]);
    }
  };

  // Written songs (Songwriter Pad) from local storage
  const [writtenSongs, setWrittenSongs] = useState<WrittenSong[]>(() => {
    try {
      const saved = localStorage.getItem('kelkaam_written_songs');
      return saved ? JSON.parse(saved) : INITIAL_WRITTEN_SONGS;
    } catch {
      return INITIAL_WRITTEN_SONGS;
    }
  });

  const addWrittenSong = (data: Omit<WrittenSong, 'id' | 'createdAt'>) => {
    const newSong: WrittenSong = {
      ...data,
      id: `written-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newSong, ...writtenSongs];
    setWrittenSongs(updated);
    try {
      localStorage.setItem('kelkaam_written_songs', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const updateWrittenSong = (song: WrittenSong) => {
    const updated = writtenSongs.map(s => (s.id === song.id ? song : s));
    setWrittenSongs(updated);
    try {
      localStorage.setItem('kelkaam_written_songs', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteWrittenSong = (id: string) => {
    const updated = writtenSongs.filter(s => s.id !== id);
    setWrittenSongs(updated);
    try {
      localStorage.setItem('kelkaam_written_songs', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const convertWrittenToPlayable = (
    writtenSong: WrittenSong,
    audioUrl: string,
    coverImg?: string
  ) => {
    addCustomSong({
      title: writtenSong.title,
      artist: writtenSong.author || 'എന്റെ രചന',
      artistId: 'custom',
      url: audioUrl,
      coverImg: coverImg || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      category: 'custom',
      lyrics: writtenSong.lyrics
    });
  };

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kelkaam_favorites');
      return saved ? JSON.parse(saved) : ['mp-1', 'mp-3', 'st-1', 'hs-1'];
    } catch {
      return ['mp-1', 'mp-3', 'st-1', 'hs-1'];
    }
  });

  const toggleFavorite = (songId: string) => {
    setFavorites(prev => {
      const updated = prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId];
      try {
        localStorage.setItem('kelkaam_favorites', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const isFavorite = (songId: string) => favorites.includes(songId);

  // Playback state
  const [currentSong, setCurrentSong] = useState<Song | null>(() => INITIAL_SONGS[0]);
  const [playlist, setPlaylist] = useState<Song[]>(INITIAL_SONGS);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('all');
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [playbackRate, setPlaybackRateState] = useState<number>(1);

  // Sleep Timer
  const [sleepTimerSeconds, setSleepTimerSeconds] = useState<number | null>(null);

  // UI Navigation
  const [activeTab, setActiveTab] = useState<'home' | 'songs' | 'artists' | 'favorites' | 'writer'>('home');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState<boolean>(false);
  const [showLyrics, setShowLyrics] = useState<boolean>(false);
  const [showQueue, setShowQueue] = useState<boolean>(false);
  const [showAddSong, setShowAddSong] = useState<boolean>(false);
  const [showAddArtist, setShowAddArtist] = useState<boolean>(false);
  const [showSleepTimerModal, setShowSleepTimerModal] = useState<boolean>(false);
  const [showWebsiteModal, setShowWebsiteModal] = useState<boolean>(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const currentSongIndex = currentSong
    ? playlist.findIndex(s => s.id === currentSong.id)
    : -1;

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onPlay = () => {
      setIsPlaying(true);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
    };

    const onPause = () => {
      setIsPlaying(false);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      handleTrackEnded();
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, []);

  // Sleep Timer Countdown
  useEffect(() => {
    if (sleepTimerSeconds === null) return;
    if (sleepTimerSeconds <= 0) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      setSleepTimerSeconds(null);
      return;
    }

    const timer = setInterval(() => {
      setSleepTimerSeconds(prev => {
        if (prev === null || prev <= 1) {
          if (audioRef.current) audioRef.current.pause();
          setIsPlaying(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sleepTimerSeconds]);

  const setSleepTimer = (minutes: number | null) => {
    if (minutes === null) {
      setSleepTimerSeconds(null);
    } else {
      setSleepTimerSeconds(minutes * 60);
    }
  };

  const syncMediaSession = (song: Song) => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song.title,
        artist: song.artist,
        album: 'Kelkaam MDH',
        artwork: [
          { src: song.coverImg, sizes: '192x192', type: 'image/jpeg' },
          { src: song.coverImg, sizes: '512x512', type: 'image/jpeg' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        if (audioRef.current) audioRef.current.play().catch(() => {});
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (audioRef.current) audioRef.current.pause();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        playPrev();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        playNext();
      });
      navigator.mediaSession.setActionHandler('seekto', details => {
        if (details.seekTime !== undefined && audioRef.current) {
          audioRef.current.currentTime = details.seekTime;
        }
      });
      navigator.mediaSession.setActionHandler('seekforward', () => {
        skipForward10();
      });
      navigator.mediaSession.setActionHandler('seekbackward', () => {
        skipBackward10();
      });
    }
  };

  const playSong = (song: Song, customPlaylist?: Song[]) => {
    if (customPlaylist) {
      setPlaylist(customPlaylist);
    }
    setCurrentSong(song);

    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.play().catch(e => {
        console.warn('Playback prevented or interrupted:', e);
      });
    }

    syncMediaSession(song);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (!audioRef.current.src || audioRef.current.src === window.location.href) {
        audioRef.current.src = currentSong.url;
      }
      audioRef.current.play().catch(e => console.warn(e));
    }
  };

  const playNext = () => {
    if (!playlist.length || !currentSong) return;

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      playSong(playlist[randomIndex]);
      return;
    }

    const nextIndex = (currentSongIndex + 1) % playlist.length;
    playSong(playlist[nextIndex]);
  };

  const playPrev = () => {
    if (!playlist.length || !currentSong) return;

    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      playSong(playlist[randomIndex]);
      return;
    }

    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[prevIndex]);
  };

  const handleTrackEnded = () => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } else if (repeatMode === 'all') {
      playNext();
    } else {
      if (currentSongIndex < playlist.length - 1) {
        playNext();
      } else {
        setIsPlaying(false);
      }
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const skipForward10 = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration || 0,
        audioRef.current.currentTime + 10
      );
    }
  };

  const skipBackward10 = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleRepeat = () => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const toggleShuffle = () => {
    setIsShuffle(prev => !prev);
  };

  const setPlaybackRate = (rate: number) => {
    setPlaybackRateState(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Filter songs based on search and category
  const filteredSongs = allSongs.filter(song => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (song.lyrics && song.lyrics.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === 'favorites') {
      return favorites.includes(song.id);
    }

    if (selectedArtist) {
      return song.artistId === selectedArtist.id;
    }

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'mubashir') return song.category === 'mubashir';
    if (selectedCategory === 'swalih') return song.category === 'swalih';
    if (selectedCategory === 'shaheer') return song.category === 'shaheer';
    if (selectedCategory === 'madheena') return song.category === 'madheena';
    if (selectedCategory === 'mappila') return song.category === 'mappila';
    if (selectedCategory === 'duff') return song.category === 'duff';
    if (selectedCategory === 'custom') return song.isCustom;
    return true;
  });

  return (
    <PlayerContext.Provider
      value={{
        allSongs,
        artists,
        addCustomArtist,
        deleteArtist,
        currentSong,
        currentSongIndex,
        playlist,
        favorites,
        isFavorite,
        toggleFavorite,
        addCustomSong,
        deleteSong,
        resetDefaultCatalog,
        writtenSongs,
        addWrittenSong,
        updateWrittenSong,
        deleteWrittenSong,
        convertWrittenToPlayable,
        isPlaying,
        playSong,
        togglePlayPause,
        playNext,
        playPrev,
        seek,
        skipForward10,
        skipBackward10,
        currentTime,
        duration,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        repeatMode,
        toggleRepeat,
        isShuffle,
        toggleShuffle,
        playbackRate,
        setPlaybackRate,
        sleepTimerSeconds,
        setSleepTimer,
        activeTab,
        setActiveTab,
        selectedArtist,
        setSelectedArtist,
        isPlayerExpanded,
        setIsPlayerExpanded,
        showLyrics,
        setShowLyrics,
        showQueue,
        setShowQueue,
        showAddSong,
        setShowAddSong,
        showAddArtist,
        setShowAddArtist,
        showSleepTimerModal,
        setShowSleepTimerModal,
        showWebsiteModal,
        setShowWebsiteModal,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        filteredSongs
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
