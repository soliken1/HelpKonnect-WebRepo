// LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineChart({ data }) {
  return (
    <Line
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                size: 14,
              },
              color: "#000",
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            titleFont: { size: 14 },
            bodyFont: { size: 12 },
            callbacks: {
              label: (context) => `Count: ${context.raw}`,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Date",
              font: {
                size: 16,
              },
              color: "#333",
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              font: {
                size: 12,
              },
              color: "#666",
            },
            grid: {
              display: true,
              color: "rgba(200, 200, 200, 0.2)",
              borderDash: [5, 5],
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Active Users",
              font: {
                size: 16,
              },
              color: "#333",
            },
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              callback: function (value) {
                return Number.isInteger(value) ? value : null;
              },
              font: {
                size: 12,
              },
              color: "#666",
            },
            grid: {
              display: true,
              drawBorder: false,
              color: "rgba(200, 200, 200, 0.5)",
              borderDash: [5, 5],
              lineWidth: 1,
            },
          },
        },
        elements: {
          point: {
            radius: 5,
            backgroundColor: "rgba(75, 192, 192, 1)",
          },
          line: {
            tension: 0.4,
            borderColor: "black",
            borderWidth: 2,
            backgroundColor: "rgba(255, 99, 132, 0.1)",
          },
        },
      }}
    />
  );
}

export default LineChart;
