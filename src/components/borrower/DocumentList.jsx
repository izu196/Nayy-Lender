import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaDownload,
} from "react-icons/fa";

const DocumentList = ({ documents }) => {
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1">
              <h3 className="font-medium">{doc.name}</h3>
              <p className="text-sm text-gray-500">
                Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{doc.status}</span>
                {getStatusIcon(doc.status)}
              </div>
              {doc.downloadUrl && (
                <button
                  onClick={() => window.open(doc.downloadUrl)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <FaDownload />
                </button>
              )}
            </div>
          </div>
        ))}
        {documents.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No documents uploaded yet
          </p>
        )}
      </div>
    </div>
  );
};

export default DocumentList;
