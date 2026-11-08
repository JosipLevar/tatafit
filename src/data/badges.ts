import { Badge } from '../types/workout';

export const INITIAL_BADGES: Badge[] = [
  // Tata & Inkubator bedževi
  {
    id: 'badge_super_dad',
    title: 'Super Tata zaboravlja umor',
    description: 'Odradi prvi trening u split režimu dok beba spava.',
    category: 'dad',
    icon: 'Baby'
  },
  {
    id: 'badge_night_shift',
    title: 'Noćna Straža',
    description: 'Odradi ili spasi niz (streak) unutar 24 sata od bebinog buđenja.',
    category: 'dad',
    icon: 'Moon'
  },
  {
    id: 'badge_incubator_hero',
    title: 'Heroj Inkubatora',
    description: 'Odradi 7 treninga od bebinog dolaska kući.',
    category: 'dad',
    icon: 'HeartHandshake'
  },

  // Shadow Boxing & Borilački Kardio
  {
    id: 'badge_shadow_boxing_warrior',
    title: 'Shadow Box Ratnik',
    description: 'Odradi 5 borilačkih rundi po 3 minute s rotacijom kukova.',
    category: 'bjj',
    icon: 'Flame'
  },

  // Hodajući & Trup Izazovi
  {
    id: 'badge_steps_10k_walker',
    title: '10.000 Koraka Šetač Kolica',
    description: 'Skupi 10.000 koraka u danu i dekomprimiraj kralježnicu.',
    category: 'strength',
    icon: 'Footprints'
  },
  {
    id: 'badge_core_centurion',
    title: 'Čelični Mrtvi Kukac',
    description: 'Akumuliraj 100 Dead Bug ponavljanja stabilizacije donjih leđa.',
    category: 'strength',
    icon: 'ShieldCheck'
  },

  // Animal Flow & Primal bedževi
  {
    id: 'badge_animal_flow_master',
    title: 'Gospodar Medvjeđeg Stava',
    description: 'Odradi svoj prvi Animal Flow primalni trening na tepihu.',
    category: 'animal',
    icon: 'Sparkles'
  },
  {
    id: 'badge_crab_reach_king',
    title: 'Otvaranje Prsa & Crab Reach',
    description: 'Napravi otvaranje prsnog koša i kukova u rakovom stavu.',
    category: 'animal',
    icon: 'Flame'
  },
  {
    id: 'badge_towel_bjj_grip',
    title: 'Čelični BJJ Stisak',
    description: 'Odradi izometrički stisak ručnika za podlaktice.',
    category: 'bjj',
    icon: 'Dumbbell'
  },
  {
    id: 'badge_tabata_express',
    title: '4-Minutni Ekspres',
    description: 'Odradi brzu 4-minutnu Tabatu u danu kad nemaš vremena.',
    category: 'strength',
    icon: 'Zap'
  },

  // Leđa & Spondiloartritis bedževi
  {
    id: 'badge_back_first_step',
    title: 'Čelični Erektori',
    description: 'Odradi svoj prvi tjedni Bulletproof trening za leđa.',
    category: 'back',
    icon: 'ShieldCheck'
  },
  {
    id: 'badge_back_master_month',
    title: 'Kralježnica Bez Boli',
    description: 'Odradi obavezni trening leđa 4 tjedna zaredom.',
    category: 'back',
    icon: 'Activity'
  },
  {
    id: 'badge_tibialis_beast',
    title: 'Tibialis Amortizer',
    description: 'Skupi ukupno 200 Tibialis raises u treninzima leđa.',
    category: 'back',
    icon: 'Footprints'
  },

  // Snaga & Kalistenika bedževi
  {
    id: 'badge_pushup_centurion',
    title: 'Stotka u Danu',
    description: 'Uspješno završi dnevni izazov od 100+ sklekova.',
    category: 'strength',
    icon: 'Flame'
  },
  {
    id: 'badge_pyramid_master',
    title: 'Gospodar Piramide',
    description: 'Popni se i spusti kroz cijelu piramidu sklekova i iskoraka.',
    category: 'strength',
    icon: 'Trophy'
  },
  {
    id: 'badge_first_run',
    title: 'Povratak na Stazu',
    description: 'Odradi svoj prvi progresivni trening trčanja bez boli u leđima.',
    category: 'strength',
    icon: 'Zap'
  },

  // BJJ & Mobilnost bedževi
  {
    id: 'badge_bjj_mat_flow',
    title: 'Tepih Tatami Flow',
    description: 'Odradi 3 BJJ mobilnost treninga na tepihu.',
    category: 'bjj',
    icon: 'Sparkles'
  },
  {
    id: 'badge_bjj_shrimp_king',
    title: 'Kralj Škampanja',
    description: 'Odradi 50 izmjena hip escape pokreta za neprobojnu zdjelicu.',
    category: 'bjj',
    icon: 'Compass'
  },

  // Nizevi & Kontinuitet
  {
    id: 'badge_streak_3',
    title: 'Zahuktavanje (3 dana)',
    description: 'Spoji 3 dana uzastopnih treninga ili aktivnog oporavka.',
    category: 'streak',
    icon: 'Flame'
  },
  {
    id: 'badge_streak_7',
    title: 'Tjedni Ratnik (7 dana)',
    description: '7 uzastopnih dana aktivnog treninga.',
    category: 'streak',
    icon: 'Crown'
  },
  {
    id: 'badge_streak_30',
    title: 'Nepokolebljiv Tata (30 dana)',
    description: '30 dana kontinuiteta s adaptivnim treninzima.',
    category: 'streak',
    icon: 'Award'
  }
];
