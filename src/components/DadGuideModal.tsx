import React from 'react';
import { X, Baby, ShieldAlert, Heart, Clock, Footprints, Sparkles, Dumbbell } from 'lucide-react';

interface DadGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DadGuideModal: React.FC<DadGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Baby className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Vodič za Tate & Oporavak Leđa</h2>
              <p className="text-xs text-slate-400">Inkubator, Spondiloartritis & Povratak Treninzima</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="py-5 space-y-6 overflow-y-auto text-xs text-slate-300 leading-relaxed">
          {/* Section 1: Bebin Dolazak Kući */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Heart className="w-4 h-4 text-amber-400" />
              <span>Dolazak sina iz inkubatora nakon 60 dana</span>
            </div>
            <p className="text-slate-300">
              Čestitamo! Nakoni 60 dugih dana borbe u inkubatoru, tvoj sin dolazi kući. To je ogroman korak i tvoj primarni fokus bit će na njemu i obitelji. 
              <strong>Ne vrši pritisak na sebe da treniraš 1 sat u komadu!</strong> Zato smo u aplikaciju ugradili <strong>"Tata Mode"</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pt-1">
              <li><strong>Sekcije kroz dan:</strong> Napravi 5 sklekova kad promijeniš pelenu ili 1 seriju tibialis raise dok čekaš bočicu.</li>
              <li><strong>Bebina noćna straža:</strong> Ako te noć bez spavanja izbaci iz ritma, aplikacija automatski spava tvoj niz (streak freeze).</li>
            </ul>
          </div>

          {/* Section 2: Obavezna rehabilitacija leđa (Spondiloartritis) */}
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>Zašto je tjedni protokol za leđa obavezna polica osiguranja</span>
            </div>
            <p className="text-emerald-200/90">
              Nakon prekida jiu jitse zbog spondiloartritisa, zglobovi i diskovi gube prirodnu podršku ako kinetički lanac oslabi. Tvoj tjedni protokol za leđa (vježbe u nastavku) rješava uzroke boli od stopala prema gore:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-emerald-500/20">
                <strong className="text-emerald-300 block">Tibialis & Deep Calf Raise:</strong>
                Prvi i glavni amortizeri sile udarca pri hodu i trčanju.
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-emerald-500/20">
                <strong className="text-emerald-300 block">ATG Split Squat & Step Up:</strong>
                Deblokada ukočenih pregibača kuka (psoasa) koji vuku zdjelicu.
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-emerald-500/20">
                <strong className="text-emerald-300 block">Trap Raise (Y-raise):</strong>
                Otvaranje torakalnog dijela leđa protiv pognutog drženja djeteta.
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-emerald-500/20">
                <strong className="text-emerald-300 block">Back Extensions & Side Bend:</strong>
                Izometričko prokrvljavanje erektora i deblokada QL mišića.
              </div>
            </div>
          </div>

          {/* Section 3: Miksanje & Iznenadni treninzi */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Svaki dan drugačiji trening & Ponoćni reset</span>
            </div>
            <p className="text-slate-300">
              Da ti ne bude dosadno, algoritam točno u ponoć po <strong>Zagrebačkom vremenu (Europe/Zagreb)</strong> generira novu kombinaciju. Rotiraju se:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-amber-300 font-semibold">
                Dnevni izazovi (100 sklekova)
              </span>
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-emerald-300 font-semibold">
                Kalistenika s progresijom
              </span>
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-sky-300 font-semibold">
                Sigurno trčanje s hodanjem
              </span>
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-purple-300 font-semibold">
                BJJ flow na tepihu
              </span>
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-rose-300 font-semibold">
                EMOM 15 minuta
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-colors"
          >
            Razumijem, spreman sam za trening! 💪
          </button>
        </div>
      </div>
    </div>
  );
};
