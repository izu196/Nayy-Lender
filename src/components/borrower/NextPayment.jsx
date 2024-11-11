import React from "react";
import { parse } from "date-fns/parse";
import { format } from "date-fns/format";
import { FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

const NextPayment = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Next Payment</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FaCalendarAlt className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">
              {format(new Date(data.dueDate), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaMoneyBillWave className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Amount Due</p>
            <p className="font-medium">${data.amount}</p>
          </div>
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default NextPayment;
