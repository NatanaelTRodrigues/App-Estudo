import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../middlewares/error.middleware";

const prisma = new PrismaClient();

// Adicionar questões do dia
export const addQuestions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { subject, totalQuestions, correctAnswers, wrongAnswers } = req.body;

    if (
      !subject ||
      !totalQuestions ||
      correctAnswers === undefined ||
      wrongAnswers === undefined
    ) {
      throw new AppError("Dados incompletos", 400);
    }

    const accuracy = (correctAnswers / totalQuestions) * 100;
    const now = new Date();
    const weekNumber = getWeekNumber(now);
    const year = now.getFullYear();

    const question = await prisma.question.create({
      data: {
        userId,
        subject,
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        accuracy,
        weekNumber,
        year,
      },
    });

    // Atualizar meta atual
    try {
      const goal = await prisma.goal.findUnique({
        where: {
          userId_weekNumber_year: {
            userId,
            weekNumber,
            year,
          },
        },
      });

      if (goal) {
        const newCurrentQuestions = goal.currentQuestions + totalQuestions;
        const questionsProgress =
          (newCurrentQuestions / goal.targetQuestions) * 100;
        const hoursProgress = (goal.currentHours / goal.targetHours) * 100;
        const subjectsProgress =
          (goal.currentSubjects / goal.targetSubjects) * 100;
        const totalProgress =
          (hoursProgress + subjectsProgress + questionsProgress) / 3;

        await prisma.goal.update({
          where: { id: goal.id },
          data: {
            currentQuestions: newCurrentQuestions,
            progress: totalProgress,
          },
        });
      }
    } catch (error) {
      // Meta não existe, continua normalmente
    }

    res.status(201).json({ question });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Erro ao adicionar questões", 500);
  }
};

// Listar questões do usuário
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { startDate, endDate, subject } = req.query;

    const where: any = { userId };

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    if (subject) {
      where.subject = subject;
    }

    const questions = await prisma.question.findMany({
      where,
      orderBy: { date: "desc" },
    });

    res.json({ questions });
  } catch (error) {
    throw new AppError("Erro ao buscar questões", 500);
  }
};

// Estatísticas de questões
export const getQuestionStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { weekNumber, year } = req.query;

    const where: any = { userId };

    if (weekNumber && year) {
      where.weekNumber = parseInt(weekNumber as string);
      where.year = parseInt(year as string);
    }

    const questions = await prisma.question.findMany({ where });

    const stats = {
      totalQuestions: questions.reduce(
        (sum: number, q: any) => sum + q.totalQuestions,
        0
      ),
      correctAnswers: questions.reduce(
        (sum: number, q: any) => sum + q.correctAnswers,
        0
      ),
      wrongAnswers: questions.reduce(
        (sum: number, q: any) => sum + q.wrongAnswers,
        0
      ),
      averageAccuracy:
        questions.length > 0
          ? questions.reduce((sum: number, q: any) => sum + q.accuracy, 0) /
            questions.length
          : 0,
      bySubject: questions.reduce((acc: any, q: any) => {
        if (!acc[q.subject]) {
          acc[q.subject] = {
            total: 0,
            correct: 0,
            wrong: 0,
            accuracy: 0,
          };
        }
        acc[q.subject].total += q.totalQuestions;
        acc[q.subject].correct += q.correctAnswers;
        acc[q.subject].wrong += q.wrongAnswers;
        acc[q.subject].accuracy =
          (acc[q.subject].correct / acc[q.subject].total) * 100;
        return acc;
      }, {}),
    };

    res.json({ stats });
  } catch (error) {
    throw new AppError("Erro ao buscar estatísticas", 500);
  }
};

function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
