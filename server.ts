import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

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
    const { userStatusText, yesterdayWorkoutType, currentStreak } = req.body;

    if (!userStatusText || typeof userStatusText !== 'string') {
      return res.status(400).json({ error: 'Polje userStatusText je obavezno.' });
    }

    const ai = getGenAIClient();

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured
      return res.json({
        advice: 'Primijetio sam da ti godi prilagođeni tempo! Nastavi sa stabilnim izometrijskim ili opuštajućim pokretima kako bi leđa ostala sigurna.',
        recommendedWorkoutType: undefined,
        isFallback: true,
      });
    }

    const prompt = `Jesi osobni AI trener specijaliziran za oporavak leđa kod spondiloartritisa i prilagodbu treninga novopečenom tati čiji sin dolazi iz inkubatora.
Korisnik ti je napisao kako se osjeća danas: "${userStatusText}".
Prethodni trening: ${yesterdayWorkoutType || 'Nepoznato'}.
Trenutni niz treninga: ${currentStreak || 0} dana.

Napiši kratak, iznimno pun podrške i stručan odgovor na hrvatskom jeziku (2-3 rečenice).
Zatim na samom kraju odgovora u posebnom redu napiši jednu od sljedećih oznaka preporučenog treninga ako je potrebno prilagoditi plan:
[PREPORUKA: ISOMETRICS] - ako spominje upalu od trčanja, zatezanje leđa ili bol u zglobovima.
[PREPORUKA: ANIMAL_FLOW] - ako spominje neispavanost, umor uz bebu ili želju za mobilnošću.
[PREPORUKA: BACK_BULLETPROOF] - ako je leđima potrebna dekompresija.
[PREPORUKA: REDOVITO] - ako je spreman za redoviti plan.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || '';
    let recommendedType: string | undefined = undefined;

    if (text.includes('[PREPORUKA: ISOMETRICS]')) recommendedType = 'isometrics';
    else if (text.includes('[PREPORUKA: ANIMAL_FLOW]')) recommendedType = 'animal_flow';
    else if (text.includes('[PREPORUKA: BACK_BULLETPROOF]')) recommendedType = 'back_bulletproof';

    const cleanAdvice = text.replace(/\[PREPORUKA:.*\]/g, '').trim();

    return res.json({
      advice: cleanAdvice,
      recommendedWorkoutType: recommendedType,
      isFallback: false,
    });
  } catch (error: any) {
    console.error('Server Gemini API Error:', error);
    return res.status(500).json({ error: 'Pogreška pri komunikaciji s AI trenerom.' });
  }
});

// Configure Vite middleware in development vs static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await vite.transformIndexHtml(url, `<!doctype html><html><head></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`);
        const fs = await import('fs');
        const indexHtmlPath = path.resolve(__dirname, 'index.html');
        if (fs.existsSync(indexHtmlPath)) {
          const rawHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
          template = await vite.transformIndexHtml(url, rawHtml);
        }
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
