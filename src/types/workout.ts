export type WorkoutType = 
  | 'calisthenics' 
  | 'challenge' 
  | 'running' 
  | 'back_bulletproof' 
  | 'bjj_flow' 
  | 'emom'
  | 'pyramid'
  | 'animal_flow'
  | 'tabata'
  | 'isometrics'
  | 'shadow_boxing'
  | 'walking_challenge'
  | 'core_challenge'
  | 'squat_challenge';

export interface ExerciseItem {
  id: string;
  name: string;             // e.g. "Shadow boxing 5x3 min", "10,000 Koraka s kolicima"
  croatianName?: string;    // e.g. "Shadow boxing u 5 borilačkih rundi"
  sets: number;
  reps: string;             // e.g. "25", "3x40 sekundi", "10,000 koraka", "100 ukupno"
  targetCount?: number;     // numeric target for counters
  tempo?: string;           // e.g. "2-0-2 kontrolirano", "Ritmično"
  restSeconds?: number;     // e.g. 60
  isTimed?: boolean;        // e.g. for timed rounds (180s = 3 min)
  durationSeconds?: number;
  description: string;      // Detaljan opis izvođenja
  backFriendlyTip: string;  // Specifičan savjet za spondiloartritis i zaštitu kralježnice
  targetMuscles: string[];  // npr. ["Kralježnica", "Kukovi", "Kardio"]
}

export interface ExerciseReplacement {
  originalExerciseId: string;
  originalExerciseName: string;
  replacementExercise: ExerciseItem;
  reason: string;
}

export interface WorkoutSection {
  id: string;
  title: string;            // npr. "Runda 1 & 2", "Jutarnji hod"
  recommendedTime: string;  // npr. "Dok beba spava"
  exercises: ExerciseItem[];
}

export interface DailyWorkout {
  id: string;
  dateKey: string;          // YYYY-MM-DD u Europe/Zagreb vremenu
  title: string;
  type: WorkoutType;
  typeLabel: string;
  tagline: string;
  durationMin: number;
  intensity: 'Lagan' | 'Umjeren' | 'Visok';
  level: number;
  isSplitFriendly: boolean;
  isMandatoryBackRoutine: boolean;
  exercises: ExerciseItem[];
  sections?: WorkoutSection[];
  description: string;
  dadTip: string;           // Savjet za tate i organizaciju vremena
}

export interface WorkoutLog {
  dateKey: string;          // YYYY-MM-DD
  workoutId: string;
  title: string;
  type: WorkoutType;
  status: 'completed' | 'skipped';
  completedAt: string;      // ISO timestamp
  durationMinutes: number;
  painRating: number;       // 1: Bez boli, 2: Blaga ukočenost, 3: Umjerena nelagoda, 4: Jača bol, 5: Teška bol
  difficultyFeedback: 'too_easy' | 'just_right' | 'too_hard';
  userNotes: string;
  completedExerciseIds: string[];
  challengeRepsCompleted?: number;
}

export interface UserProgression {
  calisthenicsLevel: number;    // 1 - 10
  runningLevel: number;         // 1 - 10
  runningDistanceKm: number;    // npr. 1.0 -> 1.2 -> 1.5 -> 2.0 km
  cardioEngineLevel: number;    // ZAJEDNIČKI kardio nivo (uvezano trčanje & shadow boxing!)
  challengePushups: number;     // npr. 100
  walkingStepsTarget: number;   // npr. 10000
  coreChallengeReps: number;    // npr. 100
  squatsChallengeReps: number;  // npr. 100
  shadowBoxingLevel: number;    // 1 - 5
  bjjFlowLevel: number;         // 1 - 5
  animalFlowLevel: number;      // 1 - 5
  backRehabCount: number;       // ukupno odrađenih treninga leđa
  totalWorkoutsCompleted: number;
  skippedWorkoutsCount: number; // Broj preskočenih treninga s posljedicama
  currentStreak: number;
  bestStreak: number;
  lastCompletedDate: string | null;
  lastSkippedDate: string | null;
  xp: number;
  streakFreezes: number;        // "Bebina noćna straža" zamrzavanja
  unlockedBadges: string[];
  preferences: {
    dadMode: boolean;           // Prikaz podijeljen u sekcije kroz dan
    soundEnabled: boolean;
    backInjuryAwareness: boolean;
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: 'dad' | 'back' | 'strength' | 'bjj' | 'animal' | 'streak';
  icon: string;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface AiConsultationMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedWorkoutType?: WorkoutType;
}
