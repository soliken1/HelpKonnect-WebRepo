import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Users", "Professionals"],
  datasets: [
    {
      label: "Types of Users",
      data: [8, 16],
      backgroundColor: ["orange", "yellow"],
      borderColor: ["orange", "yellow"],
    },
  ],
};

const options = {};

function DonutChart({}) {
  return <Doughnut data={data} options={options}></Doughnut>;
}

export default DonutChart;
