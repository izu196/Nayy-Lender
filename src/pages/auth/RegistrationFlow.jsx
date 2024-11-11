import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import RegistrationSteps from "../../components/auth/RegistrationSteps";
import { AUTH_STEPS, AUTH_ROUTES } from "../../constants/auth";
import { getDashboardRoute } from "../../utils/navigation";
import Loader from "../../components/Loader/Loader";
import { useTheme } from "../../providers/ThemeProvider";
import Swal from "sweetalert2";

const RegistrationFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, completeProfileStep } = useAuth();
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate(AUTH_ROUTES.LOGIN, { replace: true });
        return;
      }

      if (!user.isVerified) {
        navigate(AUTH_ROUTES.VERIFY_EMAIL, { replace: true });
        return;
      }

      const initialStep =
        location.state?.step || user?.nextStep || AUTH_STEPS.ROLE_SELECTION;
      setCurrentStep(initialStep);
      setFormData(user?.formData || {});
    }
  }, [isLoading, isAuthenticated, user, location.state]);

  const handleStepComplete = async (nextStep, stepData) => {
    try {
      const {
        success,
        nextStep: serverNextStep,
        requiredFields,
        error,
      } = await completeProfileStep(currentStep, {
        ...formData,
        ...stepData,
      });

      if (success) {
        if (serverNextStep === "COMPLETE") {
          navigate(getDashboardRoute(user?.role), { replace: true });
        } else if (serverNextStep) {
          setFormData((prev) => ({
            ...prev,
            ...requiredFields.reduce(
              (acc, field) => ({ ...acc, [field]: "" }),
              {}
            ),
          }));
          setCurrentStep(serverNextStep);
        }
      } else {
        Swal.fire("Error", error, "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  if (isLoading || !currentStep) {
    return <Loader />;
  }

  return (
    <div className={`min-h-screen ${theme.background}`}>
      <RegistrationSteps
        currentStep={currentStep}
        formData={formData}
        onComplete={handleStepComplete}
        theme={theme}
      />
    </div>
  );
};

export default RegistrationFlow;
