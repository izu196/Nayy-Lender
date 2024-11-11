import React from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";

const RiskMatrix = ({ settings }) => {
  const matrixData = [
    {
      id: "Credit Score",
      data: [
        { x: "Low DTI", y: 85 },
        { x: "Medium DTI", y: 75 },
        { x: "High DTI", y: 65 },
      ],
    },
    {
      id: "Income Level",
      data: [
        { x: "Low DTI", y: 80 },
        { x: "Medium DTI", y: 70 },
        { x: "High DTI", y: 60 },
      ],
    },
    {
      id: "Payment History",
      data: [
        { x: "Low DTI", y: 90 },
        { x: "Medium DTI", y: 80 },
        { x: "High DTI", y: 70 },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Risk Matrix</h2>
      <div className="h-80">
        <ResponsiveHeatMap
          data={matrixData}
          margin={{ top: 20, right: 60, bottom: 60, left: 80 }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: "Debt-to-Income Ratio",
            legendPosition: "middle",
            legendOffset: 45,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Risk Factors",
            legendPosition: "middle",
            legendOffset: -60,
          }}
          colors={{
            type: "sequential",
            scheme: "blues",
          }}
          emptyColor="#555555"
          legends={[
            {
              anchor: "bottom",
              translateX: 0,
              translateY: 30,
              length: 400,
              thickness: 8,
              direction: "row",
              tickPosition: "after",
              tickSize: 3,
              tickSpacing: 4,
              tickOverlap: false,
              title: "Risk Score →",
              titleAlign: "start",
              titleOffset: 4,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default RiskMatrix;
