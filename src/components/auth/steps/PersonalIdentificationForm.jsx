import React from "react";
import Input from "../../common/Input";
import DocumentUpload from "../../common/DocumentUpload";
import { ID_TYPES } from "../../../constants/roles";

const PersonalIdentificationForm = ({
  formData,
  setFormData,
  documents,
  onDocumentUpload,
  theme,
  errors = {},
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <Input
        name="fullName"
        label="Full Name"
        value={formData.fullName || ""}
        onChange={handleChange}
        error={errors.fullName}
        theme={theme}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium ${theme.text}`}>
            ID Type
          </label>
          <select
            name="idType"
            value={formData.idType || ""}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md ${theme.input}`}
          >
            <option value="">Select ID Type</option>
            {Object.values(ID_TYPES).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.idType && (
            <p className="mt-1 text-sm text-red-500">{errors.idType}</p>
          )}
        </div>

        <Input
          name="idNumber"
          label="ID Number"
          value={formData.idNumber || ""}
          onChange={handleChange}
          error={errors.idNumber}
          theme={theme}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth || ""}
          onChange={handleChange}
          error={errors.dateOfBirth}
          theme={theme}
          required
        />

        <Input
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber || ""}
          onChange={handleChange}
          error={errors.phoneNumber}
          theme={theme}
          required
        />
      </div>

      <DocumentUpload
        label="ID Document"
        accept="image/*,.pdf"
        onChange={(file) => onDocumentUpload(file, "identificationDocument")}
        error={errors.identificationDocument}
        theme={theme}
      />
    </div>
  );
};

export default PersonalIdentificationForm;
