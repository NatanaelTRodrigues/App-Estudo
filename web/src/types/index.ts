/**
 * Tipos TypeScript compartilhados entre Frontend e Backend
 */

// ==================== USUÁRIO ====================
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// ==================== META SEMANAL ====================
export type GoalStatus = "active" | "completed" | "failed";

export interface Goal {
  id: string;
  userId: string;
  weekNumber: number;
  year: number;
  targetHours: number;
  currentHours: number;
  targetSubjects: number;
  currentSubjects: number;
  targetQuestions: number;
  currentQuestions: number;
  startDate: Date;
  endDate: Date;
  progress: number;
  status: GoalStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGoalDTO {
  targetHours: number;
  targetSubjects: number;
  targetQuestions: number;
}

// ==================== QUESTÕES ====================
export interface Question {
  id: string;
  userId: string;
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  date: Date;
  weekNumber: number;
  year: number;
  accuracy: number;
  createdAt: Date;
}

export interface CreateQuestionDTO {
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  date?: Date;
}

// ==================== SESSÃO DE ESTUDO ====================
export interface StudySession {
  id: string;
  userId: string;
  subject: string;
  duration: number; // minutos
  date: Date;
  weekNumber: number;
  year: number;
  completed: boolean;
  notes?: string;
  createdAt: Date;
}

export interface CreateStudySessionDTO {
  subject: string;
  duration: number;
  date?: Date;
  completed?: boolean;
  notes?: string;
}

// ==================== PLANO SEMANAL ====================
export interface SubjectPlan {
  name: string;
  duration: number; // minutos
  completed: boolean;
}

export interface DayPlan {
  subjects: SubjectPlan[];
  description?: string;
}

export interface WeeklyPlan {
  id: string;
  userId: string;
  monday: DayPlan;
  tuesday: DayPlan;
  wednesday: DayPlan;
  thursday: DayPlan;
  friday: DayPlan;
  saturday: DayPlan;
  sunday: DayPlan;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== RELATÓRIO MENSAL ====================
export type Classification = "ruim" | "regular" | "bom" | "ótimo";

export interface MonthlyReport {
  id: string;
  userId: string;
  month: number;
  year: number;
  totalHours: number;
  totalQuestions: number;
  averageAccuracy: number;
  bestWeek: number;
  worstWeek: number;
  classification: Classification;
  generatedAt: Date;
}

// ==================== NOTIFICAÇÕES ====================
export type NotificationType =
  | "study_reminder"
  | "weekly_goal"
  | "exam"
  | "review"
  | "monthly_report";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  scheduledFor: Date;
  sent: boolean;
  sentAt?: Date;
  createdAt: Date;
}

// ==================== ANÁLISES E GRÁFICOS ====================
export interface WeeklyPerformance {
  week: number;
  year: number;
  hours: number;
  questions: number;
  accuracy: number;
  subjects: number;
}

export interface SubjectPerformance {
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  sessionsCount: number;
  totalHours: number;
}

export interface PerformanceComparison {
  currentWeek: WeeklyPerformance;
  previousWeek?: WeeklyPerformance;
  growth: {
    hours: number;
    questions: number;
    accuracy: number;
  };
}

export interface ClassificationResult {
  label: string;
  emoji: string;
  classification: Classification;
  color: string;
}

// ==================== DASHBOARD ====================
export interface DashboardData {
  currentGoal?: Goal;
  nextSubject?: {
    name: string;
    time: string;
    duration: number;
  };
  weekProgress: {
    hours: number;
    questions: number;
    subjects: string[];
  };
  alerts: Alert[];
  recentPerformance: WeeklyPerformance[];
}

export interface Alert {
  id: string;
  type: "warning" | "info" | "success" | "error";
  message: string;
  action?: string;
}

// ==================== AUTENTICAÇÃO ====================
export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
