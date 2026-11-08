import { DailyWorkout, UserProgression, WorkoutLog } from '../types/workout';
import { BACK_WORKOUT_TEMPLATE, getWorkoutDatabase } from '../data/workouts';
import { getZagrebWeekId, getDayOfWeekIndex } from './dateUtils';

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

/**
 * Checks if the user completed the mandatory back routine in the current Zagreb week
 */
export function hasCompletedBackRoutineThisWeek(
  currentDateStr: string,
  workoutLogs: WorkoutLog[]
): boolean {
  const currentWeek = getZagrebWeekId(currentDateStr);
  return workoutLogs.some(log => {
    if (log.type === 'back_bulletproof' && log.status === 'completed') {
      const logWeek = getZagrebWeekId(log.dateKey);
      return logWeek === currentWeek;
    }
    return false;
  });
}

/**
 * Generates or picks today's workout for Zagreb date string
 */
export function generateDailyWorkout(
  dateStr: string,
  progression: UserProgression,
  workoutLogs: WorkoutLog[]
): DailyWorkout {
  const dayIndex = getDayOfWeekIndex(dateStr); // 0 = Mon, 6 = Sun
  const backCompleted = hasCompletedBackRoutineThisWeek(dateStr, workoutLogs);

  // Ako je nedjelja (dan 6) ili petak (dan 4) i leđa još nisu odrađena ovaj tjedan -> force BACK_WORKOUT_TEMPLATE
  if (!backCompleted && (dayIndex === 6 || dayIndex === 4)) {
    return {
      ...BACK_WORKOUT_TEMPLATE,
      dateKey: dateStr,
      description: '⚠️ Obavezni tjedni trening leđa! Još ga nisi odradio ovaj tjedan. Sačuvaj kralježnicu i odradi ovaj protokol danas.'
    };
  }

  // Inače, izaberi iz baze na temelju heša datuma (da svaki dan bude iznenađenje i izmiksano!)
  const database = getWorkoutDatabase(progression);
  const hash = hashString(dateStr);
  
  // Da se ne ponavlja isti tip dva dana za redom, možemo uzeti u obzir i datum jučer
  const workoutIndex = hash % database.length;
  const selectedTemplate = database[workoutIndex];

  // Izradi kopiju s točnim datumbaznim ključem i eventualnim finim podešavanjem progresije
  const workout: DailyWorkout = {
    ...selectedTemplate,
    id: `${selectedTemplate.id}_${dateStr}`,
    dateKey: dateStr,
  };

  // Ako je trening izabran kao leđa, označi da je obavezni
  if (selectedTemplate.type === 'back_bulletproof') {
    workout.isMandatoryBackRoutine = true;
  }

  return workout;
}
