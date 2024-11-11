import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../providers/AuthProvider";
import { analyticsService, loanService } from "../../services/api";
import NextPayment from "../../components/borrower/NextPayment";
import LoanSummary from "../../components/borrower/LoanSummary";
import PaymentSchedule from "../../components/borrower/PaymentSchedule";
import DocumentStatus from "../../components/borrower/DocumentStatus";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  const { userInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await analyticsService.getBorrowerDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Welcome, {userInfo?.firstName}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LoanSummary data={dashboardData.loanSummary} />
        <NextPayment data={dashboardData.nextPayment} />
      </div>
      <PaymentSchedule payments={dashboardData.paymentSchedule} />
      <DocumentStatus documents={dashboardData.documents} />
    </motion.div>
  );
};

export default Dashboard;
