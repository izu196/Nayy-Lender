import React from "react";
import { FaUser, FaChartLine, FaCheckCircle } from "react-icons/fa";

const TeamMemberList = ({ members }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Team Members</h2>
      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <FaUser className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <FaChartLine className="text-blue-500" />
                <span>{member.activeLoans} active</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FaCheckCircle className="text-green-500" />
                <span>{member.approvalRate}% approval</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMemberList;
