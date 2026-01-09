export const calculateResults = (poll, votes) => {
  const totalVotes = votes.length;

  const optionCounts = poll.options.map(option => {
    const count = votes.filter(v =>
      v.selectedOptions.includes(option.text)
    ).length;

    return {
      text: option.text,
      count,
      percentage: totalVotes === 0 ? 0 : ((count / totalVotes) * 100).toFixed(2)
    };
  });

  return { totalVotes, optionCounts };
};
