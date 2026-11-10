import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { FileText, X, Copy, Check } from 'lucide-react';

export const LyricsModal: React.FC = () => {
  const { showLyrics, setShowLyrics, currentSong } = usePlayer();
  const [copied, setCopied] = React.useState(false);

  if (!showLyrics || !currentSong) return null;

  const handleCopy = async () => {
    if (currentSong.lyrics) {
      await navigator.clipboard.writeText(
        `${currentSong.title} - ${currentSong.artist}\n\n${currentSong.lyrics}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1DB954]/20 border border-[#1DB954]/40 flex items-center justify-center text-[#1DB954]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white truncate max-w-[240px]">
                {currentSong.title}
              </h3>
              <p className="text-xs text-zinc-400">{currentSong.artist} - വരികൾ</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              title="വരികൾ കോപ്പി ചെയ്യുക"
            >
              {copied ? <Check className="w-4 h-4 text-[#1DB954]" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowLyrics(false)}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lyrics Content with Malayalam typography */}
        <div className="flex-1 overflow-y-auto py-5 px-1 space-y-4">
          {currentSong.lyrics ? (
            <div className="whitespace-pre-line text-sm sm:text-base leading-loose text-zinc-200 font-medium select-text">
              {currentSong.lyrics}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500 text-sm">
              ഈ പാട്ടിന്റെ വരികൾ ഇപ്പോൾ ലഭ്യമല്ല.
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-white/10 text-center shrink-0">
          <p className="text-[11px] text-zinc-500">
            Kelkaam MDH • മലയാളം ഭക്തിസാന്ദ്ര ഗാനങ്ങൾ
          </p>
        </div>
      </div>
    </div>
  );
};
