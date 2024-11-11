import React, { useState, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { lenderService, profileService } from "../../services/api";
import { motion } from "framer-motion";
import Loader from "../../components/Loader/Loader";
import CompanyDetails from "../../components/lender/profile/CompanyDetails";
import ContactInfo from "../../components/lender/profile/ContactInfo";
import BusinessRegistration from "../../components/lender/profile/BusinessRegistration";
import BankingDetails from "../../components/lender/profile/BankingDetails";
import OperatingInfo from "../../components/lender/profile/OperatingInfo";
import Swal from "sweetalert2";

const STEPS = {
  COMPANY: "COMPANY",
  CONTACT: "CONTACT",
  REGISTRATION: "REGISTRATION",
  BANKING: "BANKING",
  OPERATING: "OPERATING",
};

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.COMPANY);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const { data } = await lenderService.getLenderProfile();
      setProfileData(data);
    } catch (error) {
      Swal.fire("Error", "Failed to load profile data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (sectionData) => {
    try {
      setLoading(true);
      const { data } = await lenderService.updateLenderProfile({
        ...profileData,
        ...sectionData,
      });
      setProfileData(data);
      return true;
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const steps = Object.values(STEPS);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps = Object.values(STEPS);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  if (loading) return <Loader />;

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.COMPANY:
        return (
          <CompanyDetails
            data={profileData?.companyDetails}
            onUpdate={handleUpdateProfile}
            onNext={handleNext}
          />
        );
      case STEPS.CONTACT:
        return (
          <ContactInfo
            data={profileData?.contactInfo}
            onUpdate={handleUpdateProfile}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case STEPS.REGISTRATION:
        return (
          <BusinessRegistration
            data={profileData?.businessRegistration}
            onUpdate={handleUpdateProfile}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case STEPS.BANKING:
        return (
          <BankingDetails
            data={profileData?.bankingDetails}
            onUpdate={handleUpdateProfile}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case STEPS.OPERATING:
        return (
          <OperatingInfo
            data={profileData?.operatingInfo}
            onUpdate={handleUpdateProfile}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-8"
    >
      {renderStep()}
    </motion.div>
  );
};

export default Profile;
