import { WorkoutType, ExerciseItem, ExerciseReplacement } from '../types/workout';

export interface AiCoachAnalysis {
  advice: string;
  recommendedWorkoutType?: WorkoutType;
  exerciseReplacement?: ExerciseReplacement;
  reasoning: string;
}

export async function generateAiCoachAdvice(
  userStatusText: string,
  yesterdayWorkoutType?: string,
  currentStreak: number = 0,
  currentWorkout?: { id: string; title: string; exercises: ExerciseItem[] }
): Promise<AiCoachAnalysis> {
  const localFallback = (text: string): AiCoachAnalysis => {
    const lower = text.toLowerCase();

    // Check for push muscle soreness (from yesterday's 100 pushups or general soreness with pushups in workout)
    const hasSorenessWord = 
      lower.includes('upal') || 
      lower.includes('bol') || 
      lower.includes('zatež') || 
      lower.includes('peče') || 
      lower.includes('muskulfiber') ||
      lower.includes('premoren');

    const hasPushContext = 
      lower.includes('sklek') || 
      lower.includes('prsa') || 
      lower.includes('ramen') || 
      lower.includes('ruk') || 
      lower.includes('triceps') || 
      lower.includes('jučer') || 
      lower.includes('100');

    // Find any push exercise in today's workout
    const pushExerciseInWorkout = currentWorkout?.exercises.find(
      e => e.id.includes('pushup') || e.targetMuscles.includes('Prsa') || e.targetMuscles.includes('Triceps')
    ) || (currentWorkout?.id.includes('emom') ? {
      id: 'emom_pushups_minute',
      name: 'Minuta 1: Sklekovi kontroliranog tempa (8-10 reps)',
      croatianName: 'Minuta 1: Sklekovi kontroliranog tempa (8-10 reps)',
      sets: 4,
      reps: '8-10 ponavljanja',
      targetCount: 10,
      tempo: '2s spuštanje, 1s izbačaj',
      restSeconds: 20,
      description: 'Na početku minute odradi 8-10 sklekova.',
      backFriendlyTip: 'Stisni gluteuse.',
      targetMuscles: ['Prsa', 'Triceps']
    } : undefined);

    // If user has soreness and (mentions pushups OR today's workout contains pushups)
    if (hasSorenessWord && (hasPushContext || pushExerciseInWorkout)) {
      const targetPushEx = pushExerciseInWorkout || {
        id: 'emom_pushups_minute',
        name: 'Sklekovi',
        croatianName: 'Minuta 1: Sklekovi kontroliranog tempa (8-10 reps)',
        sets: 4,
        reps: '8-10 ponavljanja',
        targetCount: 10,
        tempo: '2s spuštanje',
        restSeconds: 20,
        description: 'Sklekovi u 1. minuti EMOM-a.',
        backFriendlyTip: 'Stisni donji trbuh.',
        targetMuscles: ['Prsa', 'Triceps']
      };

      const replacement: ExerciseItem = {
        id: `${targetPushEx.id}_replaced_plank`,
        name: 'Plank izdržaj na podlakticama',
        croatianName: 'Minuta 1: Plank izdržaj na podlakticama (35-40s)',
        sets: targetPushEx.sets || 4,
        reps: '35-40 sekundi',
        targetCount: 40,
        isTimed: true,
        durationSeconds: 40,
        tempo: 'Čvrsta statika',
        restSeconds: targetPushEx.restSeconds || 20,
        description: 'Umjesto sklekova koji opterećuju upaljena prsa i ramena od jučerašnjeg izazova od 100 sklekova, odradi čvrst plank na podlakticama. Drži gluteuse i donji trbuh stisnutima, štiteći lumbalni dio kralježnice.',
        backFriendlyTip: 'Donji dio leđa ostaje potpuno ravan bez propadanja. Nula stresa za ramena i prsa.',
        targetMuscles: ['Transversus abdominis', 'Duboki trup']
      };

      return {
        advice: 'Potpuno te razumijem! Nakon jučerašnjeg izazova od 100 sklekova, prsnim mišićima i ramenima treba barem 48 sati za oporavak. Raditi sklekove danas u 1. minuti EMOM-a samo bi produžilo upalu i preopteretilo ramena. Zato ti predlažem da u današnjem EMOM-u sklekove zamijenimo s Plank izdržajem na podlakticama (35-40 sekundi). Tako potpuno odmaraš prsa i ramena, a svejedno odrađuješ puni 16-minutni EMOM i čuvaš niz!',
        exerciseReplacement: {
          originalExerciseId: targetPushEx.id,
          originalExerciseName: targetPushEx.croatianName || targetPushEx.name,
          replacementExercise: replacement,
          reason: 'Odmor prsa i ramena od jučerašnjeg izazova sklekova'
        },
        reasoning: 'Zamjena sklekova s Plank izdržajem u današnjem EMOM-u zbog upale.'
      };
    }

    // General soreness or back tightness
    if (lower.includes('upal') || lower.includes('trčanj') || lower.includes('bol') || lower.includes('leđ') || lower.includes('zatež')) {
      return {
        advice: 'Primijetio sam da imaš upalu ili zatezanje nakon aktivnosti. Kod spondiloartritisa to je znak da trebamo izbjeći udarce i prebaciti se na izometriju ili rehabilitaciju leđa. Izometrija (Wall Sit, guranje zida, vučenje ručnika) pružit će ti vrhunsku tenziju uz NULA opterećenja na diskovima!',
        recommendedWorkoutType: 'isometrics',
        reasoning: 'Preporučujemo prebacivanje na Izometriku ili Bulletproof Leđa za dekompresiju.',
      };
    }

    // Poor sleep or baby fatigue
    if (lower.includes('spav') || lower.includes('umor') || lower.includes('beba') || lower.includes('noć')) {
      return {
        advice: 'Noći uz novorođenče znaju biti teške! Nemoj siliti visoki kardio kad je tijelo neispavano. Odaberi Animal Flow na tepihu ili laganu mobilnost. Napravit ćeš sjajan posao bez iscrpljivanja živčanog sustava.',
        recommendedWorkoutType: 'animal_flow',
        reasoning: 'Blagi Animal Flow na tepihu osigurat će oporavak i očuvati niz bez stresa.',
      };
    }

    return {
      advice: 'Odlično! Prati svoj ritam, drži donji trbuh i zdjelicu stabilnima u svakom pokretu i uživaj u današnjem treningu!',
      reasoning: 'Korisnik je spreman za redoviti planirani trening.',
    };
  };

  try {
    const response = await fetch('/api/ai-coach', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userStatusText,
        yesterdayWorkoutType,
        currentStreak,
        todayWorkoutTitle: currentWorkout?.title,
        todayExercises: currentWorkout?.exercises.map(e => ({
          id: e.id,
          name: e.croatianName || e.name,
          targetMuscles: e.targetMuscles
        }))
      }),
    });

    if (!response.ok) {
      console.warn('Server AI API error response:', response.statusText);
      return localFallback(userStatusText);
    }

    const data = await response.json();
    return {
      advice: data.advice || localFallback(userStatusText).advice,
      recommendedWorkoutType: data.recommendedWorkoutType as WorkoutType | undefined,
      exerciseReplacement: data.exerciseReplacement as ExerciseReplacement | undefined || localFallback(userStatusText).exerciseReplacement,
      reasoning: data.exerciseReplacement 
        ? `Zamjena vježbe: ${data.exerciseReplacement.originalExerciseName}` 
        : data.recommendedWorkoutType 
        ? `AI Preporuka: ${data.recommendedWorkoutType}` 
        : 'Redoviti plan',
    };
  } catch (e) {
    console.warn('Network or proxy error calling /api/ai-coach, using fallback:', e);
    return localFallback(userStatusText);
  }
}
