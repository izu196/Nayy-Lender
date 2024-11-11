import { REGISTRATION_STEPS } from "../constants/constants";
import { VALIDATION_RULES } from "../constants/validation";
import { isValidPhoneNumber } from "libphonenumber-js";

export const validateField = (fieldName, value, rules = {}) => {
  const errors = [];

  if (rules.required && !value) {
    errors.push(`${fieldName} is required`);
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push(rules.message || `Invalid ${fieldName} format`);
  }

  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`${fieldName} must be at least ${rules.minLength} characters`);
  }

  return errors;
};

export const validateForm = (formData, stepConfig) => {
  const errors = {};

  stepConfig.requiredFields.forEach((field) => {
    const fieldErrors = validateField(
      field,
      formData[field],
      stepConfig.validations?.[field]
    );
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStepData = (step, data) => {
  const stepConfig = REGISTRATION_STEPS[step];
  const errors = {};

  // Validate required fields
  stepConfig.requiredFields?.forEach((field) => {
    if (!data[field]) {
      errors[field] = `${field} is required`;
    }
  });

  // Validate documents if required
  if (stepConfig.documents) {
    Object.entries(stepConfig.documents).forEach(([docType, config]) => {
      if (config.required && !data.documents?.[docType]) {
        errors[docType] = `${docType} document is required`;
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStep = (stepConfig, formData, documents) => {
  const errors = {};

  // Validate required fields
  stepConfig.requiredFields.forEach((field) => {
    if (!formData[field]) {
      errors[field] = `${field.replace(/([A-Z])/g, " $1").trim()} is required`;
    }
  });

  // Validate field types based on validation rules
  if (stepConfig.validations) {
    Object.entries(stepConfig.validations).forEach(([field, validation]) => {
      if (formData[field]) {
        switch (validation.type) {
          case "enum":
            if (!validation.values.includes(formData[field])) {
              errors[field] = `Invalid value for ${field}`;
            }
            break;
          case "date":
            if (isNaN(Date.parse(formData[field]))) {
              errors[field] = "Invalid date format";
            }
            break;
          case "phone":
            if (!isValidPhoneNumber(formData[field])) {
              errors[field] = "Invalid phone number";
            }
            break;
          case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData[field])) {
              errors[field] = "Invalid email format";
            }
            break;
          case "object":
            if (typeof formData[field] !== "object") {
              errors[field] = `${field} must be an object`;
            } else {
              Object.entries(validation.fields).forEach(
                ([subField, subType]) => {
                  if (!formData[field][subField]) {
                    errors[`${field}.${subField}`] = `${subField} is required`;
                  }
                }
              );
            }
            break;
        }
      }
    });
  }

  // Validate required documents
  if (stepConfig.documents) {
    Object.entries(stepConfig.documents).forEach(([docType, config]) => {
      if (config.required && !documents[docType]) {
        errors[docType] = `${docType
          .replace(/([A-Z])/g, " $1")
          .trim()} is required`;
      }
      if (documents[docType]) {
        if (!config.allowedTypes.includes(documents[docType].type)) {
          errors[
            docType
          ] = `Invalid file type. Allowed: ${config.allowedTypes.join(", ")}`;
        }
        if (config.count && documents[docType].length !== config.count) {
          errors[docType] = `Exactly ${config.count} files required`;
        }
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
