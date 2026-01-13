import { Router } from "express";
import {
  createGoal,
  getCurrentGoal,
  getAllGoals,
  updateGoalProgress,
} from "../controllers/goal.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", asyncHandler(createGoal));
router.get("/current", asyncHandler(getCurrentGoal));
router.get("/", asyncHandler(getAllGoals));
router.patch("/:id/progress", asyncHandler(updateGoalProgress));

export default router;
