import React, { useEffect, useState } from "react";
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
} from "chart.js";
import { format } from "date-fns"; // Import date-fns for date manipulation
import ChartDataLabels from "chartjs-plugin-datalabels"; // Correct import

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin here
);

const Chart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/reservation/revenue"
        );
        const data = await response.json();

        // Get the current month and the two previous months
        const now = new Date();
        const currentMonth = now.getMonth(); // Current month (0-indexed)
        const monthsToShow = [currentMonth, currentMonth - 1, currentMonth - 2];

        // Filter data to show only the last 3 months
        const filteredData = data.filter((item) => {
          const itemDate = new Date(item._id);
          return monthsToShow.includes(itemDate.getMonth());
        });

        // Format the _id (which is assumed to be a date) as 'MM-YYYY'
        const labels = filteredData.map((item) =>
          format(new Date(item._id), "MM-yyyy")
        );
        const revenues = filteredData.map((item) => item.totalRevenue);

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Revenue",
              data: revenues,
              borderColor: "#4A90E2",
              backgroundColor: "rgba(74, 144, 226, 0.2)",
              fill: true,
              borderWidth: 3,
              tension: 0.4, // Adds a smooth curve to the line
              pointBackgroundColor: "#FFFFFF",
              pointBorderColor: "#4A90E2", // Points in line will have a color
              pointBorderWidth: 2, // Border width for points
              pointRadius: 5, // Size of the point
              borderDash: [5, 5], // Dashed line style
              datalabels: {
                align: "top", // Position the data labels above the points
                font: {
                  weight: "bold",
                  size: 12,
                },
                color: "#FFFFFF", // Color of the data labels
              },
            },
          ],
        });
      } catch (err) {
        console.log("Error fetching revenue data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Month-Year", // Set x-axis title as "Month-Year"
                },
                ticks: {
                  autoSkip: false, // Show all x-axis labels
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Revenue (VND)", // Set y-axis title as "Revenue"
                },
                ticks: {
                  beginAtZero: true, // Ensure the y-axis starts from zero
                  callback: (value) => `VND ${value.toLocaleString()}`, // Format y-axis ticks
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => `VND ${context.raw.toLocaleString()}`, // Format tooltips
                },
              },
              datalabels: {
                display: true, // Enable data labels
              },
            },
          }}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default Chart;
