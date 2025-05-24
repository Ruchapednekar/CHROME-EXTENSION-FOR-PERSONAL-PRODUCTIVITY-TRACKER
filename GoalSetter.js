import React, { useState } from "react";

const GoalSetter = ({ goals, saveGoals }) => {
  const [input, setInput] = useState(goals || "");

  const handleSave = () => {
    saveGoals(input);
    alert("Goals saved!");
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Set Your Daily Goals</h2>
      <textarea
        rows="4"
        style={{ width: "100%", padding: 8 }}
        placeholder="Enter your goals for today..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button onClick={handleSave} style={{ marginTop: 10, padding: "8px 16px" }}>
        Save Goals
      </button>
    </div>
  );
};

export default GoalSetter;
