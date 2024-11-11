import React from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = ({ isDark, onToggle, theme }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`
        fixed bottom-6 right-6 p-3 rounded-full
        ${theme.cardBackground} shadow-lg
        hover:shadow-xl transition-shadow
        focus:outline-none
      `}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <FaSun className={`h-6 w-6 ${theme.icon}`} />
        ) : (
          <FaMoon className={`h-6 w-6 ${theme.icon}`} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
