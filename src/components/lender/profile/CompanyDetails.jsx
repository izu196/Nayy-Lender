import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaArrowRight } from "react-icons/fa";
import ZambianAddress from "../../common/ZambianAddress";

const CompanyDetails = ({ data, onUpdate, onNext }) => {
  const [formData, setFormData] = useState(
    data || {
      name: "",
      registrationNumber: "",
      taxId: "",
      address: {
        street: "",
        city: "",
        province: "",
      },
    }
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await onUpdate({ companyDetails: formData });
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
        <FaBuilding className="mr-2" />
        Company Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration Number
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tax ID
          </label>
          <input
            type="text"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Company Address</h3>
          <ZambianAddress
            value={formData.address}
            onChange={(newAddress) => {
              setFormData((prev) => ({
                ...prev,
                address: newAddress,
              }));
            }}
          />
        </div>
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Saving..." : "Next"}
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CompanyDetails;
