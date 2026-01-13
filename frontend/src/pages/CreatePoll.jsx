import { useState } from "react";
import axios from "axios";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => setOptions([...options, ""]);

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/polls", {
      question,
      options,
    });
    alert("Poll Created!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Poll</h1>

      <input className="input" placeholder="Poll Question"
        onChange={(e) => setQuestion(e.target.value)} />

      {options.map((opt, i) => (
        <input key={i} className="input mt-2" placeholder={`Option ${i + 1}`}
          onChange={(e) => {
            const newOpts = [...options];
            newOpts[i] = e.target.value;
            setOptions(newOpts);
          }} />
      ))}

      <button onClick={addOption} className="text-blue-500 mt-2">
        + Add Option
      </button>

      <button onClick={handleSubmit} className="btn mt-4">
        Create Poll
      </button>
    </div>
  );
}
