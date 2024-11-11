import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { borrowerService } from "../../services/api";
import Swal from "sweetalert2";
import LoanCalculator from "../../components/borrower/LoanCalculator";
import LoanPurpose from "../../components/borrower/LoanPurpose";
import TermsAcceptance from "../../components/borrower/TermsAcceptance";
import EmploymentInfo from "../../components/borrower/EmploymentInfo";
import CollateralInfo from "../../components/borrower/CollateralInfo";

const LoanApplication = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    lenderId: "",
    loanTermsId: "",
    amount: "",
    type: "PERSONAL",
    purpose: "",
    collateral: {
      type: "",
      value: "",
      description: "",
    },
    employmentInfo: {
      employer: "",
      position: "",
      monthlyIncome: "",
      employmentLength: "",
    },
    termsAccepted: false,
  });

  const handleSubmit = async () => {
    try {
      const applicationData = {
        ...formData,
        amount: Number(formData.amount),
        collateral: {
          ...formData.collateral,
          value: Number(formData.collateral.value),
        },
        employmentInfo: {
          ...formData.employmentInfo,
          monthlyIncome: Number(formData.employmentInfo.monthlyIncome),
          employmentLength: Number(formData.employmentInfo.employmentLength),
        },
      };

      await borrowerService.applyForLoan(applicationData);
      Swal.fire(
        "Success",
        "Your loan application has been submitted successfully!",
        "success"
      );
      navigate("/borrower/dashboard");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Loan Application</h1>
      <div className="max-w-2xl mx-auto">
        {step === 1 && (
          <LoanCalculator
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <LoanPurpose
            formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <EmploymentInfo
            formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <CollateralInfo
            formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(3)}
            onNext={() => setStep(5)}
          />
        )}
        {step === 5 && (
          <TermsAcceptance
            formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(4)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </motion.div>
  );
};

export default LoanApplication;
