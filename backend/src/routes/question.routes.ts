import { Router } from "express";
import {
  addQuestions,
  getQuestions,
  getQuestionStats,
} from "../controllers/question.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", asyncHandler(addQuestions));
router.get("/", asyncHandler(getQuestions));
router.get("/stats", asyncHandler(getQuestionStats));

export default router;
