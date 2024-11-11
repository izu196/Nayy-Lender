import React, { useState } from "react";
import { motion } from "framer-motion";
import TermsEditor from "../../components/lender/TermsEditor";
import TermsPreview from "../../components/lender/TermsPreview";
import TermsHistory from "../../components/lender/TermsHistory";

const LoanTerms = () => {
  const [activeTerms, setActiveTerms] = useState({
    interestRate: 5.5,
    loanTerm: 12,
    minimumAmount: 5000,
    maximumAmount: 50000,
    processingFee: 2,
    prepaymentPenalty: 1,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Loan Terms Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TermsEditor terms={activeTerms} setTerms={setActiveTerms} />
        <div className="space-y-6">
          <TermsPreview terms={activeTerms} />
          <TermsHistory />
        </div>
      </div>
    </motion.div>
  );
};

export default LoanTerms;
