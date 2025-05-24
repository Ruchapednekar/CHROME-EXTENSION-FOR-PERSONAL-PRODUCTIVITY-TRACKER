import React from "react";

const TimeTracker = ({ timeData }) => {
  // timeData is an object { url: secondsSpent }

  // Sort URLs by time spent descending
  const sortedSites = Object.entries(timeData).sort((a, b) => b[1] - a[1]);

  // Format seconds to minutes and seconds
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Time Spent on Websites</h2>
      <ul>
        {sortedSites.length === 0 && <li>No data tracked yet.</li>}
        {sortedSites.map(([url, time]) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noreferrer" style={{ color: "#0077cc" }}>
              {url}
            </a>{" "}
            - {formatTime(time)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeTracker;
