import { UserProgression, WorkoutLog, Badge } from '../types/workout';
import { INITIAL_BADGES } from '../data/badges';
import { getZagrebDateString, getZagrebYesterdayDateString } from './dateUtils';

const KEYS = {
  PROGRESSION: 'ossdaily_progression_v1',
  LOGS: 'ossdaily_logs_v1',
  BADGES: 'ossdaily_badges_v1',
  DAY_EXERCISES_STATE: 'ossdaily_today_exercises_v1',
  SEED_FLAG: 'tatafit_seed_v8_four_days_complete',
};

const DEFAULT_PROGRESSION: UserProgression = {
  calisthenicsLevel: 2,
  runningLevel: 1,
  runningDistanceKm: 1.0,
  cardioEngineLevel: 2,
  challengePushups: 100,
  walkingStepsTarget: 10000,
  coreChallengeReps: 100,
  squatsChallengeReps: 100,
  shadowBoxingLevel: 1,
  bjjFlowLevel: 1,
  animalFlowLevel: 2,
  backRehabCount: 1,
  totalWorkoutsCompleted: 4,
  skippedWorkoutsCount: 0,
  currentStreak: 4,
  bestStreak: 4,
  lastCompletedDate: null,
  lastSkippedDate: null,
  xp: 650,
  streakFreezes: 2,
  unlockedBadges: [
    'badge_back_first_step', 
    'badge_steps_10k_walker', 
    'badge_animal_flow_master', 
    'badge_crab_reach_king', 
    'badge_pushup_centurion', 
    'badge_streak_3'
  ],
  preferences: {
    dadMode: true,
    soundEnabled: true,
    backInjuryAwareness: true,
  },
};

export function loadProgression(): UserProgression {
  try {
    ensureSeedData();
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
    ensureSeedData();
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

/**
 * Ensures previous 4 completed workouts (Back day, 10k steps, Animal Flow, 100 pushups) are recorded
 */
function ensureSeedData(): void {
  try {
    const isSeeded = localStorage.getItem(KEYS.SEED_FLAG);
    if (isSeeded) return;

    const todayStr = getZagrebDateString();
    const yesterdayStr = getZagrebYesterdayDateString(todayStr); // Day 4 (1 day ago)
    const day2AgoStr = getZagrebYesterdayDateString(yesterdayStr); // Day 3 (2 days ago)
    const day3AgoStr = getZagrebYesterdayDateString(day2AgoStr);   // Day 2 (3 days ago)
    const day4AgoStr = getZagrebYesterdayDateString(day3AgoStr);   // Day 1 (4 days ago)

    // 1. Day 1 (4 days ago): Trening leđa za spa / Bulletproof Leđa
    const backLog: WorkoutLog = {
      dateKey: day4AgoStr,
      workoutId: 'workout_back_bulletproof_primary',
      title: 'Bulletproof Leđa & Donji Lanac',
      type: 'back_bulletproof',
      status: 'completed',
      completedAt: new Date(Date.now() - 96 * 3600 * 1000).toISOString(),
      durationMinutes: 25,
      painRating: 2,
      difficultyFeedback: 'just_right',
      userNotes: 'Odrađen obavezni tjedni protokol za oporavak leđa, tibialis i donji lanac za spa i kralježnicu.',
      completedExerciseIds: [
        'back_tibialis_raise',
        'back_deep_calf_raise',
        'back_reverse_step_up',
        'back_full_range_split_squats',
        'back_trap_raise',
        'back_back_extensions',
        'back_hip_flexor_kick_out',
        'back_side_bend'
      ],
    };

    // 2. Day 2 (3 days ago): 10.000 koraka
    const walkingLog: WorkoutLog = {
      dateKey: day3AgoStr,
      workoutId: `walking_challenge_10k_steps_${day3AgoStr}`,
      title: 'Dnevni Izazov: 10.000 Koraka (Tata & Beba šetnja)',
      type: 'walking_challenge',
      status: 'completed',
      completedAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
      durationMinutes: 60,
      painRating: 1,
      difficultyFeedback: 'just_right',
      userNotes: 'Uspješno odrađeno 10.000 koraka kroz dan uz kolica i bebu.',
      completedExerciseIds: ['walk_morning', 'walk_afternoon', 'walk_evening'],
    };

    // 3. Day 3 (2 days ago): Animal Flow & BJJ Primal Kretanje
    const animalFlowLog: WorkoutLog = {
      dateKey: day2AgoStr,
      workoutId: `animal_flow_primal_foundations_${day2AgoStr}`,
      title: 'Animal Flow: BJJ Primal Kretanje & Trup',
      type: 'animal_flow',
      status: 'completed',
      completedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
      durationMinutes: 20,
      painRating: 1,
      difficultyFeedback: 'just_right',
      userNotes: 'Odrađen Animal Flow: medvjeđi stav, rakov most s otvaranjem prsnog koša i BJJ kretnje na tepihu.',
      completedExerciseIds: [
        'af_beast_hold',
        'af_crab_reach',
        'af_side_kick_through',
        'af_scorpion_reach',
        'af_beast_wave'
      ],
    };

    // 4. Day 4 (Yesterday): 100 sklekova challenge
    const pushupChallengeLog: WorkoutLog = {
      dateKey: yesterdayStr,
      workoutId: `challenge_pushup_centurion_${yesterdayStr}`,
      title: 'Dnevni Izazov: 100 Sklekova Danas',
      type: 'challenge',
      status: 'completed',
      completedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      durationMinutes: 22,
      painRating: 2,
      difficultyFeedback: 'just_right',
      userNotes: 'Uspješno završena stotka sklekova kroz dan! Ostavilo je poštenu upalu prsa i ramena za danas.',
      completedExerciseIds: ['chal_pushups'],
      challengeRepsCompleted: 100,
    };

    let existingLogs: WorkoutLog[] = [];
    const rawLogs = localStorage.getItem(KEYS.LOGS);
    if (rawLogs) {
      existingLogs = JSON.parse(rawLogs);
    }

    const previousDates = new Set([yesterdayStr, day2AgoStr, day3AgoStr, day4AgoStr]);
    const otherLogs = existingLogs.filter(l => !previousDates.has(l.dateKey));
    const mergedLogs = [pushupChallengeLog, animalFlowLog, walkingLog, backLog, ...otherLogs];
    localStorage.setItem(KEYS.LOGS, JSON.stringify(mergedLogs));

    // Update progression state with 4-day streak
    let currentProg: UserProgression = DEFAULT_PROGRESSION;
    const rawProg = localStorage.getItem(KEYS.PROGRESSION);
    if (rawProg) {
      currentProg = { ...DEFAULT_PROGRESSION, ...JSON.parse(rawProg) };
    }

    const updatedProg: UserProgression = {
      ...currentProg,
      backRehabCount: Math.max(1, currentProg.backRehabCount),
      totalWorkoutsCompleted: Math.max(4, currentProg.totalWorkoutsCompleted),
      currentStreak: Math.max(4, currentProg.currentStreak),
      bestStreak: Math.max(4, currentProg.bestStreak),
      lastCompletedDate: yesterdayStr,
      xp: Math.max(650, currentProg.xp),
      unlockedBadges: Array.from(new Set([
        ...currentProg.unlockedBadges, 
        'badge_back_first_step',
        'badge_steps_10k_walker',
        'badge_animal_flow_master',
        'badge_crab_reach_king',
        'badge_pushup_centurion',
        'badge_streak_3'
      ])),
    };
    localStorage.setItem(KEYS.PROGRESSION, JSON.stringify(updatedProg));

    // Clear today's exercise state so today starts fresh
    localStorage.removeItem(KEYS.DAY_EXERCISES_STATE);

    localStorage.setItem(KEYS.SEED_FLAG, 'true');
  } catch (err) {
    console.error('Error in ensureSeedData:', err);
  }
}
