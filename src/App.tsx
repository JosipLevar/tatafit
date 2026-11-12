import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { DailyWorkoutCard } from './components/DailyWorkoutCard';
import { ExerciseModal } from './components/ExerciseModal';
import { WorkoutCompletionModal } from './components/WorkoutCompletionModal';
import { BadgesLocker } from './components/BadgesLocker';
import { ProgressionStats } from './components/ProgressionStats';
import { DadGuideModal } from './components/DadGuideModal';
import { AiCoachBox } from './components/AiCoachBox';
import { IntervalTimerModal } from './components/IntervalTimerModal';

import { DailyWorkout, ExerciseItem, UserProgression, WorkoutLog, Badge, WorkoutType, ExerciseReplacement } from './types/workout';
import { BACK_WORKOUT_TEMPLATE, getWorkoutDatabase } from './data/workouts';
import { getZagrebDateString } from './utils/dateUtils';
import { generateDailyWorkout, hasCompletedBackRoutineThisWeek, getDaysSinceLastBackWorkout } from './utils/dailyWorkoutGenerator';
import { 
  loadProgression, 
  saveProgression, 
  loadWorkoutLogs, 
  saveWorkoutLog, 
  loadTodayState, 
  saveTodayState, 
  loadBadges 
} from './utils/storage';
import { processWorkoutCompletion, processWorkoutSkip } from './utils/progressionEngine';
import { ShieldCheck, Sparkles, Trophy } from 'lucide-react';

export default function App() {
  const [currentDateStr, setCurrentDateStr] = useState<string>(getZagrebDateString());
  const [progression, setProgression] = useState<UserProgression>(loadProgression());
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(loadWorkoutLogs());
  const [todayState, setTodayState] = useState(loadTodayState(currentDateStr));
  const [activeTab, setActiveTab] = useState<NavTab>('daily');
  const [customWorkoutSwap, setCustomWorkoutSwap] = useState<WorkoutType | null>(null);
  const [isViewingBackRoutine, setIsViewingBackRoutine] = useState<boolean>(false);
  const [exerciseReplacements, setExerciseReplacements] = useState<Record<string, ExerciseItem>>({});

  // Modals
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(null);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState<boolean>(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);
  const [isDadGuideOpen, setIsDadGuideOpen] = useState<boolean>(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState<boolean>(false);
  const [unlockedBadgeBanner, setUnlockedBadgeBanner] = useState<Badge | null>(null);

  // Periodically check if date changed (at midnight Zagreb time)
  useEffect(() => {
    const interval = setInterval(() => {
      const freshDate = getZagrebDateString();
      if (freshDate !== currentDateStr) {
        setCurrentDateStr(freshDate);
        setTodayState(loadTodayState(freshDate));
        setCustomWorkoutSwap(null);
        setExerciseReplacements({});
        setIsViewingBackRoutine(false);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [currentDateStr]);

  // Base generated workout for Zagreb date
  const generatedWorkout = generateDailyWorkout(currentDateStr, progression, workoutLogs);
  const backWorkoutStatus = getDaysSinceLastBackWorkout(currentDateStr, workoutLogs);
  const hasBackRoutineThisWeek = hasCompletedBackRoutineThisWeek(currentDateStr, workoutLogs);

  // Allow dynamic AI Coach swap or manual switch to back routine
  const getActiveWorkout = (): DailyWorkout => {
    let baseWorkout: DailyWorkout;
    if (isViewingBackRoutine) {
      baseWorkout = {
        ...BACK_WORKOUT_TEMPLATE,
        dateKey: currentDateStr,
        id: `${BACK_WORKOUT_TEMPLATE.id}_${currentDateStr}`,
      };
    } else if (customWorkoutSwap) {
      const db = getWorkoutDatabase(progression);
      const swapped = db.find(w => w.type === customWorkoutSwap) || generatedWorkout;
      baseWorkout = {
        ...swapped,
        dateKey: currentDateStr,
        title: `${swapped.title} (AI Prilagođeno)`,
        description: `⚡ Na temelju AI konzultacija, današnji trening je prilagođen tvom stanju: ${swapped.description}`,
      };
    } else {
      baseWorkout = generatedWorkout;
    }

    // Apply any exercise replacements
    if (Object.keys(exerciseReplacements).length > 0) {
      const updatedExercises = baseWorkout.exercises.map(ex => {
        if (exerciseReplacements[ex.id]) {
          return exerciseReplacements[ex.id];
        }
        return ex;
      });

      const updatedSections = baseWorkout.sections?.map(sec => ({
        ...sec,
        exercises: sec.exercises.map(ex => {
          if (exerciseReplacements[ex.id]) {
            return exerciseReplacements[ex.id];
          }
          return ex;
        })
      }));

      return {
        ...baseWorkout,
        exercises: updatedExercises,
        sections: updatedSections,
      };
    }

    return baseWorkout;
  };

  const handleApplyExerciseReplacement = (replacement: ExerciseReplacement) => {
    setExerciseReplacements(prev => ({
      ...prev,
      [replacement.originalExerciseId]: replacement.replacementExercise,
    }));
  };

  const handleManualSwapExercise = (original: ExerciseItem, replacement: ExerciseItem) => {
    setExerciseReplacements(prev => ({
      ...prev,
      [original.id]: replacement,
    }));
  };

  const handleResetExercise = (exerciseId: string) => {
    setExerciseReplacements(prev => {
      const copy = { ...prev };
      delete copy[exerciseId];
      for (const [origId, repEx] of Object.entries(copy)) {
        if (repEx.id === exerciseId) {
          delete copy[origId];
        }
      }
      return copy;
    });
  };

  const displayedWorkout = getActiveWorkout();

  // Find if today's workout has been logged or skipped
  const todayLog = workoutLogs.find(
    l => l.dateKey === currentDateStr && (l.workoutId === displayedWorkout.id || l.status === 'completed' || l.status === 'skipped')
  );
  const isCurrentWorkoutAlreadyLogged = !!todayLog;

  // Handlers for exercise completion
  const handleToggleExercise = (exId: string) => {
    const isDone = todayState.completedExerciseIds.includes(exId);
    const updatedIds = isDone
      ? todayState.completedExerciseIds.filter(id => id !== exId)
      : [...todayState.completedExerciseIds, exId];

    const newState = {
      ...todayState,
      dateKey: currentDateStr,
      completedExerciseIds: updatedIds,
    };
    setTodayState(newState);
    saveTodayState(newState);
  };

  const handleCompleteSection = (exerciseIds: string[], targetState: boolean) => {
    let updatedIds = [...todayState.completedExerciseIds];
    if (targetState) {
      exerciseIds.forEach(id => {
        if (!updatedIds.includes(id)) {
          updatedIds.push(id);
        }
      });
    } else {
      updatedIds = updatedIds.filter(id => !exerciseIds.includes(id));
    }

    const newState = {
      ...todayState,
      dateKey: currentDateStr,
      completedExerciseIds: updatedIds,
    };
    setTodayState(newState);
    saveTodayState(newState);
  };

  const handleUpdateAccumulatedReps = (exId: string, delta: number) => {
    const currentReps = todayState.exerciseReps[exId] || 0;
    const newReps = Math.max(0, currentReps + delta);
    const updatedReps = { ...todayState.exerciseReps, [exId]: newReps };

    // Auto mark as done if target count reached
    const targetEx = displayedWorkout.exercises.find(e => e.id === exId);
    let updatedIds = todayState.completedExerciseIds;

    if (targetEx && targetEx.targetCount && newReps >= targetEx.targetCount) {
      if (!updatedIds.includes(exId)) {
        updatedIds = [...updatedIds, exId];
      }
    }

    const newState = {
      ...todayState,
      dateKey: currentDateStr,
      completedExerciseIds: updatedIds,
      exerciseReps: updatedReps,
    };
    setTodayState(newState);
    saveTodayState(newState);
  };

  const handleToggleDadMode = () => {
    const updated = {
      ...progression,
      preferences: {
        ...progression.preferences,
        dadMode: !progression.preferences.dadMode,
      },
    };
    setProgression(updated);
    saveProgression(updated);
  };

  const handleSubmitLog = (
    difficulty: 'too_easy' | 'just_right' | 'too_hard',
    painRating: number,
    userNotes: string
  ) => {
    const newLog: WorkoutLog = {
      dateKey: currentDateStr,
      workoutId: displayedWorkout.id,
      title: displayedWorkout.title,
      type: displayedWorkout.type,
      status: 'completed',
      completedAt: new Date().toISOString(),
      durationMinutes: displayedWorkout.durationMin,
      painRating,
      difficultyFeedback: difficulty,
      userNotes,
      completedExerciseIds: todayState.completedExerciseIds,
    };

    const updatedLogs = saveWorkoutLog(newLog);
    setWorkoutLogs(updatedLogs);

    // Run Progression Engine
    const result = processWorkoutCompletion(
      displayedWorkout.type,
      displayedWorkout.id,
      difficulty,
      painRating,
      progression,
      updatedLogs
    );

    setProgression(result.updatedProgression);
    saveProgression(result.updatedProgression);

    // Show badge popup if unlocked
    if (result.newlyUnlockedBadges.length > 0) {
      const allBadges = loadBadges();
      const firstUnlocked = allBadges.find(b => b.id === result.newlyUnlockedBadges[0]);
      if (firstUnlocked) {
        setUnlockedBadgeBanner(firstUnlocked);
      }
    }
  };

  const handleSkipWorkout = () => {
    const newLog: WorkoutLog = {
      dateKey: currentDateStr,
      workoutId: displayedWorkout.id,
      title: displayedWorkout.title,
      type: displayedWorkout.type,
      status: 'skipped',
      completedAt: new Date().toISOString(),
      durationMinutes: 0,
      painRating: 3,
      difficultyFeedback: 'just_right',
      userNotes: 'Preskočen trening za danas.',
      completedExerciseIds: [],
    };

    const updatedLogs = saveWorkoutLog(newLog);
    setWorkoutLogs(updatedLogs);

    const updatedProgression = processWorkoutSkip(displayedWorkout.type, progression);
    setProgression(updatedProgression);
    saveProgression(updatedProgression);
  };

  const badges = loadBadges();
  const unlockedBadgeCount = badges.filter(b => b.unlockedAt).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-20 font-sans">
      {/* Header */}
      <Header
        progression={progression}
        onToggleDadMode={handleToggleDadMode}
        onOpenDadGuide={() => setIsDadGuideOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Newly Unlocked Badge Celebratory Banner */}
        {unlockedBadgeBanner && (
          <div className="bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 p-0.5 rounded-3xl shadow-xl animate-in zoom-in-95 duration-300">
            <div className="bg-slate-900 rounded-[22px] p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Novi Bedž Otključan!
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white">
                    {unlockedBadgeBanner.title}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {unlockedBadgeBanner.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setUnlockedBadgeBanner(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 shrink-0"
              >
                Super!
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Daily Workout */}
        {activeTab === 'daily' && (
          <div className="space-y-6">
            {/* AI Trener Box za konzultacije i prilagodbu */}
            {!isCurrentWorkoutAlreadyLogged && (
              <AiCoachBox
                onApplyWorkoutSwap={type => setCustomWorkoutSwap(type)}
                currentStreak={progression.currentStreak}
                currentWorkout={{
                  id: displayedWorkout.id,
                  title: displayedWorkout.title,
                  exercises: displayedWorkout.exercises,
                }}
                onApplyExerciseReplacement={handleApplyExerciseReplacement}
                hasAppliedReplacement={Object.keys(exerciseReplacements).length > 0}
              />
            )}

            <DailyWorkoutCard
              workout={displayedWorkout}
              completedExerciseIds={todayState.completedExerciseIds}
              exerciseReps={todayState.exerciseReps}
              onSelectExercise={ex => {
                setSelectedExercise(ex);
                setIsExerciseModalOpen(true);
              }}
              onToggleExercise={handleToggleExercise}
              onCompleteWorkout={() => setIsCompletionModalOpen(true)}
              onSkipWorkout={handleSkipWorkout}
              isDadMode={progression.preferences.dadMode}
              isWorkoutAlreadyLogged={isCurrentWorkoutAlreadyLogged}
              todayLog={todayLog}
              onSwitchToBackRoutine={() => setIsViewingBackRoutine(true)}
              onSwitchBackToDaily={() => setIsViewingBackRoutine(false)}
              isViewingBackRoutine={isViewingBackRoutine}
              backWorkoutStatus={backWorkoutStatus}
              hasBackRoutineThisWeek={hasBackRoutineThisWeek}
              onOpenTimer={() => setIsTimerModalOpen(true)}
              onCompleteSection={handleCompleteSection}
              onSwapExercise={handleManualSwapExercise}
              onResetExercise={handleResetExercise}
              exerciseReplacements={exerciseReplacements}
            />
          </div>
        )}

        {/* Tab 2: Badges */}
        {activeTab === 'badges' && (
          <BadgesLocker badges={badges} progression={progression} />
        )}

        {/* Tab 3: History & Integrated Dad Guide */}
        {activeTab === 'history' && (
          <ProgressionStats
            progression={progression}
            logs={workoutLogs}
            onOpenDadGuide={() => setIsDadGuideOpen(true)}
          />
        )}
      </main>

      {/* Bottom Thumb Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasPendingBackRoutine={!hasBackRoutineThisWeek}
        unlockedBadgeCount={unlockedBadgeCount}
      />

      {/* Modals */}
      <ExerciseModal
        exercise={selectedExercise}
        isOpen={isExerciseModalOpen}
        onClose={() => setIsExerciseModalOpen(false)}
        isCompleted={selectedExercise ? todayState.completedExerciseIds.includes(selectedExercise.id) : false}
        onToggleComplete={handleToggleExercise}
        accumulatedReps={selectedExercise ? todayState.exerciseReps[selectedExercise.id] || 0 : 0}
        onUpdateAccumulatedReps={handleUpdateAccumulatedReps}
      />

      <WorkoutCompletionModal
        workout={displayedWorkout}
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        onSubmitLog={handleSubmitLog}
      />

      <DadGuideModal
        isOpen={isDadGuideOpen}
        onClose={() => setIsDadGuideOpen(false)}
      />

      <IntervalTimerModal
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        initialMode={displayedWorkout.type === 'emom' ? 'emom' : displayedWorkout.type === 'shadow_boxing' ? 'rounds' : 'emom'}
      />
    </div>
  );
}
