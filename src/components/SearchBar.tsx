import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Search, X, Sparkles, SlidersHorizontal } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredSongs,
    allSongs
  } = usePlayer();

  const categories = [
    { id: 'all', label: 'എല്ലാ ഗാനങ്ങളും' },
    { id: 'mubashir', label: 'മുബഷിർ ഉസ്താദ്' },
    { id: 'madheena', label: 'മദീന മദീഹ്' },
    { id: 'mappila', label: 'മാപ്പിളപ്പാട്ടുകൾ' },
    { id: 'custom', label: 'പുതിയവ (Custom)' }
  ];

  return (
    <div className="space-y-3.5 mb-6">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-zinc-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="പാട്ടുകളോ വരികളോ തിരയുക (Search songs or lyrics)..."
          className="w-full bg-[#181818] hover:bg-[#202020] focus:bg-[#222222] text-white placeholder-zinc-500 text-sm rounded-xl pl-11 pr-10 py-3 border border-white/5 focus:border-[#1DB954] focus:outline-none transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
            title="തിരച്ചിൽ ഒഴിവാക്കുക"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {categories.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#1DB954] text-black font-bold shadow-md shadow-[#1DB954]/20'
                  : 'bg-[#181818] text-zinc-300 hover:text-white hover:bg-[#252525] border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}

        <span className="ml-auto text-xs text-zinc-500 whitespace-nowrap pl-2 hidden md:inline">
          {filteredSongs.length} പാട്ടുകൾ
        </span>
      </div>
    </div>
  );
};
