import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RedirectCountdown = ({ seconds = 10, redirectTo = "/login", theme }) => {
  const [countdown, setCountdown] = useState(seconds);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate(redirectTo, { replace: true });
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate, redirectTo]);

  const progress = (countdown / seconds) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 text-center"
    >
      <div className={`${theme.mutedText} text-sm mb-3`}>
        Redirecting to login page in{" "}
        <span className={`${theme.headingText} font-bold`}>{countdown}</span>{" "}
        seconds
      </div>
      <div className="relative w-full h-1.5">
        <div
          className={`absolute w-full h-full rounded-full ${theme.progressTrack}`}
        />
        <motion.div
          className={`absolute h-full rounded-full ${theme.progressBar}`}
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

export default RedirectCountdown;
