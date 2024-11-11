import React from "react";
import Input from "../../common/Input";
import DocumentUpload from "../../common/DocumentUpload";

const LenderBankingDetailsForm = ({
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
        name="bankName"
        label="Bank Name"
        value={formData.bankName || ""}
        onChange={handleChange}
        error={errors.bankName}
        theme={theme}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="accountNumber"
          label="Account Number"
          value={formData.accountNumber || ""}
          onChange={handleChange}
          error={errors.accountNumber}
          theme={theme}
          required
        />

        <Input
          name="branchName"
          label="Branch Name"
          value={formData.branchName || ""}
          onChange={handleChange}
          error={errors.branchName}
          theme={theme}
          required
        />
      </div>

      <Input
        name="swiftCode"
        label="SWIFT Code"
        value={formData.swiftCode || ""}
        onChange={handleChange}
        error={errors.swiftCode}
        theme={theme}
        required
      />

      <DocumentUpload
        label="Bank Confirmation Letter"
        accept=".pdf"
        onChange={(file) => onDocumentUpload(file, "bankConfirmationLetter")}
        error={errors.bankConfirmationLetter}
        theme={theme}
      />
    </div>
  );
};

export default LenderBankingDetailsForm;
