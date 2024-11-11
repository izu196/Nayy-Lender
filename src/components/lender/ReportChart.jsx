import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { analyticsService } from "../../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportChart = ({ filters }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState("trends"); // 'trends' or 'breakdown'

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const { data } = await analyticsService.getLenderReport(filters);

        // Monthly trends chart data
        const trendData = {
          labels: Object.keys(data.monthlyTrends),
          datasets: [
            {
              label: "Total Amount",
              data: Object.values(data.monthlyTrends).map((m) => m.totalAmount),
              borderColor: "rgb(79, 70, 229)",
              tension: 0.1,
            },
            {
              label: "Number of Loans",
              data: Object.values(data.monthlyTrends).map((m) => m.count),
              borderColor: "rgb(34, 197, 94)",
              tension: 0.1,
            },
          ],
        };

        // Status breakdown chart data
        const breakdownData = {
          labels: Object.keys(data.statusBreakdown),
          datasets: [
            {
              label: "Loans by Status",
              data: Object.values(data.statusBreakdown),
              backgroundColor: [
                "rgba(79, 70, 229, 0.6)",
                "rgba(34, 197, 94, 0.6)",
                "rgba(239, 68, 68, 0.6)",
                "rgba(245, 158, 11, 0.6)",
              ],
            },
          ],
        };

        setChartData({ trends: trendData, breakdown: breakdownData });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [filters]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-80 animate-pulse">
        <div className="h-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Loan Performance</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewType("trends")}
            className={`px-3 py-1 rounded ${
              viewType === "trends"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Trends
          </button>
          <button
            onClick={() => setViewType("breakdown")}
            className={`px-3 py-1 rounded ${
              viewType === "breakdown"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Status Breakdown
          </button>
        </div>
      </div>

      {chartData && viewType === "trends" && (
        <Line
          data={chartData.trends}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `$${value.toLocaleString()}`,
                },
              },
            },
          }}
          height={300}
        />
      )}

      {chartData && viewType === "breakdown" && (
        <Bar
          data={chartData.breakdown}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          height={300}
        />
      )}
    </div>
  );
};

export default ReportChart;
