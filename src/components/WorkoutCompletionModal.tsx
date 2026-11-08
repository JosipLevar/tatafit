import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle2, HeartPulse, Sparkles, X } from 'lucide-react';
import { DailyWorkout } from '../types/workout';

interface WorkoutCompletionModalProps {
  workout: DailyWorkout;
  isOpen: boolean;
  onClose: () => void;
  onSubmitLog: (
    difficulty: 'too_easy' | 'just_right' | 'too_hard',
    painRating: number,
    notes: string
  ) => void;
}

export const WorkoutCompletionModal: React.FC<WorkoutCompletionModalProps> = ({
  workout,
  isOpen,
  onClose,
  onSubmitLog,
}) => {
  const [difficulty, setDifficulty] = useState<'too_easy' | 'just_right' | 'too_hard'>('just_right');
  const [painRating, setPainRating] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTriggerConfetti();
    onSubmitLog(difficulty, painRating, notes);
    onClose();
  };

  const painLabels: Record<number, { title: string; color: string }> = {
    1: { title: '1 - Bez boli (Osjećam se odlično)', color: 'text-emerald-400' },
    2: { title: '2 - Blaga ukočenost (Normalno za spondilitis)', color: 'text-emerald-300' },
    3: { title: '3 - Umjerena nelagoda (Prihvatljivo)', color: 'text-amber-400' },
    4: { title: '4 - Jača bol (Potreban odmor)', color: 'text-orange-400' },
    5: { title: '5 - Teška bol (Stop!)', color: 'text-rose-400' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 mx-auto flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 mb-3">
            <Trophy className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Trening Odrađen! Bravo! 🏆
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {workout.title} · {workout.durationMin} min
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Difficulty Feedback */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Kako ti je legao današnji trening?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'too_easy', label: 'Pre-lagano' },
                { id: 'just_right', label: 'Taman' },
                { id: 'too_hard', label: 'Pre-teško' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDifficulty(opt.id as any)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    difficulty === opt.id
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pain Scale (Crucial for Spondylitis and Back health) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-emerald-400" />
                <span>Status leđa & Boli (1-5)</span>
              </label>
              <span className={`text-xs font-bold ${painLabels[painRating].color}`}>
                {painRating}/5
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setPainRating(rating)}
                  className={`flex-1 h-10 rounded-xl font-mono font-bold text-sm border transition-all ${
                    painRating === rating
                      ? rating <= 2
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : rating === 3
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-rose-500 text-white border-rose-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 italic">
              {painLabels[painRating].title}
            </p>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Bilješka (Beba, oporavak, dojmovi)
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Npr. Odradio u 2 sekcije dok je beba spavala. Leđa se osjećaju stabilno..."
              className="w-full h-20 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:opacity-95 transition-opacity"
          >
            <Sparkles className="w-5 h-5 fill-slate-950" />
            <span>Spremi Trening & Preuzmi XP</span>
          </button>
        </form>
      </div>
    </div>
  );
};
