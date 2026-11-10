import React from 'react';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { TopNav } from './components/TopNav';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SearchBar } from './components/SearchBar';
import { ArtistGrid } from './components/ArtistGrid';
import { SongList } from './components/SongList';
import { MiniPlayer } from './components/MiniPlayer';
import { PlayerView } from './components/PlayerView';
import { AddSongModal } from './components/AddSongModal';
import { SleepTimerModal } from './components/SleepTimerModal';
import { LyricsModal } from './components/LyricsModal';
import { QueueModal } from './components/QueueModal';
import { Play, Sparkles, Heart, Plus, Music2, Headphones, Radio } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, allSongs, playSong, setShowAddSong, favorites } = usePlayer();

  const featuredSong = allSongs[0]; // Twaifinte Veedikal

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col pb-32 sm:pb-28">
      {/* Top Bar */}
      <TopNav />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Search Bar on all pages for quick access */}
        <SearchBar />

        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Featured Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#12261b] via-[#141414] to-[#0d0d0d] border border-[#1DB954]/25 p-6 sm:p-8 shadow-2xl">
              <div className="relative z-10 max-w-xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/30 text-[#1DB954] text-xs font-bold tracking-wide">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>ട്രെൻഡിംഗ് മദ്ഹ് ഗാനം</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {featuredSong.title}
                </h1>

                <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed">
                  മുബഷിർ പെരിന്തട്ടരിയുടെ സ്വരമാധുരിയിൽ ഹൃദയം തൊടുന്ന ആത്മീയ ഇശലുകൾ. പുതിയ കൺട്രോളുകളോടെ ആസ്വദിക്കൂ.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => playSong(featuredSong, allSongs)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-sm shadow-xl shadow-[#1DB954]/25 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Play className="w-4 h-4 fill-black translate-x-0.5" />
                    <span>ഇപ്പോൾ കേൾക്കുക</span>
                  </button>

                  <button
                    onClick={() => setShowAddSong(true)}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>പുതിയ പാട്ട് ചേർക്കുക</span>
                  </button>
                </div>
              </div>

              {/* Decorative Background Art */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-25 sm:opacity-40 pointer-events-none overflow-hidden">
                <img
                  src={featuredSong.coverImg}
                  alt={featuredSong.title}
                  className="w-full h-full object-cover blur-sm scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0d0d0d]/80 to-[#12261b]" />
              </div>
            </div>

            {/* Artists Section */}
            <ArtistGrid />

            {/* All Songs Section */}
            <div className="pt-4">
              <SongList />
            </div>
          </div>
        )}

        {/* SONGS VIEW */}
        {activeTab === 'songs' && (
          <div className="space-y-6">
            <SongList />
          </div>
        )}

        {/* ARTISTS VIEW */}
        {activeTab === 'artists' && (
          <div className="space-y-6">
            <ArtistGrid />
          </div>
        )}

        {/* FAVORITES VIEW */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <SongList />
          </div>
        )}
      </main>

      {/* Mini Player Fixed at Bottom */}
      <MiniPlayer />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Fullscreen Player View */}
      <PlayerView />

      {/* Modals */}
      <AddSongModal />
      <SleepTimerModal />
      <LyricsModal />
      <QueueModal />
    </div>
  );
};

export default function App() {
  return (
    <PlayerProvider>
      <MainContent />
    </PlayerProvider>
  );
}
