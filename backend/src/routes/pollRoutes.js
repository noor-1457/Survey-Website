import express from "express";
import {
  createPoll,
  getPolls,
  getPollResults
} from "../controllers/pollController.js";

const router = express.Router();

router.post("/", createPoll);
router.get("/", getPolls);
router.get("/:id/results", getPollResults);

export default router;
