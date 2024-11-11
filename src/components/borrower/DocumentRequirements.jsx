import React from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const DocumentRequirements = ({ requirements }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Required Documents</h2>
      <div className="space-y-4">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="flex items-start space-x-4 p-4 border rounded-lg"
          >
            {req.isSubmitted ? (
              <FaCheckCircle className="text-green-500 mt-1" />
            ) : (
              <FaExclamationCircle className="text-yellow-500 mt-1" />
            )}
            <div>
              <h3 className="font-medium">{req.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{req.description}</p>
              {req.specifications && (
                <ul className="text-xs text-gray-500 mt-2 list-disc list-inside">
                  {req.specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              )}
              {!req.isSubmitted && (
                <p className="text-sm text-red-500 mt-2">
                  Required for application processing
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentRequirements;
