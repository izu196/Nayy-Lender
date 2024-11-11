import React from "react";
import { parse } from "date-fns/parse";
import { format } from "date-fns/format";

const LoanDetails = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Loan Details</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Amount Requested</p>
            <p className="font-medium">${data.amount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Term Length</p>
            <p className="font-medium">{data.term} months</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Purpose</p>
            <p className="font-medium">{data.purpose}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Application Date</p>
            <p className="font-medium">
              {format(new Date(data.applicationDate), "MMM dd, yyyy")}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Description</p>
          <p className="mt-1">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
