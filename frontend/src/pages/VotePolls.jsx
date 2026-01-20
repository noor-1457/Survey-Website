import { useEffect, useState } from "react";
import axios from "axios";
import { usePoll } from "../context/PollContext";
import { socket } from "../socket";

function VotePolls() {
  const { loading, setLoading } = usePoll();

  const [polls, setPolls] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [votedPolls, setVotedPolls] = useState([]);
  const [liveResults, setLiveResults] = useState({});

  // 🔌 SOCKET CONNECT / DISCONNECT
  useEffect(() => {
    socket.connect();

    socket.on("live_results", (results) => {
      setLiveResults((prev) => ({
        ...prev,
        [results.pollId]: results,
      }));
    });

    return () => {
      socket.off("live_results");
      socket.disconnect();
    };
  }, []);

  // 📥 FETCH POLLS
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/polls");
        setPolls(res.data);
      } catch (err) {
        console.error("Failed to fetch polls:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const activePolls = polls.filter((poll) => poll.pollStatus === "active");

  // 🏠 JOIN POLL ROOMS
  useEffect(() => {
    activePolls.forEach((poll) => {
      socket.emit("join_poll", poll._id);
    });
  }, [activePolls]);

  // 🗳️ OPTION CHANGE
  const handleVoteChange = (pollId, optionId, pollType) => {
    setSelectedOptions((prev) => {
      if (pollType === "Single Choice") {
        return { ...prev, [pollId]: [optionId] };
      } else {
        const current = prev[pollId] || [];
        return {
          ...prev,
          [pollId]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      }
    });
  };

  // 🚀 SUBMIT VOTE
 const submitVote = async (pollId) => {
  if (votedPolls.includes(pollId)) {
    alert("You have already voted in this poll");
    return;
  }

  if (!selectedOptions[pollId]?.length) {
    alert("Please select an option");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/votes",
      { pollId, selectedOptions: selectedOptions[pollId] },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    setVotedPolls((prev) => [...prev, pollId]);

    socket.emit("vote_casted", pollId);

  } catch (err) {
    alert(err.response?.data?.message || "Voting failed");
  }
};


  // ⏳ LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="animate-spin rounded-full h-24 w-24 border-[6px] border-blue-200 border-t-blue-600" />
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    );
  }

  // 🎨 UI
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Active Polls</h2>

      {activePolls.length === 0 ? (
        <p className="text-gray-500">No active polls available.</p>
      ) : (
        <div className="space-y-4">
          {activePolls.map((poll) => (
            <div
              key={poll._id}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <h3 className="font-semibold text-lg">{poll.question}</h3>

              <ul className="mt-3 space-y-2">
                {poll.options.map((opt) => (
                  <li key={opt._id} className="flex items-center gap-2">
                    <input
                      type={
                        poll.pollType === "Single Choice" ? "radio" : "checkbox"
                      }
                      name={poll._id}
                      disabled={votedPolls.includes(poll._id)}
                      onChange={() =>
                        handleVoteChange(poll._id, opt._id, poll.pollType)
                      }
                    />
                    <span>{opt.text}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => submitVote(poll._id)}
                disabled={votedPolls.includes(poll._id)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
              >
                {votedPolls.includes(poll._id) ? "Voted" : "Submit Vote"}
              </button>

              {/* 📊 LIVE RESULTS */}
              {liveResults[poll._id] && (
                <div className="mt-4 text-sm text-gray-700">
                  <p className="font-semibold mb-1">Live Results:</p>
                  {liveResults[poll._id].options.map((opt) => (
                    <p key={opt.optionId}>
                      {opt.text} — {opt.count} votes ({opt.percentage}%)
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VotePolls;
