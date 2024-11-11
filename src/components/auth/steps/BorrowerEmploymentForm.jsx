import React from "react";
import Input from "../../common/Input";
import DocumentUpload from "../../common/DocumentUpload";

const BorrowerEmploymentForm = ({
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

  const employmentTypes = [
    "FULL_TIME",
    "PART_TIME",
    "SELF_EMPLOYED",
    "CONTRACT",
    "UNEMPLOYED",
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium ${theme.text}`}>
          Employment Status
        </label>
        <select
          name="employmentType"
          value={formData.employmentType || ""}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md ${theme.input}`}
        >
          <option value="">Select Employment Type</option>
          {employmentTypes.map((type) => (
            <option key={type} value={type}>
              {type.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        {errors.employmentType && (
          <p className="mt-1 text-sm text-red-500">{errors.employmentType}</p>
        )}
      </div>

      {formData.employmentType !== "UNEMPLOYED" && (
        <>
          <Input
            name="employerName"
            label="Employer Name"
            value={formData.employerName || ""}
            onChange={handleChange}
            error={errors.employerName}
            theme={theme}
            required
          />

          <Input
            name="employerAddress"
            label="Employer Address"
            value={formData.employerAddress || ""}
            onChange={handleChange}
            error={errors.employerAddress}
            theme={theme}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              name="monthlyIncome"
              label="Monthly Income"
              type="number"
              min="0"
              value={formData.monthlyIncome || ""}
              onChange={handleChange}
              error={errors.monthlyIncome}
              theme={theme}
              required
            />

            <Input
              name="employmentDuration"
              label="Years Employed"
              type="number"
              min="0"
              step="0.5"
              value={formData.employmentDuration || ""}
              onChange={handleChange}
              error={errors.employmentDuration}
              theme={theme}
              required
            />
          </div>

          <DocumentUpload
            label="Proof of Employment"
            accept=".pdf"
            onChange={(file) => onDocumentUpload(file, "employmentLetter")}
            error={errors.employmentLetter}
            theme={theme}
          />

          <DocumentUpload
            label="Recent Pay Slip"
            accept=".pdf,image/*"
            onChange={(file) => onDocumentUpload(file, "paySlip")}
            error={errors.paySlip}
            theme={theme}
          />
        </>
      )}
    </div>
  );
};

export default BorrowerEmploymentForm;
