import Poll from "../models/Poll.js";
import Vote from "../models/Vote.js";
import { calculateResults } from "../utils/calculateResults.js";

export default function voteSocket(io) {
  io.on("connection", socket => {
    console.log("User connected:", socket.id);

    // join poll room
    socket.on("join_poll", pollId => {
      socket.join(pollId);
    });

    // when vote is cast
    socket.on("vote_casted", async pollId => {
      const poll = await Poll.findById(pollId);
      const votes = await Vote.find({ pollId });

      const results = calculateResults(poll, votes);

      io.to(pollId).emit("live_results", results);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}
