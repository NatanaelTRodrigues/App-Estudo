import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../middlewares/error.middleware";

const prisma = new PrismaClient();

// Adicionar questões do dia
export const addQuestions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const {
      subject,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      hoursStudied,
    } = req.body;

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
    const hours = hoursStudied ? parseFloat(hoursStudied) : 0;

    const question = await prisma.question.create({
      data: {
        userId,
        subject,
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        hoursStudied: hours,
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
        // Buscar todas as questões da semana para contar matérias únicas
        const weekQuestions = await prisma.question.findMany({
          where: {
            userId,
            weekNumber,
            year,
          },
          select: {
            subject: true,
          },
        });

        // Contar matérias únicas
        const uniqueSubjects = new Set(weekQuestions.map((q) => q.subject));
        const currentSubjects = uniqueSubjects.size;

        const newCurrentQuestions = goal.currentQuestions + totalQuestions;
        const newCurrentHours = goal.currentHours + hours;

        const questionsProgress =
          (newCurrentQuestions / goal.targetQuestions) * 100;
        const hoursProgress = (newCurrentHours / goal.targetHours) * 100;
        const subjectsProgress = (currentSubjects / goal.targetSubjects) * 100;
        const totalProgress =
          (hoursProgress + subjectsProgress + questionsProgress) / 3;

        await prisma.goal.update({
          where: { id: goal.id },
          data: {
            currentQuestions: newCurrentQuestions,
            currentHours: newCurrentHours,
            currentSubjects: currentSubjects,
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
      totalHours: questions.reduce(
        (sum: number, q: any) => sum + (q.hoursStudied || 0),
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
            hours: 0,
            accuracy: 0,
          };
        }
        acc[q.subject].total += q.totalQuestions;
        acc[q.subject].correct += q.correctAnswers;
        acc[q.subject].wrong += q.wrongAnswers;
        acc[q.subject].hours += q.hoursStudied || 0;
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

// Atualizar questão
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const {
      subject,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      hoursStudied,
    } = req.body;

    // Verificar se a questão pertence ao usuário
    const existingQuestion = await prisma.question.findFirst({
      where: { id, userId },
    });

    if (!existingQuestion) {
      throw new AppError("Questão não encontrada", 404);
    }

    const accuracy = (correctAnswers / totalQuestions) * 100;
    const hours = hoursStudied ? parseFloat(hoursStudied) : 0;

    const question = await prisma.question.update({
      where: { id },
      data: {
        subject,
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        hoursStudied: hours,
        accuracy,
      },
    });

    // Recalcular goal
    await recalculateGoal(
      userId,
      existingQuestion.weekNumber,
      existingQuestion.year
    );

    res.json({ question });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Erro ao atualizar questão", 500);
  }
};

// Deletar questão
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const existingQuestion = await prisma.question.findFirst({
      where: { id, userId },
    });

    if (!existingQuestion) {
      throw new AppError("Questão não encontrada", 404);
    }

    await prisma.question.delete({ where: { id } });

    // Recalcular goal
    await recalculateGoal(
      userId,
      existingQuestion.weekNumber,
      existingQuestion.year
    );

    res.json({ message: "Questão deletada com sucesso" });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Erro ao deletar questão", 500);
  }
};

// Função auxiliar para recalcular goal
async function recalculateGoal(
  userId: string,
  weekNumber: number,
  year: number
) {
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
      const weekQuestions = await prisma.question.findMany({
        where: { userId, weekNumber, year },
      });

      const totalQuestions = weekQuestions.reduce(
        (sum, q) => sum + q.totalQuestions,
        0
      );
      const totalHours = weekQuestions.reduce(
        (sum, q) => sum + (q.hoursStudied || 0),
        0
      );
      const uniqueSubjects = new Set(weekQuestions.map((q) => q.subject));

      const questionsProgress = (totalQuestions / goal.targetQuestions) * 100;
      const hoursProgress = (totalHours / goal.targetHours) * 100;
      const subjectsProgress =
        (uniqueSubjects.size / goal.targetSubjects) * 100;
      const totalProgress =
        (hoursProgress + subjectsProgress + questionsProgress) / 3;

      await prisma.goal.update({
        where: { id: goal.id },
        data: {
          currentQuestions: totalQuestions,
          currentHours: totalHours,
          currentSubjects: uniqueSubjects.size,
          progress: totalProgress,
        },
      });
    }
  } catch (error) {
    // Silenciosamente ignora erros de recalculação
  }
}

function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
