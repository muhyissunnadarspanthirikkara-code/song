import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Clock, X, Check, Moon } from 'lucide-react';

export const SleepTimerModal: React.FC = () => {
  const {
    showSleepTimerModal,
    setShowSleepTimerModal,
    sleepTimerSeconds,
    setSleepTimer
  } = usePlayer();

  if (!showSleepTimerModal) return null;

  const timerOptions = [
    { minutes: 15, label: '15 മിനിറ്റ്' },
    { minutes: 30, label: '30 മിനിറ്റ്' },
    { minutes: 45, label: '45 മിനിറ്റ്' },
    { minutes: 60, label: '1 മണിക്കൂർ' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-sm p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => setShowSleepTimerModal(false)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">സ്ലീപ്പ് ടൈമർ (Sleep Timer)</h3>
            <p className="text-xs text-zinc-400">നിശ്ചിത സമയത്തിന് ശേഷം പാട്ട് സ്വയം നിലയ്ക്കും</p>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          {timerOptions.map(opt => {
            const isCurrent =
              sleepTimerSeconds !== null &&
              Math.round(sleepTimerSeconds / 60) === opt.minutes;

            return (
              <button
                key={opt.minutes}
                onClick={() => {
                  setSleepTimer(opt.minutes);
                  setShowSleepTimerModal(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-all ${
                  isCurrent
                    ? 'border-[#1DB954] bg-[#1DB954]/10 text-[#1DB954]'
                    : 'border-white/5 bg-white/5 hover:bg-white/10 text-white'
                }`}
              >
                <span>{opt.label}</span>
                {isCurrent && <Check className="w-4 h-4 text-[#1DB954]" />}
              </button>
            );
          })}

          {sleepTimerSeconds !== null && (
            <button
              onClick={() => {
                setSleepTimer(null);
                setShowSleepTimerModal(false);
              }}
              className="w-full mt-3 p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition-all text-center"
            >
              ടൈമർ റദ്ദാക്കുക (Turn Off Timer)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
