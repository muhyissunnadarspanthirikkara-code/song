import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Home, Music, Users, PenTool, Heart } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, favorites, setSelectedArtist, isPlayerExpanded } = usePlayer();

  if (isPlayerExpanded) return null;

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#121212]/95 backdrop-blur-xl border-t border-white/10 px-1 py-1.5 flex items-center justify-around">
      <button
        onClick={() => {
          setActiveTab('home');
          setSelectedArtist(null);
        }}
        className={`flex flex-col items-center justify-center py-1 px-2 min-w-[50px] rounded-lg transition-colors ${
          activeTab === 'home' ? 'text-[#1DB954]' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-medium">ഹോം</span>
      </button>

      <button
        onClick={() => {
          setActiveTab('songs');
          setSelectedArtist(null);
        }}
        className={`flex flex-col items-center justify-center py-1 px-2 min-w-[50px] rounded-lg transition-colors ${
          activeTab === 'songs' ? 'text-[#1DB954]' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Music className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-medium">പാട്ടുകൾ</span>
      </button>

      <button
        onClick={() => {
          setActiveTab('artists');
        }}
        className={`flex flex-col items-center justify-center py-1 px-2 min-w-[50px] rounded-lg transition-colors ${
          activeTab === 'artists' ? 'text-[#1DB954]' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Users className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-medium">ഗായകർ</span>
      </button>

      <button
        onClick={() => {
          setActiveTab('writer');
          setSelectedArtist(null);
        }}
        className={`flex flex-col items-center justify-center py-1 px-2 min-w-[50px] rounded-lg transition-colors ${
          activeTab === 'writer' ? 'text-emerald-400 font-bold' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <PenTool className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-medium">എഴുത്ത്</span>
      </button>

      <button
        onClick={() => {
          setActiveTab('favorites');
          setSelectedArtist(null);
        }}
        className={`flex flex-col items-center justify-center py-1 px-2 min-w-[50px] rounded-lg transition-colors relative ${
          activeTab === 'favorites' ? 'text-rose-400' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Heart className={`w-5 h-5 mb-0.5 ${activeTab === 'favorites' ? 'fill-rose-400' : ''}`} />
        <span className="text-[10px] font-medium">പ്രിയപ്പെട്ടവ</span>
        {favorites.length > 0 && (
          <span className="absolute top-0.5 right-1.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center">
            {favorites.length}
          </span>
        )}
      </button>
    </nav>
  );
};
