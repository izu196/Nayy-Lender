import React, { useState } from "react";
import { motion } from "framer-motion";
import RiskMatrix from "../../components/lender/RiskMatrix";
import RiskFactors from "../../components/lender/RiskFactors";
import RiskSettings from "../../components/lender/RiskSettings";

const RiskAssessment = () => {
  const [settings, setSettings] = useState({
    creditScoreWeight: 30,
    incomeWeight: 25,
    debtRatioWeight: 25,
    historyWeight: 20,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Risk Assessment Configuration</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <RiskMatrix settings={settings} />
          <RiskFactors settings={settings} />
        </div>
        <RiskSettings settings={settings} setSettings={setSettings} />
      </div>
    </motion.div>
  );
};

export default RiskAssessment;
