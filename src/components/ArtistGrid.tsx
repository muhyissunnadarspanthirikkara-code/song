import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Artist } from '../types';
import { Play, Check, Music, UserPlus, Trash2, RotateCcw } from 'lucide-react';

export const ArtistGrid: React.FC = () => {
  const {
    artists,
    selectedArtist,
    setSelectedArtist,
    setActiveTab,
    allSongs,
    playSong,
    setShowAddArtist,
    deleteArtist,
    resetDefaultCatalog
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

  const handleDeleteArtist = (e: React.MouseEvent, artist: Artist) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      `"${artist.malayalamName || artist.name}" എന്ന കലാകാരനെ ലിസ്റ്റിൽ നിന്ന് ഒഴിവാക്കണമെന്നുറപ്പാണോ?`
    );
    if (confirmed) {
      deleteArtist(artist.id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            ഗായകരും ഇശലുകളും
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 mt-0.5">
            കലാകാരന്മാരെ തിരഞ്ഞെടുക്കുക, പുതിയ കലാകാരന്മാരെ ചേർക്കുകയോ ആവശ്യമില്ലാത്തവരെ ഒഴിവാക്കുകയോ ചെയ്യാം
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowAddArtist(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1DB954] text-black text-xs font-bold hover:bg-[#1ed760] active:scale-95 transition-all shadow-md shadow-[#1DB954]/20"
          >
            <UserPlus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>കലാകാരനെ ചേർക്കുക</span>
          </button>
        </div>
      </div>

      {artists.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl bg-[#141414] border border-white/5 space-y-3">
          <h3 className="text-base font-bold text-white">കലാകാരന്മാരൊന്നും അവശേഷിക്കുന്നില്ല</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            എല്ലാ കലാകാരന്മാരെയും ഡിലീറ്റ് ചെയ്തിട്ടുണ്ടെങ്കിൽ പഴയ ഗായകരെ പുനഃസ്ഥാപിക്കാം.
          </p>
          <button
            onClick={() => {
              if (confirm('മുൻപുണ്ടായിരുന്ന എല്ലാ കലാകാരന്മാരെയും തിരിച്ചു കൊണ്ടുവരണോ?')) {
                resetDefaultCatalog();
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-zinc-200 text-xs font-semibold hover:bg-white/20 transition-all border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#1DB954]" />
            <span>പഴയ കലാകാരന്മാരെ തിരിച്ചെടുക്കുക</span>
          </button>
        </div>
      )}

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

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={e => handlePlayArtist(e, artist)}
                    className="w-9 h-9 rounded-full bg-[#1DB954] text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                    title="എല്ലാ പാട്ടുകളും കേൾക്കുക"
                  >
                    <Play className="w-4 h-4 fill-black translate-x-0.5" />
                  </button>

                  <button
                    onClick={e => handleDeleteArtist(e, artist)}
                    className="w-8 h-8 rounded-full text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 flex items-center justify-center transition-colors"
                    title="ഈ കലാകാരനെ ഡിലീറ്റ് ചെയ്യുക"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
