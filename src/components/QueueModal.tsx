import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { ListMusic, X, Play, Music2 } from 'lucide-react';

export const QueueModal: React.FC = () => {
  const { showQueue, setShowQueue, playlist, currentSong, playSong, isPlaying } = usePlayer();

  if (!showQueue) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-md p-5 shadow-2xl relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1DB954]/20 border border-[#1DB954]/40 flex items-center justify-center text-[#1DB954]">
              <ListMusic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">പ്ലേലിസ്റ്റ് ക്യൂ (Up Next)</h3>
              <p className="text-xs text-zinc-400">{playlist.length} ഗാനങ്ങൾ ക്രമത്തിൽ</p>
            </div>
          </div>

          <button
            onClick={() => setShowQueue(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-1.5">
          {playlist.map((song, idx) => {
            const isCurrent = currentSong?.id === song.id;

            return (
              <div
                key={`${song.id}-${idx}`}
                onClick={() => playSong(song)}
                className={`flex items-center justify-between gap-3 p-2.5 rounded-xl transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-[#1DB954]/15 border border-[#1DB954]/40 text-[#1DB954]'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-xs font-mono text-zinc-500 w-4 text-center">
                    {idx + 1}
                  </span>
                  <img
                    src={song.coverImg}
                    alt={song.title}
                    className="w-9 h-9 rounded-md object-cover bg-zinc-900 border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg';
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate">{song.title}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{song.artist}</p>
                  </div>
                </div>

                {isCurrent && isPlaying ? (
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-[#1DB954] h-full animate-[bounce_0.6s_infinite]" />
                    <span className="w-0.5 bg-[#1DB954] h-2/3 animate-[bounce_0.8s_infinite]" />
                    <span className="w-0.5 bg-[#1DB954] h-4/5 animate-[bounce_0.5s_infinite]" />
                  </div>
                ) : (
                  <Play className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
