import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Song } from '../types';
import {
  Play,
  Pause,
  Heart,
  FileText,
  Share2,
  Plus,
  Volume2,
  Sparkles,
  Shuffle,
  Music2,
  ArrowLeft
} from 'lucide-react';

export const SongList: React.FC = () => {
  const {
    filteredSongs,
    currentSong,
    isPlaying,
    playSong,
    togglePlayPause,
    isFavorite,
    toggleFavorite,
    selectedArtist,
    setSelectedArtist,
    setShowLyrics,
    setShowAddSong,
    setIsPlayerExpanded,
    toggleShuffle,
    activeTab
  } = usePlayer();

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      togglePlayPause();
    } else {
      playSong(song, filteredSongs);
    }
  };

  const handleShare = async (e: React.MouseEvent, song: Song) => {
    e.stopPropagation();
    const shareText = `Kelkaam MDH-ൽ ഈ മനോഹര ഗാനം കേൾക്കൂ: ${song.title} - ${song.artist}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: song.title,
          text: shareText,
          url: window.location.href
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      alert(`ലിങ്ക് കോപ്പി ചെയ്തു: ${song.title}`);
    }
  };

  const handlePlayAll = () => {
    if (filteredSongs.length > 0) {
      playSong(filteredSongs[0], filteredSongs);
    }
  };

  const handleShufflePlay = () => {
    if (filteredSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredSongs.length);
      toggleShuffle();
      playSong(filteredSongs[randomIndex], filteredSongs);
    }
  };

  return (
    <div className="space-y-4">
      {/* Artist header banner if an artist is selected */}
      {selectedArtist && (
        <div className="relative rounded-2xl p-5 bg-gradient-to-r from-emerald-950/40 via-[#181818] to-[#121212] border border-[#1DB954]/30 mb-5 overflow-hidden">
          <button
            onClick={() => setSelectedArtist(null)}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>എല്ലാ പാട്ടുകളിലേക്കും മടങ്ങുക</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedArtist.img}
                alt={selectedArtist.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#1DB954] shadow-lg"
                referrerPolicy="no-referrer"
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg';
                }}
              />
              <div>
                <h2 className="text-xl font-bold text-white">
                  {selectedArtist.malayalamName || selectedArtist.name}
                </h2>
                <p className="text-xs text-zinc-400">{selectedArtist.name}</p>
                <p className="text-xs text-[#1DB954] font-medium mt-0.5">
                  {filteredSongs.length} ഗാനങ്ങൾ ലഭ്യമാണ്
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayAll}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DB954] text-black font-bold text-xs md:text-sm hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#1DB954]/20"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>മുഴുവൻ കേൾക്കുക</span>
              </button>

              <button
                onClick={handleShufflePlay}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 text-white font-medium text-xs md:text-sm hover:bg-white/20 active:scale-95 transition-all"
                title="ക്രമരഹിതമായി പ്ലേ ചെയ്യുക"
              >
                <Shuffle className="w-4 h-4" />
                <span className="hidden sm:inline">ഷഫിൾ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header bar when browsing all songs or favorites */}
      {!selectedArtist && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {activeTab === 'favorites'
                ? 'പ്രിയപ്പെട്ട ഗാനങ്ങൾ (Favorites)'
                : 'പാട്ടുകളുടെ ശേഖരം (All Tracks)'}
            </h2>
            <span className="text-xs text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
              {filteredSongs.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayAll}
              disabled={filteredSongs.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1DB954] text-black text-xs font-bold hover:bg-[#1ed760] active:scale-95 disabled:opacity-50 transition-all shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>പ്ലേ ചെയ്യുക</span>
            </button>

            <button
              onClick={handleShufflePlay}
              disabled={filteredSongs.length === 0}
              className="p-1.5 rounded-full bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 active:scale-95 disabled:opacity-50 transition-all"
              title="ഷഫിൾ പ്ലേ (Shuffle)"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredSongs.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl bg-[#141414] border border-white/5 space-y-3">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-zinc-500">
            <Music2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">ഗാനങ്ങളൊന്നും കണ്ടെത്തിയില്ല</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            നിങ്ങൾ തിരഞ്ഞ വാക്ക് പരിശോധിക്കുക, അല്ലെങ്കിൽ നിങ്ങളുടെ സ്വന്തം പാട്ടുകൾ ചേർക്കൂ.
          </p>
          <button
            onClick={() => setShowAddSong(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1DB954] text-black text-xs font-bold hover:scale-105 transition-all shadow-md mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>പുതിയ പാട്ട് ചേർക്കുക</span>
          </button>
        </div>
      )}

      {/* Song List Items */}
      <div className="space-y-1.5">
        {filteredSongs.map((song, index) => {
          const isCurrent = currentSong?.id === song.id;
          const isFav = isFavorite(song.id);

          return (
            <div
              key={song.id}
              onClick={() => handlePlaySong(song)}
              className={`group flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer select-none border ${
                isCurrent
                  ? 'bg-gradient-to-r from-[#17241b] to-[#121814] border-[#1DB954]/50 shadow-md shadow-[#1DB954]/5'
                  : 'bg-[#141414]/70 hover:bg-[#1c1c1c] border-white/5 hover:border-white/10'
              }`}
            >
              {/* Left Zone: Index / Play Icon & Thumbnail & Titles */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Index number or Equalizer animation */}
                <div className="w-6 text-center text-xs font-semibold shrink-0 text-zinc-500">
                  {isCurrent && isPlaying ? (
                    <div className="flex items-end justify-center gap-0.5 h-3.5">
                      <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_0.6s_ease-in-out_infinite] h-full" />
                      <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-2/3" />
                      <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_0.5s_ease-in-out_infinite] h-4/5" />
                    </div>
                  ) : (
                    <span className="group-hover:hidden">{index + 1}</span>
                  )}
                  <Play className={`w-3.5 h-3.5 mx-auto ${isCurrent && !isPlaying ? 'block text-[#1DB954]' : 'hidden group-hover:block text-white'}`} />
                </div>

                {/* Album / Artist Thumbnail */}
                <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-[#222] border border-white/10">
                  <img
                    src={song.coverImg}
                    alt={song.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg';
                    }}
                  />
                  {isCurrent && (
                    <div className="absolute inset-0 bg-[#1DB954]/20 flex items-center justify-center">
                      <Volume2 className="w-4 h-4 text-[#1DB954]" />
                    </div>
                  )}
                </div>

                {/* Song Title and Artist */}
                <div className="min-w-0 flex-1">
                  <h4
                    className={`text-sm font-semibold truncate leading-snug ${
                      isCurrent ? 'text-[#1DB954]' : 'text-white group-hover:text-white'
                    }`}
                  >
                    {song.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                    <span className="truncate">{song.artist}</span>
                    {song.isCustom && (
                      <span className="text-[10px] text-[#1DB954] bg-[#1DB954]/10 px-1.5 py-0.2 rounded border border-[#1DB954]/20">
                        Custom
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Zone: Action Buttons */}
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {/* Lyrics Button */}
                {song.lyrics && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (currentSong?.id !== song.id) {
                        playSong(song, filteredSongs);
                      }
                      setShowLyrics(true);
                    }}
                    className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="വരികൾ കാണുക (Lyrics)"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                )}

                {/* Favorite Heart Button */}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleFavorite(song.id);
                  }}
                  className={`p-2 rounded-full transition-all ${
                    isFav
                      ? 'text-rose-500 hover:text-rose-400'
                      : 'text-zinc-500 hover:text-white hover:bg-white/10'
                  }`}
                  title={isFav ? 'പ്രിയപ്പെട്ടവയിൽ നിന്ന് നീക്കുക' : 'പ്രിയപ്പെട്ടതാക്കുക'}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                </button>

                {/* Share Button */}
                <button
                  onClick={e => handleShare(e, song)}
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors hidden sm:inline-flex"
                  title="ഷെയർ ചെയ്യുക"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Duration or Play state */}
                {song.duration && (
                  <span className="text-xs text-zinc-500 w-11 text-right font-mono tabular-nums hidden sm:inline-block">
                    {song.duration}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
