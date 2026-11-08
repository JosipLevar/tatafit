import React from 'react';
import { UserProgression, WorkoutLog } from '../types/workout';
import { formatZagrebDateNice } from '../utils/dateUtils';
import { 
  Dumbbell, 
  ShieldCheck, 
  Footprints, 
  Flame, 
  TrendingUp, 
  Zap, 
  Calendar, 
  XCircle, 
  CheckCircle2, 
  Baby,
  Info
} from 'lucide-react';

interface ProgressionStatsProps {
  progression: UserProgression;
  logs: WorkoutLog[];
  onOpenDadGuide?: () => void;
}

export const ProgressionStats: React.FC<ProgressionStatsProps> = ({ progression, logs, onOpenDadGuide }) => {
  return (
    <div className="space-y-6">
      {/* Integrated Tata Vodič Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
            <Baby className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">Vodič za Tate & Spondiloartritis</h3>
            <p className="text-xs text-slate-400">Savjeti za leđa, inkubator i organizaciju vremena</p>
          </div>
        </div>

        {onOpenDadGuide && (
          <button
            onClick={onOpenDadGuide}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <Info className="w-4 h-4" />
            <span>Otvori Vodič</span>
          </button>
        )}
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Odrađeni treninzi</span>
            <Dumbbell className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {progression.totalWorkoutsCompleted}
          </div>
          <span className="text-[10px] text-slate-500">Ukupno zabilježeno</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Rehabilitacija Leđa</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            {progression.backRehabCount}
          </div>
          <span className="text-[10px] text-slate-500">Protokola odrađeno</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Progresija Trčanja</span>
            <Footprints className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black font-mono text-sky-400">
            {progression.runningDistanceKm.toFixed(1)} km
          </div>
          <span className="text-[10px] text-slate-500">Uvezano s kardijem</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Kardio Motor</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-black font-mono text-orange-400">
            Nivo {progression.cardioEngineLevel || 1}
          </div>
          <span className="text-[10px] text-slate-500">Shadow Box & Trčanje</span>
        </div>
      </div>

      {/* Progressive Levels Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Pametna Uvezana Progresija</span>
        </h3>

        <div className="space-y-4">
          {/* Cardio Engine */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-orange-400" />
                Kardio Kapacitet (Borilački Kardio + Trčanje)
              </span>
              <span className="font-mono text-orange-400 font-bold">
                Distanca: {progression.runningDistanceKm.toFixed(1)} km
              </span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-sky-500 transition-all duration-300"
                style={{ width: `${Math.min(100, (progression.runningDistanceKm / 3.5) * 100)}%` }}
              />
            </div>
          </div>

          {/* Calisthenics Level */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-semibold">Kalistenika & Snaga</span>
              <span className="font-mono text-amber-400 font-bold">Nivo {progression.calisthenicsLevel} / 10</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${(progression.calisthenicsLevel / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Shadow Boxing Level */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-semibold">Shadow Boxing & Borilački Kardio</span>
              <span className="font-mono text-rose-400 font-bold">Nivo {progression.shadowBoxingLevel || 1} / 5</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all duration-300"
                style={{ width: `${((progression.shadowBoxingLevel || 1) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* BJJ Flow Level */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-semibold">BJJ & Animal Flow Mobilnost</span>
              <span className="font-mono text-purple-400 font-bold">Nivo {progression.bjjFlowLevel} / 5</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${(progression.bjjFlowLevel / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Workout Logs History & Pain Tracker */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Dnevnik Treninga & Status Boli Leđa</span>
        </h3>

        {logs.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            Još nema zabilježenih treninga. Odradi svoj prvi trening danas!
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log, idx) => {
              const isSkipped = log.status === 'skipped';
              return (
                <div
                  key={`${log.dateKey}_${idx}`}
                  className={`border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSkipped
                      ? 'bg-rose-950/20 border-rose-500/30 text-slate-400'
                      : 'bg-slate-950 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold font-mono ${
                        isSkipped
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : log.painRating <= 2
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : log.painRating === 3
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {isSkipped ? 'X' : `${log.painRating}/5`}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{log.title}</h4>
                        <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-mono">
                          {formatZagrebDateNice(log.dateKey)}
                        </span>
                      </div>

                      {log.userNotes && (
                        <p className="text-xs text-slate-400 mt-1 italic">
                          "{log.userNotes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
                    {isSkipped ? (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        Preskočeno (Nema progresije)
                      </span>
                    ) : (
                      <>
                        <span className="font-mono">{log.durationMinutes} min</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Odrađeno
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
