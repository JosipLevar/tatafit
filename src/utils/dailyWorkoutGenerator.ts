import { DailyWorkout, UserProgression, WorkoutLog } from '../types/workout';
import { BACK_WORKOUT_TEMPLATE, getWorkoutDatabase } from '../data/workouts';

/**
 * Simple string hash for deterministic daily seed
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export interface BackWorkoutStatus {
  daysSince: number | null;     // number of days since last back workout, or null if never
  isOverdue: boolean;           // true if > 7 days have passed
  daysRemaining: number;        // how many days left before 7-day limit expires
  lastDateStr: string | null;   // date string of last completed back workout
}

/**
 * Tracks that no more than 7 days pass since the last completed back routine
 */
export function getDaysSinceLastBackWorkout(
  currentDateStr: string,
  workoutLogs: WorkoutLog[]
): BackWorkoutStatus {
  const backLogs = workoutLogs
    .filter(l => l.type === 'back_bulletproof' && l.status === 'completed')
    .sort((a, b) => b.dateKey.localeCompare(a.dateKey));

  if (backLogs.length === 0) {
    return {
      daysSince: null,
      isOverdue: true,
      daysRemaining: 0,
      lastDateStr: null,
    };
  }

  const lastLog = backLogs[0];
  const [y1, m1, d1] = currentDateStr.split('-').map(Number);
  const [y2, m2, d2] = lastLog.dateKey.split('-').map(Number);
  const date1 = new Date(Date.UTC(y1, m1 - 1, d1));
  const date2 = new Date(Date.UTC(y2, m2 - 1, d2));
  const diffTime = date1.getTime() - date2.getTime();
  const daysSince = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const isOverdue = daysSince > 7;
  const daysRemaining = Math.max(0, 7 - daysSince);

  return {
    daysSince,
    isOverdue,
    daysRemaining,
    lastDateStr: lastLog.dateKey,
  };
}

/**
 * Legacy check retained for backwards compatibility
 */
export function hasCompletedBackRoutineThisWeek(
  currentDateStr: string,
  workoutLogs: WorkoutLog[]
): boolean {
  const status = getDaysSinceLastBackWorkout(currentDateStr, workoutLogs);
  return !status.isOverdue && status.daysSince !== null;
}

/**
 * Generates or picks today's workout for Zagreb date string
 */
export function generateDailyWorkout(
  dateStr: string,
  progression: UserProgression,
  workoutLogs: WorkoutLog[]
): DailyWorkout {
  const backStatus = getDaysSinceLastBackWorkout(dateStr, workoutLogs);

  // Ako je prošlo više od 7 dana od zadnjeg treninga leđa -> automatski forsiraj BACK_WORKOUT_TEMPLATE
  if (backStatus.isOverdue) {
    const daysLabel = backStatus.daysSince !== null ? `${backStatus.daysSince} dana` : 'više od tjedan dana';
    return {
      ...BACK_WORKOUT_TEMPLATE,
      dateKey: dateStr,
      description: `⚠️ Obavezni protokol leđa! Prošlo je ${daysLabel} od zadnjeg treninga leđa. Zbog spondiloartritisa sačuvaj kralježnicu i odradi ovaj protokol danas.`
    };
  }

  const database = getWorkoutDatabase(progression);

  // Ako je zadnji trening leđa bio jučer (prije 1 dan), korisnik danas ima 10.000 koraka izazov!
  if (backStatus.daysSince === 1) {
    const walkingWorkout = database.find(w => w.type === 'walking_challenge');
    if (walkingWorkout) {
      return {
        ...walkingWorkout,
        id: `${walkingWorkout.id}_${dateStr}`,
        dateKey: dateStr,
      };
    }
  }

  // Inače, izaberi iz baze na temelju heša datuma (da svaki dan bude izmiksano)
  const hash = hashString(dateStr);
  const workoutIndex = hash % database.length;
  const selectedTemplate = database[workoutIndex];

  const workout: DailyWorkout = {
    ...selectedTemplate,
    id: `${selectedTemplate.id}_${dateStr}`,
    dateKey: dateStr,
  };

  if (selectedTemplate.type === 'back_bulletproof') {
    workout.isMandatoryBackRoutine = true;
  }

  return workout;
}
