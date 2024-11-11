import React from "react";
import Input from "../../common/Input";
import DocumentUpload from "../../common/DocumentUpload";

const LenderStaffComplianceForm = ({
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

  const complianceStatuses = [
    "TRAINING_COMPLETED",
    "BACKGROUND_CHECK_PASSED",
    "PENDING_VERIFICATION",
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium ${theme.text}`}>
          Compliance Status
        </label>
        <select
          name="complianceStatus"
          value={formData.complianceStatus || ""}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md ${theme.input}`}
        >
          <option value="">Select Status</option>
          {complianceStatuses.map((status) => (
            <option key={status} value={status}>
              {status.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        {errors.complianceStatus && (
          <p className="mt-1 text-sm text-red-500">{errors.complianceStatus}</p>
        )}
      </div>

      <Input
        name="trainingCompletionDate"
        label="Training Completion Date"
        type="date"
        value={formData.trainingCompletionDate || ""}
        onChange={handleChange}
        error={errors.trainingCompletionDate}
        theme={theme}
        required
      />

      <div className="space-y-4">
        <DocumentUpload
          label="Training Certificate"
          accept=".pdf"
          onChange={(file) => onDocumentUpload(file, "trainingCertificate")}
          error={errors.trainingCertificate}
          theme={theme}
        />

        <DocumentUpload
          label="Background Check Report"
          accept=".pdf"
          onChange={(file) => onDocumentUpload(file, "backgroundCheckReport")}
          error={errors.backgroundCheckReport}
          theme={theme}
        />

        <DocumentUpload
          label="Compliance Declaration"
          accept=".pdf"
          onChange={(file) => onDocumentUpload(file, "complianceDeclaration")}
          error={errors.complianceDeclaration}
          theme={theme}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium ${theme.text}`}>
          Additional Notes
        </label>
        <textarea
          name="complianceNotes"
          value={formData.complianceNotes || ""}
          onChange={handleChange}
          rows={4}
          className={`mt-1 block w-full rounded-md ${theme.input}`}
          placeholder="Any additional compliance-related notes..."
        />
      </div>
    </div>
  );
};

export default LenderStaffComplianceForm;
