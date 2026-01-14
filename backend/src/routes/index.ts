import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import authRoutes from "./auth.routes";
import goalRoutes from "./goal.routes";
import questionRoutes from "./question.routes";

const router = Router();

// Rotas públicas
router.use("/auth", authRoutes);

// Rotas protegidas
router.use("/goals", authMiddleware, goalRoutes);
router.use("/questions", authMiddleware, questionRoutes);

// Rota de teste
router.get("/test", (_req, res) => {
  res.json({ message: "API funcionando!" });
});

export default router;
