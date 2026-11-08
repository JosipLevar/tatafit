import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle2, ShieldAlert, Dumbbell, Timer, Plus, Minus } from 'lucide-react';
import { ExerciseItem } from '../types/workout';

interface ExerciseModalProps {
  exercise: ExerciseItem | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (exerciseId: string) => void;
  accumulatedReps?: number;
  onUpdateAccumulatedReps?: (exerciseId: string, delta: number) => void;
}

export const ExerciseModal: React.FC<ExerciseModalProps> = ({
  exercise,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete,
  accumulatedReps = 0,
  onUpdateAccumulatedReps,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (exercise?.isTimed && exercise.durationSeconds) {
      setSecondsLeft(exercise.durationSeconds);
      setIsRunning(false);
    }
  }, [exercise]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  if (!isOpen || !exercise) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {exercise.croatianName || exercise.name}
              </h3>
              <p className="text-xs font-mono text-slate-400">{exercise.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Summary Pills */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Serije
              </span>
              <span className="text-lg font-bold font-mono text-amber-400">
                {exercise.sets}x
              </span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Ponavljanja
              </span>
              <span className="text-lg font-bold font-mono text-emerald-400">
                {exercise.reps}
              </span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Pauza
              </span>
              <span className="text-lg font-bold font-mono text-sky-400">
                {exercise.restSeconds ? `${exercise.restSeconds}s` : 'Po želji'}
              </span>
            </div>
          </div>

          {/* Interactive Rep Counter for Challenges */}
          {exercise.targetCount && onUpdateAccumulatedReps && (
            <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                  Akumulirana ponavljanja danas
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  {accumulatedReps} / {exercise.targetCount}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, (accumulatedReps / exercise.targetCount) * 100)}%` }}
                />
              </div>

              {/* Quick Increment Buttons */}
              <div className="flex items-center justify-center gap-2">
                {[+5, +10, +20].map(val => (
                  <button
                    key={val}
                    onClick={() => onUpdateAccumulatedReps(exercise.id, val)}
                    className="flex-1 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-xs font-bold text-amber-300 transition-colors"
                  >
                    +{val}
                  </button>
                ))}
                <button
                  onClick={() => onUpdateAccumulatedReps(exercise.id, -5)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 text-xs font-bold text-rose-400 transition-colors"
                  title="Oduzmi 5"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Timed Exercise Stopwatch */}
          {exercise.isTimed && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-center">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-medium mb-1">
                <Timer className="w-4 h-4 text-emerald-400" />
                <span>Štoperica za izometriju</span>
              </div>
              <div className="text-4xl font-extrabold font-mono text-white my-2 tracking-wider">
                {formatTime(secondsLeft)}
              </div>
              <div className="flex items-center justify-center gap-3 mt-3">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                    isRunning
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  {isRunning ? 'Pauziraj' : 'Pokreni'}
                </button>
                <button
                  onClick={() => {
                    setIsRunning(false);
                    setSecondsLeft(exercise.durationSeconds || 60);
                  }}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Upute za izvođenje
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
              {exercise.description}
            </p>
          </div>

          {/* Back Friendly Spondylitis Tip */}
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Savjet za leđa & spondiloartritis</span>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              {exercise.backFriendlyTip}
            </p>
          </div>

          {/* Muscle Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-500 font-medium mr-1">Target:</span>
            {exercise.targetMuscles.map(m => (
              <span
                key={m}
                className="text-[11px] text-slate-300 font-medium"
              >
                {m} <span className="text-slate-700">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950">
          <button
            onClick={() => {
              onToggleComplete(exercise.id);
              onClose();
            }}
            className={`w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              isCompleted
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/10'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{isCompleted ? 'Označi kao ne-odrađeno' : 'Označi kao odrađeno'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
