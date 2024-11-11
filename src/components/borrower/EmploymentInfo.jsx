import React, { useState } from "react";
import { FaBriefcase, FaSave } from "react-icons/fa";

const EmploymentInfo = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState(data || {});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpdate("employment", formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <FaBriefcase className="mr-2" />
        Employment Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employer Name
            </label>
            <input
              type="text"
              name="employerName"
              value={formData.employerName || ""}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <input
              type="text"
              name="position"
              value={formData.position || ""}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Income
            </label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome || ""}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Duration (years)
            </label>
            <input
              type="number"
              name="employmentDuration"
              value={formData.employmentDuration || ""}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employer Address
          </label>
          <textarea
            name="employerAddress"
            value={formData.employerAddress || ""}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-gray-300 py-2 px-3"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
          <FaSave className="ml-2" />
        </button>
      </form>
    </div>
  );
};

export default EmploymentInfo;
