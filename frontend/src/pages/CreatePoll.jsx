import { usePoll } from "../context/PollContext";

export default function CreatePoll() {
  const {
    question,
    setQuestion,
    options,
    addOption,
    updateOption,
    type,
    setType,
    expiration,
    setExpiration,
    createPoll,
    createdPoll,
    loading,
  } = usePoll();

   if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="animate-spin rounded-full h-24 w-24 border-[6px] border-blue-200 border-t-blue-600" />
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl my-10 mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Poll</h1>

      {/* Question */}
      <input
        className="input w-full mb-3"
        placeholder="Poll Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Poll Type */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Poll Type</label>
        <select
          className="input w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Single Choice">Single Choice</option>
          <option value="Multiple Choice">Multiple Choice</option>
        </select>
      </div>

      {/* Options */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Options</label>
        {options.map((opt, i) => (
          <input
            key={i}
            className="input w-full mt-2"
            placeholder={`Option ${i + 1}`}
            value={opt.text}
            onChange={(e) => updateOption(e.target.value, i)}
          />
        ))}

        <button onClick={addOption} className="text-blue-500 mt-2 text-sm">
          + Add Option
        </button>
      </div>

      {/* Expiration */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">
          Expiration Date & Time
        </label>
        <input
          type="datetime-local"
          className="input w-full"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button onClick={createPoll} className="btn w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Poll"}
      </button>

      {/* Preview */}
      {createdPoll && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="font-bold text-xl mb-2">Created Poll Preview</h2>

          <p>
            <strong>Question:</strong> {createdPoll.question}
          </p>
          <p>
            <strong>Type:</strong> {createdPoll.type}
          </p>
          <p>
            <strong>Expires:</strong>{" "}
            {new Date(createdPoll.expiration).toLocaleString()}
          </p>

          <ul className="list-disc ml-5 mt-2">
            {createdPoll.options.map((opt, i) => (
              <li key={i}>
                {opt.text} ({opt.votes} votes)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
