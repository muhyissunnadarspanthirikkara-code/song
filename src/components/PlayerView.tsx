import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  ChevronDown,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Repeat,
  Repeat1,
  Shuffle,
  Heart,
  Volume2,
  VolumeX,
  Clock,
  FileText,
  ListMusic,
  Share2,
  Gauge,
  Sparkles,
  Trash2
} from 'lucide-react';

export const PlayerView: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    playNext,
    playPrev,
    currentTime,
    duration,
    seek,
    skipForward10,
    skipBackward10,
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
    isFavorite,
    toggleFavorite,
    deleteSong,
    sleepTimerSeconds,
    setShowSleepTimerModal,
    setShowLyrics,
    setShowQueue,
    isPlayerExpanded,
    setIsPlayerExpanded
  } = usePlayer();

  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [showSpeedPopup, setShowSpeedPopup] = useState(false);

  if (!isPlayerExpanded || !currentSong) return null;

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  const handleShare = async () => {
    const text = `Kelkaam MDH: ${currentSong.title} - ${currentSong.artist}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentSong.title,
          text,
          url: window.location.href
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      alert('പാട്ടിന്റെ വിവരങ്ങൾ കോപ്പി ചെയ്തു!');
    }
  };

  const formatSleepTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a]/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto text-white animate-in fade-in slide-in-from-bottom-6 duration-200">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-6 flex items-center justify-between max-w-2xl w-full mx-auto">
        <button
          onClick={() => setIsPlayerExpanded(false)}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all"
          title="ചുരുക്കുക"
        >
          <ChevronDown className="w-6 h-6 text-zinc-300" />
        </button>

        <div className="text-center">
          <span className="text-[11px] font-bold text-[#1DB954] uppercase tracking-wider block">
            Kelkaam MDH
          </span>
          <span className="text-xs text-zinc-400 font-medium">ഇപ്പോൾ കേൾക്കുന്നത്</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-zinc-300"
            title="ഷെയർ ചെയ്യുക"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleFavorite(currentSong.id)}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all"
            title="പ്രിയപ്പെട്ടതാക്കുക"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite(currentSong.id)
                  ? 'fill-rose-500 text-rose-500'
                  : 'text-zinc-300'
              }`}
            />
          </button>
          <button
            onClick={() => {
              if (confirm(`'${currentSong.title}' എന്ന ഗാനം ഡിലീറ്റ് ചെയ്യണമെന്നുറപ്പാണോ?`)) {
                deleteSong(currentSong.id);
              }
            }}
            className="p-2.5 rounded-full bg-white/5 hover:bg-rose-500/20 active:scale-95 transition-all text-zinc-400 hover:text-rose-400"
            title="ഈ പാട്ട് ഡിലീറ്റ് ചെയ്യുക (Delete Song)"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Body: Artwork & Titles */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-2 max-w-md w-full mx-auto">
        {/* Album Cover Art */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-auto group">
          {/* Subtle Ambient Glow */}
          <div
            className={`absolute -inset-4 bg-gradient-to-tr from-[#1DB954]/20 to-emerald-500/10 rounded-3xl blur-2xl transition-opacity duration-700 ${
              isPlaying ? 'opacity-100' : 'opacity-40'
            }`}
          />

          <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-zinc-900">
            <img
              src={currentSong.coverImg}
              alt={currentSong.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
              referrerPolicy="no-referrer"
              onError={e => {
                (e.target as HTMLImageElement).src =
                  'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg';
              }}
            />
          </div>
        </div>

        {/* Title and Artist Info */}
        <div className="w-full text-center mt-6 space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight line-clamp-2 px-2">
            {currentSong.title}
          </h2>
          <p className="text-sm sm:text-base font-medium text-zinc-400">
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* Bottom Controls Area */}
      <div className="px-6 pb-8 pt-2 max-w-lg w-full mx-auto space-y-5">
        {/* Progress Bar & Timestamps */}
        <div className="space-y-1.5">
          <div className="relative group">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeekChange}
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#1DB954]"
              style={{
                background: `linear-gradient(to right, #1DB954 ${progressPercent}%, rgba(255,255,255,0.15) ${progressPercent}%)`
              }}
            />
          </div>

          <div className="flex justify-between items-center text-xs font-mono tabular-nums text-zinc-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Primary Buttons Row: Shuffle, Prev, -10s, Play/Pause, +10s, Next, Repeat */}
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {/* Shuffle Button */}
          <button
            onClick={toggleShuffle}
            className={`p-2.5 rounded-full transition-colors relative ${
              isShuffle ? 'text-[#1DB954]' : 'text-zinc-400 hover:text-white'
            }`}
            title="ഷഫിൾ (Shuffle)"
          >
            <Shuffle className="w-5 h-5" />
            {isShuffle && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1DB954]" />
            )}
          </button>

          {/* Previous Track */}
          <button
            onClick={playPrev}
            className="p-2.5 rounded-full text-zinc-300 hover:text-white active:scale-95 transition-all"
            title="മുൻപത്തെ പാട്ട്"
          >
            <SkipBack className="w-6 h-6 fill-current" />
          </button>

          {/* Jump Backward 10 Seconds */}
          <button
            onClick={skipBackward10}
            className="p-2.5 rounded-full text-zinc-300 hover:text-white active:scale-90 transition-all flex flex-col items-center group"
            title="-10 സെക്കൻഡ് പിന്നോട്ട്"
          >
            <RotateCcw className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
            <span className="text-[9px] font-bold text-zinc-400 -mt-0.5">10s</span>
          </button>

          {/* Main Play / Pause Button with Glow */}
          <button
            onClick={togglePlayPause}
            className="w-16 h-16 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-xl shadow-[#1DB954]/30 hover:scale-105 active:scale-95 transition-all"
            title={isPlaying ? 'പോസ്' : 'പ്ലേ'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-black" />
            ) : (
              <Play className="w-7 h-7 fill-black translate-x-0.5" />
            )}
          </button>

          {/* Jump Forward 10 Seconds */}
          <button
            onClick={skipForward10}
            className="p-2.5 rounded-full text-zinc-300 hover:text-white active:scale-90 transition-all flex flex-col items-center group"
            title="+10 സെക്കൻഡ് മുന്നോട്ട്"
          >
            <RotateCw className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            <span className="text-[9px] font-bold text-zinc-400 -mt-0.5">10s</span>
          </button>

          {/* Next Track */}
          <button
            onClick={playNext}
            className="p-2.5 rounded-full text-zinc-300 hover:text-white active:scale-95 transition-all"
            title="അടുത്ത പാട്ട്"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </button>

          {/* Repeat / Loop Button */}
          <button
            onClick={toggleRepeat}
            className={`p-2.5 rounded-full transition-colors relative ${
              repeatMode !== 'off' ? 'text-[#1DB954]' : 'text-zinc-400 hover:text-white'
            }`}
            title={
              repeatMode === 'off'
                ? 'ലൂപ്പ് ഓഫ്'
                : repeatMode === 'all'
                ? 'എല്ലാം ആവർത്തിക്കുക (Loop All)'
                : 'ഈ പാട്ട് ആവർത്തിക്കുക (Loop 1)'
            }
          >
            {repeatMode === 'one' ? (
              <Repeat1 className="w-5 h-5" />
            ) : (
              <Repeat className="w-5 h-5" />
            )}
            {repeatMode !== 'off' && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1DB954]" />
            )}
          </button>
        </div>

        {/* Extra Feature Bar: Speed, Sleep Timer, Lyrics, Queue, Volume */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-around text-xs text-zinc-400 relative">
          {/* Speed Button & Popup */}
          <div className="relative">
            <button
              onClick={() => setShowSpeedPopup(prev => !prev)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors ${
                playbackRate !== 1 ? 'text-[#1DB954] bg-[#1DB954]/10' : 'hover:text-white'
              }`}
              title="പ്ലേബാക്ക് സ്പീഡ് മാറ്റുക"
            >
              <Gauge className="w-4 h-4" />
              <span className="font-semibold">{playbackRate}x</span>
            </button>

            {showSpeedPopup && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#1c1c1c] border border-white/10 rounded-xl p-1.5 shadow-xl flex flex-col gap-1 z-30 min-w-[70px]">
                {speeds.map(rate => (
                  <button
                    key={rate}
                    onClick={() => {
                      setPlaybackRate(rate);
                      setShowSpeedPopup(false);
                    }}
                    className={`px-3 py-1 text-center rounded font-semibold text-xs transition-colors ${
                      playbackRate === rate
                        ? 'bg-[#1DB954] text-black font-bold'
                        : 'text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sleep Timer Button */}
          <button
            onClick={() => setShowSleepTimerModal(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors ${
              sleepTimerSeconds !== null
                ? 'text-amber-400 bg-amber-400/10'
                : 'hover:text-white'
            }`}
            title="സ്ലീപ്പ് ടൈമർ"
          >
            <Clock className="w-4 h-4" />
            <span>
              {sleepTimerSeconds !== null
                ? formatSleepTimer(sleepTimerSeconds)
                : 'ടൈമർ'}
            </span>
          </button>

          {/* Lyrics Button */}
          <button
            onClick={() => setShowLyrics(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:text-white transition-colors"
            title="വരികൾ (Lyrics)"
          >
            <FileText className="w-4 h-4" />
            <span>വരികൾ</span>
          </button>

          {/* Queue Button */}
          <button
            onClick={() => setShowQueue(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:text-white transition-colors"
            title="പ്ലേലിസ്റ്റ് ക്യൂ"
          >
            <ListMusic className="w-4 h-4" />
            <span>ക്യൂ</span>
          </button>

          {/* Volume Control */}
          <div className="relative">
            <button
              onClick={() => setShowVolumePopup(prev => !prev)}
              className="p-1.5 rounded-lg hover:text-white transition-colors"
              title="ശബ്ദം ക്രമീകരിക്കുക"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {showVolumePopup && (
              <div className="absolute bottom-10 right-0 bg-[#1c1c1c] border border-white/10 rounded-xl p-3 shadow-xl flex items-center gap-2 z-30 min-w-[140px]">
                <button onClick={toggleMute}>
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-zinc-300" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-white/20 rounded-full accent-[#1DB954]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
