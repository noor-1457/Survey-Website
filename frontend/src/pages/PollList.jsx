import { useEffect, useState } from "react";
import axios from "axios";
import { usePoll } from "../context/PollContext";

function PollList() {
  const {loading, setLoading} = usePoll();

  const [polls, setPolls] = useState([]); 

  // Edit state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPoll, setEditPoll] = useState(null);

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

  const handleEdit = (poll) => {
    setEditPoll(JSON.parse(JSON.stringify(poll))); // deep copy
    setIsEditOpen(true);
  };

  const handleDelete = (pollId) => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
      setPolls(polls.filter((poll) => poll._id !== pollId));
    }
  };

  const handleOptionChange = (value, index) => {
    const updated = [...editPoll.options];
    updated[index].text = value;
    setEditPoll({ ...editPoll, options: updated });
  };

  const saveEditedPoll = () => {
    setPolls(
      polls.map((poll) =>
        poll._id === editPoll._id ? editPoll : poll
      )
    );
    setIsEditOpen(false);
    setEditPoll(null);
  };

  const formatDate = (iso) => new Date(iso).toLocaleString();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="animate-spin rounded-full h-24 w-24 border-[6px] border-blue-200 border-t-blue-600" />
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Your Polls</h2>

      {polls.length === 0 ? (
        <p className="text-gray-500">No polls created yet.</p>
      ) : (
        <div className="space-y-4">
          {polls.map((poll) => (
            <div
              key={poll._id}
              className="border p-4 rounded-lg shadow-sm bg-white flex justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg">{poll.question}</h3>
                <p className="text-gray-500 text-sm">
                  Type: {poll.pollType} | Expires:{" "}
                  {formatDate(poll.endTime)}
                </p>
                <p className="text-xs text-green-600">
                  Status: {poll.pollStatus}
                </p>

                <ul className="mt-2 list-disc list-inside">
                  {poll.options.map((opt) => (
                    <li key={opt._id}>{opt.text}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => handleEdit(poll)}
                  className="px-3 h-10 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(poll._id)}
                  className="px-3 h-10 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && editPoll && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Edit Poll</h3>

            {/* Question */}
            <input
              className="input w-full mb-3"
              value={editPoll.question}
              onChange={(e) =>
                setEditPoll({ ...editPoll, question: e.target.value })
              }
            />

            {/* Poll Type */}
            <select
              className="input w-full mb-3"
              value={editPoll.pollType}
              onChange={(e) =>
                setEditPoll({ ...editPoll, pollType: e.target.value })
              }
            >
              <option value="Single Choice">Single Choice</option>
              <option value="Multiple Choice">Multiple Choice</option>
            </select>

            {/* Options */}
            {editPoll.options.map((opt, index) => (
              <input
                key={opt._id}
                className="input w-full mb-2"
                value={opt.text}
                onChange={(e) =>
                  handleOptionChange(e.target.value, index)
                }
              />
            ))}

            {/* Expiration */}
            <input
              type="datetime-local"
              className="input w-full mt-2"
              value={editPoll.endTime?.slice(0, 16)}
              onChange={(e) =>
                setEditPoll({ ...editPoll, endTime: e.target.value })
              }
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedPoll}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PollList;
