import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { analyticsService } from "../../services/api";
import { LOAN_STATUS } from "../../constants/loan";
import { Link } from "react-router-dom";

const ReportTable = ({ filters }) => {
  const [tableData, setTableData] = useState({
    loans: [],
    summary: {
      totalLoans: 0,
      totalAmount: 0,
      statusBreakdown: {},
      typeBreakdown: {},
      defaultRate: 0,
      averageProcessingTime: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTableData = async () => {
      setLoading(true);
      try {
        const { data } = await analyticsService.getLenderReport(filters);
        setTableData({
          loans: data.loans || [],
          summary: {
            totalLoans: data.totalLoans || 0,
            totalAmount: data.totalAmount || 0,
            statusBreakdown: data.statusBreakdown || {},
            typeBreakdown: data.typeBreakdown || {},
            defaultRate: data.defaultRate || 0,
            averageProcessingTime: data.averageProcessingTime || 0,
          },
        });
      } catch (error) {
        console.error("Error fetching table data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [filters]);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case LOAN_STATUS.APPROVED:
        return "bg-green-100 text-green-800";
      case LOAN_STATUS.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case LOAN_STATUS.REJECTED:
        return "bg-red-100 text-red-800";
      case LOAN_STATUS.DISBURSED:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Loans</p>
          <p className="text-xl font-semibold">
            {tableData.summary.totalLoans}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-xl font-semibold">
            ${tableData.summary.totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Default Rate</p>
          <p className="text-xl font-semibold">
            {tableData.summary.defaultRate.toFixed(2)}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Avg. Processing Time</p>
          <p className="text-xl font-semibold">
            {tableData.summary.averageProcessingTime} days
          </p>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loan ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Borrower
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purpose
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Term
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.loans.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(row.applicationDate), "MMM dd, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.loanId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.borrowerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${row.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.purpose}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.term} months
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  <Link to={`/lender/loans/${row.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
