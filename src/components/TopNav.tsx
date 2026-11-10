import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Music2, Heart, PenTool, Plus, RotateCcw, Globe } from 'lucide-react';

export const TopNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    favorites,
    setShowAddSong,
    setSelectedArtist,
    resetDefaultCatalog,
    setShowWebsiteModal
  } = usePlayer();

  const handleNavClick = (tab: 'home' | 'songs' | 'artists' | 'favorites' | 'writer') => {
    setActiveTab(tab);
    if (tab !== 'artists') {
      setSelectedArtist(null);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Zone 1: Wordmark */}
      <div 
        onClick={() => handleNavClick('home')}
        className="flex items-center gap-2.5 cursor-pointer select-none group"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1DB954] to-emerald-400 flex items-center justify-center shadow-lg shadow-[#1DB954]/20 group-hover:scale-105 transition-transform">
          <Music2 className="w-5 h-5 text-black font-bold" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap">
            Kelkaam <span className="text-[#1DB954]">MDH</span>
          </span>
          <span className="text-[10px] text-zinc-400 -mt-1 font-medium tracking-wide">
            കേൾക്കാം ഇശൽ തേൻമഴ
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden sm:flex items-center gap-1.5 md:gap-2">
        <button
          onClick={() => handleNavClick('home')}
          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'home'
              ? 'bg-white/10 text-[#1DB954] shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          ഹോം (Home)
        </button>

        <button
          onClick={() => handleNavClick('songs')}
          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'songs'
              ? 'bg-white/10 text-[#1DB954] shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          പാട്ടുകൾ (Songs)
        </button>

        <button
          onClick={() => handleNavClick('artists')}
          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'artists'
              ? 'bg-white/10 text-[#1DB954] shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          കലാകാരന്മാർ (Artists)
        </button>

        <button
          onClick={() => handleNavClick('writer')}
          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'writer'
              ? 'bg-white/10 text-emerald-400 shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>പാട്ടെഴുത്ത് (Writer)</span>
        </button>

        <button
          onClick={() => handleNavClick('favorites')}
          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'favorites'
              ? 'bg-white/10 text-rose-400 shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${activeTab === 'favorites' ? 'fill-rose-400 text-rose-400' : ''}`} />
          <span>പ്രിയപ്പെട്ടവ ({favorites.length})</span>
        </button>
      </nav>

      {/* Zone 3: Primary Action & Data Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowWebsiteModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 active:scale-95 transition-all"
          title="ലൈവ് വെബ്സൈറ്റ് ലിങ്ക് കാണുക & കോപ്പി ചെയ്യുക"
        >
          <Globe className="w-3.5 h-3.5 text-[#1DB954]" />
          <span className="hidden sm:inline">വെബ്സൈറ്റ് ലിങ്ക്</span>
        </button>

        <button
          onClick={() => {
            if (confirm('മുൻപുണ്ടായിരുന്ന എല്ലാ പാട്ടുകളും കലാകാരന്മാരെയും തിരിച്ചെടുക്കണോ? (Restore default songs & artists)')) {
              resetDefaultCatalog();
              alert('എല്ലാ ഗാനങ്ങളും കലാകാരന്മാരും പുനഃസ്ഥാപിച്ചു!');
            }
          }}
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors hidden md:inline-flex"
          title="യഥാർത്ഥ ഗാനങ്ങൾ പുനഃസ്ഥാപിക്കുക (Restore Default Songs)"
        >
          <RotateCcw className="w-4 h-4 text-[#1DB954]" />
        </button>

        <button
          onClick={() => setShowAddSong(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1DB954] text-black text-xs md:text-sm font-bold shadow-lg shadow-[#1DB954]/20 hover:bg-[#1ed760] active:scale-95 transition-all whitespace-nowrap"
          title="പുതിയ പാട്ട് ചേർക്കുക"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>പാട്ട് ചേർക്കുക</span>
        </button>
      </div>
    </header>
  );
};
