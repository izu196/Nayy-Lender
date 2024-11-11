import React, { useState } from "react";
import { loanApprovalService } from "../../services/api";
import { LOAN_STATUS } from "../../constants/constants";
import Swal from "sweetalert2";

const ApprovalForm = ({ loanId, onApprovalComplete }) => {
  const [decision, setDecision] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (decision === "approved") {
        await loanApprovalService.approveLoan({
          loanId,
          approvalNotes: comments,
          interestRate: parseFloat(interestRate),
        });
      } else if (decision === "rejected") {
        await loanApprovalService.rejectLoan({
          loanId,
          rejectionReason: comments,
        });
      } else {
        await loanApprovalService.validateDocuments({
          loanId,
          note: comments,
          status: LOAN_STATUS.UNDER_REVIEW,
        });
      }

      Swal.fire(
        "Success",
        `Loan ${
          decision === "approved"
            ? "approved"
            : decision === "rejected"
            ? "rejected"
            : "updated"
        } successfully!`,
        "success"
      );

      if (onApprovalComplete) {
        onApprovalComplete(decision);
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Loan Decision</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Decision
          </label>
          <select
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select decision</option>
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
            <option value="review">Need More Information</option>
          </select>
        </div>

        {decision === "approved" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {decision === "rejected" ? "Rejection Reason" : "Notes"}
          </label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? "Processing..." : "Submit Decision"}
        </button>
      </form>
    </div>
  );
};

export default ApprovalForm;
