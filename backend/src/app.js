import express from "express";
import cors from "cors";

import pollRoutes from "./routes/pollRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/polls", pollRoutes);
app.use("/api/votes", voteRoutes);

app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

export default app;
