import React, { useState, useEffect } from 'react';
import { DailyWorkout, ExerciseItem, WorkoutLog } from '../types/workout';
import { getTimeUntilZagrebMidnight } from '../utils/dateUtils';
import { BackWorkoutStatus } from '../utils/dailyWorkoutGenerator';
import { getExerciseAlternatives } from '../data/workouts';
import { 
  Dumbbell, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Baby, 
  TrendingUp, 
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Trophy,
  HeartPulse,
  RotateCcw,
  Flame,
  AlertTriangle,
  XCircle,
  RefreshCw,
  X
} from 'lucide-react';

interface DailyWorkoutCardProps {
  workout: DailyWorkout;
  completedExerciseIds: string[];
  exerciseReps: Record<string, number>;
  onSelectExercise: (ex: ExerciseItem) => void;
  onToggleExercise: (exId: string) => void;
  onCompleteWorkout: () => void;
  onSkipWorkout?: () => void;
  isDadMode: boolean;
  isWorkoutAlreadyLogged: boolean;
  todayLog?: WorkoutLog;
  onSwitchToBackRoutine?: () => void;
  onSwitchBackToDaily?: () => void;
  isViewingBackRoutine?: boolean;
  backWorkoutStatus?: BackWorkoutStatus;
  hasBackRoutineThisWeek: boolean;
  onOpenTimer?: () => void;
  onCompleteSection?: (exerciseIds: string[], targetState: boolean) => void;
  onSwapExercise?: (originalExercise: ExerciseItem, replacement: ExerciseItem) => void;
  onResetExercise?: (exerciseId: string) => void;
  exerciseReplacements?: Record<string, ExerciseItem>;
}

export const DailyWorkoutCard: React.FC<DailyWorkoutCardProps> = ({
  workout,
  completedExerciseIds,
  exerciseReps,
  onSelectExercise,
  onToggleExercise,
  onCompleteWorkout,
  onSkipWorkout,
  isDadMode,
  isWorkoutAlreadyLogged,
  todayLog,
  onSwitchToBackRoutine,
  onSwitchBackToDaily,
  isViewingBackRoutine = false,
  backWorkoutStatus,
  hasBackRoutineThisWeek,
  onOpenTimer,
  onCompleteSection,
  onSwapExercise,
  onResetExercise,
  exerciseReplacements = {},
}) => {
  const [showExerciseReview, setShowExerciseReview] = useState<boolean>(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState<boolean>(false);
  const [exerciseToSwap, setExerciseToSwap] = useState<ExerciseItem | null>(null);
  const [countdown, setCountdown] = useState(getTimeUntilZagrebMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilZagrebMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const completedSet = new Set(completedExerciseIds);
  const totalExercises = workout.exercises.length;
  const completedCount = workout.exercises.filter(ex => completedSet.has(ex.id)).length;
  const progressPercent = Math.round((completedCount / (totalExercises || 1)) * 100);

  const getWorkoutTypeTheme = (type: string) => {
    switch (type) {
      case 'emom':
        return {
          bg: 'from-amber-950/70 via-rose-950/40 to-slate-900',
          border: 'border-amber-500/50',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      case 'pyramid':
        return {
          bg: 'from-purple-950/70 via-indigo-950/40 to-slate-900',
          border: 'border-purple-500/50',
          badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        };
      case 'shadow_boxing':
        return {
          bg: 'from-orange-950/70 via-red-950/40 to-slate-900',
          border: 'border-orange-500/50',
          badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
        };
      case 'walking_challenge':
        return {
          bg: 'from-emerald-950/70 via-teal-950/40 to-slate-900',
          border: 'border-emerald-500/50',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
      case 'core_challenge':
        return {
          bg: 'from-indigo-950/70 via-purple-950/40 to-slate-900',
          border: 'border-indigo-500/50',
          badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
        };
      case 'animal_flow':
        return {
          bg: 'from-amber-950/60 via-emerald-950/40 to-slate-900',
          border: 'border-amber-500/50',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      case 'tabata':
        return {
          bg: 'from-rose-950/60 via-amber-950/40 to-slate-900',
          border: 'border-rose-500/50',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        };
      case 'isometrics':
        return {
          bg: 'from-cyan-950/60 via-slate-900 to-slate-900',
          border: 'border-cyan-500/50',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        };
      case 'back_bulletproof':
        return {
          bg: 'from-emerald-900/40 to-slate-900',
          border: 'border-emerald-500/40',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
      case 'challenge':
        return {
          bg: 'from-amber-900/40 to-slate-900',
          border: 'border-amber-500/40',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      case 'running':
        return {
          bg: 'from-sky-900/40 to-slate-900',
          border: 'border-sky-500/40',
          badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        };
      default:
        return {
          bg: 'from-indigo-900/40 to-slate-900',
          border: 'border-indigo-500/40',
          badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
        };
    }
  };

  const theme = getWorkoutTypeTheme(workout.type);

  // IF WORKOUT FOR TODAY IS ALREADY LOGGED: SHOW CELEBRATORY COMPLETED DAY VIEW!
  if (isWorkoutAlreadyLogged && !showExerciseReview) {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20 shrink-0">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Odrađeno za Danas!
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {workout.typeLabel}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Trening za Danas je Završen! Oss! 🥋
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Sjajan posao! Odradio si današnji trening <strong>"{workout.title}"</strong>. Odmori leđa, posveti se obitelji i bebi. Novi trening se otključava točno u ponoć!
          </p>

          {/* Today's Stats & Log Summary */}
          {todayLog && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Status Boli Leđa
                </span>
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <HeartPulse className="w-4 h-4 text-emerald-400" />
                  Ocjena {todayLog.painRating}/5
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Trajanje
                </span>
                <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                  {todayLog.durationMinutes} min
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Osjećaj
                </span>
                <span className="text-xs font-bold text-amber-300 mt-0.5 block capitalize">
                  {todayLog.difficultyFeedback === 'just_right' ? 'Taman' : todayLog.difficultyFeedback === 'too_easy' ? 'Pre-lagano' : 'Pre-teško'}
                </span>
              </div>
            </div>
          )}

          {/* Midnight Countdown Banner */}
          <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Novi trening se otključava u ponoć</h4>
                <p className="text-[11px] text-slate-400">Zagrebačko vrijeme (Europe/Zagreb)</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Preostalo</span>
              <span className="text-lg font-bold font-mono text-amber-400">
                {countdown.formatted}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setShowExerciseReview(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Dumbbell className="w-4 h-4 text-amber-400" />
              <span>Pregledaj ili uredi odrađene vježbe</span>
            </button>

            <button
              onClick={onCompleteWorkout}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span>Ažuriraj ocjenu leđa / zabilješku</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE UNCOMPLETED WORKOUT CARD
  return (
    <div className="space-y-4">
      {/* If manually viewing back routine, offer an easy switch back to scheduled daily workout */}
      {isViewingBackRoutine && onSwitchBackToDaily && (
        <div className="bg-emerald-950/50 border border-emerald-500/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Pregled Protokola za Leđa
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                  Spondiloartritis Oporavak
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Prikazuje se protokol za dekompresiju leđa. Možeš ga odraditi sada ili se vratiti na redovni dnevni raspored.
              </p>
            </div>
          </div>
          <button
            onClick={onSwitchBackToDaily}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Vrati na današnji raspored</span>
          </button>
        </div>
      )}

      {/* Case 1: Overdue (> 7 days) alert */}
      {!isViewingBackRoutine && workout.type !== 'back_bulletproof' && backWorkoutStatus?.isOverdue && onSwitchToBackRoutine && (
        <div className="bg-rose-950/60 border border-rose-500/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Upozorenje: Leđa kasne!
                </span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-mono font-bold">
                  Prošlo {backWorkoutStatus.daysSince !== null ? `${backWorkoutStatus.daysSince} dana` : '> 7 dana'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Prošlo je više od 7 dana od zadnjeg treninga leđa! Zbog spondiloartritisa kralježnica treba rasterećenje.
              </p>
            </div>
          </div>
          <button
            onClick={onSwitchToBackRoutine}
            className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-colors shadow-sm"
          >
            <span>Prebaci na Leđa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Case 2: Done yesterday (daysSince === 1) -> all clear, next in 6 days */}
      {!isViewingBackRoutine && workout.type !== 'back_bulletproof' && backWorkoutStatus?.daysSince === 1 && (
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-emerald-400">
                  Leđa osigurana: Odrađeno jučer ✓
                </span>
                <span className="text-[10px] text-emerald-300 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                  Sljedeći obavezan za 6 dana
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Tjedni protokol za kralježnicu je osiguran. Danas uživaj u zakazanom treningu!
              </p>
            </div>
          </div>
          {onSwitchToBackRoutine && (
            <button
              onClick={onSwitchToBackRoutine}
              className="text-xs font-semibold text-slate-400 hover:text-emerald-300 self-start sm:self-auto transition-colors flex items-center gap-1 shrink-0 px-2 py-1"
            >
              <span>Ipak prebaci na leđa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Case 3: Done 2-7 days ago (tracking active) */}
      {!isViewingBackRoutine && workout.type !== 'back_bulletproof' && backWorkoutStatus && backWorkoutStatus.daysSince !== null && backWorkoutStatus.daysSince > 1 && !backWorkoutStatus.isOverdue && (
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-amber-400">
                  Status leđa: Odrađeno prije {backWorkoutStatus.daysSince} dana
                </span>
                <span className="text-[10px] text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                  Preostalo još {backWorkoutStatus.daysRemaining} {backWorkoutStatus.daysRemaining === 1 ? 'dan' : 'dana'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Pazi da ne prođe više od 7 dana između dva treninga leđa.
              </p>
            </div>
          </div>
          {onSwitchToBackRoutine && (
            <button
              onClick={onSwitchToBackRoutine}
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1 self-start sm:self-auto transition-colors shrink-0"
            >
              <span>Prebaci na Leđa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Main Daily Workout Card Banner */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${theme.bg} border ${theme.border} rounded-3xl p-5 sm:p-6 shadow-xl`}>
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border ${theme.badgeBg}`}>
              {workout.typeLabel}
            </span>
            {workout.isMandatoryBackRoutine && (
              <span className="text-xs font-bold px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Obavezni Protokol Leđa
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {workout.durationMin} min
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Nivo {workout.level}
            </span>
          </div>
        </div>

        {/* Main Title & Description */}
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
          {workout.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
          {workout.description}
        </p>

        {/* Dad Tip Box */}
        {workout.dadTip && (
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 mb-4 flex items-start gap-3">
            <Baby className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/90 leading-normal">
              <strong className="text-amber-400">Savjet za tatu: </strong>
              {workout.dadTip}
            </p>
          </div>
        )}

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Napredak današnjeg treninga</span>
            <span className="font-mono font-bold text-white">{completedCount}/{totalExercises} vježbi ({progressPercent}%)</span>
          </div>
          <div className="w-full h-3 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Exercises Section */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-amber-400" />
            <span>Vježbe za Danas</span>
          </h3>
          <div className="flex items-center gap-2">
            {onOpenTimer && !isWorkoutAlreadyLogged && (
              <button
                onClick={onOpenTimer}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                title="Otvori zvučni intervalni timer (EMOM, Runde, Tabata)"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Timer ⏱️</span>
              </button>
            )}
            {isWorkoutAlreadyLogged && (
              <button
                onClick={() => setShowExerciseReview(false)}
                className="text-xs text-amber-400 font-semibold underline"
              >
                Zatvori pregled vježbi
              </button>
            )}
            {isDadMode && !isWorkoutAlreadyLogged && (
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                <Baby className="w-3.5 h-3.5" />
                Podijeljeno u sekcije
              </span>
            )}
          </div>
        </div>

        {/* Display as Dad Sections or Flat List */}
        {isDadMode && workout.sections && workout.sections.length > 0 ? (
          <div className="space-y-5">
            {workout.sections.map((section) => {
              const secExercises = section.exercises.length > 0 ? section.exercises : workout.exercises;
              const secDoneCount = secExercises.filter(ex => completedSet.has(ex.id)).length;
              const isSecDone = secDoneCount === secExercises.length;

              return (
                <div key={section.id} className="space-y-2.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl p-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          {section.title}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          isSecDone
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}>
                          {secDoneCount}/{secExercises.length} vježbi
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {section.recommendedTime}
                      </span>
                    </div>

                    {onCompleteSection && !isWorkoutAlreadyLogged && (
                      <button
                        onClick={() => onCompleteSection(secExercises.map(e => e.id), !isSecDone)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 self-start sm:self-auto ${
                          isSecDone
                            ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 shadow-sm'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isSecDone ? 'Poništi sekciju' : 'Označi cijelu sekciju'}</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    {secExercises.map(ex => {
                      const isReplaced = !!exerciseReplacements[ex.id] || ex.id.includes('_replaced_') || ex.id.includes('_alt_');
                      return (
                        <ExerciseRow
                          key={ex.id}
                          exercise={ex}
                          isCompleted={completedSet.has(ex.id)}
                          accumulatedReps={exerciseReps[ex.id] || 0}
                          onSelect={() => onSelectExercise(ex)}
                          onToggle={() => onToggleExercise(ex.id)}
                          isReplaced={isReplaced}
                          canSwap={!isWorkoutAlreadyLogged}
                          onSwapClick={() => setExerciseToSwap(ex)}
                          onResetClick={() => onResetExercise && onResetExercise(ex.id)}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {workout.exercises.map(ex => {
              const isReplaced = !!exerciseReplacements[ex.id] || ex.id.includes('_replaced_') || ex.id.includes('_alt_');
              return (
                <ExerciseRow
                  key={ex.id}
                  exercise={ex}
                  isCompleted={completedSet.has(ex.id)}
                  accumulatedReps={exerciseReps[ex.id] || 0}
                  onSelect={() => onSelectExercise(ex)}
                  onToggle={() => onToggleExercise(ex.id)}
                  isReplaced={isReplaced}
                  canSwap={!isWorkoutAlreadyLogged}
                  onSwapClick={() => setExerciseToSwap(ex)}
                  onResetClick={() => onResetExercise && onResetExercise(ex.id)}
                />
              );
            })}
          </div>
        )}

        {/* Completion & Skip Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {completedCount === totalExercises ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Sve vježbe su označene! Klikni za spremanje.
              </span>
            ) : (
              <span>Označi sve vježbe i zabilježi osjećaj u leđima.</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onSkipWorkout && !isWorkoutAlreadyLogged && (
              <button
                onClick={() => setShowSkipConfirm(true)}
                className="px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                title="Preskoči trening danas (s posljedicama za niz i progresiju)"
              >
                <XCircle className="w-4 h-4" />
                <span className="hidden xs:inline">Preskoči</span>
              </button>
            )}

            <button
              onClick={onCompleteWorkout}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                isWorkoutAlreadyLogged
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : completedCount === totalExercises
                  ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 hover:opacity-95 shadow-emerald-500/20'
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>
                {isWorkoutAlreadyLogged ? 'Ažuriraj Dnevnik Treninga' : 'Završi & Spremi Trening'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Skip Consequences Confirmation Modal */}
      {showSkipConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-slate-900 border border-rose-500/40 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Želiš preskočiti trening?</h3>
                <p className="text-[11px] text-slate-400">Posljedice preskakanja:</p>
              </div>
            </div>

            <ul className="text-xs text-rose-200 space-y-1.5 bg-slate-950 p-3 rounded-xl border border-rose-500/20 list-disc list-inside font-medium">
              <li>Nema napretka u nivoima za danas.</li>
              <li>Troši se 1 zamrzavanje niza ("Bebina noćna straža").</li>
              <li>Ako nemaš zamrzavanja, niz (streak) se vraća na 0!</li>
            </ul>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setShowSkipConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
              >
                Ipak ću odraditi
              </button>
              <button
                onClick={() => {
                  setShowSkipConfirm(false);
                  if (onSkipWorkout) onSkipWorkout();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs"
              >
                Preskoči danas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Swap Selection Modal */}
      {exerciseToSwap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Prilagodi & Zamijeni Vježbu</h3>
                  <p className="text-[11px] text-slate-400">
                    Zamijeni: <strong className="text-slate-200">{exerciseToSwap.croatianName || exerciseToSwap.name}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setExerciseToSwap(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Imaš upalu mišića, umor ili želiš opciju koja potpuno rasterećuje prsa i leđa? Odaberi jednu od preporučenih zamjena:
            </p>

            <div className="space-y-2.5">
              {getExerciseAlternatives(exerciseToSwap).map((alt) => (
                <div
                  key={alt.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-emerald-400">
                        {alt.croatianName || alt.name}
                      </h4>
                      <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        {alt.sets}x {alt.reps}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {alt.description}
                    </p>
                    <div className="text-[10px] text-emerald-400/90 mt-1.5 flex items-start gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{alt.backFriendlyTip}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onSwapExercise) {
                        onSwapExercise(exerciseToSwap, alt);
                      }
                      setExerciseToSwap(null);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Odaberi ovu zamjenu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setExerciseToSwap(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
            >
              Zatvori
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface ExerciseRowProps {
  exercise: ExerciseItem;
  isCompleted: boolean;
  accumulatedReps: number;
  onSelect: () => void;
  onToggle: () => void;
  isReplaced?: boolean;
  onSwapClick?: () => void;
  onResetClick?: () => void;
  canSwap?: boolean;
}

const ExerciseRow: React.FC<ExerciseRowProps> = ({
  exercise,
  isCompleted,
  accumulatedReps,
  onSelect,
  onToggle,
  isReplaced = false,
  onSwapClick,
  onResetClick,
  canSwap = true,
}) => {
  return (
    <div
      className={`group flex items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all ${
        isCompleted
          ? 'bg-slate-950/80 border-emerald-500/30 text-slate-400'
          : isReplaced
          ? 'bg-slate-950 border-emerald-500/40 text-white'
          : 'bg-slate-950 border-slate-800/80 hover:border-slate-700 text-white'
      }`}
    >
      {/* Left Checkbox */}
      <button
        onClick={onToggle}
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors min-h-[44px] min-w-[44px] ${
          isCompleted
            ? 'bg-emerald-500 text-slate-950 font-bold'
            : 'bg-slate-900 border border-slate-700 text-slate-500 hover:text-white hover:border-amber-500'
        }`}
      >
        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />}
      </button>

      {/* Middle Clickable Details */}
      <div onClick={onSelect} className="flex-1 cursor-pointer min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4
            className={`text-sm font-bold truncate ${
              isCompleted ? 'line-through text-slate-400' : 'text-slate-100 group-hover:text-amber-300'
            }`}
          >
            {exercise.croatianName || exercise.name}
          </h4>
          {isReplaced && (
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Prilagođeno
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
          <span className="font-mono text-amber-400 font-bold">
            {exercise.sets}x {exercise.reps}
          </span>
          {exercise.targetCount && accumulatedReps > 0 && (
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 rounded">
              ({accumulatedReps}/{exercise.targetCount})
            </span>
          )}
          {exercise.tempo && (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate">{exercise.tempo}</span>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons: Swap / Reset & Chevron */}
      <div className="flex items-center gap-1 shrink-0">
        {canSwap && !isCompleted && (
          isReplaced ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onResetClick) onResetClick();
              }}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-white transition-colors"
              title="Vrati originalnu vježbu"
            >
              Poništi
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onSwapClick) onSwapClick();
              }}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
              title="Zamijeni ovu vježbu sigurnom alternativom"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Zamijeni</span>
            </button>
          )
        )}

        <button
          onClick={onSelect}
          className="p-2 text-slate-500 hover:text-amber-400 transition-colors shrink-0 min-h-[44px] min-w-[36px] flex items-center justify-center"
          title="Upute & Savjet za leđa"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
