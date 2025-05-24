/* global chrome */
import React, { useEffect, useState } from "react";
import GoalSetter from "./components/GoalSetter";
import TimeTracker from "./components/TimeTracker";
import ProductivityChart from "./components/ProductivityChart";

function App() {
  const [goals, setGoals] = useState("");
  const [timeData, setTimeData] = useState({});

  // Load saved goals and time data from chrome storage
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(["goals", "timeData"], (result) => {
        if (result.goals) setGoals(result.goals);
        if (result.timeData) setTimeData(result.timeData);
      });
    }
  }, []);

  // Save goals to chrome storage whenever changed
  const saveGoals = (newGoals) => {
    setGoals(newGoals);
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ goals: newGoals });
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>🧠 Personal Productivity Tracker</h1>
      <GoalSetter goals={goals} saveGoals={saveGoals} />
      <TimeTracker timeData={timeData} />
      <ProductivityChart timeData={timeData} />
    </div>
  );
}

export default App;
