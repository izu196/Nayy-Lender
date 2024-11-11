import React from "react";
import { FaFilter } from "react-icons/fa";

const ReportFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <FaFilter className="text-gray-400" />
        <h2 className="text-lg font-medium">Filter Reports</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <select
            name="dateRange"
            value={filters.dateRange}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Type
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3"
          >
            <option value="all">All Types</option>
            <option value="personal">Personal</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="defaulted">Defaulted</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
