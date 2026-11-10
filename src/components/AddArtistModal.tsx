import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { X, UserPlus, Upload, Image, Check } from 'lucide-react';

export const AddArtistModal: React.FC = () => {
  const { showAddArtist, setShowAddArtist, addCustomArtist, setSelectedArtist } = usePlayer();

  const [name, setName] = useState('');
  const [malayalamName, setMalayalamName] = useState('');
  const [img, setImg] = useState('https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');

  if (!showAddArtist) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImg(url);
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('ദയവായി കലാകാരന്റെ പേര് നൽകുക');
      return;
    }

    addCustomArtist({
      name: name.trim(),
      malayalamName: malayalamName.trim() || name.trim(),
      img: img.trim() || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80',
      description: description.trim() || 'പ്രിയപ്പെട്ട ഗായകൻ / കലാകാരൻ.'
    });

    setShowAddArtist(false);
    setName('');
    setMalayalamName('');
    setDescription('');
    setFileName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-md p-5 sm:p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => setShowAddArtist(false)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#1DB954]/20 border border-[#1DB954]/40 flex items-center justify-center text-[#1DB954]">
            <UserPlus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">പുതിയ കലാകാരനെ ചേർക്കുക</h3>
            <p className="text-xs text-zinc-400">ഗായകന്റെ വിവരങ്ങളും ചിത്രവും നൽകുക</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Malayalam Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              മലയാളത്തിലെ പേര് (Malayalam Name) *
            </label>
            <input
              type="text"
              required
              value={malayalamName}
              onChange={e => setMalayalamName(e.target.value)}
              placeholder="ഉദാ: സ്വാലിഹ് തൊടുപുഴ, കണ്ണൂർ ഷെരീഫ്..."
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#1DB954]"
            />
          </div>

          {/* English / Official Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              ഇംഗ്ലീഷ് നാമം (English Name) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Swalih Thodupuzha"
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#1DB954]"
            />
          </div>

          {/* Artist Photo */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-300">
              കലാകാരന്റെ ഫോട്ടോ (Photo)
            </label>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-800 border-2 border-[#1DB954]/50 shrink-0 shadow">
                <img
                  src={img}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={e => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>

              <div className="flex-1 space-y-1.5">
                <label className="flex items-center justify-center gap-2 p-2 rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer text-xs font-medium text-zinc-300 hover:text-white transition-colors">
                  <Upload className="w-4 h-4 text-[#1DB954]" />
                  <span>{fileName ? 'ഫോട്ടോ മാറ്റി' : 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <input
                  type="url"
                  value={img}
                  onChange={e => {
                    setImg(e.target.value);
                    setFileName('');
                  }}
                  placeholder="അല്ലെങ്കിൽ ഫോട്ടോ ലിങ്ക് (URL) നൽകുക"
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3 py-1.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#1DB954] text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Description / Bio */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              വിവരണം / ബയോ (Description)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="കലാകാരന്റെ സവിശേഷതകൾ..."
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#1DB954] text-xs resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setShowAddArtist(false)}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
            >
              റദ്ദാക്കുക
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs shadow-lg shadow-[#1DB954]/20 transition-all active:scale-95"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>കലാകാരനെ ചേർക്കുക</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
