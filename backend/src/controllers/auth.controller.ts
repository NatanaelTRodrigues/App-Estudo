import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../middlewares/error.middleware";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "seu-secret-super-seguro";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "seu-refresh-secret";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as RegisterBody;

    // Validação básica
    if (!name || !email || !password) {
      throw new AppError("Nome, email e senha são obrigatórios", 400);
    }

    if (password.length < 6) {
      throw new AppError("A senha deve ter pelo menos 6 caracteres", 400);
    }

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError("Email já cadastrado", 400);
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Gerar tokens
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Erro ao criar usuário", 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginBody;

    // Validação básica
    if (!email || !password) {
      throw new AppError("Email e senha são obrigatórios", 400);
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Credenciais inválidas", 401);
    }

    // Gerar tokens
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: "Login realizado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Erro ao fazer login", 500);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken: oldRefreshToken } = req.body;

    if (!oldRefreshToken) {
      throw new AppError("Refresh token não fornecido", 400);
    }

    // Verificar refresh token
    const decoded = jwt.verify(oldRefreshToken, JWT_REFRESH_SECRET) as {
      userId: string;
    };

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Gerar novos tokens
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      token,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Refresh token inválido", 401);
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    res.status(200).json({ user });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Erro ao buscar usuário", 500);
  }
};
