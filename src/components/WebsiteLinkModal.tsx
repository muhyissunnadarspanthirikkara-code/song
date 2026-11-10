import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  Globe,
  X,
  ExternalLink,
  Copy,
  Check,
  Github,
  Sparkles,
  Share2,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const WebsiteLinkModal: React.FC = () => {
  const { showWebsiteModal, setShowWebsiteModal } = usePlayer();

  const [copied, setCopied] = useState(false);
  const [ghUser, setGhUser] = useState('');
  const [ghRepo, setGhRepo] = useState('');

  if (!showWebsiteModal) return null;

  // AI Studio live shared app URL
  const liveAppUrl = 'https://ais-pre-izgeixyu2nq7vsl3nx6mjv-310801142639.asia-east1.run.app';

  // GitHub Pages URL if user provides repo
  const githubPagesUrl = ghUser && ghRepo
    ? `https://${ghUser.trim().toLowerCase()}.github.io/${ghRepo.trim()}/`
    : '';

  const handleCopy = async (urlToCopy: string) => {
    await navigator.clipboard.writeText(urlToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenLink = (urlToOpen: string) => {
    window.open(urlToOpen, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-white/10 rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setShowWebsiteModal(false)}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#1DB954]/20 border border-[#1DB954]/40 flex items-center justify-center text-[#1DB954] shadow-lg shadow-[#1DB954]/10">
            <Globe className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">വെബ്സൈറ്റ് ലിങ്ക് (Website Live Link)</h3>
            <p className="text-xs text-zinc-400">
              ഏത് ബ്രൗസറിലും ഗിറ്റ്ഹബ്ബിലും തൊട്ടാൽ നേരിട്ട് വെബ്സൈറ്റ് ലഭിക്കും
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Section 1: Active Live Website Link */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#1a1a1a] to-[#161616] border border-[#1DB954]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1DB954] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>തത്സമയ ലൈവ് വെബ്സൈറ്റ് ലിങ്ക് (Live Online URL)</span>
              </span>
              <span className="text-[10px] bg-[#1DB954]/20 text-[#1DB954] font-semibold px-2 py-0.5 rounded-full border border-[#1DB954]/30">
                സജീവം
              </span>
            </div>

            <div className="bg-black/40 rounded-xl p-2.5 border border-white/10 flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-zinc-300 truncate select-all">
                {liveAppUrl}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => handleCopy(liveAppUrl)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 active:scale-95 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-[#1DB954]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'കോപ്പി ചെയ്തു!' : 'ലിങ്ക് കോപ്പി ചെയ്യുക'}</span>
              </button>

              <button
                onClick={() => handleOpenLink(liveAppUrl)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-bold shadow-lg shadow-[#1DB954]/20 active:scale-95 transition-all"
              >
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                <span>വെബ്സൈറ്റ് തുറക്കുക</span>
              </button>
            </div>
          </div>

          {/* Section 2: GitHub Pages Integration Info */}
          <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-white text-sm font-bold">
              <Github className="w-4 h-4 text-white" />
              <span>GitHub Pages-ലേക്ക് സെറ്റപ്പ് ചെയ്യാനുള്ള വഴി</span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              ഗിറ്റ്ഹബ്ബിൽ വെബ്സൈറ്റ് ഓട്ടോമാറ്റിക് ആയി പ്രവർത്തിക്കാൻ <code className="text-[#1DB954] bg-white/5 px-1 py-0.5 rounded">base: './'</code> കോൺഫിഗറേഷനും <code className="text-[#1DB954] bg-white/5 px-1 py-0.5 rounded">.github/workflows/deploy.yml</code> ഫയലും നാം ചേർത്തുകഴിഞ്ഞു.
            </p>

            <div className="bg-black/30 rounded-xl p-3 border border-white/5 space-y-2 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1DB954] text-black font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>നിങ്ങളുടെ GitHub Repository തുറന്ന് <b>Settings</b> &gt; <b>Pages</b> എടുക്കുക.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1DB954] text-black font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span><b>Build and deployment</b> എന്നതിനടിയിൽ Source എന്നത് <b>GitHub Actions</b> എന്ന് തിരഞ്ഞെടുക്കുക.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1DB954] text-black font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>ഇതോടെ നിങ്ങളുടെ GitHub ലിങ്ക് തൊടുമ്പോൾ തന്നെ വെബ്സൈറ്റ് പൂർണ്ണമായി കാണാം!</span>
              </div>
            </div>

            {/* Optional GitHub Repo Link Generator */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <label className="block text-[11px] font-semibold text-zinc-400">
                നിങ്ങളുടെ GitHub Username &amp; Repo Name നൽകിയാൽ ലിങ്ക് നേരിട്ട് എടുക്കാം:
              </label>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Username (e.g. jaleel)"
                  value={ghUser}
                  onChange={e => setGhUser(e.target.value)}
                  className="bg-[#121212] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#1DB954]"
                />
                <input
                  type="text"
                  placeholder="Repo (e.g. kelkaam)"
                  value={ghRepo}
                  onChange={e => setGhRepo(e.target.value)}
                  className="bg-[#121212] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#1DB954]"
                />
              </div>

              {githubPagesUrl && (
                <div className="flex items-center justify-between gap-2 bg-black/40 p-2.5 rounded-xl border border-[#1DB954]/30 mt-2">
                  <span className="text-xs font-mono text-[#1DB954] truncate">
                    {githubPagesUrl}
                  </span>
                  <button
                    onClick={() => handleCopy(githubPagesUrl)}
                    className="p-1 text-zinc-400 hover:text-white"
                    title="കോപ്പി ചെയ്യുക"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 text-center">
          <button
            onClick={() => setShowWebsiteModal(false)}
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors"
          >
            മനസ്സിലായി (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
