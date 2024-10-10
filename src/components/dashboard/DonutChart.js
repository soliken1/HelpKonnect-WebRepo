import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {};

function DonutChart({ data }) {
  return <Doughnut data={data} options={options}></Doughnut>;
}

export default DonutChart;
