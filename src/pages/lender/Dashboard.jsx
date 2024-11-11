import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import { motion } from "framer-motion";
import LoanStats from "../../components/lender/LoanStats";
import ActiveLoans from "../../components/lender/ActiveLoans";
import RecentApplications from "../../components/lender/RecentApplications";

const Dashboard = () => {
  const { userInfo } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">
        Welcome back, {userInfo?.firstName}!
      </h1>
      <LoanStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActiveLoans />
        <RecentApplications />
      </div>
    </motion.div>
  );
};

export default Dashboard;
