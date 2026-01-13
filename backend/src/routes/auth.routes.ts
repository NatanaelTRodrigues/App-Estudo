import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  getMe,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

// Rotas públicas
router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/refresh-token", asyncHandler(refreshToken));

// Rotas protegidas
router.get("/me", authMiddleware, asyncHandler(getMe));

export default router;
