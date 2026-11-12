import React from 'react';
import { Trophy, History, Sparkles } from 'lucide-react';

export type NavTab = 'daily' | 'badges' | 'history';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  hasPendingBackRoutine: boolean;
  unlockedBadgeCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  hasPendingBackRoutine,
  unlockedBadgeCount,
}) => {
  const tabs: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }>; badgeAlert?: boolean; count?: number }[] = [
    { id: 'daily', label: 'Danas', icon: Sparkles, badgeAlert: hasPendingBackRoutine },
    { id: 'badges', label: 'Bedževi', icon: Trophy, count: unlockedBadgeCount },
    { id: 'history', label: 'Dnevnik & Vodič', icon: History },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-1.5 pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-3 items-center h-14 gap-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-colors rounded-xl ${
                isActive
                  ? 'text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-amber-400' : 'text-slate-400'}`} />
                {tab.badgeAlert && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-slate-950 animate-ping" />
                )}
                {tab.badgeAlert && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-slate-950" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 whitespace-nowrap ${isActive ? 'text-amber-300 font-bold' : 'text-slate-400'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
