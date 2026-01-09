import express from "express";
import { castVote } from "../controllers/voteController.js";

const router = express.Router();

router.post("/", castVote);

export default router;
