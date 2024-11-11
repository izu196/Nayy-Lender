import React from "react";
import { FaUser, FaBriefcase, FaPhone, FaEnvelope } from "react-icons/fa";

const BorrowerProfile = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Borrower Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FaUser className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">
              {data.firstName} {data.lastName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaBriefcase className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Employment</p>
            <p className="font-medium">{data.employer}</p>
            <p className="text-sm text-gray-500">
              Monthly Income: ${data.monthlyIncome}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaPhone className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{data.phone}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{data.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerProfile;
