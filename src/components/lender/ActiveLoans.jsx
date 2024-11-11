import React, { useState, useEffect } from "react";
import { lenderService, loanService } from "../../services/api";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Loader from "../Loader/Loader";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const ActiveLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [sortConfig, setSortConfig] = useState({
    sortBy: "createdAt",
    order: "desc",
  });

  const fetchLoans = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await lenderService.getActiveLoans({
        page,
        limit: pagination.limit,
        sortBy: sortConfig.sortBy,
        order: sortConfig.order,
      });
      setLoans(data.loans);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [sortConfig]);

  const handleSort = (field) => {
    setSortConfig((prev) => ({
      sortBy: field,
      order: prev.sortBy === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const getPaymentStatusStyle = (status) => {
    return status === "ON_TRACK"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  if (loading && !loans.length) return <Loader />;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Active Loans</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Borrower
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                Amount
                {sortConfig.sortBy === "amount" &&
                  (sortConfig.order === "asc" ? (
                    <FaSortUp className="inline ml-1" />
                  ) : (
                    <FaSortDown className="inline ml-1" />
                  ))}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/lender/loans/${loan.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <p className="font-medium">{loan.borrowerName}</p>
                    <p className="text-sm text-gray-500">ID: {loan.id}</p>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="font-medium">${loan.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    Paid: ${loan.totalPaid.toLocaleString()}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {loan.nextPaymentDate
                    ? format(new Date(loan.nextPaymentDate), "MMM dd, yyyy")
                    : "No pending payments"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusStyle(
                      loan.paymentStatus
                    )}`}
                  >
                    {loan.paymentStatus}
                  </span>
                  {loan.latePayments > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Late: {loan.latePayments}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  ${loan.remainingBalance.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => fetchLoans(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => fetchLoans(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveLoans;
