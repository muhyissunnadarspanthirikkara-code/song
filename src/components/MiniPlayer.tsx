import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  Play,
  Pause,
  SkipForward,
  Heart,
  Maximize2,
  Clock
} from 'lucide-react';

export const MiniPlayer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    playNext,
    currentTime,
    duration,
    isFavorite,
    toggleFavorite,
    setIsPlayerExpanded,
    isPlayerExpanded,
    sleepTimerSeconds
  } = usePlayer();

  if (!currentSong || isPlayerExpanded) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      onClick={() => setIsPlayerExpanded(true)}
      className="fixed bottom-14 sm:bottom-0 left-0 right-0 z-30 bg-[#121212]/95 backdrop-blur-xl border-t border-white/10 px-3 sm:px-6 py-2.5 transition-all cursor-pointer hover:bg-[#181818]"
    >
      {/* Top micro progress line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-[#1DB954] transition-all duration-200"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Thumbnail & Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-zinc-900 border border-white/10 shadow">
            <img
              src={currentSong.coverImg}
              alt={currentSong.title}
              className={`w-full h-full object-cover ${isPlaying ? 'scale-105' : ''} transition-transform`}
              referrerPolicy="no-referrer"
              onError={e => {
                (e.target as HTMLImageElement).src =
                  'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg';
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white truncate">
                {currentSong.title}
              </h4>
              {sleepTimerSeconds !== null && (
                <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 shrink-0">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{formatTimer(sleepTimerSeconds)}</span>
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 truncate mt-0.5">
              {currentSong.artist}
            </p>
          </div>
        </div>

        {/* Right: Quick Controls */}
        <div
          className="flex items-center gap-1 sm:gap-3 shrink-0"
          onClick={e => e.stopPropagation()}
        >
          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(currentSong.id)}
            className="p-2 rounded-full text-zinc-400 hover:text-white transition-colors"
            title="പ്രിയപ്പെട്ടതാക്കുക"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite(currentSong.id) ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-lg shadow-[#1DB954]/20 active:scale-95 transition-all"
            title={isPlaying ? 'പോസ് ചെയ്യുക' : 'പ്ലേ ചെയ്യുക'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-black" />
            ) : (
              <Play className="w-5 h-5 fill-black translate-x-0.5" />
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={playNext}
            className="p-2 rounded-full text-zinc-400 hover:text-white transition-colors"
            title="അടുത്ത പാട്ട്"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Expand Full Player Button */}
          <button
            onClick={() => setIsPlayerExpanded(true)}
            className="p-2 rounded-full text-zinc-400 hover:text-white hidden sm:inline-flex"
            title="ഫുൾ പ്ലെയർ തുറക്കുക"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
