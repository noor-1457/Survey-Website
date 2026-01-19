import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// Create Context
const PollContext = createContext();

// Context Provider
export const PollProvider = ({ children }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [createdPoll, setCreatedPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (value, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const createPoll = async () => {
    try {
      setLoading(true);
      const filteredOptions = options.filter((opt) => opt.trim() !== "");
      if (!question.trim() || filteredOptions.length < 2) {
        alert("Question and at least 2 options are required");
        // setLoading(false);
        return;
      }

      const res = await axios.post("http://localhost:5000/api/polls", {
        question,
        options: filteredOptions.map((opt) => ({ text: opt, votes: 0 })),
        startTime: new Date(),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      setCreatedPoll(res.data);
      setQuestion("");
      setOptions(["", ""]);
      alert("Poll Created Successfully ✅");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to create poll ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PollContext.Provider
      value={{
        question,
        setQuestion,
        options,
        addOption,
        updateOption,
        createPoll,
        createdPoll,
        loading,
        setLoading
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

// Custom hook for easy use
export const usePoll = () => useContext(PollContext);
