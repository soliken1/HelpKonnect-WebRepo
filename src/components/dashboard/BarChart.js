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

const data = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  datasets: [
    {
      label: "Sessions",
      data: [12, 19, 3, 5, 2, 3, 10],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

function Barchart({}) {
  return <Bar data={data}></Bar>;
}

export default Barchart;
