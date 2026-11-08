import React, { useState, useEffect } from 'react';
import { Flame, Clock, Baby, Zap, Info } from 'lucide-react';
import { getTimeUntilZagrebMidnight } from '../utils/dateUtils';
import { UserProgression } from '../types/workout';

interface HeaderProps {
  progression: UserProgression;
  onToggleDadMode: () => void;
  onOpenDadGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progression,
  onToggleDadMode,
  onOpenDadGuide,
}) => {
  const [countdown, setCountdown] = useState(getTimeUntilZagrebMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilZagrebMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-amber-500/10">
            TF
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold tracking-tight text-white whitespace-nowrap">
                TataFit
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                Zagreb 00:00 Reset
              </span>
            </div>
            <p className="text-[11px] text-slate-400 whitespace-nowrap">
              Trening & Oporavak za Tate
            </p>
          </div>
        </div>

        {/* Zone 2: Midnight Countdown & Stats */}
        <div className="hidden sm:flex items-center gap-4 text-xs">
          {/* Midnight Countdown */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Novi trening za:</span>
            <span className="font-mono font-bold text-amber-400">
              {countdown.formatted}
            </span>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500/20" />
            <span className="font-bold text-white">{progression.currentStreak} d</span>
            <span className="text-slate-500 text-[11px]">(Niz)</span>
          </div>

          {/* XP & Level */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-mono font-medium">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>{progression.xp} XP</span>
          </div>
        </div>

        {/* Zone 3: Actions (Dad Mode Toggle & Guide) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleDadMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              progression.preferences.dadMode
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Tata Mode: Dijeli trening u mikrosekcije kroz dan"
          >
            <Baby className="w-4 h-4 text-amber-400" />
            <span className="hidden xs:inline whitespace-nowrap">
              {progression.preferences.dadMode ? 'Sekcije ON' : 'Puni Trening'}
            </span>
          </button>

          <button
            onClick={onOpenDadGuide}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="Savjeti za leđa & inkubator"
          >
            <Info className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Mobile-only compact stats bar */}
      <div className="sm:hidden mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1 text-[11px]">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>Reset:</span>
          <span className="font-mono font-bold text-amber-400">{countdown.formatted}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px]">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span className="font-bold text-white">{progression.currentStreak} d</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
            <Zap className="w-3 h-3 fill-emerald-400" />
            <span>{progression.xp} XP</span>
          </div>
        </div>
      </div>
    </header>
  );
};
