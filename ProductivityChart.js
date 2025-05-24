import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProductivityChart = ({ timeData }) => {
  const labels = Object.keys(timeData).map((url) => {
    // Remove protocol for readability
    return url.replace(/(^\w+:|^)\/\//, "");
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Time Spent (seconds)",
        data: Object.values(timeData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    scales: {
      x: { beginAtZero: true },
    },
  };

  if (labels.length === 0) {
    return <p>No productivity data to display.</p>;
  }

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Productivity Trends</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProductivityChart;
