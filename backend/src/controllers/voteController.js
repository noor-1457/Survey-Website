import Vote from "../models/Vote.js";
import Poll from "../models/Poll.js";

// cast vote
export const castVote = async (req, res) => {
  try {
    const { pollId, voterId, selectedOptions } = req.body;

    const poll = await Poll.findById(pollId);

    if (!poll) return res.status(404).json({ message: "Poll not found" });

    // poll status check
    const now = new Date();
    if (poll.startTime > now) return res.status(400).json({ message: "Poll not started yet" });
    if (poll.endTime < now) return res.status(400).json({ message: "Poll closed" });

    // single choice validation
    if (poll.pollType === "single" && selectedOptions.length > 1) {
      return res.status(400).json({ message: "Only one option allowed" });
    }

    // create vote — duplicate prevented automatically
    const vote = await Vote.create({ pollId, voterId, selectedOptions });

    res.status(201).json(vote);
  } catch (err) {
    res.status(400).json({ message: "Duplicate vote not allowed" });
  }
};
