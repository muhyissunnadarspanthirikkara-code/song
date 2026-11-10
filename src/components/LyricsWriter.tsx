import React, { useState, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { WrittenSong } from '../types';
import {
  PenTool,
  Plus,
  BookOpen,
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  Copy,
  Check,
  Music,
  Share2,
  Sparkles,
  Bookmark,
  Send,
  FileDown
} from 'lucide-react';

export const LyricsWriter: React.FC = () => {
  const {
    writtenSongs,
    addWrittenSong,
    updateWrittenSong,
    deleteWrittenSong,
    convertWrittenToPlayable,
    setActiveTab
  } = usePlayer();

  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('മദ്ഹ് ഗാനം');
  const [ishalType, setIshalType] = useState('തൊങ്ങൽ ഇശൽ');
  const [lyrics, setLyrics] = useState('');
  const [notes, setNotes] = useState('');
  const [audioRecordingUrl, setAudioRecordingUrl] = useState<string | undefined>(undefined);

  // Audio Recording state
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingTimerRef = useRef<number | null>(null);

  // Audio preview playback
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);

  const [copied, setCopied] = useState(false);
  const [showAddToPlayerModal, setShowAddToPlayerModal] = useState(false);
  const [playableAudioUrl, setPlayableAudioUrl] = useState('');

  const currentSelected = writtenSongs.find(s => s.id === selectedSongId);

  const handleStartNew = () => {
    setSelectedSongId(null);
    setTitle('');
    setAuthor('');
    setCategory('മദ്ഹ് ഗാനം');
    setIshalType('തൊങ്ങൽ ഇശൽ');
    setLyrics(`[പല്ലവി]
ഇവിടെ നിങ്ങളുടെ ആദ്യ വരികൾ എഴുതാം...

[അനുപല്ലവി]
തുടർ വരികൾ...

[ചരണം]
കൂടുതൽ ആശയങ്ങളും ഭക്തിനിർഭരമായ വരികളും...`);
    setNotes('');
    setAudioRecordingUrl(undefined);
    setIsEditing(true);
  };

  const handleSelectSong = (song: WrittenSong) => {
    setSelectedSongId(song.id);
    setTitle(song.title);
    setAuthor(song.author);
    setCategory(song.category);
    setIshalType(song.ishalType || 'തൊങ്ങൽ ഇശൽ');
    setLyrics(song.lyrics);
    setNotes(song.notes || '');
    setAudioRecordingUrl(song.audioRecordingUrl);
    setIsEditing(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !lyrics.trim()) {
      alert('പാട്ടിന്റെ പേരും വരികളും നൽകുക');
      return;
    }

    if (selectedSongId && currentSelected) {
      updateWrittenSong({
        ...currentSelected,
        title: title.trim(),
        author: author.trim() || 'എന്റെ രചന',
        category,
        ishalType,
        lyrics: lyrics.trim(),
        notes: notes.trim(),
        audioRecordingUrl
      });
    } else {
      addWrittenSong({
        title: title.trim(),
        author: author.trim() || 'എന്റെ രചന',
        category,
        ishalType,
        lyrics: lyrics.trim(),
        notes: notes.trim(),
        audioRecordingUrl
      });
    }

    setIsEditing(false);
  };

  const insertVerseTag = (tag: string) => {
    setLyrics(prev => `${prev}\n\n[${tag}]\n`);
  };

  // Voice recording helpers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioRecordingUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      recordingTimerRef.current = window.setInterval(() => {
        setRecordingDuration(p => p + 1);
      }, 1000);
    } catch (err) {
      alert('മൈക്രോഫോൺ അനുമതി ലഭ്യമായില്ല: ' + err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };

  const togglePlayRecording = () => {
    if (!audioRecordingUrl) return;
    if (!audioPreviewRef.current) {
      const audio = new Audio(audioRecordingUrl);
      audioPreviewRef.current = audio;
      audio.onended = () => setIsPlayingRecording(false);
    }

    if (isPlayingRecording) {
      audioPreviewRef.current.pause();
      setIsPlayingRecording(false);
    } else {
      audioPreviewRef.current.src = audioRecordingUrl;
      audioPreviewRef.current.play();
      setIsPlayingRecording(true);
    }
  };

  const handleCopy = async () => {
    const text = `${title}\nരചന: ${author || 'അജ്ഞാതൻ'}\nവിഭാഗം: ${category} (${ishalType})\n\n${lyrics}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const text = `${title}\nരചന: ${author || 'അജ്ഞാതൻ'}\nവിഭാഗം: ${category} (${ishalType})\nതീയതി: ${new Date().toLocaleDateString()}\n\n${lyrics}\n\n---\nകുറിപ്പുകൾ:\n${notes}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}_വരികൾ.txt`;
    a.click();
  };

  const handleConfirmAddToPlayer = () => {
    if (!playableAudioUrl.trim()) {
      alert('ദയവായി ഓഡിയോ ലിങ്ക് നൽകുക');
      return;
    }
    if (currentSelected) {
      convertWrittenToPlayable(currentSelected, playableAudioUrl.trim());
      setShowAddToPlayerModal(false);
      setPlayableAudioUrl('');
      setActiveTab('songs');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/30 text-[#1DB954] text-xs font-bold mb-1">
            <PenTool className="w-3.5 h-3.5" />
            <span>പാട്ടെഴുത്തുപുര (Songwriting Studio)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            വരികൾ രചിക്കാനും സൂക്ഷിക്കാനും
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            നിങ്ങളുടെ പുതിയ ഗാനങ്ങൾ എഴുതാം, ഈണം ഹം ചെയ്തു റെക്കോർഡ് ചെയ്യാം, പ്ലെയറിലേക്ക് മാറ്റാം.
          </p>
        </div>

        <button
          onClick={handleStartNew}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-xs sm:text-sm shadow-lg shadow-[#1DB954]/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>പുതിയ പാട്ട് എഴുതുക</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Written Songs Library (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1DB954]" />
              <span>എഴുതിയ പാട്ടുകൾ ({writtenSongs.length})</span>
            </h3>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {writtenSongs.map(song => {
              const isSelected = selectedSongId === song.id;

              return (
                <div
                  key={song.id}
                  onClick={() => handleSelectSong(song)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#17251c] border-[#1DB954] shadow-md shadow-[#1DB954]/10'
                      : 'bg-[#141414] border-white/5 hover:border-white/15 hover:bg-[#181818]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-[#1DB954]">
                      {song.title}
                    </h4>
                    <span className="text-[10px] text-[#1DB954] bg-[#1DB954]/10 px-2 py-0.5 rounded border border-[#1DB954]/20 shrink-0">
                      {song.category}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {song.lyrics.replace(/\[.*?\]/g, '').trim()}
                  </p>

                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5 text-[11px] text-zinc-500">
                    <span className="truncate">രചന: {song.author}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span>{song.createdAt}</span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          if (confirm(`"${song.title}" എന്ന രചന ഡിലീറ്റ് ചെയ്യണമെന്നുറപ്പാണോ?`)) {
                            deleteWrittenSong(song.id);
                            if (selectedSongId === song.id) {
                              setSelectedSongId(null);
                            }
                          }
                        }}
                        className="p-1 rounded-full text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="ഈ രചന ഡിലീറ്റ് ചെയ്യുക"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Editor / Reader Area (8 cols on lg) */}
        <div className="lg:col-span-8">
          {isEditing || selectedSongId === null ? (
            /* EDITOR FORM */
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-[#1DB954]" />
                  <span>{selectedSongId ? 'പാട്ട് തിരുത്തുക' : 'പുതിയ പാട്ടെഴുത്ത്'}</span>
                </h3>

                {selectedSongId && (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    വായിക്കൽ രീതിയിലേക്ക്
                  </button>
                )}
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      പാട്ടിന്റെ പേര് (Title) *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="ഉദാ: മദീനത്തെ കുളിർതെന്നൽ"
                      className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#1DB954]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      രചയിതാവ് (Author)
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                      placeholder="നിങ്ങളുടെ പേര്"
                      className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#1DB954]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      വിഭാഗം (Category)
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#1DB954]"
                    >
                      <option value="മദ്ഹ് ഗാനം">മദ്ഹ് ഗാനം (Devotional / Praise)</option>
                      <option value="മാപ്പിളപ്പാട്ട്">മാപ്പിളപ്പാട്ട് (Mappila Song)</option>
                      <option value="ഖസീദ">ഖസീദ (Qasida / Arabic-Malayalam)</option>
                      <option value="ബൈത്ത്">ബൈത്ത് (Baith / Salawath)</option>
                      <option value="കവിത">കവിത (Spiritual Poetry)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      ഇശൽ / ഈണം (Ishal & Rhythm)
                    </label>
                    <select
                      value={ishalType}
                      onChange={e => setIshalType(e.target.value)}
                      className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#1DB954]"
                    >
                      <option value="തൊങ്ങൽ ഇശൽ">തൊങ്ങൽ ഇശൽ (ഭക്തിസാന്ദ്രമായ ഈണം)</option>
                      <option value="കമ്പ് ഇശൽ">കമ്പ് ഇശൽ (താളബദ്ധമായ വരികൾ)</option>
                      <option value="മുറുക്കം">മുറുക്കം (വേഗതയേറിയ താളം)</option>
                      <option value="കപ്പപ്പാട്ട്">കപ്പപ്പാട്ട് ശൈലി</option>
                      <option value="ദഫ് ഈണം">ദഫ് ഈണം</option>
                      <option value="സ്വതന്ത്ര ശൈലി">സ്വതന്ത്ര ശൈലി (Free Verse)</option>
                    </select>
                  </div>
                </div>

                {/* Verse Structure Insertion Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-zinc-400 font-medium">ടാഗുകൾ ചേർക്കുക:</span>
                  <button
                    type="button"
                    onClick={() => insertVerseTag('പല്ലവി')}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10"
                  >
                    + പല്ലവി (Pallavi)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVerseTag('അനുപല്ലവി')}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10"
                  >
                    + അനുപല്ലവി (Anupallavi)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVerseTag('ചരണം')}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10"
                  >
                    + ചരണം (Charanam)
                  </button>
                </div>

                {/* Lyrics Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    വരികൾ (Lyrics Content) *
                  </label>
                  <textarea
                    rows={12}
                    required
                    value={lyrics}
                    onChange={e => setLyrics(e.target.value)}
                    placeholder="വരികൾ ഇവിടെ എഴുതാം..."
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white placeholder-zinc-500 text-sm leading-relaxed font-sans focus:outline-none focus:border-[#1DB954] resize-y"
                  />
                  <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                    <span>{lyrics.split(/\s+/).filter(Boolean).length} വാക്കുകൾ</span>
                    <span>{lyrics.length} അക്ഷരങ്ങൾ</span>
                  </div>
                </div>

                {/* Voice Melody Hum / Audio Recording Section */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5 text-rose-400" />
                        <span>ഈണം റെക്കോർഡ് ചെയ്യാം (Voice Hum / Melody)</span>
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        എഴുതുമ്പോൾ മനസ്സിൽ വരുന്ന ഈണം പാടി റെക്കോർഡ് ചെയ്തു സൂക്ഷിക്കാം
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isRecording ? (
                        <button
                          type="button"
                          onClick={startRecording}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30 transition-colors"
                        >
                          <Mic className="w-3.5 h-3.5" />
                          <span>റെക്കോർഡ്</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={stopRecording}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-bold animate-pulse"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>നിർത്തുക ({recordingDuration}s)</span>
                        </button>
                      )}

                      {audioRecordingUrl && (
                        <button
                          type="button"
                          onClick={togglePlayRecording}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1DB954] text-black text-xs font-bold"
                        >
                          {isPlayingRecording ? (
                            <Pause className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-current" />
                          )}
                          <span>കേൾക്കുക</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    കുറിപ്പുകൾ / ഓർമ്മക്കുറിപ്പുകൾ (Notes)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="ഉദാ: ഏത് രാഗത്തിലാണ്, ഏത് സന്ദർഭത്തിലാണ് എഴുതിയത്..."
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#1DB954]"
                  />
                </div>

                {/* Submit Actions */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  {selectedSongId && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white text-xs font-semibold"
                    >
                      റദ്ദാക്കുക
                    </button>
                  )}

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-xs shadow-lg shadow-[#1DB954]/20 active:scale-95 transition-all"
                  >
                    <Bookmark className="w-4 h-4 stroke-[2.5]" />
                    <span>സൂക്ഷിക്കുക (Save Song)</span>
                  </button>
                </div>
              </form>
            </div>
          ) : currentSelected ? (
            /* VIEW SONG DETAILS */
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              {/* Header actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#1DB954] bg-[#1DB954]/10 px-2.5 py-0.5 rounded-full border border-[#1DB954]/20">
                      {currentSelected.category}
                    </span>
                    {currentSelected.ishalType && (
                      <span className="text-xs text-zinc-400">
                        {currentSelected.ishalType}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {currentSelected.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    രചന: <span className="text-white font-medium">{currentSelected.author}</span> •{' '}
                    {currentSelected.createdAt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>തിരുത്തുക</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="കോപ്പി ചെയ്യുക"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#1DB954]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'കോപ്പി ചെയ്തു' : 'കോപ്പി'}</span>
                  </button>

                  <button
                    onClick={handleDownloadTxt}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="ടെക്സ്റ്റ് ഫയലായി ഡൗൺലോഡ് ചെയ്യുക"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>ഡൗൺലോഡ്</span>
                  </button>

                  <button
                    onClick={() => setShowAddToPlayerModal(true)}
                    className="px-4 py-1.5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#1DB954]/20"
                    title="ഓഡിയോ ലിങ്ക് ചേർത്ത് പ്ലെയറിൽ കേൾക്കുക"
                  >
                    <Music className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>പ്ലേലിസ്റ്റിലേക്ക്</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('ഈ രചന ഒഴിവാക്കണോ?')) {
                        deleteWrittenSong(currentSelected.id);
                        setSelectedSongId(null);
                      }
                    }}
                    className="p-1.5 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="ഒഴിവാക്കുക"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Recorded Tune Player if available */}
              {currentSelected.audioRecordingUrl && (
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-black border border-[#1DB954]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1DB954] text-black flex items-center justify-center">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">റിക്കോർഡ് ചെയ്ത ഈണം</p>
                      <p className="text-[11px] text-zinc-400">രചയിതാവ് പാടി സൂക്ഷിച്ച ഈണം കേൾക്കാം</p>
                    </div>
                  </div>

                  <button
                    onClick={togglePlayRecording}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1DB954] text-black text-xs font-bold"
                  >
                    {isPlayingRecording ? (
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>{isPlayingRecording ? 'നിർത്തുക' : 'പ്ലേ ചെയ്യുക'}</span>
                  </button>
                </div>
              )}

              {/* Formatted Lyrics View */}
              <div className="whitespace-pre-line text-base sm:text-lg leading-loose text-zinc-100 font-sans tracking-wide bg-black/30 p-6 rounded-2xl border border-white/5 select-text">
                {currentSelected.lyrics}
              </div>

              {/* Notes */}
              {currentSelected.notes && (
                <div className="text-xs text-zinc-400 bg-white/5 p-3.5 rounded-xl border border-white/5">
                  <span className="font-bold text-zinc-300">കുറിപ്പ്: </span>
                  {currentSelected.notes}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#141414] border border-white/5 rounded-2xl space-y-3">
              <PenTool className="w-10 h-10 text-zinc-600 mx-auto" />
              <h3 className="text-base font-bold text-white">ഒരു പാട്ട് തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ പുതിയത് എഴുതുക</h3>
              <p className="text-xs text-zinc-400">ഇടതുവശത്തെ ലിസ്റ്റിൽ നിന്ന് വായിക്കുകയോ പുതിയ രചന ആരംഭിക്കുകയോ ചെയ്യാം.</p>
              <button
                onClick={handleStartNew}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1DB954] text-black text-xs font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>പുതിയ പാട്ട് എഴുതുക</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Convert to playable modal */}
      {showAddToPlayerModal && currentSelected && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              '{currentSelected.title}' പ്ലെയറിലേക്ക് മാറ്റുക
            </h3>
            <p className="text-xs text-zinc-400">
              ഈ പാട്ടിന് യോജിച്ച ഒരു ഓഡിയോ ലിങ്കോ അല്ലെങ്കിൽ നിങ്ങൾ പാടിയ റെക്കോർഡിംഗ് ലിങ്കോ നൽകുക.
            </p>

            <input
              type="url"
              required
              value={playableAudioUrl}
              onChange={e => setPlayableAudioUrl(e.target.value)}
              placeholder="https://example.com/song.mp3"
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#1DB954]"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddToPlayerModal(false)}
                className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white text-xs"
              >
                റദ്ദാക്കുക
              </button>
              <button
                onClick={handleConfirmAddToPlayer}
                className="px-4 py-2 rounded-xl bg-[#1DB954] text-black font-bold text-xs"
              >
                പ്ലേലിസ്റ്റിൽ ചേർക്കുക
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
