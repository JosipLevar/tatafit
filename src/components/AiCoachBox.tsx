import React, { useState } from 'react';
import { Bot, Sparkles, Send, RefreshCw, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { generateAiCoachAdvice, AiCoachAnalysis } from '../utils/aiCoach';
import { WorkoutType, ExerciseItem, ExerciseReplacement } from '../types/workout';

interface AiCoachBoxProps {
  onApplyWorkoutSwap: (type: WorkoutType) => void;
  currentStreak: number;
  currentWorkout?: { id: string; title: string; exercises: ExerciseItem[] };
  onApplyExerciseReplacement?: (replacement: ExerciseReplacement) => void;
  hasAppliedReplacement?: boolean;
}

export const AiCoachBox: React.FC<AiCoachBoxProps> = ({ 
  onApplyWorkoutSwap, 
  currentStreak,
  currentWorkout,
  onApplyExerciseReplacement,
  hasAppliedReplacement = false,
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<AiCoachAnalysis | null>(null);
  const [appliedSwap, setAppliedSwap] = useState<boolean>(false);

  const quickPills = [
    'Imam upalu od jučerašnjih sklekova, zamijeni ih u današnjem treningu',
    'Upaljen sam od trčanja jučer i leđa me zatežu',
    'Sinoć sam spavao 3-4 sata jer je beba plakala',
    'Osjećam blagu ukočenost u donjim leđima',
    'Danas se osjećam super i spreman sam za trening!',
  ];

  const handleConsultation = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    setAppliedSwap(false);
    try {
      const res = await generateAiCoachAdvice(
        text, 
        '100 sklekova challenge (jučer)', 
        currentStreak,
        currentWorkout
      );
      setAiResponse(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white">
                Dnevne AI Trener Konzultacije
              </h3>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-semibold">
                Adaptivno
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Napiši kako se osjećaš danas ili jesi li upaljen od trčanja/neispavan uz bebu.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Pills */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {quickPills.map((pill, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setInputText(pill);
              handleConsultation(pill);
            }}
            className="text-[11px] bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-amber-500/50 px-3 py-1.5 rounded-xl transition-colors text-left"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Custom Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleConsultation(inputText)}
          placeholder="Npr. Imam jaču upalu nogu od trčanja i malo me zatežu leđa..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
        />
        <button
          onClick={() => handleConsultation(inputText)}
          disabled={loading || !inputText.trim()}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Pitaj</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* AI Advice Output Display */}
      {aiResponse && (
        <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Savjet AI Trenera:</span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            {aiResponse.advice}
          </p>

          {/* Individual Exercise Replacement Suggestion */}
          {aiResponse.exerciseReplacement && (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold px-2 py-0.5 rounded">
                      Predložena zamjena vježbe
                    </span>
                    <span className="text-xs text-slate-400 font-semibold line-through">
                      {aiResponse.exerciseReplacement.originalExerciseName}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-xs text-emerald-300 font-bold">
                      {aiResponse.exerciseReplacement.replacementExercise.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    💡 <strong className="text-slate-300">Razlog:</strong> {aiResponse.exerciseReplacement.reason}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (aiResponse.exerciseReplacement && onApplyExerciseReplacement) {
                      onApplyExerciseReplacement(aiResponse.exerciseReplacement);
                      setAppliedSwap(true);
                    }
                  }}
                  disabled={appliedSwap || hasAppliedReplacement}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 ${
                    appliedSwap || hasAppliedReplacement
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                      : 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 hover:brightness-110 shadow-lg'
                  }`}
                >
                  {appliedSwap || hasAppliedReplacement ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Vježba Zamijenjena u Treningu!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Primijeni Zamjenu za Danas</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Full Workout Adaptation Suggestion */}
          {aiResponse.recommendedWorkoutType && (
            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-[11px] text-amber-300 font-medium">
                💡 AI predlaže prilagodbu cijelog treninga: <strong className="text-white uppercase">{aiResponse.recommendedWorkoutType === 'isometrics' ? 'Izometrijski trening (Wall sit, ručnik, guranje zida)' : aiResponse.recommendedWorkoutType}</strong>
              </div>

              <button
                onClick={() => {
                  if (aiResponse.recommendedWorkoutType) {
                    onApplyWorkoutSwap(aiResponse.recommendedWorkoutType);
                    setAppliedSwap(true);
                  }
                }}
                disabled={appliedSwap}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  appliedSwap
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md'
                }`}
              >
                {appliedSwap ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Trening Prilagođen!</span>
                  </>
                ) : (
                  <>
                    <span>Primijeni Prilagođeni Trening</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
