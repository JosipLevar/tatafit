import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  SkipForward, 
  Flame, 
  Clock, 
  Activity,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export type TimerMode = 'emom' | 'rounds' | 'tabata';

interface IntervalTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: TimerMode;
}

export const IntervalTimerModal: React.FC<IntervalTimerModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'emom',
}) => {
  const [mode, setMode] = useState<TimerMode>(initialMode);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);

  // EMOM State
  const [emomTotalMinutes, setEmomTotalMinutes] = useState<number>(16);
  const [emomCurrentMinute, setEmomCurrentMinute] = useState<number>(1);
  const [emomSecondsLeft, setEmomSecondsLeft] = useState<number>(60);

  // Rounds State (e.g. 5 rounds of 3min work + 1min rest)
  const [roundsTotal, setRoundsTotal] = useState<number>(5);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [roundWorkSeconds, setRoundWorkSeconds] = useState<number>(180); // 3 min
  const [roundRestSeconds, setRoundRestSeconds] = useState<number>(60);  // 1 min
  const [roundPhase, setRoundPhase] = useState<'work' | 'rest'>('work');
  const [roundSecondsLeft, setRoundSecondsLeft] = useState<number>(180);

  // Tabata State (8 intervals of 20s work / 10s rest)
  const [tabataTotalIntervals] = useState<number>(8);
  const [tabataCurrentInterval, setTabataCurrentInterval] = useState<number>(1);
  const [tabataPhase, setTabataPhase] = useState<'work' | 'rest'>('work');
  const [tabataSecondsLeft, setTabataSecondsLeft] = useState<number>(20);

  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Sync sound settings with soundEffects util
  useEffect(() => {
    soundEffects.setSoundEnabled(soundOn);
  }, [soundOn]);

  // Reset timer whenever mode changes
  useEffect(() => {
    handleReset();
  }, [mode]);

  // Main countdown ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isFinished) {
      interval = setInterval(() => {
        if (mode === 'emom') {
          handleEmomTick();
        } else if (mode === 'rounds') {
          handleRoundsTick();
        } else if (mode === 'tabata') {
          handleTabataTick();
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isRunning, 
    isFinished, 
    mode, 
    emomSecondsLeft, 
    emomCurrentMinute, 
    emomTotalMinutes,
    roundSecondsLeft,
    roundPhase,
    currentRound,
    roundsTotal,
    tabataSecondsLeft,
    tabataPhase,
    tabataCurrentInterval,
    tabataTotalIntervals
  ]);

  const handleEmomTick = () => {
    if (emomSecondsLeft <= 4 && emomSecondsLeft > 1) {
      soundEffects.playCountdownBeep();
    }

    if (emomSecondsLeft > 1) {
      setEmomSecondsLeft(prev => prev - 1);
    } else {
      // 0s reached
      if (emomCurrentMinute < emomTotalMinutes) {
        soundEffects.playStartGong();
        setEmomCurrentMinute(prev => prev + 1);
        setEmomSecondsLeft(60);
      } else {
        // EMOM Complete!
        soundEffects.playFinishFanfare();
        setIsFinished(true);
        setIsRunning(false);
      }
    }
  };

  const handleRoundsTick = () => {
    if (roundSecondsLeft <= 4 && roundSecondsLeft > 1) {
      soundEffects.playCountdownBeep();
    }

    if (roundSecondsLeft > 1) {
      setRoundSecondsLeft(prev => prev - 1);
    } else {
      if (roundPhase === 'work') {
        if (currentRound < roundsTotal) {
          // Transition to rest
          soundEffects.playRestTone();
          setRoundPhase('rest');
          setRoundSecondsLeft(roundRestSeconds);
        } else {
          // Finished all rounds
          soundEffects.playFinishFanfare();
          setIsFinished(true);
          setIsRunning(false);
        }
      } else {
        // Transition from rest to next round work
        soundEffects.playStartGong();
        setCurrentRound(prev => prev + 1);
        setRoundPhase('work');
        setRoundSecondsLeft(roundWorkSeconds);
      }
    }
  };

  const handleTabataTick = () => {
    if (tabataSecondsLeft <= 4 && tabataSecondsLeft > 1) {
      soundEffects.playCountdownBeep();
    }

    if (tabataSecondsLeft > 1) {
      setTabataSecondsLeft(prev => prev - 1);
    } else {
      if (tabataPhase === 'work') {
        soundEffects.playRestTone();
        setTabataPhase('rest');
        setTabataSecondsLeft(10);
      } else {
        if (tabataCurrentInterval < tabataTotalIntervals) {
          soundEffects.playStartGong();
          setTabataCurrentInterval(prev => prev + 1);
          setTabataPhase('work');
          setTabataSecondsLeft(20);
        } else {
          soundEffects.playFinishFanfare();
          setIsFinished(true);
          setIsRunning(false);
        }
      }
    }
  };

  const handleStart = () => {
    if (!isRunning && !isFinished) {
      soundEffects.playStartGong();
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);

    if (mode === 'emom') {
      setEmomCurrentMinute(1);
      setEmomSecondsLeft(60);
    } else if (mode === 'rounds') {
      setCurrentRound(1);
      setRoundPhase('work');
      setRoundSecondsLeft(roundWorkSeconds);
    } else if (mode === 'tabata') {
      setTabataCurrentInterval(1);
      setTabataPhase('work');
      setTabataSecondsLeft(20);
    }
  };

  const handleSkipNext = () => {
    if (mode === 'emom') {
      if (emomCurrentMinute < emomTotalMinutes) {
        soundEffects.playStartGong();
        setEmomCurrentMinute(prev => prev + 1);
        setEmomSecondsLeft(60);
      } else {
        setIsFinished(true);
        setIsRunning(false);
      }
    } else if (mode === 'rounds') {
      if (roundPhase === 'work') {
        soundEffects.playRestTone();
        setRoundPhase('rest');
        setRoundSecondsLeft(roundRestSeconds);
      } else {
        if (currentRound < roundsTotal) {
          soundEffects.playStartGong();
          setCurrentRound(prev => prev + 1);
          setRoundPhase('work');
          setRoundSecondsLeft(roundWorkSeconds);
        } else {
          setIsFinished(true);
          setIsRunning(false);
        }
      }
    }
  };

  if (!isOpen) return null;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m > 0 ? `${m}:` : ''}${s < 10 && m > 0 ? `0${s}` : s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col space-y-5 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Intervalni Timer</h3>
              <p className="text-[11px] text-slate-400">Zvučni signali & runde za trening</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundOn(!soundOn)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors border ${
                soundOn
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}
              title={soundOn ? 'Zvuk uključen' : 'Zvuk isključen'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setMode('emom')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'emom'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EMOM
          </button>
          <button
            type="button"
            onClick={() => setMode('rounds')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'rounds'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Runde
          </button>
          <button
            type="button"
            onClick={() => setMode('tabata')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'tabata'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tabata
          </button>
        </div>

        {/* Mode Specific Config Pill when not running */}
        {!isRunning && !isFinished && (
          <div className="flex items-center justify-center gap-2 text-xs">
            {mode === 'emom' && (
              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1.5 rounded-xl">
                <span className="text-slate-400 text-[11px] font-medium ml-1">Ukupno:</span>
                {[12, 16, 20].map(mins => (
                  <button
                    key={mins}
                    onClick={() => {
                      setEmomTotalMinutes(mins);
                      setEmomCurrentMinute(1);
                      setEmomSecondsLeft(60);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      emomTotalMinutes === mins
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            )}

            {mode === 'rounds' && (
              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1.5 rounded-xl">
                <span className="text-slate-400 text-[11px] font-medium ml-1">Rundi:</span>
                {[3, 4, 5].map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      setRoundsTotal(r);
                      setCurrentRound(1);
                      setRoundPhase('work');
                      setRoundSecondsLeft(roundWorkSeconds);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      roundsTotal === r
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {r}x3m
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Timer Main Screen Display */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-3xl p-6 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
          
          {/* Subtle glow circle in background */}
          <div className={`absolute w-44 h-44 rounded-full blur-3xl opacity-20 transition-all ${
            mode === 'rounds' && roundPhase === 'rest'
              ? 'bg-sky-500'
              : 'bg-amber-500'
          }`} />

          {/* Finished State */}
          {isFinished ? (
            <div className="space-y-3 z-10 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white">Vrijeme Isteklo! 🔔</h4>
                <p className="text-xs text-slate-400 mt-1">Sjajan posao, intervalni blok je uspješno završen!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 z-10 w-full">
              {/* Top Subtitle / Stage indicator */}
              <div className="flex items-center justify-center gap-2">
                {mode === 'emom' && (
                  <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Minuta {emomCurrentMinute} od {emomTotalMinutes}
                  </span>
                )}

                {mode === 'rounds' && (
                  <span className={`text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full border ${
                    roundPhase === 'work'
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                      : 'bg-sky-500/15 text-sky-300 border-sky-500/40'
                  }`}>
                    {roundPhase === 'work' ? '🥊 Runda' : '💧 Odmor'} {currentRound} / {roundsTotal}
                  </span>
                )}

                {mode === 'tabata' && (
                  <span className={`text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full border ${
                    tabataPhase === 'work'
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                      : 'bg-sky-500/15 text-sky-300 border-sky-500/40'
                  }`}>
                    {tabataPhase === 'work' ? '🔥 Rad' : '💧 Odmor'} · Interval {tabataCurrentInterval} / {tabataTotalIntervals}
                  </span>
                )}
              </div>

              {/* Big Digits Countdown */}
              <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-white py-2">
                {mode === 'emom' && emomSecondsLeft}
                {mode === 'rounds' && formatSeconds(roundSecondsLeft)}
                {mode === 'tabata' && tabataSecondsLeft}
              </div>

              {/* Status explanation */}
              <p className="text-[11px] text-slate-400 font-medium">
                {mode === 'emom' && 'Svake minute nova runda (zvučni beep na 3-2-1)'}
                {mode === 'rounds' && (roundPhase === 'work' ? 'Bori se i diši do zvučnog signala' : 'Odmori leđa i udahni duboko')}
                {mode === 'tabata' && (tabataPhase === 'work' ? '20 sekundi maksimalan tempo' : '10 sekundi potpuni odmor')}
              </p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Resetiraj timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {isRunning ? (
            <button
              onClick={handlePause}
              className="flex-1 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors shadow-md"
            >
              <Pause className="w-5 h-5 fill-white" />
              <span>Pauziraj</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-lg shadow-amber-500/20"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>{isFinished ? 'Pokreni Ponovno' : 'Pokreni Timer'}</span>
            </button>
          )}

          {mode !== 'tabata' && (
            <button
              onClick={handleSkipNext}
              disabled={isFinished}
              className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors disabled:opacity-40"
              title="Preskoči na sljedeću minutu/rundu"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
