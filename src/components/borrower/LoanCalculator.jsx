import React from "react";
import { FaCalculator, FaArrowRight } from "react-icons/fa";

const LoanCalculator = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(formData.amount);
    const termMonths = parseInt(formData.term);
    const annualRate = 0.15; // 15% annual interest rate
    const monthlyRate = annualRate / 12;

    if (!principal || !termMonths) return 0;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);

    return monthlyPayment.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <FaCalculator className="mr-2" />
        Loan Calculator
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="pl-8 w-full rounded-md border border-gray-300 py-2 px-3"
              placeholder="Enter amount"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Term (months)
          </label>
          <select
            name="term"
            value={formData.term}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3"
            required
          >
            <option value="">Select term</option>
            {[6, 12, 24, 36, 48].map((months) => (
              <option key={months} value={months}>
                {months} months
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
