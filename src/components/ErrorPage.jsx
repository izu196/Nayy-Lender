import React from "react";
import { useRouteError, Link } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaRegFrown,
  FaHome,
  FaRedo,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../providers/ThemeProvider";
import logo from "../assets/logo.png";
import DarkModeToggle from "./common/DarkModeToggle";

export default function ErrorPage() {
  const error = useRouteError();
  const errorStatus = error?.status || 500;
  const errorMessage = error?.message || "An unexpected error occurred";
  const { theme, isDark, toggleTheme } = useTheme();

  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={`min-h-screen ${theme.background} flex items-center justify-center p-4`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={`w-full max-w-lg ${theme.cardBackground} rounded-2xl p-8 shadow-2xl ${theme.text}`}
      >
        <motion.div variants={item} className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </motion.div>

        <motion.div variants={item} className="text-center space-y-6">
          {errorStatus === 404 ? (
            <>
              <FaRegFrown className={`mx-auto text-7xl ${theme.icon}`} />
              <h1 className={`text-4xl font-bold ${theme.headingText}`}>
                Page Not Found
              </h1>
              <p className={`text-xl ${theme.mutedText}`}>
                The page you're looking for doesn't exist or has been moved.
              </p>
            </>
          ) : (
            <>
              <FaExclamationTriangle
                className={`mx-auto text-7xl ${theme.icon}`}
              />
              <h1 className={`text-4xl font-bold ${theme.headingText}`}>
                Oops! Something went wrong
              </h1>
              <p className={`text-xl ${theme.mutedText}`}>{errorMessage}</p>
            </>
          )}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className={`inline-flex items-center justify-center px-6 py-3 ${theme.primaryButton} ${theme.primaryButtonHover} rounded-lg font-medium transition-all duration-200`}
          >
            <FaHome className="mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className={`inline-flex items-center justify-center px-6 py-3 ${theme.secondaryButton} ${theme.secondaryButtonHover} rounded-lg font-medium transition-all duration-200`}
          >
            <FaRedo className="mr-2" />
            Try Again
          </button>
        </motion.div>
      </motion.div>

      <div className="fixed bottom-4 right-4">
        <DarkModeToggle isDark={isDark} onToggle={toggleTheme} theme={theme} />
      </div>
    </div>
  );
}
