-- SQL para criar todas as tabelas no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar ENUMs
CREATE TYPE "GoalStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'FAILED');
CREATE TYPE "Classification" AS ENUM ('RUIM', 'REGULAR', 'BOM', 'OTIMO');
CREATE TYPE "NotificationType" AS ENUM ('STUDY_REMINDER', 'WEEKLY_GOAL', 'EXAM', 'REVIEW', 'MONTHLY_REPORT');

-- Tabela de usuários
CREATE TABLE "users" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabela de metas
CREATE TABLE "goals" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "targetHours" DOUBLE PRECISION NOT NULL,
    "currentHours" DOUBLE PRECISION DEFAULT 0 NOT NULL,
    "targetSubjects" INTEGER NOT NULL,
    "currentSubjects" INTEGER DEFAULT 0 NOT NULL,
    "targetQuestions" INTEGER NOT NULL,
    "currentQuestions" INTEGER DEFAULT 0 NOT NULL,
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP NOT NULL,
    "progress" DOUBLE PRECISION DEFAULT 0 NOT NULL,
    "status" "GoalStatus" DEFAULT 'ACTIVE' NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "goals_userId_weekNumber_year_key" UNIQUE ("userId", "weekNumber", "year")
);

-- Tabela de questões
CREATE TABLE "questions" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "wrongAnswers" INTEGER NOT NULL,
    "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "questions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabela de sessões de estudo
CREATE TABLE "study_sessions" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "completed" BOOLEAN DEFAULT false NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "study_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabela de plano semanal
CREATE TABLE "weekly_plans" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT UNIQUE NOT NULL,
    "monday" JSONB NOT NULL,
    "tuesday" JSONB NOT NULL,
    "wednesday" JSONB NOT NULL,
    "thursday" JSONB NOT NULL,
    "friday" JSONB NOT NULL,
    "saturday" JSONB NOT NULL,
    "sunday" JSONB NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "weekly_plans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabela de relatórios mensais
CREATE TABLE "monthly_reports" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "totalHours" DOUBLE PRECISION NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "averageAccuracy" DOUBLE PRECISION NOT NULL,
    "bestWeek" INTEGER NOT NULL,
    "worstWeek" INTEGER NOT NULL,
    "classification" "Classification" NOT NULL,
    "generatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "monthly_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "monthly_reports_userId_month_year_key" UNIQUE ("userId", "month", "year")
);

-- Tabela de notificações
CREATE TABLE "notifications" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "scheduledFor" TIMESTAMP NOT NULL,
    "sent" BOOLEAN DEFAULT false NOT NULL,
    "sentAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criar índices para melhor performance
CREATE INDEX "goals_userId_idx" ON "goals"("userId");
CREATE INDEX "questions_userId_idx" ON "questions"("userId");
CREATE INDEX "study_sessions_userId_idx" ON "study_sessions"("userId");
CREATE INDEX "monthly_reports_userId_idx" ON "monthly_reports"("userId");
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");
