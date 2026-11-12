import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const getArgValue = (flag: string) => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : undefined;
};

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(
  getArgValue('--port') ||
  (isProduction ? process.env.PORT : undefined) ||
  3000
);
const HOST = '0.0.0.0';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();

app.use(express.json());

// Initialize Gemini SDK with process.env.GEMINI_API_KEY
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Server-side proxy endpoint for AI Coach consultations
app.post('/api/ai-coach', async (req, res) => {
  try {
    const { 
      userStatusText, 
      yesterdayWorkoutType, 
      currentStreak,
      todayWorkoutTitle,
      todayExercises
    } = req.body;

    if (!userStatusText || typeof userStatusText !== 'string') {
      return res.status(400).json({ error: 'Polje userStatusText je obavezno.' });
    }

    const ai = getGenAIClient();

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured in environment
      const lower = userStatusText.toLowerCase();
      const hasSoreness = lower.includes('upal') || lower.includes('bol') || lower.includes('zatež') || lower.includes('peče') || lower.includes('muskulfiber');
      
      if (hasSoreness) {
        return res.json({
          advice: 'Potpuno te razumijem! Nakon jučerašnjeg izazova od 100 sklekova, prsnim mišićima i ramenima treba barem 48 sati za oporavak. Raditi sklekove danas u 1. minuti EMOM-a samo bi produžilo upalu. Zato ti predlažem da u današnjem EMOM-u sklekove zamijenimo s Plank izdržajem na podlakticama (35-40 sekundi). Tako potpuno odmaraš prsa i ramena, a svejedno odrađuješ puni 16-minutni EMOM i čuvaš niz!',
          exerciseReplacement: {
            originalExerciseId: 'emom_pushups_minute',
            originalExerciseName: 'Minuta 1: Sklekovi kontroliranog tempa (8-10 reps)',
            replacementExercise: {
              id: 'emom_pushups_minute_replaced_plank',
              name: 'Plank izdržaj na podlakticama',
              croatianName: 'Minuta 1: Plank izdržaj na podlakticama (35-40s)',
              sets: 4,
              reps: '35-40 sekundi',
              targetCount: 40,
              isTimed: true,
              durationSeconds: 40,
              tempo: 'Čvrsta statika',
              restSeconds: 20,
              description: 'Umjesto sklekova koji opterećuju upaljena prsa i ramena od jučerašnjeg izazova od 100 sklekova, odradi čvrst plank na podlakticama. Drži gluteuse i donji trbuh stisnutima, štiteći kralježnicu.',
              backFriendlyTip: 'Donji dio leđa ostaje potpuno ravan bez propadanja. Nula stresa za ramena i prsa.',
              targetMuscles: ['Transversus abdominis', 'Duboki trup']
            },
            reason: 'Odmor prsa i ramena od jučerašnjeg izazova sklekova'
          },
          recommendedWorkoutType: undefined,
          isFallback: true,
        });
      }

      return res.json({
        advice: 'Primijetio sam da ti godi prilagođeni tempo! Nastavi sa stabilnim pokretima kako bi zglobovi i leđa ostali sigurni.',
        recommendedWorkoutType: undefined,
        isFallback: true,
      });
    }

    const prompt = `Jesi osobni AI trener specijaliziran za oporavak leđa kod spondiloartritisa i prilagodbu treninga novopečenom tati čiji sin dolazi iz inkubatora.
Korisnik ti je napisao kako se osjeća danas: "${userStatusText}".
Prethodni jučerašnji trening: ${yesterdayWorkoutType || '100 sklekova izazov'}.
Današnji planirani trening: ${todayWorkoutTitle || 'EMOM 16 min: Trup & Noge protiv Štoperice'}.
Popis vježbi u današnjem treningu: ${JSON.stringify(todayExercises || [])}.
Trenutni niz treninga: ${currentStreak || 4} dana.

KRITIČNA PRAVILA ZA ODGOVOR:
1. NIKADA nemoj reći generički odgovor poput "super da se dobro osjećaš, odradi trening" ako korisnik spominje upalu, bol, zamor, umor, sklekove ili nelagodu!
2. Ako korisnik ima upalu mišića (npr. od jučerašnjeg izazova od 100 sklekova) ili osjeća bol u prsima/ramenima/rukama, a današnji trening (npr. EMOM) sadrži sklekove:
   - Priznaj i pohvali jučerašnji napor (100 sklekova je ogroman volumen!).
   - Objasni da je upala normalna i da prsima treba 48 sati za oporavak.
   - Jasno reci da NE treba raditi sklekove danas, već predloži zamjenu sklekova s "Plank izdržajem na podlakticama" (35-40 sekundi) ili drugom sigurnom vježbom za trup/noge, kako bi mogao odraditi puni 16-minutni EMOM bez stresa za prsa i ramena i sačuvati niz!
3. Odgovor neka bude stručan, topao, pun podrške i na hrvatskom jeziku (2-4 rečenice).
4. Na samom kraju odgovora, u posebnom redu, ako preporučuješ zamjenu konkretne vježbe u današnjem treningu, OBAVEZNO dodaj:
[ZAMJENA_VJEZBE: {"originalExerciseId": "emom_pushups_minute", "replacementName": "Plank izdržaj na podlakticama", "replacementReps": "35-40 sekundi", "reason": "Odmor prsa i ramena od jučerašnjih 100 sklekova"}]

Ili ako predlažeš promjenu cijelog treninga:
[PREPORUKA: ISOMETRICS] - ako je opća upala tijela, bol u zglobovima ili leđima.
[PREPORUKA: ANIMAL_FLOW] - ako je neispavan uz bebu ili traži laganu mobilnost.
[PREPORUKA: BACK_BULLETPROOF] - ako je leđima potrebna dekompresija.
[PREPORUKA: REDOVITO] - ako je potpuno spreman za redoviti plan bez ikakve zamjene.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || '';
    let recommendedType: string | undefined = undefined;
    let exerciseReplacement: any = undefined;

    // Check for exercise replacement JSON
    const replacementMatch = text.match(/\[ZAMJENA_VJEZBE:\s*(\{.*?\})\s*\]/s);
    if (replacementMatch) {
      try {
        const parsed = JSON.parse(replacementMatch[1]);
        exerciseReplacement = {
          originalExerciseId: parsed.originalExerciseId || 'emom_pushups_minute',
          originalExerciseName: parsed.originalExerciseName || 'Minuta 1: Sklekovi kontroliranog tempa (8-10 reps)',
          replacementExercise: {
            id: `${parsed.originalExerciseId || 'emom_pushups_minute'}_replaced_plank`,
            name: parsed.replacementName || 'Plank izdržaj na podlakticama',
            croatianName: `Minuta 1: ${parsed.replacementName || 'Plank izdržaj na podlakticama'} (${parsed.replacementReps || '35-40s'})`,
            sets: 4,
            reps: parsed.replacementReps || '35-40 sekundi',
            targetCount: 40,
            isTimed: true,
            durationSeconds: 40,
            tempo: 'Čvrsta statika',
            restSeconds: 20,
            description: 'Umjesto sklekova koji opterećuju upaljena prsa i ramena od jučerašnjeg izazova, odradi čvrst plank na podlakticama. Drži gluteuse i donji trbuh stisnutima, štiteći lumbalni dio.',
            backFriendlyTip: 'Donji dio leđa ostaje potpuno ravan bez propadanja. Nula stresa za ramena i prsa.',
            targetMuscles: ['Transversus abdominis', 'Duboki trup']
          },
          reason: parsed.reason || 'Odmor prsa i ramena od jučerašnjih sklekova'
        };
      } catch (err) {
        console.warn('Failed to parse ZAMJENA_VJEZBE JSON:', err);
      }
    }

    if (text.includes('[PREPORUKA: ISOMETRICS]')) recommendedType = 'isometrics';
    else if (text.includes('[PREPORUKA: ANIMAL_FLOW]')) recommendedType = 'animal_flow';
    else if (text.includes('[PREPORUKA: BACK_BULLETPROOF]')) recommendedType = 'back_bulletproof';

    const cleanAdvice = text
      .replace(/\[ZAMJENA_VJEZBE:.*?\]/gs, '')
      .replace(/\[PREPORUKA:.*?\]/g, '')
      .trim();

    return res.json({
      advice: cleanAdvice,
      recommendedWorkoutType: recommendedType,
      exerciseReplacement,
      isFallback: false,
    });
  } catch (error: any) {
    console.error('Server Gemini API Error:', error?.message || error);

    // Fallback gracefully on server if API call fails
    const lower = (req.body?.userStatusText || '').toLowerCase();
    const hasSoreness = lower.includes('upal') || lower.includes('bol') || lower.includes('zatež') || lower.includes('peče') || lower.includes('muskulfiber');
    
    if (hasSoreness) {
      return res.json({
        advice: 'Potpuno te razumijem! Nakon jučerašnjeg izazova od 100 sklekova, prsnim mišićima i ramenima treba barem 48 sati za oporavak. Raditi sklekove danas u 1. minuti EMOM-a samo bi produžilo upalu. Zato ti predlažem da u današnjem EMOM-u sklekove zamijenimo s Plank izdržajem na podlakticama (35-40 sekundi). Tako potpuno odmaraš prsa i ramena, a svejedno odrađuješ puni 16-minutni EMOM i čuvaš niz!',
        exerciseReplacement: {
          originalExerciseId: 'emom_pushups_minute',
          originalExerciseName: 'Minuta 1: Sklekovi kontroliranog tempa (8-10 reps)',
          replacementExercise: {
            id: 'emom_pushups_minute_replaced_plank',
            name: 'Plank izdržaj na podlakticama',
            croatianName: 'Minuta 1: Plank izdržaj na podlakticama (35-40s)',
            sets: 4,
            reps: '35-40 sekundi',
            targetCount: 40,
            isTimed: true,
            durationSeconds: 40,
            tempo: 'Čvrsta statika',
            restSeconds: 20,
            description: 'Umjesto sklekova koji opterećuju upaljena prsa i ramena od jučerašnjeg izazova od 100 sklekova, odradi čvrst plank na podlakticama. Drži gluteuse i donji trbuh stisnutima, štiteći kralježnicu.',
            backFriendlyTip: 'Donji dio leđa ostaje potpuno ravan bez propadanja. Nula stresa za ramena i prsa.',
            targetMuscles: ['Transversus abdominis', 'Duboki trup']
          },
          reason: 'Odmor prsa i ramena od jučerašnjeg izazova sklekova'
        },
        recommendedWorkoutType: undefined,
        isFallback: true,
      });
    }

    return res.json({
      advice: 'Primijetio sam da ti godi prilagođeni tempo! Nastavi sa stabilnim pokretima kako bi zglobovi i leđa ostali sigurni.',
      recommendedWorkoutType: undefined,
      isFallback: true,
    });
  }
});

// Health check endpoint for Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

// Configure Vite middleware in development vs static serving in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api') || req.originalUrl === '/health') {
        return next();
      }
      try {
        const indexHtmlPath = path.resolve(__dirname, 'index.html');
        let rawHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
        const template = await vite.transformIndexHtml(req.originalUrl, rawHtml);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      if (req.originalUrl.startsWith('/api') || req.originalUrl === '/health') {
        return res.status(404).json({ error: 'Not found' });
      }
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
}

startServer();
