import { DailyWorkout, ExerciseItem } from '../types/workout';

/**
 * Obavezni tjedni trening za leđa i donji lanac
 */
export const MANDATORY_BACK_EXERCISES: ExerciseItem[] = [
  {
    id: 'back_tibialis_raise',
    name: 'Tibialis raise',
    croatianName: 'Podizanje prstiju za prednji goljenični mišić',
    sets: 2,
    reps: '25',
    targetCount: 25,
    tempo: 'Kontrolirano, 1s zadrške na vrhu',
    restSeconds: 45,
    description: 'Nasloni se leđima na zid, stopala postavi 30-40 cm ispred sebe. Držeći koljena potpuno ravna, podigni prste i prednji dio stopala visoko prema potkoljenici. Zadrži 1 sekundu na vrhu i kontrolirano spusti.',
    backFriendlyTip: 'Tibialis je prvi amortizer tijela. Što je jači, manje vibracija i kompresije pri hodu i trčanju putuje u tvoju kralježnicu.',
    targetMuscles: ['Prednja goljenica', 'Skočni zglob', 'Potkoljenica']
  },
  {
    id: 'back_deep_calf_raise',
    name: 'Deep calf raise',
    croatianName: 'Duboko podizanje na prste na rubu povišenja',
    sets: 2,
    reps: '25',
    targetCount: 25,
    tempo: '2s spuštanje, puni raspon',
    restSeconds: 45,
    description: 'Stani prednjim dijelom stopala na stepenicu ili prag. Spusti pete što je dublje moguće ispod razine stepenice, osjeti duboko istezanje ahilove tetive, a zatim se snažno podigni na nožne prste.',
    backFriendlyTip: 'Puni opseg skočnog zgloba sprječava kompenzaciju zdjelice i lumbalnog dijela pri saginjanju nad dječjim krevetićem.',
    targetMuscles: ['Listovi', 'Ahilova tetiva', 'Skočni zglob']
  },
  {
    id: 'back_reverse_step_up',
    name: 'Reverse step up',
    croatianName: 'Step-up unazad s kontrolom koljena i pete',
    sets: 2,
    reps: '25',
    targetCount: 25,
    tempo: 'Kontrolirano, lagan dodir petom',
    restSeconds: 60,
    description: 'Stani na nisku stepenicu ili knjigu (10-15 cm). Radna noga ostaje na povišenju, a slobodnu nogu spuštaj unazad dok petom lagano ne dotakne pod. Koljeno radne noge putuje naprijed preko prstiju.',
    backFriendlyTip: 'Aktivira VMO mišić iznad koljena i stabilizira sakroilijakalni (SI) zglob bez aksijalnog pritiska na kralješke.',
    targetMuscles: ['Kvadriceps (VMO)', 'Kukovi', 'Koljena']
  },
  {
    id: 'back_full_range_split_squats',
    name: 'Full range split squats',
    croatianName: 'Puni opseg split čučnja (ATG iskorak)',
    sets: 2,
    reps: '10 po nozi',
    targetCount: 10,
    tempo: '3s spuštanje, 1s zadrška',
    restSeconds: 60,
    description: 'Zauzmi dugačak iskorak. Spuštaj se prema naprijed i dolje tako da zadnja loža prednje noge pokrije list, dok zadnja noga ostaje što ravnija. Drži trup uspravan. Ako je potrebno, pridrži se za zid ili stolac.',
    backFriendlyTip: 'Otvara ukočeni pregibač kuka (iliopsoas) stražnje noge. Skraćeni psoas kod spondilitisa vuče lumbalnu kralježnicu naprijed i stvara bol.',
    targetMuscles: ['Pregibači kuka', 'Kvadriceps', 'Gluteus', 'Zadnja loža']
  },
  {
    id: 'back_trap_raise',
    name: 'Trap raise',
    croatianName: 'Podizanje donjeg trapeza u obliku slova Y',
    sets: 2,
    reps: '20',
    targetCount: 20,
    tempo: 'Kontrolirano, 2s na vrhu',
    restSeconds: 45,
    description: 'Lezi na prsa na podu ili se nagni trupom preko naslona stolca. Ruke postavi u obliku slova Y s palčevima okrenutim prema stropu. Podiži ruke povlačenjem donjih rubova lopatica prema dolje i unutra.',
    backFriendlyTip: 'Donji trapez drži torakalnu kralježnicu otvorenom i bori se protiv ankilozantnog pognutog držanja.',
    targetMuscles: ['Donji trapez', 'Romboidi', 'Torakalna kralježnica']
  },
  {
    id: 'back_back_extensions',
    name: 'Back extensions',
    croatianName: 'Ekstenzija leđa (izometrija / hiperekstenzija)',
    sets: 1,
    reps: '2 min (120 sekundi)',
    targetCount: 120,
    isTimed: true,
    durationSeconds: 120,
    tempo: 'Izometričko držanje ili 4x30s serije',
    restSeconds: 60,
    description: 'Ako imaš spravu za hiperekstenziju, zadrži vodoravni položaj. Kod kuće na podu: lezi potrbuške, stisni gluteuse i podigni gornji dio prsa i ramena par centimetara od poda (Supermen varijanta). Možeš podijeliti na 4 x 30 sekundi!',
    backFriendlyTip: 'Izometrija erektora kralježnice šalje bogatu cirkulaciju u diskove i zglobove kralježaka bez opasnog savijanja.',
    targetMuscles: ['Erektori kralježnice', 'Gluteus', 'Lumbalni dio']
  },
  {
    id: 'back_hip_flexor_kick_out',
    name: 'Hip flexor kick out',
    croatianName: 'Izbačaj i kontrola pregibača kuka',
    sets: 2,
    reps: '5 po nozi',
    targetCount: 5,
    tempo: '2s zadrška pri punom ispružanju',
    restSeconds: 45,
    description: 'U stojećem stavu (ili ležeći na leđima) podigni jedno koljeno visoko prema prsima pod 90°. Iz te pozicije kontrolirano ispruži potkoljenicu ravno naprijed ne dopuštajući bedru da padne. Zadrži 2 sekunde!',
    backFriendlyTip: 'Jača psoas u skraćenoj zoni. Snažan psoas drži kralježnicu stabilnom dok nosiš bebu.',
    targetMuscles: ['Iliopsoas', 'Rektus femoris', 'Duboki trbušni mišići']
  },
  {
    id: 'back_side_bend',
    name: 'Side bend',
    croatianName: 'Bočni pregib za kvadratus lumborum (QL)',
    sets: 2,
    reps: '12 po strani',
    targetCount: 12,
    tempo: 'Glatko, kontrolirano',
    restSeconds: 45,
    description: 'Stani uspravno, u jednoj ruci drži laganu težinu (boca vode od 1-2L ili bučica ako imaš). Spusti trup bočno prema strani s utegom, a zatim se snagom suprotne bočne strane vrati u ravan položaj.',
    backFriendlyTip: 'Quadratus Lumborum (QL) mišić često postane tvrd kao kamen kod spondiloartritisa. Ovaj kontrolirani pokret vraća mu elastičnost.',
    targetMuscles: ['Quadratus lumborum', 'Kosi trbušni mišići', 'Lateralna fascija']
  }
];

export const BACK_WORKOUT_TEMPLATE: DailyWorkout = {
  id: 'workout_back_bulletproof_primary',
  dateKey: '',
  title: 'Bulletproof Leđa & Donji Lanac',
  type: 'back_bulletproof',
  typeLabel: 'Rehabilitacija Leđa',
  tagline: 'Obavezni tjedni protokol za kralježnicu i kinetički lanac',
  durationMin: 25,
  intensity: 'Umjeren',
  level: 1,
  isSplitFriendly: true,
  isMandatoryBackRoutine: true,
  description: 'Ključni rehabilitacijski protokol za oporavak leđa, dekompresiju kralježaka i jačanje tetiva. Možeš ga odraditi u komadu (cca 20 min) ili podijeliti u 2 sekcije dok beba odmara.',
  dadTip: 'Ovaj trening je tvoja polica osiguranja. Kad beba bude tražila nošenje satima, tvoja leđa će ti biti zahvalna što si uložio ovih 20 minuta.',
  exercises: MANDATORY_BACK_EXERCISES,
  sections: [
    {
      id: 'sec_back_1',
      title: 'Sekcija 1: Stopala, koljena i donji lanac (10 min)',
      recommendedTime: 'Jutro ili prvi odmor uz bebu',
      exercises: MANDATORY_BACK_EXERCISES.slice(0, 4)
    },
    {
      id: 'sec_back_2',
      title: 'Sekcija 2: Torakalni dio, ekstenzija i trup (12 min)',
      recommendedTime: 'Popodne ili večer',
      exercises: MANDATORY_BACK_EXERCISES.slice(4)
    }
  ]
};

/**
 * Dinamička baza treninga s pametnom uvezanošću (Cross-Discipline Progression)
 */
export function getWorkoutDatabase(progression: {
  calisthenicsLevel: number;
  runningDistanceKm: number;
  cardioEngineLevel: number;
  challengePushups: number;
  walkingStepsTarget: number;
  coreChallengeReps: number;
  shadowBoxingLevel: number;
  bjjFlowLevel: number;
  animalFlowLevel: number;
}): DailyWorkout[] {
  const pLevel = progression.calisthenicsLevel;
  const pushupChallengeCount = progression.challengePushups || 100;
  const stepsTarget = progression.walkingStepsTarget || 10000;
  const coreReps = progression.coreChallengeReps || 100;
  const sbLevel = progression.shadowBoxingLevel || 1;
  const afLevel = progression.animalFlowLevel || 1;
  const cardioLvl = progression.cardioEngineLevel || 1;

  // PAMETNO PRESAKANJE STEPENICA (Cross-Discipline Jump!):
  // Ako je kardio nivo visok zbog npr. Shadow Boxinga, trčanje automatski preskače 1.0 km i skače na 1.3 km ili 1.6 km!
  const runDistCalculated = Math.max(progression.runningDistanceKm || 1.0, 1.0 + (cardioLvl - 1) * 0.3);

  const basePushupsReps = 8 + pLevel * 2;
  const baseSquatReps = 12 + pLevel * 3;

  return [
    // 1. SHADOW BOXING 5x3 MIN (BJJ & Borilački Kardio - Pametno jača kardio kapacitet!)
    {
      id: 'shadow_boxing_fight_cardio',
      dateKey: '',
      title: 'Shadow Boxing: 5 Rundi Borilačkog Kardija',
      type: 'shadow_boxing',
      typeLabel: 'Borilački Kardio',
      tagline: '5 rundi po 3 minute s rotacijom kukova i aktivacijom trupa',
      durationMin: 20,
      intensity: 'Umjeren',
      level: sbLevel,
      isSplitFriendly: true,
      isMandatoryBackRoutine: false,
      description: 'Zabavan borilački trening na tepihu bez pritiska na leđa! Rotacija kukova, rad nogu i udarci u zrak bilježe napredak u tvoj kardio kapacitet koji će preskočiti stepenicu za trčanje.',
      dadTip: 'Možeš odraditi 2 runde ujutro i 3 runde popodne ako beba traži pažnju.',
      exercises: [
        {
          id: 'sb_round_1',
          name: 'Runda 1: Jab-Cross + Pivot kretanje (3 min)',
          croatianName: 'Runda 1: Osnovne kombinacije s rotacijom zdjelice',
          sets: 1,
          reps: '3 minute',
          targetCount: 180,
          isTimed: true,
          durationSeconds: 180,
          tempo: 'Lagan borilački ritam',
          restSeconds: 60,
          description: 'Kreći se na prednjem dijelu stopala. Izbacuj opuštene zadate kombinacije (Jab-Cross, Jab-Cross-Hook) naglašavajući rotaciju stražnjeg kuka i peta.',
          backFriendlyTip: 'Snaga udarca dolazi iz kuka i rotacije zdjelice, a ne uvijanjem slabinskog dijela leđa.',
          targetMuscles: ['Deltoidi', 'Kosi trbušni mišići', 'Gležnjevi', 'Kardio']
        },
        {
          id: 'sb_round_2',
          name: 'Runda 2: Slip & Weave kretanje glave (3 min)',
          croatianName: 'Runda 2: Izmak glave s radom nogu i kvadricepsa',
          sets: 1,
          reps: '3 minute',
          targetCount: 180,
          isTimed: true,
          durationSeconds: 180,
          tempo: 'Ritmičko savijanje u koljenima',
          restSeconds: 60,
          description: 'Zamisli da ti udarac ide prema glavi. Radi blage izmake s podignutim prsima i stisnutim donjim trbuhom.',
          backFriendlyTip: 'Zavlači se savijanjem u koljenima i kukovima, a ne savijanjem u struku.',
          targetMuscles: ['Kvadriceps', 'Trup', 'Kardio']
        },
        {
          id: 'sb_round_3',
          name: 'Runda 3: Takedown Defense Sprawl simulator (3 min)',
          croatianName: 'Runda 3: BJJ obrana od rušenja u zraku',
          sets: 1,
          reps: '3 minute',
          targetCount: 180,
          isTimed: true,
          durationSeconds: 180,
          tempo: 'Eksplozivni ulazi',
          restSeconds: 60,
          description: 'Kombiniraj udarce u zraku i svake 20 sekundi napravi brz udarac kukovima unazad u zrak (zračni sprawl) bez pada na pod.',
          backFriendlyTip: 'Zadrži gluteus zategnut u najnižoj točki sprawla.',
          targetMuscles: ['Gluteus', 'Pregibači kuka', 'Kardio']
        },
        {
          id: 'sb_round_4_5',
          name: 'Runde 4 & 5: Puni Shadow Flow & Disanje (6 min)',
          croatianName: 'Runde 4 & 5: Puni slobodni flow s disanjem',
          sets: 2,
          reps: '3 minute po rundi',
          targetCount: 360,
          isTimed: true,
          durationSeconds: 360,
          tempo: 'Slobodan ritam',
          restSeconds: 60,
          description: 'Spoji sve pokrete: udarci, slipping, rotacija i rad nogu s dubokim nasalnim disanjem.',
          backFriendlyTip: 'Opuštena ramena drže vratnu kralježnicu bez ukočenosti.',
          targetMuscles: ['Cijelo tijelo', 'Kardiovaskularni sustav']
        }
      ]
    },

    // 2. DNEVNI IZAZOV: 10,000 KORAKA (Hodajući izazov s kolicima)
    {
      id: 'walking_challenge_10k_steps',
      dateKey: '',
      title: `Dnevni Izazov: ${stepsTarget.toLocaleString('hr-HR')} Koraka Danas`,
      type: 'walking_challenge',
      typeLabel: 'Hodajući Izazov',
      tagline: 'Akumuliraj korake kroz dan uz šetnju s kolicima s bebom',
      durationMin: 30,
      intensity: 'Lagan',
      level: Math.round(stepsTarget / 2000),
      isSplitFriendly: true,
      isMandatoryBackRoutine: false,
      description: `Hodanje je najbolji prirodni dekompresor kralježnice! Cilj je sakupiti ${stepsTarget.toLocaleString('hr-HR')} koraka do ponoći. Odradi dugu šetnju s kolicima na svježem zraku ili skupljaš korake kroz dan.`,
      dadTip: 'Šetnja s bebinim kolicima u parku donosi dvostruku pobjedu: beba spava na svježem zraku, a tvoja leđa se dekomprimiraju.',
      exercises: [
        {
          id: 'walk_steps_accumulator',
          name: 'Dnevni koraci s kolicima ili u pokretu',
          croatianName: 'Akumulirani dnevni koraci',
          sets: 1,
          reps: `${stepsTarget.toLocaleString('hr-HR')} koraka`,
          targetCount: stepsTarget,
          tempo: 'Ujednačen tempo hoda',
          restSeconds: 0,
          description: `Zabilježi korake sa svog sata ili mobitela. Pazi na uspravno držanje i prirodan zamah rukama pri hodu.`,
          backFriendlyTip: 'Gazi s blagom aktivacijom gluteusa pri svakom odrivu stopala.',
          targetMuscles: ['Listovi', 'Gluteus', 'Kralježnica', 'Opće zdravlje']
        }
      ]
    },

    // 3. DNEVNI IZAZOV: 100 TRBUŠNJAKA & DEADBUG DEKOMPRESIJA
    {
      id: 'core_challenge_100_reps',
      dateKey: '',
      title: `Dnevni Izazov: ${coreReps} Mrtvih Kukaca & Trup`,
      type: 'core_challenge',
      typeLabel: 'Trup Izazov',
      tagline: '100 akumuliranih ponavljanja stabilizacije donjeg leđa',
      durationMin: 15,
      intensity: 'Umjeren',
      level: Math.round(coreReps / 20),
      isSplitFriendly: true,
      isMandatoryBackRoutine: false,
      description: `Nema klasičnih sklupčavanja koja lome vrat! Cilj je skupiti ${coreReps} ponavljanja Dead Bug-a (Mrtvog kuka) i podizanja zdjelice s donjim leđima zalijepljenim za pod.`,
      dadTip: 'Napravi 15-20 ponavljanja kad god imaš 2 minute u dnevnoj sobi.',
      exercises: [
        {
          id: 'core_deadbug_accumulator',
          name: 'Dead Bug s pritisnutim leđima uz pod',
          croatianName: 'Mrtvi kukac u serijama kroz dan',
          sets: 5,
          reps: `${coreReps} ukupno`,
          targetCount: coreReps,
          tempo: 'Polagano s 1s zadrške',
          restSeconds: 30,
          description: 'Lezi na leđa, donji dio leđa pritisnut uz pod. Spuštaj suprotnu ruku i nogu prema podu bez odvajanja leđa.',
          backFriendlyTip: 'Zlatni standard za stabilizaciju lumbalnih diskova.',
          targetMuscles: ['Transversus abdominis', 'Duboki trbušni mišići']
        }
      ]
    },

    // 4. TRČANJE (PAMETNO PRESKAČE STEPENICU ako je kardio nivo visok!)
    {
      id: 'running_spine_friendly_intervals',
      dateKey: '',
      title: `Trčanje & Hodanje: ${runDistCalculated.toFixed(1)} km (Progresivni Skok)`,
      type: 'running',
      typeLabel: 'Kardio / Trčanje',
      tagline: `Preskočena stepenica! Distanca prilagođena kardio formi (${runDistCalculated.toFixed(1)} km)`,
      durationMin: 20,
      intensity: 'Lagan',
      level: Math.round(runDistCalculated * 2),
      isSplitFriendly: false,
      isMandatoryBackRoutine: false,
      description: `Zbog tvoje odrađene kardio pripreme u Shadow Boxingu / EMOM-u, aplikacija je automatski prilagodila distancu na ${runDistCalculated.toFixed(1)} km! Uvijek koristi metodu trčanje-hodanje ako osjetiš zglobove.`,
      dadTip: 'Prošetaj 3 minute prije prvog trkačkog koraka.',
      exercises: [
        {
          id: 'run_warmup_mobility',
          name: 'Zagrijavanje prednjeg lanca',
          croatianName: 'Zagrijavanje prije trčanja (5 min)',
          sets: 1,
          reps: '5 minuta',
          tempo: 'Lagano',
          restSeconds: 0,
          description: 'Visoko podizanje koljena i kruženje gležnjevima.',
          backFriendlyTip: 'Nikad ne trči na hladne zglobove.',
          targetMuscles: ['Gležnjevi', 'Kukovi']
        },
        {
          id: 'run_main_distance',
          name: `Trčanje/hodanje ukupno ${runDistCalculated.toFixed(1)} km`,
          croatianName: `Progresivna distanca: ${runDistCalculated.toFixed(1)} km`,
          sets: 1,
          reps: `${runDistCalculated.toFixed(1)} km`,
          targetCount: Math.round(runDistCalculated * 1000),
          tempo: 'Konverzationalni tempo',
          restSeconds: 0,
          description: `Odradi ${runDistCalculated.toFixed(1)} km na mekoj podlozi.`,
          backFriendlyTip: 'Gazi sredinom stopala.',
          targetMuscles: ['Kardio', 'Noge']
        }
      ]
    },

    // 5. IZOMETRIJA
    {
      id: 'isometrics_wall_and_towel_power',
      dateKey: '',
      title: 'Izometrija Snaga: Zid & Ručnik (Bez opreme)',
      type: 'isometrics',
      typeLabel: 'Izometrija',
      tagline: 'Wall sit 3x40s, guranje zida 3x40s & vučenje ručnika 3x40s',
      durationMin: 18,
      intensity: 'Umjeren',
      level: 2,
      isSplitFriendly: true,
      isMandatoryBackRoutine: false,
      description: 'Znanstveno najsigurniji oblik treninga s nula kompresije na diskovima.',
      dadTip: 'Potreban je samo kućni ručnik i zid.',
      exercises: [
        {
          id: 'iso_wall_sit_40',
          name: 'Wall sit (Zidni čučanj)',
          croatianName: 'Zidni čučanj s leđima pritisnutim uz zid',
          sets: 3,
          reps: '40 sekundi',
          targetCount: 40,
          isTimed: true,
          durationSeconds: 40,
          tempo: 'Statika',
          restSeconds: 45,
          description: 'Spusti se u čučanj uz zid pod 90°. Pritisni donji dio leđa ravno uz zid.',
          backFriendlyTip: 'Zid nosi težinu kralježnice.',
          targetMuscles: ['Kvadriceps', 'Gluteus']
        },
        {
          id: 'iso_wall_overhead_push',
          name: 'Wall Overhead Push (Guranje zida prema gore)',
          croatianName: 'Izometričko guranje zida dlanovima prema gore',
          sets: 3,
          reps: '40 sekundi',
          targetCount: 40,
          isTimed: true,
          durationSeconds: 40,
          tempo: 'Maksimalan pritisak prema gore',
          restSeconds: 40,
          description: 'Stani uz zid, pritisni dlanove o zid gurajući ravno prema gore.',
          backFriendlyTip: 'Aktivira donji trapez i gornja leđa.',
          targetMuscles: ['Donji trapez', 'Gornja leđa']
        },
        {
          id: 'iso_towel_biceps_curl',
          name: 'Towel Biceps Curl Isometric Hold',
          croatianName: 'Vučenje ručnika u pozi biceps pregiba (pod 90°)',
          sets: 3,
          reps: '40 sekundi',
          targetCount: 40,
          isTimed: true,
          durationSeconds: 40,
          tempo: 'Povlačenje svom snagom',
          restSeconds: 45,
          description: 'Stani na ručnik, uhvati krajeve rukama pod 90° i vuci prema gore!',
          backFriendlyTip: 'Ogromna tenzija bez uvijanja leđa.',
          targetMuscles: ['Biceps', 'Podlaktice']
        }
      ]
    },

    // 6. ANIMAL FLOW
    {
      id: 'animal_flow_primal_foundations',
      dateKey: '',
      title: 'Animal Flow: Primal Pokreti & Trup',
      type: 'animal_flow',
      typeLabel: 'Animal Flow',
      tagline: 'Beast hold, Crab reach & Scorpion rotacije',
      durationMin: 18,
      intensity: 'Umjeren',
      level: afLevel,
      isSplitFriendly: true,
      isMandatoryBackRoutine: false,
      description: 'Primalni životinjski pokreti na podu bez ikakve opreme.',
      dadTip: 'Radi na mekanom tepihu.',
      exercises: [
        {
          id: 'af_beast_hold',
          name: 'Beast Hold (Medvjeđi izdržaj)',
          croatianName: 'Medvjeđi stav s koljenima 2 cm od poda',
          sets: 3,
          reps: '45 sekundi',
          targetCount: 45,
          isTimed: true,
          durationSeconds: 45,
          tempo: 'Koljena 2cm od poda',
          restSeconds: 30,
          description: 'Odvoji koljena 2 cm od poda, stisni trbuh i diši mirno.',
          backFriendlyTip: 'Donji dio leđa ostaje potpuno ravan.',
          targetMuscles: ['Transversus abdominis', 'Ramena']
        },
        {
          id: 'af_crab_reach',
          name: 'Crab Reach (Rakov doseg s otvaranjem prsa)',
          croatianName: 'Otvaranje prsnog koša u rakovom stavu',
          sets: 3,
          reps: '6 po strani',
          targetCount: 12,
          tempo: '3s zadrške na vrhu',
          restSeconds: 40,
          description: 'Podigni kukove visoko u rakovom stavu otvarajući prsa.',
          backFriendlyTip: 'Otvara torakalnu kralježnicu.',
          targetMuscles: ['Torakalni dio', 'Gluteus']
        }
      ]
    },

    // 7. DNEVNI IZAZOV: STOTKA SKLEKOVA
    {
      id: 'challenge_pushup_centurion',
      dateKey: '',
      title: `Dnevni Izazov: ${pushupChallengeCount} Sklekova Danas`,
      type: 'challenge',
      typeLabel: 'Dnevni Izazov',
      tagline: 'Podijeli u serijama kroz cijeli dan prema želji',
      durationMin: 20,
      intensity: 'Umjeren',
      level: Math.round(pushupChallengeCount / 20),
      isSplitFriendly: true,
      isMandatoryBackRoutine: false,
      description: `Skupi ukupno ${pushupChallengeCount} pravilnih sklekova u serijama kroz dan.`,
      dadTip: 'Zabilježi svaku seriju tapkanjem na brojač.',
      exercises: [
        {
          id: 'chal_pushups',
          name: 'Sklekovi u serijama kroz dan',
          croatianName: 'Dnevni akumulirani sklekovi',
          sets: 10,
          reps: `${pushupChallengeCount} ukupno`,
          targetCount: pushupChallengeCount,
          tempo: 'Puni opseg',
          restSeconds: 0,
          description: `Ukupno ${pushupChallengeCount} sklekova u serijama.`,
          backFriendlyTip: 'Stisni donji trbuh i gluteuse.',
          targetMuscles: ['Prsa', 'Triceps', 'Trup']
        }
      ]
    }
  ];
}
