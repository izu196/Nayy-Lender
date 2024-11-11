import React from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const StatsCard = ({ title, value, icon, change, loading = false }) => {
  const getChangeColor = (changeValue) => {
    if (changeValue > 0) return "text-green-500";
    if (changeValue < 0) return "text-red-500";
    return "text-gray-500";
  };

  const getChangeIcon = (changeValue) => {
    if (changeValue > 0) return <FaArrowUp className="w-3 h-3" />;
    if (changeValue < 0) return <FaArrowDown className="w-3 h-3" />;
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 text-sm">{title}</span>
        <span className="text-gray-400">{icon}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h4 className="text-2xl font-semibold">{value}</h4>
          {change !== undefined && (
            <div className={`flex items-center mt-2 ${getChangeColor(change)}`}>
              {getChangeIcon(change)}
              <span className="text-sm ml-1">
                {Math.abs(change)}% from last period
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
