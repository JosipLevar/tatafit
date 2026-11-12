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

  const shadowBoxingEx: ExerciseItem[] = [
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
  ];

  // 1. EMOM EXERCISES (Every Minute on the Minute - Format B)
  const emomExercises: ExerciseItem[] = [
    {
      id: 'emom_pushups_minute',
      name: 'Minuta 1: Sklekovi s povišenja / podni',
      croatianName: 'Minuta 1: Sklekovi kontroliranog tempa (8-10 reps)',
      sets: 4,
      reps: '8-10 ponavljanja',
      targetCount: 10,
      tempo: '2s spuštanje, 1s izbačaj',
      restSeconds: 0,
      description: 'Na početku minute odradi 8-10 pravilnih sklekova. Ostatak minute do zvuka gonga koristi za odmor i disanje!',
      backFriendlyTip: 'Stisni gluteuse i donji trbuh tako da lumbalni dio ne visi.',
      targetMuscles: ['Prsa', 'Triceps', 'Prednje rame']
    },
    {
      id: 'emom_stepup_minute',
      name: 'Minuta 2: Reverse Step Up s kontrolom pete',
      croatianName: 'Minuta 2: Reverse Step Up na stepenicu (10 po nozi)',
      sets: 4,
      reps: '10 po nozi',
      targetCount: 20,
      tempo: 'Lagano spuštanje pete',
      restSeconds: 0,
      description: 'Na početku 2. minute odradi 10 laganih step-upova unazad po nozi na pragu ili stepenici. Ostatak minute odmaraš.',
      backFriendlyTip: 'Aktivira koljena i VMO stabilizator bez kompresije na diskove.',
      targetMuscles: ['Kvadriceps', 'Gluteus', 'Koljena']
    },
    {
      id: 'emom_deadbug_minute',
      name: 'Minuta 3: Dead Bug s pritiskom dlanova o bedra',
      croatianName: 'Minuta 3: Mrtvi kukac s aktivacijom trupa (12 reps)',
      sets: 4,
      reps: '12 ponavljanja',
      targetCount: 12,
      tempo: 'Sporo s 1s zadrške',
      restSeconds: 0,
      description: 'Na početku 3. minute lezi na leđa, zalijepi donji dio leđa za pod i napravi 12 izmjena Dead Buga. Ostatak minute odmaraš.',
      backFriendlyTip: 'Zlatni standard za stabilnost sakroilijakalnog zgloba i kralježaka.',
      targetMuscles: ['Transversus abdominis', 'Duboki trup']
    },
    {
      id: 'emom_wallsit_minute',
      name: 'Minuta 4: Zidni izdržaj (Wall Sit)',
      croatianName: 'Minuta 4: Zidni čučanj pod 90° (35 sekundi)',
      sets: 4,
      reps: '35 sekundi rada',
      targetCount: 35,
      isTimed: true,
      durationSeconds: 35,
      tempo: 'Statika',
      restSeconds: 25,
      description: 'Zauzmi položaj uza zid pod 90°. Drži 35 sekundi, a preostalih 25 sekundi odmori prije sljedećeg kruga.',
      backFriendlyTip: 'Zid nosi svu težinu kralježnice dok kvadricepsi i gluteus gore.',
      targetMuscles: ['Kvadriceps', 'Gluteus']
    }
  ];

  // 2. PYRAMID POWER EXERCISES (Format C: 1-2-3-4-5-4-3-2-1)
  const pyramidExercises: ExerciseItem[] = [
    {
      id: 'pyramid_pushups',
      name: 'Piramida sklekova (1-2-3-4-5-4-3-2-1)',
      croatianName: 'Piramidalni sklekovi: Ukupno 25 ponavljanja u 9 serija',
      sets: 9,
      reps: '1-2-3-4-5-4-3-2-1 (25 ukupno)',
      targetCount: 25,
      tempo: 'Puni opseg',
      restSeconds: 30,
      description: 'Odradi seriju od 1 ponavljanja, odmori 20s. Zatim 2, odmori 20s. Pa 3, 4, 5 na vrhu! Nakon vrha spuštaš se: 4, 3, 2, 1. Psihički nevjerojatno zabavno i motivirajuće.',
      backFriendlyTip: 'Možeš raditi s rukama na kauču ako osjetiš umor trupa.',
      targetMuscles: ['Prsa', 'Ramena', 'Trup']
    },
    {
      id: 'pyramid_atg_squats',
      name: 'Piramida ATG split čučnja (1-2-3-4-5-4-3-2-1)',
      croatianName: 'Piramidalni iskorak s pokrivanjem lista (25 po nozi)',
      sets: 9,
      reps: '1-2-3-4-5-4-3-2-1 (25 po nozi)',
      targetCount: 25,
      tempo: 'Duboko spuštanje',
      restSeconds: 30,
      description: 'Isti piramidalni sustav za noge i otvaranje pregibača kuka. Uspon do 5 i silazak natrag do 1.',
      backFriendlyTip: 'Dugotrajno istezanje psoasa smanjuje lumbalnu bol od dugog sjedenja uz bebu.',
      targetMuscles: ['Kukovi', 'Zadnja loža', 'Kvadriceps']
    },
    {
      id: 'pyramid_glute_bridge',
      name: 'Piramida podizanja zdjelice (Glute Bridge)',
      croatianName: 'Most za gluteus s 2s zadrške na vrhu (25 ponavljanja)',
      sets: 9,
      reps: '1-2-3-4-5-4-3-2-1 (25 ukupno)',
      targetCount: 25,
      tempo: '2s stisak na vrhu',
      restSeconds: 20,
      description: 'Lezi na leđa, stopala na podu. Podiži kukove stišćući gluteuse na vrhu bez prekomjernog uvijanja lumbalnih leđa.',
      backFriendlyTip: 'Aktivira gluteus bez i najmanjeg aksijalnog pritiska.',
      targetMuscles: ['Gluteus', 'Zadnja loža', 'Zdjelica']
    }
  ];

  return [
    // 1. EMOM 16 MIN (Format B - Novo & Zvučni intervali!)
    {
      id: 'emom_16min_dad_engine',
      dateKey: '',
      title: 'EMOM 16 Min: Trup & Noge protiv Štoperice',
      type: 'emom',
      typeLabel: 'EMOM Interval',
      tagline: 'Svake minute nova runda (4 kruga x 4 min) uz zvučni timer',
      durationMin: 16,
      intensity: 'Umjeren',
      level: pLevel,
      isSplitFriendly: true,
      isMandatoryBackRoutine: false,
      description: 'Najbolji format protiv dosade! Svake minute odradiš zadani broj ponavljanja, a ostatak minute do zvučnog signala odmaraš. Četiri kruga po četiri minute – brzo prolazi, potiče fokus i nula aksijalnog stresa na kralježnicu.',
      dadTip: 'Možeš pokrenuti ugrađeni EMOM timer u aplikaciji. Ako beba traži pažnju, podijeli trening na 2 sekcije po 8 minuta!',
      exercises: emomExercises,
      sections: [
        {
          id: 'sec_emom_1',
          title: 'Sekcija 1: Krugovi 1 & 2 (8 minuta rada)',
          recommendedTime: 'Jutro ili prvi odmor dok beba drijema',
          exercises: emomExercises.slice(0, 2)
        },
        {
          id: 'sec_emom_2',
          title: 'Sekcija 2: Krugovi 3 & 4 (8 minuta rada)',
          recommendedTime: 'Popodne ili predvečer',
          exercises: emomExercises.slice(2)
        }
      ]
    },

    // 2. PIRAMIDA SNAGE (Format C - Novo & Ladder izazov!)
    {
      id: 'pyramid_power_ladder',
      dateKey: '',
      title: 'Piramida Snage: 1 do 5 i Natrag',
      type: 'pyramid',
      typeLabel: 'Piramida Snage',
      tagline: 'Popni se do vrha (5 reps) i spusti se natrag uz 3 vježbe',
      durationMin: 18,
      intensity: 'Umjeren',
      level: pLevel,
      isSplitFriendly: true,
      isMandatoryBackRoutine: false,
      description: 'Mentalno iznimno zabavan format: radiš serije od 1, 2, 3, 4, 5, 4, 3, 2, 1 ponavljanje! Čim pređeš vrh (5 ponavljanja), svaka sljedeća serija je lakša i trening leti. Nema monotonije.',
      dadTip: 'Nakon serije od 5 na vrhu piramide već si na pola puta! Možeš se popeti ujutro (1-5), a spustiti popodne (4-1).',
      exercises: pyramidExercises,
      sections: [
        {
          id: 'sec_pyr_1',
          title: 'Sekcija 1: Uspon do vrha (Serije 1 do 5 - 10 min)',
          recommendedTime: 'Jutarnji blok',
          exercises: pyramidExercises.slice(0, 2)
        },
        {
          id: 'sec_pyr_2',
          title: 'Sekcija 2: Spuštanje s vrha & Gluteus (Serije 4 do 1 - 8 min)',
          recommendedTime: 'Popodnevni blok',
          exercises: pyramidExercises.slice(1)
        }
      ]
    },

    // 3. SHADOW BOXING 5x3 MIN (BJJ & Borilački Kardio)
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
      exercises: shadowBoxingEx,
      sections: [
        {
          id: 'sec_sb_1',
          title: 'Sekcija 1: Runde 1 & 2 (Tehnika & rad nogu - 8 min)',
          recommendedTime: 'Jutro ili prva pauza',
          exercises: shadowBoxingEx.slice(0, 2)
        },
        {
          id: 'sec_sb_2',
          title: 'Sekcija 2: Runde 3, 4 & 5 (Sprawl obrana i flow - 12 min)',
          recommendedTime: 'Popodne ili navečer',
          exercises: shadowBoxingEx.slice(2)
        }
      ]
    },

    // 4. DNEVNI IZAZOV: 10,000 KORAKA (Hodajući izazov s kolicima)
    {
      id: 'walking_challenge_10k_steps',
      dateKey: '',
      title: 'Dnevni Izazov: 10.000 Koraka Danas',
      type: 'walking_challenge',
      typeLabel: 'Hodajući Izazov',
      tagline: 'Akumuliraj 10.000 koraka kroz dan uz šetnju s kolicima s bebom',
      durationMin: 30,
      intensity: 'Lagan',
      level: 5,
      isSplitFriendly: true,
      isMandatoryBackRoutine: false,
      description: 'Hodanje je najbolji prirodni dekompresor kralježnice! Cilj je sakupiti 10.000 koraka do ponoći. Podijeljeno u 3 šetnje kroz dan ili akumulirano odjednom.',
      dadTip: 'Šetnja s bebinim kolicima u parku donosi dvostruku pobjedu: beba spava na svježem zraku, a tvoja leđa se dekomprimiraju.',
      exercises: [
        {
          id: 'walk_morning',
          name: 'Jutarnja šetnja s kolicima (4.000 koraka)',
          croatianName: 'Jutarnja šetnja: 4.000 koraka uz kolica',
          sets: 1,
          reps: '4.000 koraka',
          targetCount: 4000,
          tempo: 'Ujednačen tempo hoda',
          restSeconds: 0,
          description: 'Prva jutarnja šetnja dok beba spava. Drži ramena opuštena i ne naginji se preko ručke kolica.',
          backFriendlyTip: 'Gazi s blagom aktivacijom gluteusa pri svakom odrivu stopala.',
          targetMuscles: ['Listovi', 'Gluteus', 'Kralježnica']
        },
        {
          id: 'walk_afternoon',
          name: 'Popodnevna šetnja parkom (4.000 koraka)',
          croatianName: 'Popodnevna šetnja: 4.000 koraka',
          sets: 1,
          reps: '4.000 koraka',
          targetCount: 4000,
          tempo: 'Ujednačen tempo hoda',
          restSeconds: 0,
          description: 'Druga šetnja nakon popodnevnog odmora. Dekompresija lumbalne kralježnice kroz kontinuirani ritmički pokret.',
          backFriendlyTip: 'Hodanje pumpa sinovijalnu tekućinu u diskove kralježnice i smanjuje upalu.',
          targetMuscles: ['Listovi', 'Kukovi', 'Kralježnica']
        },
        {
          id: 'walk_evening',
          name: 'Večernji krug & uspavljivanje (2.000 koraka)',
          croatianName: 'Večernji krug: 2.000 koraka',
          sets: 1,
          reps: '2.000 koraka',
          targetCount: 2000,
          tempo: 'Lagan opuštajući tempo',
          restSeconds: 0,
          description: 'Kratki večernji krug za uspavljivanje bebe i dosezanje punog dnevnog cilja od 10.000 koraka.',
          backFriendlyTip: 'Uspravno držanje, lagani koraci bez udaranja petama o tvrdu podlogu.',
          targetMuscles: ['Listovi', 'Opće zdravlje']
        }
      ],
      sections: [
        {
          id: 'sec_walk_1',
          title: 'Sekcija 1: Jutarnja šetnja kolicima (4.000 koraka)',
          recommendedTime: 'Jutarnji svježi zrak dok beba spava',
          exercises: [
            {
              id: 'walk_morning',
              name: 'Jutarnja šetnja s kolicima (4.000 koraka)',
              croatianName: 'Jutarnja šetnja: 4.000 koraka uz kolica',
              sets: 1,
              reps: '4.000 koraka',
              targetCount: 4000,
              tempo: 'Ujednačen tempo hoda',
              restSeconds: 0,
              description: 'Prva jutarnja šetnja dok beba spava. Drži ramena opuštena i ne naginji se preko ručke kolica.',
              backFriendlyTip: 'Gazi s blagom aktivacijom gluteusa pri svakom odrivu stopala.',
              targetMuscles: ['Listovi', 'Gluteus', 'Kralježnica']
            }
          ]
        },
        {
          id: 'sec_walk_2',
          title: 'Sekcija 2: Popodnevna šetnja parkom (4.000 koraka)',
          recommendedTime: 'Popodne nakon hranjenja',
          exercises: [
            {
              id: 'walk_afternoon',
              name: 'Popodnevna šetnja parkom (4.000 koraka)',
              croatianName: 'Popodnevna šetnja: 4.000 koraka',
              sets: 1,
              reps: '4.000 koraka',
              targetCount: 4000,
              tempo: 'Ujednačen tempo hoda',
              restSeconds: 0,
              description: 'Druga šetnja nakon popodnevnog odmora. Dekompresija lumbalne kralježnice kroz kontinuirani ritmički pokret.',
              backFriendlyTip: 'Hodanje pumpa sinovijalnu tekućinu u diskove kralježnice i smanjuje upalu.',
              targetMuscles: ['Listovi', 'Kukovi', 'Kralježnica']
            }
          ]
        },
        {
          id: 'sec_walk_3',
          title: 'Sekcija 3: Večernji krug & uspavljivanje (2.000 koraka)',
          recommendedTime: 'Predvečer',
          exercises: [
            {
              id: 'walk_evening',
              name: 'Večernji krug & uspavljivanje (2.000 koraka)',
              croatianName: 'Večernji krug: 2.000 koraka',
              sets: 1,
              reps: '2.000 koraka',
              targetCount: 2000,
              tempo: 'Lagan opuštajući tempo',
              restSeconds: 0,
              description: 'Kratki večernji krug za uspavljivanje bebe i dosezanje punog dnevnog cilja od 10.000 koraka.',
              backFriendlyTip: 'Uspravno držanje, lagani koraci bez udaranja petama o tvrdu podlogu.',
              targetMuscles: ['Listovi', 'Opće zdravlje']
            }
          ]
        }
      ]
    },

    // 5. DNEVNI IZAZOV: 100 TRBUŠNJAKA & DEADBUG DEKOMPRESIJA
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

    // 6. TRČANJE (PAMETNO PRESKAČE STEPENICU ako je kardio nivo visok!)
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

    // 7. IZOMETRIJA
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
      ],
      sections: [
        {
          id: 'sec_iso_1',
          title: 'Sekcija 1: Noge & Donji dio (Wall Sit - 8 min)',
          recommendedTime: 'Jutarnji odmor',
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
            }
          ]
        },
        {
          id: 'sec_iso_2',
          title: 'Sekcija 2: Gornji dio & Ručnik (Wall Push & Towel - 10 min)',
          recommendedTime: 'Popodnevni odmor',
          exercises: [
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
        }
      ]
    },

    // 8. ANIMAL FLOW & BJJ PRIMAL FLOW
    {
      id: 'animal_flow_primal_foundations',
      dateKey: '',
      title: 'Animal Flow: BJJ Primal Kretanje & Trup',
      type: 'animal_flow',
      typeLabel: 'Animal Flow & BJJ',
      tagline: 'Medvjed, Rakov most, BJJ Sit-out, Škorpion & Val kralježnice',
      durationMin: 20,
      intensity: 'Umjeren',
      level: afLevel,
      isSplitFriendly: true,
      isMandatoryBackRoutine: false,
      description: 'Zabavni podni pokreti inspirirani životinjskim kretnjama i BJJ-om. Nula aksijalnog pritiska na diskove, a gradi stabilnost ramena, otvara ukočeni prsni koš i ublažava ukočenost od spondiloartritisa.',
      dadTip: 'Radi bose noge na tepihu ili strunjači. Puni trening traje 20 min, a u Tata Modu je podijeljen u dvije lagane sekcije po 10 min!',
      exercises: [
        {
          id: 'af_beast_hold',
          name: 'Beast Hold (Medvjeđi stav s izdržajem)',
          croatianName: 'Medvjeđi stav (koljena 2 cm od poda)',
          sets: 3,
          reps: '45 sekundi',
          targetCount: 45,
          isTimed: true,
          durationSeconds: 45,
          tempo: 'Stabilna statika',
          restSeconds: 30,
          description: 'Spusti se na sve četiri: dlanovi točno ispod ramena, koljena ispod kukova pod 90°. Nožni prsti su na podu. Odvoji koljena za samo 2 cm od poda i zaledi položaj. Donji dio leđa je ravan poput stola, pupak blago uvučen.',
          backFriendlyTip: 'Donji dio leđa ostaje potpuno neutralan – nema propadanja trbuha prema podu.',
          targetMuscles: ['Transversus abdominis', 'Prednje rame', 'Kvadriceps']
        },
        {
          id: 'af_crab_reach',
          name: 'Crab Reach (Rakov most s dijagonalnim otvaranjem)',
          croatianName: 'Rakov most s otvaranjem prsnog koša i dosegom',
          sets: 3,
          reps: '6 po strani (12 ukupno)',
          targetCount: 12,
          tempo: '3s zadrške u gornjem dosegu',
          restSeconds: 35,
          description: 'KAKO IZVESTI: 1. Počni u sjedećem stavu raka: stopala na podu u širini ramena, dlanovi iza tebe na podu, stražnjica tik iznad poda. 2. Za desnu stranu: podigni desni dlan s poda u gard ispred lica. 3. Stisni gluteuse i snažno izbaci kukove gore prema stropu (stvaraš stabilan most na lijevoj ruci i stopalima). 4. Desnu ruku pruži dijagonalno PREKO glave prema podu iza lijevog ramena, dok pogled usmjeravaš dolje u lijevi dlan na podu. Osjetit ćeš otvaranje prsa, ramena i cijelog prednjeg lanca. 5. Spusti kukove i ponovi na suprotnu stranu.',
          backFriendlyTip: 'Ekstenzija dolazi iz torakalnog (prsnog) dijela kralježnice i gluteusa, bez prelamanja u donjim leđima.',
          targetMuscles: ['Torakalni dio', 'Gluteus', 'Prednje rame', 'Kukovi']
        },
        {
          id: 'af_side_kick_through',
          name: 'Side Kick Through (BJJ Sit-out kretnja iz medvjeda)',
          croatianName: 'BJJ Sit-out / Side Kick Through (iz medvjeđeg stava)',
          sets: 3,
          reps: '8 po strani (16 ukupno)',
          targetCount: 16,
          tempo: 'Kontrolirana rotacija',
          restSeconds: 40,
          description: 'Poznata kretnja iz hrvanja i jiu-jitsua! Iz medvjeđeg stava podigni desnu ruku i lijevu nogu. Rotiraj se na desnom stopalu i provuci lijevu nogu ispod tijela u stranu (sit-out) tik iznad poda, dok desnu ruku povlačiš uz rebra kao gard. Zadrži na trenutak, vrati se u medvjeda i ponovi u drugu stranu.',
          backFriendlyTip: 'Gradi bočni trup (obliques) i rotacijsku kontrolu bez savijanja kralježnice pod opterećenjem.',
          targetMuscles: ['Bočni trbušni mišići', 'Ramena', 'Kukovi']
        },
        {
          id: 'af_scorpion_reach',
          name: 'Scorpion Reach (Škorpion dekompresija kralježnice)',
          croatianName: 'Škorpion doseg za rasterećenje sakroilijakalnog zgloba',
          sets: 3,
          reps: '5 po strani (10 ukupno)',
          targetCount: 10,
          tempo: 'Duboko polagano disanje',
          restSeconds: 35,
          description: 'Iz položaja psa prema dolje ili čučećeg medvjeda, podigni jednu nogu visoko prema stropu, savij koljeno pod 90° i otvori kuk rotirajući petu preko tijela na suprotnu stranu. Glava ostaje opuštena između ruku. Osjetit ćeš duboko i ugodno istezanje kuka, bočnog trupa i latisimusa.',
          backFriendlyTip: 'Ova lagana 3D rotacija kuka izuzetno godi SI zglobu i smanjuje ukočenost u donjim leđima.',
          targetMuscles: ['Pregibači kuka', 'SI zglob', 'Latissimus']
        },
        {
          id: 'af_beast_wave',
          name: 'Loaded Beast to Wave (Dekompresijski val kralježnice)',
          croatianName: 'Val kralježnice iz čučnja (Beast Wave)',
          sets: 3,
          reps: '6 punih valova',
          targetCount: 6,
          tempo: 'Segmentni val kralježak po kralježak',
          restSeconds: 30,
          description: 'Sjedni kukovima prema petama s ispruženim rukama naprijed na podu (loaded beast). Započni pokret podizanjem kukova, zaobli leđa i prenesi val kroz kralježnicu prema naprijed sve do visokog planka/kobre s podignutim pogledom. Vrati se istim fluidnim putem unazad.',
          backFriendlyTip: 'Segmentno mobilizira svaki kralježak bez ikakvog vanjskog utega – vrhunska vježba za spondilitis.',
          targetMuscles: ['Cijela kralježnica', 'Trup', 'Ramena']
        }
      ],
      sections: [
        {
          id: 'sec_af_1',
          title: 'Sekcija 1: Stabilnost & Otvaranje Prsa (Medvjed & Rakov most)',
          recommendedTime: 'Jutro ili prva pauza (cca 10 min)',
          exercises: [
            {
              id: 'af_beast_hold',
              name: 'Beast Hold (Medvjeđi stav s izdržajem)',
              croatianName: 'Medvjeđi stav (koljena 2 cm od poda)',
              sets: 3,
              reps: '45 sekundi',
              targetCount: 45,
              isTimed: true,
              durationSeconds: 45,
              tempo: 'Stabilna statika',
              restSeconds: 30,
              description: 'Spusti se na sve četiri: dlanovi točno ispod ramena, koljena ispod kukova pod 90°. Nožni prsti su na podu. Odvoji koljena za samo 2 cm od poda i zaledi položaj.',
              backFriendlyTip: 'Donji dio leđa ostaje neutralan.',
              targetMuscles: ['Transversus abdominis', 'Prednje rame', 'Kvadriceps']
            },
            {
              id: 'af_crab_reach',
              name: 'Crab Reach (Rakov most s dijagonalnim otvaranjem)',
              croatianName: 'Rakov most s otvaranjem prsnog koša i dosegom',
              sets: 3,
              reps: '6 po strani (12 ukupno)',
              targetCount: 12,
              tempo: '3s zadrške u gornjem dosegu',
              restSeconds: 35,
              description: 'Iz sjedećeg raka stisni gluteuse, podigni kukove prema stropu, a jednom rukom posegni dijagonalno preko glave rotirajući prsa prema podu.',
              backFriendlyTip: 'Ekstenzija dolazi iz torakalnog dijela kralježnice i gluteusa.',
              targetMuscles: ['Torakalni dio', 'Gluteus', 'Prednje rame']
            }
          ]
        },
        {
          id: 'sec_af_2',
          title: 'Sekcija 2: BJJ Flow & Dekompresija (Sit-Out, Škorpion & Val)',
          recommendedTime: 'Popodne ili predvečer (cca 10 min)',
          exercises: [
            {
              id: 'af_side_kick_through',
              name: 'Side Kick Through (BJJ Sit-out kretnja iz medvjeda)',
              croatianName: 'BJJ Sit-out / Side Kick Through (iz medvjeđeg stava)',
              sets: 3,
              reps: '8 po strani (16 ukupno)',
              targetCount: 16,
              tempo: 'Kontrolirana rotacija',
              restSeconds: 40,
              description: 'Iz medvjeđeg stava podigni desnu ruku i lijevu nogu, rotiraj se i provuci lijevu nogu u stranu ispod tijela. Vrati se i ponovi na drugu stranu.',
              backFriendlyTip: 'Gradi bočni trup bez savijanja kralježnice pod teretom.',
              targetMuscles: ['Bočni trbušni mišići', 'Ramena', 'Kukovi']
            },
            {
              id: 'af_scorpion_reach',
              name: 'Scorpion Reach (Škorpion dekompresija kralježnice)',
              croatianName: 'Škorpion doseg za rasterećenje sakroilijakalnog zgloba',
              sets: 3,
              reps: '5 po strani (10 ukupno)',
              targetCount: 10,
              tempo: 'Duboko polagano disanje',
              restSeconds: 35,
              description: 'Iz psa prema dolje podigni nogu gore, savij koljeno i rotiraj petu preko tijela.',
              backFriendlyTip: 'Lagana rotacija kuka ugodno dekomprimira SI zglob.',
              targetMuscles: ['Pregibači kuka', 'SI zglob', 'Latissimus']
            },
            {
              id: 'af_beast_wave',
              name: 'Loaded Beast to Wave (Dekompresijski val kralježnice)',
              croatianName: 'Val kralježnice iz čučnja (Beast Wave)',
              sets: 3,
              reps: '6 punih valova',
              targetCount: 6,
              tempo: 'Segmentni val',
              restSeconds: 30,
              description: 'Prenesi val kroz kralježnicu iz čučnja prema naprijed u visoki plank/kobru i natrag.',
              backFriendlyTip: 'Mobilizira kralješke bez opterećenja.',
              targetMuscles: ['Cijela kralježnica', 'Trup', 'Ramena']
            }
          ]
        }
      ]
    },

    // 9. DNEVNI IZAZOV: STOTKA SKLEKOVA
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

/**
 * Returns safe alternative exercises when user has soreness, pain, or needs an adaptation
 */
export function getExerciseAlternatives(exercise: ExerciseItem): ExerciseItem[] {
  const isPushOrChest = 
    exercise.id.includes('pushup') || 
    exercise.targetMuscles.includes('Prsa') || 
    exercise.targetMuscles.includes('Triceps');

  if (isPushOrChest) {
    return [
      {
        id: `${exercise.id}_alt_plank`,
        name: 'Plank izdržaj na podlakticama',
        croatianName: 'Plank izdržaj na podlakticama (35-40 sekundi)',
        sets: exercise.sets,
        reps: '35-40 sekundi',
        targetCount: 40,
        isTimed: true,
        durationSeconds: 40,
        tempo: 'Čvrsta statika',
        restSeconds: exercise.restSeconds,
        description: 'Umjesto sklekova koji opterećuju upaljena prsa i ramena, odradi čvrst plank na podlakticama. Donji trbuh i gluteus su stisnuti, štiteći lumbalni dio.',
        backFriendlyTip: 'Donja leđa moraju ostati u neutralnom položaju bez propadanja trbuha.',
        targetMuscles: ['Transversus abdominis', 'Duboki trup']
      },
      {
        id: `${exercise.id}_alt_tibialis`,
        name: 'Tibialis Raise uz zid',
        croatianName: 'Tibialis Raise uz zid (15 ponavljanja)',
        sets: exercise.sets,
        reps: '15 ponavljanja',
        targetCount: 15,
        tempo: '2s podizanje prstiju',
        restSeconds: exercise.restSeconds,
        description: 'Nasloni se leđima na zid, stopala 30 cm od zida. Podiži prste stopala što više prema potkoljenici. Potiče cirkulaciju i dekompresiju donjeg lanca.',
        backFriendlyTip: 'Vrhunska vježba za koljena i kralježnicu koja potpuno odmara gornji dio tijela.',
        targetMuscles: ['Tibialis anterior', 'Gležnjevi']
      },
      {
        id: `${exercise.id}_alt_glute_bridge`,
        name: 'Most za gluteus s pauzom na vrhu',
        croatianName: 'Most za gluteus s 2s zadrške (15 ponavljanja)',
        sets: exercise.sets,
        reps: '15 ponavljanja',
        targetCount: 15,
        tempo: '2s stisak na vrhu',
        restSeconds: exercise.restSeconds,
        description: 'Lezi na leđa, savij koljena. Podiži kukove stišćući gluteuse bez prekomjernog uvijanja donjih leđa.',
        backFriendlyTip: 'Aktivira gluteus i dekomprimira diskove bez ikakvog zamaranja prsa i ruku.',
        targetMuscles: ['Gluteus', 'Zadnja loža']
      }
    ];
  }

  // Default alternatives for legs or core
  return [
    {
      id: `${exercise.id}_alt_deadbug`,
      name: 'Dead Bug (Mrtvi kukac s kontrolom leđa)',
      croatianName: 'Mrtvi kukac (12 ponavljanja s kontrolom)',
      sets: exercise.sets,
      reps: '12 ponavljanja',
      targetCount: 12,
      tempo: 'Polagano s 1s zadrške',
      restSeconds: exercise.restSeconds,
      description: 'Lezi na leđa, zalijepi donji dio leđa za pod i naizmjenično spuštaj suprotnu ruku i nogu.',
      backFriendlyTip: 'Zlatni standard za stabilizaciju lumbalnog dijela.',
      targetMuscles: ['Transversus abdominis', 'Trup']
    },
    {
      id: `${exercise.id}_alt_glute_bridge`,
      name: 'Most za gluteus s pauzom',
      croatianName: 'Most za gluteus s 2s zadrške na vrhu',
      sets: exercise.sets,
      reps: '15 ponavljanja',
      targetCount: 15,
      tempo: '2s stisak na vrhu',
      restSeconds: exercise.restSeconds,
      description: 'Podiži kukove stišćući gluteuse, držeći trup čvrstim.',
      backFriendlyTip: 'Rasterećuje donja leđa.',
      targetMuscles: ['Gluteus', 'Zadnja loža']
    }
  ];
}

