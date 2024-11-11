import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const BankingDetails = ({ data, onUpdate, onNext, onBack }) => {
  const [formData, setFormData] = useState(
    data || {
      bankName: "",
      accountNumber: "",
      branchCode: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateAccountNumber = (number) => {
    return /^\d{10}$/.test(number) || "Account number must be 10 digits";
  };

  const validateBranchCode = (code) => {
    return /^\d{3}$/.test(code) || "Branch code must be 3 digits";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const validationErrors = {
      accountNumber: validateAccountNumber(formData.accountNumber),
      branchCode: validateBranchCode(formData.branchCode),
    };

    const hasErrors = Object.values(validationErrors).some(
      (error) => typeof error === "string"
    );

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const success = await onUpdate({ bankingDetails: formData });
    setLoading(false);
    if (success) onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaUniversity className="mr-2" />
        Banking Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bank Name
          </label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Account Number
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          {errors.accountNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Branch Code
          </label>
          <input
            type="text"
            name="branchCode"
            value={formData.branchCode}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          {errors.branchCode && (
            <p className="mt-1 text-sm text-red-600">{errors.branchCode}</p>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Next"}
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default BankingDetails;
