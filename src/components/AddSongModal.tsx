import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { X, Upload, Music, Plus, Check } from 'lucide-react';

export const AddSongModal: React.FC = () => {
  const { showAddSong, setShowAddSong, addCustomSong, artists } = usePlayer();

  const [title, setTitle] = useState('');
  const [selectedArtistId, setSelectedArtistId] = useState('mubashir');
  const [customArtistName, setCustomArtistName] = useState('');
  const [url, setUrl] = useState('');
  const [coverImg, setCoverImg] = useState('https://i.postimg.cc/ZKgJNNVz/download-(9).jpg');
  const [lyrics, setLyrics] = useState('');
  const [fileName, setFileName] = useState('');

  if (!showAddSong) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
      setFileName(file.name);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      alert('ദയവായി പാട്ടിന്റെ പേരും ഓഡിയോ ലിങ്കും നൽകുക');
      return;
    }

    const matchedArtist = artists.find(a => a.id === selectedArtistId);
    const finalArtistName =
      selectedArtistId === 'custom'
        ? customArtistName.trim() || 'മറ്റ് ഗായകർ'
        : matchedArtist?.name || 'Mubashir Perinthattiri';
    const finalCover =
      matchedArtist?.img || coverImg.trim() || 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg';

    addCustomSong({
      title: title.trim(),
      artist: finalArtistName,
      artistId: selectedArtistId,
      url: url.trim(),
      coverImg: finalCover,
      category: 'custom',
      lyrics: lyrics.trim() || undefined
    });

    setShowAddSong(false);
    setTitle('');
    setUrl('');
    setLyrics('');
    setFileName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-md p-5 sm:p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => setShowAddSong(false)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#1DB954]/20 border border-[#1DB954]/40 flex items-center justify-center text-[#1DB954]">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">പുതിയ പാട്ട് ചേർക്കുക</h3>
            <p className="text-xs text-zinc-400">ഓഡിയോ ലിങ്കോ ഫയലോ അപ്‌ലോഡ് ചെയ്യുക</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Song Title */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              പാട്ടിന്റെ പേര് (Song Title) *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="ഉദാ: മദീന ഗാനം, ഖസീദ..."
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#1DB954]"
            />
          </div>

          {/* Artist Select */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              ഗായകൻ / കലാകാരൻ (Artist)
            </label>
            <select
              value={selectedArtistId}
              onChange={e => setSelectedArtistId(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#1DB954]"
            >
              {artists.map(art => (
                <option key={art.id} value={art.id}>
                  {art.malayalamName || art.name} ({art.name})
                </option>
              ))}
              <option value="custom">മറ്റ് പുതിയ ഗായകൻ (Enter Custom Name)</option>
            </select>

            {selectedArtistId === 'custom' && (
              <input
                type="text"
                required
                value={customArtistName}
                onChange={e => setCustomArtistName(e.target.value)}
                placeholder="ഗായകന്റെ പേര് ടൈപ്പ് ചെയ്യുക"
                className="w-full mt-2 bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#1DB954] text-xs"
              />
            )}
          </div>

          {/* Audio Source: File Upload OR URL */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-300">
              ഓഡിയോ ഉറവിടം (Audio File or URL) *
            </label>

            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer text-xs font-medium text-zinc-300 hover:text-white transition-colors">
                <Upload className="w-4 h-4 text-[#1DB954]" />
                <span className="truncate">{fileName ? 'മാറ്റുക' : 'ഫയൽ തിരഞ്ഞെടുക്കുക'}</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="flex items-center text-[11px] text-zinc-400 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5 truncate">
                <Music className="w-3.5 h-3.5 mr-1.5 text-[#1DB954] shrink-0" />
                <span className="truncate">{fileName || 'ഫയൽ തിരഞ്ഞെടുത്തിട്ടില്ല'}</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-zinc-500 font-medium">അല്ലെങ്കിൽ ലിങ്ക് നൽകുക</div>

            <input
              type="url"
              value={url}
              onChange={e => {
                setUrl(e.target.value);
                setFileName('');
              }}
              placeholder="https://example.com/audio.mp3"
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#1DB954] text-xs font-mono"
            />
          </div>

          {/* Lyrics (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              വരികൾ / വിവരണം (Lyrics - ഓപ്ഷണൽ)
            </label>
            <textarea
              rows={3}
              value={lyrics}
              onChange={e => setLyrics(e.target.value)}
              placeholder="പാട്ടിന്റെ മലയാളം വരികൾ ഇവിടെ എഴുതാം..."
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#1DB954] text-xs resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setShowAddSong(false)}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
            >
              റദ്ദാക്കുക
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs shadow-lg shadow-[#1DB954]/20 transition-all active:scale-95"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>പാട്ട് ചേർക്കുക</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
