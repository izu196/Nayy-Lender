import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaArrowRight,
  FaArrowLeft,
  FaUpload,
} from "react-icons/fa";
import { documentService } from "../../../services/api";

const BusinessRegistration = ({ data, onUpdate, onNext, onBack }) => {
  const [formData, setFormData] = useState(
    data || {
      licenseNumber: "",
      expiryDate: "",
      registrationDocuments: [],
    }
  );
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocumentUpload = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    try {
      const uploadedUrls = [];
      for (const file of files) {
        const response = await documentService.uploadDocument(
          file,
          null,
          "BUSINESS_REGISTRATION"
        );
        uploadedUrls.push(response.data.url);
      }

      setFormData((prev) => ({
        ...prev,
        registrationDocuments: [...prev.registrationDocuments, ...uploadedUrls],
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await onUpdate({ businessRegistration: formData });
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
        Business Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Business License Number
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            License Expiry Date
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration Documents
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload files</span>
                  <input
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleDocumentUpload}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                PDF, PNG, JPG up to 10MB each
              </p>
            </div>
          </div>
          {uploadProgress > 0 && (
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-indigo-600 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
          {formData.registrationDocuments.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">
                Uploaded Documents:
              </h4>
              <ul className="mt-2 divide-y divide-gray-200">
                {formData.registrationDocuments.map((doc, index) => (
                  <li key={index} className="py-2 text-sm text-gray-600">
                    Document {index + 1}
                  </li>
                ))}
              </ul>
            </div>
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

export default BusinessRegistration;
