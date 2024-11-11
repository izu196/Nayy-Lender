import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const TermsPreview = ({ terms }) => {
  const calculateMonthlyPayment = (amount) => {
    const monthlyRate = terms.interestRate / 100 / 12;
    const months = terms.loanTerm;
    return (
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const exampleAmount = (terms.minimumAmount + terms.maximumAmount) / 2;
  const monthlyPayment = calculateMonthlyPayment(exampleAmount);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Terms Preview</h2>
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-start">
            <FaInfoCircle className="text-blue-500 mt-1 mr-2" />
            <div>
              <h3 className="font-medium text-blue-800">Example Calculation</h3>
              <p className="text-sm text-blue-600 mt-1">
                For a loan amount of ${exampleAmount.toLocaleString()}:
              </p>
              <ul className="text-sm text-blue-600 mt-2 space-y-1">
                <li>Monthly Payment: ${monthlyPayment.toFixed(2)}</li>
                <li>
                  Processing Fee: $
                  {((exampleAmount * terms.processingFee) / 100).toFixed(2)}
                </li>
                <li>
                  Total Interest: $
                  {(monthlyPayment * terms.loanTerm - exampleAmount).toFixed(2)}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Interest Rate</p>
            <p className="font-medium">{terms.interestRate}% APR</p>
          </div>
          <div>
            <p className="text-gray-500">Loan Term</p>
            <p className="font-medium">{terms.loanTerm} months</p>
          </div>
          <div>
            <p className="text-gray-500">Amount Range</p>
            <p className="font-medium">
              ${terms.minimumAmount.toLocaleString()} - $
              {terms.maximumAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Processing Fee</p>
            <p className="font-medium">{terms.processingFee}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPreview;
