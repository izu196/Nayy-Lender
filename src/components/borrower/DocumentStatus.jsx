import React from "react";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const DocumentStatus = ({ documents }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="text-green-500" />;
      case "rejected":
        return <FaTimesCircle className="text-red-500" />;
      case "pending":
        return <FaSpinner className="text-yellow-500 animate-spin" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Document Status</h2>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{doc.name}</p>
              <p className="text-sm text-gray-500">{doc.type}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{doc.status}</span>
              {getStatusIcon(doc.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentStatus;
