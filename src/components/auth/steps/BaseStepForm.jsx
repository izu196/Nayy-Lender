import React from "react";
import Input from "../../common/Input";
import DocumentUpload from "../../common/DocumentUpload";

const BaseStepForm = ({
  formData,
  setFormData,
  documents,
  onDocumentUpload,
  theme,
  errors = {},
  stepConfig,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      label: field.label || field.name.replace(/_/g, " "),
      value: formData[field.name] || "",
      onChange: handleChange,
      error: errors[field.name],
      theme,
      required: field.required,
    };

    switch (field.type) {
      case "select":
        return (
          <div key={field.name}>
            <label className={`block text-sm font-medium ${theme.text}`}>
              {commonProps.label}
            </label>
            <select
              {...commonProps}
              className={`mt-1 block w-full rounded-md ${theme.input}`}
            >
              <option value="">Select {commonProps.label}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label || opt.value.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field.name}>
            <label className={`block text-sm font-medium ${theme.text}`}>
              {commonProps.label}
            </label>
            <textarea
              {...commonProps}
              rows={field.rows || 4}
              className={`mt-1 block w-full rounded-md ${theme.input}`}
            />
          </div>
        );

      default:
        return <Input key={field.name} {...commonProps} type={field.type} />;
    }
  };

  return (
    <div className="space-y-6">
      {stepConfig?.fields?.map((field) => renderField(field))}

      {stepConfig?.documents?.map((doc) => (
        <DocumentUpload
          key={doc.type}
          label={doc.label || doc.type.replace(/_/g, " ")}
          accept={doc.accept || ".pdf,image/*"}
          onChange={(file) => onDocumentUpload(file, doc.type)}
          error={errors[doc.type]}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default BaseStepForm;
