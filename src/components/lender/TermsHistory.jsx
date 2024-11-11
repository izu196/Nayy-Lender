import React, { useState, useEffect } from "react";
import { parse } from "date-fns/parse";
import { format } from "date-fns/format";
import { FaHistory } from "react-icons/fa";
import { lenderService, loanService } from "../../services/api";

const TermsHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await lenderService.getLoanTermsHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3 py-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <FaHistory className="mr-2" />
        Terms History
      </h2>
      <div className="space-y-4">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="border-b last:border-b-0 pb-4 last:pb-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">
                  {format(new Date(entry.updatedAt), "MMM dd, yyyy HH:mm")}
                </p>
                <p className="text-sm">
                  Interest Rate: {entry.interestRate}% | Term: {entry.loanTerm}{" "}
                  months
                </p>
                <p className="text-sm">
                  Range: ${entry.minimumAmount.toLocaleString()} - $
                  {entry.maximumAmount.toLocaleString()}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Updated by {entry.updatedBy}
              </div>
            </div>
          </div>
        ))}
        {history.length === 0 && (
          <p className="text-center text-gray-500 py-4">No history available</p>
        )}
      </div>
    </div>
  );
};

export default TermsHistory;
