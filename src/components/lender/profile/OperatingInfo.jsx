import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaClock, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import Select from "react-select";

const OperatingInfo = ({ data, onUpdate, onBack }) => {
  const [formData, setFormData] = useState(
    data || {
      operatingHours: {
        weekdays: "",
        weekends: "",
      },
      serviceAreas: [],
    }
  );
  const [loading, setLoading] = useState(false);

  const zambianCities = [
    { value: "Lusaka", label: "Lusaka" },
    { value: "Kitwe", label: "Kitwe" },
    { value: "Ndola", label: "Ndola" },
    { value: "Kabwe", label: "Kabwe" },
    { value: "Livingstone", label: "Livingstone" },
    { value: "Chipata", label: "Chipata" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [name]: value,
      },
    }));
  };

  const handleServiceAreasChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await onUpdate({ operatingInfo: formData });
    setLoading(false);
    if (success) {
      // This is the last step, so we don't call onNext
      // Instead, the parent component should handle the completion
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaClock className="mr-2" />
        Operating Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Operating Hours</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weekdays
            </label>
            <input
              type="text"
              name="weekdays"
              value={formData.operatingHours.weekdays}
              onChange={handleChange}
              placeholder="e.g., 09:00-17:00"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weekends
            </label>
            <input
              type="text"
              name="weekends"
              value={formData.operatingHours.weekends}
              onChange={handleChange}
              placeholder="e.g., Closed or 10:00-14:00"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service Areas
          </label>
          <Select
            isMulti
            options={zambianCities}
            value={zambianCities.filter((city) =>
              formData.serviceAreas.includes(city.value)
            )}
            onChange={handleServiceAreasChange}
            className="mt-1"
            placeholder="Select cities..."
          />
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
            {loading ? "Saving..." : "Complete Setup"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default OperatingInfo;
