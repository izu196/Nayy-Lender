import React, { useState } from "react";
import { motion } from "framer-motion";
import ReportExport from "../../components/lender/ReportExport";
import ReportFilters from "../../components/lender/ReportFilters";
import ReportChart from "../../components/lender/ReportChart";
import ReportTable from "../../components/lender/ReportTable";

const Reports = () => {
  const [filters, setFilters] = useState({
    dateRange: "month",
    type: "all",
    status: "all",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <ReportExport filters={filters} />
      </div>
      <ReportFilters filters={filters} setFilters={setFilters} />
      <ReportChart filters={filters} />
      <ReportTable filters={filters} />
    </motion.div>
  );
};

export default Reports;
