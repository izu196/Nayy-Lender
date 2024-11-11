import React from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

const TermsAcceptance = ({ formData, setFormData, onBack, onSubmit }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Terms & Conditions</h2>
      <div className="space-y-6">
        <div className="prose prose-sm max-w-none">
          <h3>Loan Agreement Terms</h3>
          <p>By accepting these terms, you acknowledge and agree that:</p>
          <ul>
            <li>All information provided is accurate and complete</li>
            <li>You understand the loan repayment schedule and obligations</li>
            <li>You accept the interest rate and fee structure</li>
            <li>You authorize credit checks and verification procedures</li>
          </ul>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mt-1"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            I have read and agree to the terms and conditions, privacy policy,
            and loan agreement terms.
          </label>
        </div>

        <div className="flex justify-between space-x-4">
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <button
            onClick={onSubmit}
            disabled={!formData.termsAccepted}
            className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            Submit Application
            <FaCheck className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAcceptance;
