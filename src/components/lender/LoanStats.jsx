import React, { useState, useEffect } from "react";
import { analyticsService } from "../../services/api";
import { FaChartLine, FaUsers, FaMoneyBillWave } from "react-icons/fa";

const LoanStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await analyticsService.getLenderDashboard();
        setStats(data.metrics);
      } catch (error) {
        console.error("Error fetching loan stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Loans",
      value: stats?.totalLoans || 0,
      icon: <FaChartLine className="text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Loans",
      value: stats?.activeLoans || 0,
      icon: <FaUsers className="text-green-500" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Recent Applications",
      value: stats?.recentApplications?.length || 0,
      icon: <FaMoneyBillWave className="text-purple-500" />,
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-lg shadow-md p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
            </div>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanStats;
