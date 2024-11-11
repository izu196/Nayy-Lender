import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const RiskAnalysis = ({ data }) => {
  const getRiskColor = (score) => {
    if (score >= 80) return "#10B981";
    if (score >= 60) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Risk Analysis</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="w-32 h-32 mx-auto">
          <CircularProgressbar
            value={data.riskScore}
            text={`${data.riskScore}%`}
            styles={buildStyles({
              pathColor: getRiskColor(data.riskScore),
              textColor: getRiskColor(data.riskScore),
            })}
          />
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Credit Score</p>
            <p className="font-medium">{data.creditScore}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Debt-to-Income Ratio</p>
            <p className="font-medium">{data.dtiRatio}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment History</p>
            <p className="font-medium">{data.paymentHistory}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
