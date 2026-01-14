import { Router } from "express";
import {
  addQuestions,
  getQuestions,
  getQuestionStats,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", asyncHandler(addQuestions));
router.get("/", asyncHandler(getQuestions));
router.get("/stats", asyncHandler(getQuestionStats));
router.put("/:id", asyncHandler(updateQuestion));
router.delete("/:id", asyncHandler(deleteQuestion));

export default router;
