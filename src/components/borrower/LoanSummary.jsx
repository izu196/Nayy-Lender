import React from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaPercent } from "react-icons/fa";

const LoanSummary = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Loan Summary</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FaMoneyBillWave className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Loan Amount</p>
            <p className="font-medium">${data.amount}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaCalendarAlt className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Term Length</p>
            <p className="font-medium">{data.term} months</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaPercent className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Interest Rate</p>
            <p className="font-medium">{data.interestRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;
