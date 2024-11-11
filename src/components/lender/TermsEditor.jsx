import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { lenderService } from "../../services/api";
import Swal from "sweetalert2";

const TermsEditor = ({ terms, setTerms }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateTerms = () => {
    const newErrors = {};
    if (terms.minimumAmount >= terms.maximumAmount) {
      newErrors.amount = "Minimum amount must be less than maximum amount";
    }
    if (terms.interestRate < 0 || terms.interestRate > 100) {
      newErrors.interestRate = "Interest rate must be between 0 and 100";
    }
    if (terms.loanTerm < 1) {
      newErrors.loanTerm = "Loan term must be at least 1 month";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTerms((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateTerms()) return;

    setLoading(true);
    try {
      await lenderService.configureLoanTerms(terms);
      Swal.fire("Success", "Loan terms updated successfully", "success");
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || "Failed to update loan terms",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Edit Terms</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              value={terms.interestRate}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="100"
              className={`w-full rounded-md border ${
                errors.interestRate ? "border-red-500" : "border-gray-300"
              } py-2 px-3`}
            />
            {errors.interestRate && (
              <p className="mt-1 text-sm text-red-500">{errors.interestRate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (months)
            </label>
            <input
              type="number"
              name="loanTerm"
              value={terms.loanTerm}
              onChange={handleChange}
              min="1"
              className="w-full rounded-md border border-gray-300 py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Amount ($)
            </label>
            <input
              type="number"
              name="minimumAmount"
              value={terms.minimumAmount}
              onChange={handleChange}
              min="0"
              className="w-full rounded-md border border-gray-300 py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Amount ($)
            </label>
            <input
              type="number"
              name="maximumAmount"
              value={terms.maximumAmount}
              onChange={handleChange}
              min="0"
              className="w-full rounded-md border border-gray-300 py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Processing Fee (%)
            </label>
            <input
              type="number"
              name="processingFee"
              value={terms.processingFee}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="w-full rounded-md border border-gray-300 py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prepayment Penalty (%)
            </label>
            <input
              type="number"
              name="prepaymentPenalty"
              value={terms.prepaymentPenalty}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="w-full rounded-md border border-gray-300 py-2 px-3"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || Object.keys(errors).length > 0}
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
          <FaSave className="ml-2" />
        </button>
      </form>
    </div>
  );
};

export default TermsEditor;
