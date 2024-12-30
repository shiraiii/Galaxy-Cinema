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
import { format } from "date-fns";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
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

        const now = new Date();
        const currentMonth = now.getMonth();
        const monthsToShow = [currentMonth, currentMonth - 1, currentMonth - 2];

        const filteredData = data.filter((item) => {
          const itemDate = new Date(item._id);
          return monthsToShow.includes(itemDate.getMonth());
        });

        const labels = filteredData.map((item) =>
          format(new Date(item._id), "MM")
        );
        const revenues = filteredData.map((item) => item.totalRevenue);

        setChartData({
          labels,
          datasets: [
            {
              label: "Doanh Thu Tổng",
              data: revenues,
              borderColor: "#4A90E2",
              backgroundColor: "rgba(74, 144, 226, 0.2)",
              fill: true,
              borderWidth: 3,
              tension: 0.4,
              pointBackgroundColor: "#4A90E2",
              pointBorderColor: "#FFFFFF",
              pointBorderWidth: 2,
              pointRadius: 5,
              datalabels: {
                align: "top",
                font: {
                  weight: "bold",
                  size: 12,
                },
                color: "#4A90E2",
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
    <div className="bg-white rounded-lg shadow p-4">
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Tháng",
                  color: "#333",
                },
                ticks: {
                  autoSkip: false,
                  color: "#333",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Doanh Thu (VND)",
                  color: "#333",
                },
                ticks: {
                  beginAtZero: true,
                  callback: (value) => `VND ${value.toLocaleString()}`,
                  color: "#333",
                },
                grid: {
                  color: "#e0e0e0",
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => `VND ${context.raw.toLocaleString()}`,
                },
                backgroundColor: "#ffffff",
                titleColor: "#333",
                bodyColor: "#333",
                borderColor: "#ccc",
                borderWidth: 1,
              },
              legend: {
                labels: {
                  color: "#333",
                },
              },
              datalabels: {
                display: true,
              },
            },
          }}
        />
      ) : (
        <p>Đang tải dữ liệu biểu đồ...</p>
      )}
    </div>
  );
};

export default Chart;
