import Poll from "../models/Poll.js";
import Vote from "../models/Vote.js";
import { calculateResults } from "../utils/calculateResults.js";

// create poll
export const createPoll = async (req, res) => {
  try {
    const poll = await Poll.create(req.body);
    res.status(201).json(poll);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get polls with search & filter
export const getPolls = async (req, res) => {
  try {
    const { status, category, search } = req.query;

    let query = {};

    if (category) query.category = category;

    if (search) query.question = { $regex: search, $options: "i" };

    let polls = await Poll.find(query);

    const now = new Date();

    polls = polls.map(poll => {
      let pollStatus = "upcoming";

      if (poll.startTime <= now && poll.endTime >= now) pollStatus = "active";
      if (poll.endTime < now) pollStatus = "closed";

      return { ...poll.toObject(), pollStatus };
    });

    if (status) polls = polls.filter(p => p.pollStatus === status);

    res.json(polls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// poll result API for charts
export const getPollResults = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const votes = await Vote.find({ pollId: poll._id });

    res.json(calculateResults(poll, votes));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
