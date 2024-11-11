import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { useTheme } from "../../providers/ThemeProvider";
import DarkModeToggle from "../../components/common/DarkModeToggle";
import RedirectCountdown from "../../components/auth/RedirectCountdown";

const VerifyEmail = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme.background} ${theme.text}`}
    >
      <div
        className={`max-w-md w-full ${theme.cardBackground} rounded-lg shadow-xl p-8`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center mb-6"
        >
          <div className={`p-4 rounded-full ${theme.iconBackground}`}>
            <FaEnvelope className={`h-10 w-10 ${theme.icon}`} />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2
            className={`text-2xl font-bold mb-4 text-center ${theme.headingText}`}
          >
            Check Your Email
          </h2>
          <p className={`${theme.mutedText} text-center mb-6`}>
            We've sent a verification link to your email address. Please check
            your inbox and click the link to verify your account.
          </p>
          <div
            className={`${theme.mutedText} text-center text-sm p-4 rounded-lg ${theme.warningBackground}`}
          >
            <strong>Tip:</strong> Don't see the email? Check your spam folder or
            contact support.
          </div>
        </motion.div>

        <RedirectCountdown seconds={30} theme={theme} />
      </div>

      <DarkModeToggle isDark={isDark} onToggle={toggleTheme} theme={theme} />
    </motion.div>
  );
};

export default VerifyEmail;
