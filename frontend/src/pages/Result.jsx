import React from "react";
// import Hero from "../components/Hero";

const Result = () => {
  // Example poll data
  const poll = {
    question: "Which is your favorite frontend framework?",
    options: [
      { name: "React", votes: 450 },
      { name: "Vue.js", votes: 250 },
      { name: "Angular", votes: 200 },
      { name: "Svelte", votes: 100 },
    ],
  };

  // Calculate total votes
  const totalVotes = poll.options.reduce(
    (acc, option) => acc + option.votes,
    0,
  );

  return (
    <div>
      {/* <Hero /> */}

      {/* Result Section */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Poll Results</h2>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-6">{poll.question}</h3>

          <div className="space-y-4">
            {poll.options.map((option, index) => {
              const percentage = ((option.votes / totalVotes) * 100).toFixed(1);
              return (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{option.name}</span>
                    <span className="text-red-600 font-bold">
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-600 h-3 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center text-gray-500 text-sm mt-6">
            {totalVotes} votes • Poll ended
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
