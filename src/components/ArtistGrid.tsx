import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Artist } from '../types';
import { Play, Check, Music, Sparkles } from 'lucide-react';

export const ArtistGrid: React.FC = () => {
  const {
    artists,
    selectedArtist,
    setSelectedArtist,
    setActiveTab,
    allSongs,
    playSong
  } = usePlayer();

  const handleSelectArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setActiveTab('songs');
  };

  const handlePlayArtist = (e: React.MouseEvent, artist: Artist) => {
    e.stopPropagation();
    const artistSongs = allSongs.filter(s => s.artistId === artist.id);
    if (artistSongs.length > 0) {
      playSong(artistSongs[0], artistSongs);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            ഗായകരും ഇശലുകളും
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 mt-0.5">
            കലാകാരന്മാരെ തിരഞ്ഞെടുത്ത് അവരുടെ എല്ലാ ഗാനങ്ങളും ആസ്വദിക്കൂ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {artists.map(artist => {
          const isSelected = selectedArtist?.id === artist.id;
          const artistSongCount = allSongs.filter(s => s.artistId === artist.id).length;

          return (
            <div
              key={artist.id}
              onClick={() => handleSelectArtist(artist)}
              className={`group relative p-4 rounded-2xl bg-[#141414] hover:bg-[#1a1a1a] border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#1DB954] shadow-lg shadow-[#1DB954]/10 bg-[#17201a]'
                  : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#1DB954]/40 group-hover:border-[#1DB954] transition-colors shadow-md">
                  <img
                    src={artist.img}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-white truncate group-hover:text-[#1DB954] transition-colors">
                      {artist.malayalamName || artist.name}
                    </h3>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#1DB954] text-black flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 truncate">{artist.name}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#1DB954] font-medium">
                    <Music className="w-3 h-3" />
                    <span>{artistSongCount} ഗാനങ്ങൾ</span>
                  </div>
                </div>

                <button
                  onClick={e => handlePlayArtist(e, artist)}
                  className="w-10 h-10 rounded-full bg-[#1DB954] text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shrink-0"
                  title="എല്ലാ പാട്ടുകളും കേൾക്കുക"
                >
                  <Play className="w-4 h-4 fill-black translate-x-0.5" />
                </button>
              </div>

              {artist.description && (
                <p className="text-xs text-zinc-400 mt-3 line-clamp-2 leading-relaxed">
                  {artist.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
