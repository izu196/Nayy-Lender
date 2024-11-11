import React from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const RiskFactors = ({ settings }) => {
  const factors = [
    {
      name: "Credit Score",
      weight: settings.creditScoreWeight,
      impact: "High",
      status: "warning",
      description: "Credit score below threshold",
    },
    {
      name: "Income Level",
      weight: settings.incomeWeight,
      impact: "Medium",
      status: "success",
      description: "Stable income source",
    },
    {
      name: "Debt Ratio",
      weight: settings.debtRatioWeight,
      impact: "High",
      status: "warning",
      description: "High debt-to-income ratio",
    },
    {
      name: "Payment History",
      weight: settings.historyWeight,
      impact: "Low",
      status: "success",
      description: "Good payment history",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Risk Factors</h2>
      <div className="space-y-4">
        {factors.map((factor) => (
          <div
            key={factor.name}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                {factor.status === "warning" ? (
                  <FaExclamationTriangle className="text-yellow-500" />
                ) : (
                  <FaCheckCircle className="text-green-500" />
                )}
                <h3 className="font-medium">{factor.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">{factor.description}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">Weight: {factor.weight}%</p>
              <p
                className={`text-sm ${
                  factor.impact === "High"
                    ? "text-red-500"
                    : factor.impact === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {factor.impact} Impact
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskFactors;
