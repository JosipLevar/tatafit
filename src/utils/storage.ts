import { UserProgression, WorkoutLog, Badge } from '../types/workout';
import { INITIAL_BADGES } from '../data/badges';
import { getZagrebDateString } from './dateUtils';

const KEYS = {
  PROGRESSION: 'ossdaily_progression_v1',
  LOGS: 'ossdaily_logs_v1',
  BADGES: 'ossdaily_badges_v1',
  DAY_EXERCISES_STATE: 'ossdaily_today_exercises_v1',
};

const DEFAULT_PROGRESSION: UserProgression = {
  calisthenicsLevel: 1,
  runningLevel: 1,
  runningDistanceKm: 1.0,
  cardioEngineLevel: 1,
  challengePushups: 100,
  walkingStepsTarget: 10000,
  coreChallengeReps: 100,
  squatsChallengeReps: 100,
  shadowBoxingLevel: 1,
  bjjFlowLevel: 1,
  animalFlowLevel: 1,
  backRehabCount: 0,
  totalWorkoutsCompleted: 0,
  skippedWorkoutsCount: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastCompletedDate: null,
  lastSkippedDate: null,
  xp: 0,
  streakFreezes: 2,
  unlockedBadges: [],
  preferences: {
    dadMode: true,
    soundEnabled: true,
    backInjuryAwareness: true,
  },
};

export function loadProgression(): UserProgression {
  try {
    const raw = localStorage.getItem(KEYS.PROGRESSION);
    if (!raw) return DEFAULT_PROGRESSION;
    return { ...DEFAULT_PROGRESSION, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROGRESSION;
  }
}

export function saveProgression(progression: UserProgression): void {
  try {
    localStorage.setItem(KEYS.PROGRESSION, JSON.stringify(progression));
  } catch (e) {
    console.error('Failed to save progression:', e);
  }
}

export function loadWorkoutLogs(): WorkoutLog[] {
  try {
    const raw = localStorage.getItem(KEYS.LOGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveWorkoutLog(log: WorkoutLog): WorkoutLog[] {
  const currentLogs = loadWorkoutLogs();
  const filtered = currentLogs.filter(
    l => !(l.dateKey === log.dateKey && l.workoutId === log.workoutId)
  );
  const updated = [log, ...filtered];
  try {
    localStorage.setItem(KEYS.LOGS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save workout log:', e);
  }
  return updated;
}

export function loadBadges(): Badge[] {
  const progression = loadProgression();
  const unlockedIds = new Set(progression.unlockedBadges);

  return INITIAL_BADGES.map(badge => ({
    ...badge,
    unlockedAt: unlockedIds.has(badge.id) ? 'Otključano' : undefined,
  }));
}

export interface TodayState {
  dateKey: string;
  completedExerciseIds: string[];
  exerciseReps: Record<string, number>;
}

export function loadTodayState(dateKey: string = getZagrebDateString()): TodayState {
  try {
    const raw = localStorage.getItem(KEYS.DAY_EXERCISES_STATE);
    if (!raw) return { dateKey, completedExerciseIds: [], exerciseReps: {} };
    const parsed: TodayState = JSON.parse(raw);
    if (parsed.dateKey !== dateKey) {
      return { dateKey, completedExerciseIds: [], exerciseReps: {} };
    }
    return parsed;
  } catch {
    return { dateKey, completedExerciseIds: [], exerciseReps: {} };
  }
}

export function saveTodayState(state: TodayState): void {
  try {
    localStorage.setItem(KEYS.DAY_EXERCISES_STATE, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save today state:', e);
  }
}
