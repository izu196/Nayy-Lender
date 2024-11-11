import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../providers/AuthProvider";
import { validateStep } from "../../utils/validation";
import { documentService } from "../../services/api";
import { FaExclamationCircle, FaSpinner, FaArrowLeft } from "react-icons/fa";
import TermsAcceptance from "./TermsAcceptance";
import PersonalIdentificationForm from "./steps/PersonalIdentificationForm";
import LenderCompanyDetailsForm from "./steps/LenderCompanyDetailsForm";
import LenderDirectorDetailsForm from "./steps/LenderDirectorDetailsForm";
import LenderBankingDetailsForm from "./steps/LenderBankingDetailsForm";
import BorrowerAddressForm from "./steps/BorrowerAddressForm";
import BorrowerEmploymentForm from "./steps/BorrowerEmploymentForm";
import LenderStaffDetailsForm from "./steps/LenderStaffDetailsForm";
import LenderStaffComplianceForm from "./steps/LenderStaffComplianceForm";
import RoleSelection from "./RoleSelection";
import { AUTH_STEPS } from "../../constants/auth";
import { USER_ROLES } from "../../constants/roles";

const RegistrationSteps = ({
  currentStep,
  formData: initialFormData,
  onComplete,
  theme,
}) => {
  const { user, completeProfileStep } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData || {});
  const [documents, setDocuments] = useState({});
  const [stepConfig, setStepConfig] = useState(null);

  useEffect(() => {
    setFormData(initialFormData || {});
  }, [initialFormData]);

  useEffect(() => {
    // Get step configuration based on current step and user role
    const getStepConfig = () => {
      if (currentStep === AUTH_STEPS.ROLE_SELECTION) {
        return { title: "Select Your Role" };
      }

      const roleSteps =
        user?.role === USER_ROLES.LENDER
          ? AUTH_STEPS.PROFILE_COMPLETION.LENDER
          : user?.role === USER_ROLES.BORROWER
          ? AUTH_STEPS.PROFILE_COMPLETION.BORROWER
          : null;

      if (!roleSteps) return null;

      // Find the matching step configuration
      return Object.values(roleSteps).find((step) => step.id === currentStep);
    };

    setStepConfig(getStepConfig());
  }, [currentStep, user?.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const stepData = {
        ...formData,
        documents,
      };
      let roleStepData = { ...formData };

      const { success, nextStep, requiredFields, validations, error } =
        await completeProfileStep(
          currentStep,
          currentStep === AUTH_STEPS.ROLE_SELECTION ? roleStepData : stepData
        );

      if (success) {
        if (nextStep) {
          onComplete(nextStep, requiredFields, validations);
        } else {
          onComplete("COMPLETE");
        }
      } else {
        setErrors({ form: error });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (file, docType) => {
    try {
      const uploadedDoc = await documentService.upload(file, docType);
      setDocuments((prev) => ({
        ...prev,
        [docType]: uploadedDoc.url,
      }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [docType]: error.message,
      }));
    }
  };

  const renderStepContent = () => {
    const commonProps = {
      formData,
      setFormData,
      documents,
      onDocumentUpload: handleDocumentUpload,
      theme,
      errors,
    };

    switch (currentStep) {
      case AUTH_STEPS.ROLE_SELECTION:
        return (
          <RoleSelection
            onSelect={(role) => setFormData({ role })}
            theme={theme}
            selectedRole={formData.role}
          />
        );
      case "TERMS_ACCEPTANCE":
        return (
          <TermsAcceptance
            {...commonProps}
            onAccept={() =>
              setFormData((prev) => ({ ...prev, termsAccepted: true }))
            }
          />
        );
      case "PERSONAL_IDENTIFICATION":
        return <PersonalIdentificationForm {...commonProps} />;
      case "LENDER_COMPANY_DETAILS":
        return <LenderCompanyDetailsForm {...commonProps} />;
      case "LENDER_DIRECTOR_DETAILS":
        return <LenderDirectorDetailsForm {...commonProps} />;
      case "LENDER_BANKING_DETAILS":
        return <LenderBankingDetailsForm {...commonProps} />;
      case "BORROWER_ADDRESS":
        return <BorrowerAddressForm {...commonProps} />;
      case "BORROWER_EMPLOYMENT":
        return <BorrowerEmploymentForm {...commonProps} />;
      case "LENDER_STAFF_DETAILS":
        return <LenderStaffDetailsForm {...commonProps} />;
      case "LENDER_STAFF_COMPLIANCE":
        return <LenderStaffComplianceForm {...commonProps} />;
      default:
        return null;
    }
  };

  if (!stepConfig) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`max-w-2xl mx-auto ${theme.cardBackground} rounded-lg shadow-xl p-8`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${theme.headingText}`}>
        {stepConfig.title || currentStep.replace(/_/g, " ")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStepContent()}

        {errors.form && (
          <div className="text-red-500 text-sm flex items-center">
            <FaExclamationCircle className="mr-2" />
            {errors.form}
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => onComplete("BACK")}
            className={`flex items-center px-4 py-2 ${theme.secondaryButton}`}
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 ${theme.primaryButton} flex items-center`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default RegistrationSteps;
