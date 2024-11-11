import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { loanApprovalService } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import LoanDetails from "../../components/lender/LoanDetails";
import BorrowerProfile from "../../components/lender/BorrowerProfile";
import RiskAnalysis from "../../components/lender/RiskAnalysis";
import ApprovalForm from "../../components/lender/ApprovalForm";

const LoanApproval = () => {
  const { loanId } = useParams();
  const [loading, setLoading] = useState(true);
  const [loanData, setLoanData] = useState(null);

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const { data } = await loanApprovalService.getLoanDetails(loanId);
        setLoanData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanData();
  }, [loanId]);

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Loan Application Review</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <LoanDetails data={loanData} />
          <BorrowerProfile data={loanData.borrower} />
        </div>
        <div className="space-y-6">
          <RiskAnalysis data={loanData.riskAnalysis} />
          <ApprovalForm loanId={loanId} />
        </div>
      </div>
    </motion.div>
  );
};

export default LoanApproval;
