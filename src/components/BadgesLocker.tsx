import React, { useState } from 'react';
import { Badge, UserProgression } from '../types/workout';
import { 
  Trophy, 
  Baby, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  Moon, 
  HeartHandshake, 
  Activity, 
  Footprints, 
  Zap, 
  Compass, 
  Crown, 
  Award,
  Lock
} from 'lucide-react';

interface BadgesLockerProps {
  badges: Badge[];
  progression: UserProgression;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Baby,
  Moon,
  HeartHandshake,
  ShieldCheck,
  Activity,
  Footprints,
  Flame,
  Trophy,
  Zap,
  Sparkles,
  Compass,
  Crown,
  Award,
};

export const BadgesLocker: React.FC<BadgesLockerProps> = ({ badges, progression }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const unlockedCount = badges.filter(b => b.unlockedAt).length;

  const categories = [
    { id: 'all', label: 'Svi Bedževi' },
    { id: 'dad', label: 'Tate & Inkubator' },
    { id: 'back', label: 'Leđa & Oporavak' },
    { id: 'strength', label: 'Snaga & Izazovi' },
    { id: 'bjj', label: 'BJJ Mobilnost' },
    { id: 'streak', label: 'Kontinuitet' },
  ];

  const filteredBadges = badges.filter(b => {
    if (categoryFilter === 'all') return true;
    return b.category === categoryFilter;
  });

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 shrink-0">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Sustav Nagrada & Bedževi</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Slavi svaki mali korak povratka treninzima i čuvanja leđa uz bebu.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Otključano</span>
            <span className="text-lg font-bold font-mono text-amber-400">
              {unlockedCount} / {badges.length}
            </span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Ukupno XP</span>
            <span className="text-lg font-bold font-mono text-emerald-400">
              {progression.xp}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              categoryFilter === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map(badge => {
          const IconComponent = ICON_MAP[badge.icon] || Trophy;
          const isUnlocked = !!badge.unlockedAt;

          return (
            <div
              key={badge.id}
              className={`relative overflow-hidden rounded-2xl p-4 border transition-all ${
                isUnlocked
                  ? 'bg-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-950/60 border-slate-800/80 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isUnlocked
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}
                >
                  {isUnlocked ? (
                    <IconComponent className="w-6 h-6" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className={`text-sm font-bold truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {badge.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    {badge.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 uppercase font-mono tracking-wider">
                      {badge.category}
                    </span>
                    {isUnlocked ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Otključano!
                      </span>
                    ) : (
                      <span className="text-slate-600 italic">Zaključano</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
