import { WorkoutType } from '../types/workout';

export interface AiCoachAnalysis {
  advice: string;
  recommendedWorkoutType?: WorkoutType;
  reasoning: string;
}

export async function generateAiCoachAdvice(
  userStatusText: string,
  yesterdayWorkoutType?: string,
  currentStreak: number = 0
): Promise<AiCoachAnalysis> {
  const localFallback = (text: string): AiCoachAnalysis => {
    const lower = text.toLowerCase();
    if (lower.includes('upaljen') || lower.includes('trčanj') || lower.includes('bol') || lower.includes('leđ') || lower.includes('zatež')) {
      return {
        advice: 'Primijetio sam da imaš upalu ili zatezanje u leđima/nogama nakon aktivnosti. Kod spondiloartritisa to je znak da trebamo izbjeći udarce (trčanje) i prebaciti se na izometriju ili rehabilitaciju leđa. Izometrija (Wall Sit, guranje zida, vučenje ručnika) pružit će ti vrhunsku tenziju uz NULA opterećenja na diskovima!',
        recommendedWorkoutType: 'isometrics',
        reasoning: 'Preporučujemo prebacivanje na Izometriku ili Bulletproof Leđa za dekompresiju.',
      };
    }
    if (lower.includes('spav') || lower.includes('umor') || lower.includes('beba') || lower.includes('noć')) {
      return {
        advice: 'Noći uz novorođenče znaju biti teške! Nemoj siliti visoki kardio kad je tijelo neispavano. Odaberi Animal Flow na tepihu ili laganu BJJ mobilnost. Napravit ćeš sjajan posao bez iscrpljivanja živčanog sustava.',
        recommendedWorkoutType: 'animal_flow',
        reasoning: 'Blagi Animal Flow na tepihu osigurat će oporavak i očuvati niz bez stresa.',
      };
    }
    return {
      advice: 'Odlično! Osjećaš se dobro i to je sjajno za napredak. Prati svoj ritam, drži donji trbuh i zdjelicu stabilnima u svakom ponavljanju i uživaj u današnjem izazovu!',
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
      reasoning: data.recommendedWorkoutType ? `AI Preporuka: ${data.recommendedWorkoutType}` : 'Redoviti plan',
    };
  } catch (e) {
    console.warn('Network or proxy error calling /api/ai-coach, using fallback:', e);
    return localFallback(userStatusText);
  }
}
