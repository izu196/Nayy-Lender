import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const TermsAcceptance = ({ onAccept, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`max-w-md w-full ${theme.cardBackground} rounded-lg shadow-xl p-8`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${theme.headingText}`}>
        Terms & Conditions
      </h2>

      <div className="space-y-4">
        <div className={`prose prose-sm ${theme.text}`}>
          <h3>Please read and accept our terms</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Data Processing Agreement</li>
            <li>Acceptable Use Policy</li>
          </ul>
        </div>

        <div className="mt-6">
          <button
            onClick={onAccept}
            className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${theme.primaryButton} ${theme.primaryButtonHover}`}
          >
            <FaCheckCircle className="mr-2" />I Accept the Terms & Conditions
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsAcceptance;
