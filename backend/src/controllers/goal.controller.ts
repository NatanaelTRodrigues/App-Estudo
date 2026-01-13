import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../middlewares/error.middleware";

const prisma = new PrismaClient();

// Criar nova meta semanal
export const createGoal = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const {
      weekNumber,
      year,
      targetHours,
      targetSubjects,
      targetQuestions,
      startDate,
      endDate,
    } = req.body;

    // Verificar se já existe meta para essa semana
    const existing = await prisma.goal.findUnique({
      where: {
        userId_weekNumber_year: {
          userId,
          weekNumber,
          year,
        },
      },
    });

    if (existing) {
      throw new AppError("Já existe uma meta para esta semana", 400);
    }

    const goal = await prisma.goal.create({
      data: {
        userId,
        weekNumber,
        year,
        targetHours,
        targetSubjects,
        targetQuestions,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res.status(201).json({ goal });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Erro ao criar meta", 500);
  }
};

// Buscar meta atual (da semana atual)
export const getCurrentGoal = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const now = new Date();
    const weekNumber = getWeekNumber(now);
    const year = now.getFullYear();

    const goal = await prisma.goal.findUnique({
      where: {
        userId_weekNumber_year: {
          userId,
          weekNumber,
          year,
        },
      },
    });

    // Retorna null se não houver meta, sem lançar erro
    res.json({ goal: goal || null });
  } catch (error) {
    throw new AppError("Erro ao buscar meta", 500);
  }
};

// Listar todas as metas do usuário
export const getAllGoals = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: [{ year: "desc" }, { weekNumber: "desc" }],
    });

    res.json({ goals });
  } catch (error) {
    throw new AppError("Erro ao listar metas", 500);
  }
};

// Atualizar progresso da meta
export const updateGoalProgress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const { currentHours, currentSubjects, currentQuestions } = req.body;

    const goal = await prisma.goal.findFirst({
      where: { id, userId },
    });

    if (!goal) {
      throw new AppError("Meta não encontrada", 404);
    }

    // Calcular progresso (média ponderada)
    const hoursProgress = (currentHours / goal.targetHours) * 100;
    const subjectsProgress = (currentSubjects / goal.targetSubjects) * 100;
    const questionsProgress = (currentQuestions / goal.targetQuestions) * 100;
    const totalProgress =
      (hoursProgress + subjectsProgress + questionsProgress) / 3;

    // Determinar status
    let status = goal.status;
    if (totalProgress >= 100 && new Date() <= goal.endDate) {
      status = "COMPLETED";
    } else if (new Date() > goal.endDate && totalProgress < 100) {
      status = "FAILED";
    }

    const updatedGoal = await prisma.goal.update({
      where: { id },
      data: {
        currentHours,
        currentSubjects,
        currentQuestions,
        progress: totalProgress,
        status,
      },
    });

    res.json({ goal: updatedGoal });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Erro ao atualizar meta", 500);
  }
};

// Helper: Calcular número da semana
function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
