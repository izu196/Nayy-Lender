import React from "react";
import { parse } from "date-fns/parse";
import { format } from "date-fns/format";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaComments,
} from "react-icons/fa";

const ActivityLog = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "approval":
        return <FaCheckCircle className="text-green-500" />;
      case "rejection":
        return <FaTimesCircle className="text-red-500" />;
      case "comment":
        return <FaComments className="text-blue-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 border-l-4 border-gray-200 hover:bg-gray-50"
          >
            {getActivityIcon(activity.type)}
            <div className="flex-1">
              <p className="font-medium">
                {activity.user} {activity.action}
              </p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {format(new Date(activity.timestamp), "MMM dd, yyyy HH:mm")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
