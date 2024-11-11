import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const TeamPerformance = ({ performance }) => {
  const metrics = [
    {
      label: "Approval Rate",
      value: performance.approvalRate,
      change: performance.approvalRateChange,
      format: "%",
    },
    {
      label: "Average Response Time",
      value: performance.avgResponseTime,
      change: performance.responseTimeChange,
      format: "hrs",
    },
    {
      label: "Customer Satisfaction",
      value: performance.satisfaction,
      change: performance.satisfactionChange,
      format: "%",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <p className="text-sm text-gray-500">{metric.label}</p>
            <p className="text-2xl font-bold">
              {metric.value}
              {metric.format}
            </p>
            <div
              className={`flex items-center justify-center text-sm ${
                metric.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {metric.change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
              <span className="ml-1">{Math.abs(metric.change)}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="h-64">
        <ResponsiveLine
          data={performance.trends}
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto" }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          enableGridX={false}
          enableArea={true}
          areaOpacity={0.1}
          useMesh={true}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateY: 50,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              symbolSize: 12,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TeamPerformance;
