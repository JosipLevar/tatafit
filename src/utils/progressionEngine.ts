import { UserProgression, WorkoutLog, WorkoutType } from '../types/workout';
import { getZagrebDateString } from './dateUtils';

export interface CompletionResult {
  updatedProgression: UserProgression;
  newlyUnlockedBadges: string[];
  xpGained: number;
}

export function processWorkoutCompletion(
  workoutType: WorkoutType,
  workoutId: string,
  difficultyFeedback: 'too_easy' | 'just_right' | 'too_hard',
  painRating: number,
  currentProgression: UserProgression,
  allLogs: WorkoutLog[]
): CompletionResult {
  const todayStr = getZagrebDateString();
  const newlyUnlockedBadges: string[] = [];
  const updated: UserProgression = JSON.parse(JSON.stringify(currentProgression));

  let xpGained = 100;
  if (workoutType === 'back_bulletproof') xpGained += 50;
  if (workoutType === 'shadow_boxing') xpGained += 40;
  if (workoutType === 'animal_flow') xpGained += 30;
  if (painRating === 1) xpGained += 25;

  updated.xp += xpGained;
  updated.totalWorkoutsCompleted += 1;

  // Streak logic
  const lastDate = updated.lastCompletedDate;
  if (lastDate !== todayStr) {
    if (!lastDate) {
      updated.currentStreak = 1;
    } else {
      const last = new Date(lastDate);
      const today = new Date(todayStr);
      const diffDays = Math.ceil(Math.abs(today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        updated.currentStreak += 1;
      } else if (diffDays === 2 && updated.streakFreezes > 0) {
        updated.streakFreezes -= 1;
        updated.currentStreak += 1;
      } else {
        updated.currentStreak = 1;
      }
    }
    updated.lastCompletedDate = todayStr;
  }

  if (updated.currentStreak > updated.bestStreak) {
    updated.bestStreak = updated.currentStreak;
  }

  // PAMETNA PROGRESIJA (Samo ako trening nije uzrokovao jaču bol <=3)
  if (painRating <= 3) {
    // 1. Borilački kardio (Shadow Boxing) -> UVEZANO PROGRESIRA I TRČANJE!
    if (workoutType === 'shadow_boxing') {
      updated.shadowBoxingLevel = Math.min(5, (updated.shadowBoxingLevel || 1) + 1);
      updated.cardioEngineLevel = Math.min(10, (updated.cardioEngineLevel || 1) + 1);
      // Preskače stepenicu u trčanju jer su kardio sustavi povezani!
      updated.runningDistanceKm = Math.min(3.5, Math.round((updated.runningDistanceKm + 0.3) * 10) / 10);
    }
    // 2. Trčanje -> Progresira trčanje & kardio
    else if (workoutType === 'running') {
      updated.cardioEngineLevel = Math.min(10, (updated.cardioEngineLevel || 1) + 1);
      if (difficultyFeedback === 'too_easy') {
        updated.runningDistanceKm = Math.min(3.5, Math.round((updated.runningDistanceKm + 0.3) * 10) / 10);
      } else if (difficultyFeedback === 'just_right') {
        updated.runningDistanceKm = Math.min(3.5, Math.round((updated.runningDistanceKm + 0.2) * 10) / 10);
      }
      updated.runningLevel = Math.min(10, updated.runningLevel + 1);
    }
    // 3. Hodajući Izazov 10k koraka -> Dekompresija & Progresija koraka
    else if (workoutType === 'walking_challenge') {
      updated.walkingStepsTarget = Math.min(15000, (updated.walkingStepsTarget || 10000) + 1000);
    }
    // 4. Izazovi sklekova / trbušnjaka
    else if (workoutType === 'challenge') {
      if (difficultyFeedback !== 'too_hard') {
        updated.challengePushups = Math.min(200, updated.challengePushups + 10);
      }
    } else if (workoutType === 'core_challenge') {
      if (difficultyFeedback !== 'too_hard') {
        updated.coreChallengeReps = Math.min(200, (updated.coreChallengeReps || 100) + 10);
      }
    } else if (workoutType === 'calisthenics') {
      if (difficultyFeedback !== 'too_hard') {
        updated.calisthenicsLevel = Math.min(10, updated.calisthenicsLevel + 1);
      }
    } else if (workoutType === 'animal_flow') {
      updated.animalFlowLevel = Math.min(5, (updated.animalFlowLevel || 1) + 1);
    } else if (workoutType === 'back_bulletproof') {
      updated.backRehabCount += 1;
    } else if (workoutType === 'bjj_flow') {
      updated.bjjFlowLevel = Math.min(5, updated.bjjFlowLevel + 1);
    }
  }

  // Provjera bedževa
  const existingBadges = new Set(updated.unlockedBadges);
  const checkAndUnlock = (badgeId: string, condition: boolean) => {
    if (condition && !existingBadges.has(badgeId)) {
      newlyUnlockedBadges.push(badgeId);
      updated.unlockedBadges.push(badgeId);
    }
  };

  checkAndUnlock('badge_super_dad', updated.preferences.dadMode && updated.totalWorkoutsCompleted >= 1);
  checkAndUnlock('badge_incubator_hero', updated.totalWorkoutsCompleted >= 7);
  checkAndUnlock('badge_shadow_boxing_warrior', workoutType === 'shadow_boxing');
  checkAndUnlock('badge_steps_10k_walker', workoutType === 'walking_challenge');
  checkAndUnlock('badge_core_centurion', workoutType === 'core_challenge');
  checkAndUnlock('badge_animal_flow_master', workoutType === 'animal_flow');
  checkAndUnlock('badge_towel_bjj_grip', workoutType === 'isometrics');
  checkAndUnlock('badge_tabata_express', workoutType === 'tabata');
  checkAndUnlock('badge_back_first_step', updated.backRehabCount >= 1);
  checkAndUnlock('badge_back_master_month', updated.backRehabCount >= 4);
  checkAndUnlock('badge_pushup_centurion', workoutType === 'challenge' && updated.challengePushups >= 100);
  checkAndUnlock('badge_first_run', workoutType === 'running' && painRating <= 2);
  checkAndUnlock('badge_bjj_mat_flow', workoutType === 'bjj_flow');
  checkAndUnlock('badge_streak_3', updated.currentStreak >= 3);
  checkAndUnlock('badge_streak_7', updated.currentStreak >= 7);
  checkAndUnlock('badge_streak_30', updated.currentStreak >= 30);

  return {
    updatedProgression: updated,
    newlyUnlockedBadges,
    xpGained,
  };
}

/**
 * Obrada PRESKOČENOG treninga (Posljedice za preskakanje):
 * - Nema progresije!
 * - Označava preskakanje, troši streak freeze ili resetira streak na 0.
 * - Smanjuje nivo za taj specifični tip kako korisnik ne bi pao u nerealno težak nivo nakon pauze.
 */
export function processWorkoutSkip(
  workoutType: WorkoutType,
  currentProgression: UserProgression
): UserProgression {
  const todayStr = getZagrebDateString();
  const updated: UserProgression = JSON.parse(JSON.stringify(currentProgression));

  updated.skippedWorkoutsCount += 1;
  updated.lastSkippedDate = todayStr;

  // Streak posljedica
  if (updated.streakFreezes > 0) {
    updated.streakFreezes -= 1; // "Bebina noćna straža" spavaš niz!
  } else {
    updated.currentStreak = 0; // Gubitak niza ako nema freeze-a
  }

  // NEMA PROGRESIJE — štoviše, smanjuje se nivo za 1 krug kako bi se spriječila preteška vježba
  if (workoutType === 'running' && updated.runningLevel > 1) {
    updated.runningLevel -= 1;
  } else if (workoutType === 'calisthenics' && updated.calisthenicsLevel > 1) {
    updated.calisthenicsLevel -= 1;
  } else if (workoutType === 'shadow_boxing' && updated.shadowBoxingLevel > 1) {
    updated.shadowBoxingLevel -= 1;
  }

  return updated;
}
