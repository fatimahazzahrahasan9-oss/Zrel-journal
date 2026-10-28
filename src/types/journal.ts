export type Language = 'id' | 'en';

export type PaperSize = 'a4' | 'a5' | 'letter';
export type PageOrientation = 'portrait' | 'landscape';

export type TemplateType =
  | 'cover'
  | 'personal_info'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'mood'
  | 'gratitude'
  | 'habit'
  | 'goals'
  | 'finance'
  | 'study_work'
  | 'free_writing'
  | 'closing';

export interface PatternConfig {
  id: string;
  name: string;
  type: 'svg' | 'custom';
  category:
    | 'botanical'
    | 'floral'
    | 'vintage'
    | 'gingham'
    | 'dots'
    | 'celestial'
    | 'abstract'
    | 'geometric'
    | 'clouds'
    | 'islamic'
    | 'custom';
  svgDataUri?: string;
  customDataUrl?: string;
  scale: number; // percentage, e.g. 100
  repeat: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
  displayMode: 'tiling' | 'cover' | 'contain' | 'center';
  opacity: number; // 0.05 to 1.0
  companionBgColor: string; // e.g. #F8F6F0
  applyTo: 'cover' | 'all-pages' | 'chapter-divider' | 'header' | 'footer' | 'corners' | 'specific';
  orientation: number; // 0, 90, 180, 270
  overlayOpacity: number; // 0.7 to 1.0 for paper content readability
  solidBackdrop: boolean; // true if text sits inside an opaque paper card
  blendMode?: 'normal' | 'multiply' | 'soft-light';
}

export interface ThemeConfig {
  id: string;
  name: string;
  primaryFont: 'serif-display' | 'serif-classic' | 'sans-clean' | 'serif-reading';
  bodyFont: 'sans-clean' | 'serif-reading';
  primaryColor: string;
  accentColor: string;
  paperBgColor: string;
  textColor: string;
  borderColor: string;
  cornerStyle: 'rounded-none' | 'rounded-sm' | 'rounded-md' | 'rounded-xl' | 'rounded-2xl';
  paperTexture: 'clean' | 'grain' | 'dot-grid' | 'ruled' | 'grid';
}

export interface CoverContent {
  title: string;
  subtitle: string;
  ownerName: string;
  yearRange: string;
  frameStyle: 'minimal' | 'vintage-double' | 'botanical-crest' | 'modern-clean';
  dedication?: string;
}

export interface PersonalInfoContent {
  ownerName: string;
  emailPhone: string;
  purpose: string;
  openingNote: string;
  contactEmergency: string;
  favoriteQuote: string;
}

export interface DailyTodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface DailyScheduleSlot {
  time: string;
  activity: string;
}

export interface DailyContent {
  date: string;
  dayOfWeek: string;
  todayFocus: string;
  priorities: [string, string, string];
  todos: DailyTodo[];
  schedule: DailyScheduleSlot[];
  freeNotes: string;
  gratitude: [string, string, string];
  eveningReflection: string;
  energyRating: number; // 1-5
  productivityRating: number; // 1-5
}

export interface WeeklyDayPlan {
  dayName: string;
  dateStr: string;
  tasks: string[];
}

export interface WeeklyContent {
  weekRange: string;
  weeklyPriority: string;
  targets: string[];
  days: WeeklyDayPlan[];
  reflection: {
    whatWorked: string;
    whatToImprove: string;
  };
}

export interface MonthlyGoal {
  id: string;
  goal: string;
  done: boolean;
}

export interface MonthlyAgendaItem {
  id: string;
  date: string;
  event: string;
}

export interface MonthlyContent {
  monthName: string;
  year: string;
  goals: MonthlyGoal[];
  agenda: MonthlyAgendaItem[];
  keyProjects: string[];
  habitsSummary: string;
  reflection: string;
  lessonsLearned: string;
}

export type MoodType = 'calm' | 'joyful' | 'focused' | 'peaceful' | 'anxious' | 'tired' | 'grateful' | 'melancholy';

export interface MoodContent {
  date: string;
  selectedMood: MoodType;
  emotionalIntensity: number; // 1-10
  triggers: string;
  feelingsText: string;
  currentNeeds: string;
  helpfulActions: string;
}

export interface GratitudeContent {
  date: string;
  threeGratefulThings: [string, string, string];
  tinyJoyfulMoment: string;
  meaningfulPerson: string;
  deepReflection: string;
}

export interface HabitItem {
  id: string;
  name: string;
  category: string;
  targetPerWeek: number; // e.g. 5
  history: boolean[]; // 7 days or 30 days
}

export interface HabitContent {
  period: 'weekly' | 'monthly';
  monthYear: string;
  habits: HabitItem[];
  notes: string;
}

export interface ActionStep {
  id: string;
  step: string;
  deadline: string;
  completed: boolean;
}

export interface GoalItem {
  id: string;
  title: string;
  type: 'short-term' | 'long-term';
  whyItMatters: string;
  actionSteps: ActionStep[];
  targetDate: string;
  progressPercent: number;
  obstacles: string;
  adjustments: string;
}

export interface GoalContent {
  theme: string;
  goals: GoalItem[];
}

export interface FinanceTransaction {
  id: string;
  date: string;
  description: string;
  category: 'income' | 'food' | 'bills' | 'study' | 'leisure' | 'health' | 'savings' | 'other';
  amount: number;
  type: 'income' | 'expense';
}

export interface FinanceContent {
  period: string;
  monthlyBudget: number;
  savingsTarget: number;
  transactions: FinanceTransaction[];
  notes: string;
}

export interface StudyWorkContent {
  date: string;
  projectOrSubject: string;
  tasks: { id: string; task: string; priority: 'high' | 'medium' | 'low'; done: boolean }[];
  deadlines: string;
  pomodoroHours: number;
  meetingNotes: string;
  evaluation: string;
}

export interface FreeWritingContent {
  title: string;
  subtitle: string;
  body: string;
  quote: string;
  quoteAuthor: string;
  bullets: string[];
  checklist: { id: string; text: string; done: boolean }[];
}

export interface ClosingContent {
  period: string; // e.g. "Year 2026 Recap"
  biggestWins: string[];
  lessonsLearned: string[];
  letterToSelf: string;
  growthIntentions: string;
  extraNotes: string;
}

export type PageContent =
  | CoverContent
  | PersonalInfoContent
  | DailyContent
  | WeeklyContent
  | MonthlyContent
  | MoodContent
  | GratitudeContent
  | HabitContent
  | GoalContent
  | FinanceContent
  | StudyWorkContent
  | FreeWritingContent
  | ClosingContent;

export interface JournalPage {
  id: string;
  title: string;
  templateType: TemplateType;
  date?: string;
  patternOverride?: PatternConfig;
  content: PageContent;
}

export interface JournalProject {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  yearRange: string;
  createdAt: string;
  updatedAt: string;
  paperSize: PaperSize;
  orientation: PageOrientation;
  theme: ThemeConfig;
  globalPattern: PatternConfig;
  pages: JournalPage[];
}
