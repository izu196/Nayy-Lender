import React, { useState } from "react";
import { FaFileExport, FaFilePdf, FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportExport = ({ data }) => {
  const [showOptions, setShowOptions] = useState(false);

  const formatDataForExport = () => {
    return data.map((row) => ({
      "Application Date": new Date(row.applicationDate).toLocaleDateString(),
      "Loan ID": row.loanId,
      Borrower: row.borrowerName,
      Amount: `$${row.amount.toLocaleString()}`,
      Purpose: row.purpose,
      "Term (months)": row.term,
      Status: row.status,
    }));
  };

  const exportToExcel = () => {
    const formattedData = formatDataForExport();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Loan Report");
    XLSX.writeFile(workbook, "loan_report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const formattedData = formatDataForExport();

    doc.setFontSize(16);
    doc.text("Loan Report", 14, 15);
    doc.setFontSize(10);
    doc.text(new Date().toLocaleDateString(), 14, 22);

    doc.autoTable({
      head: [Object.keys(formattedData[0])],
      body: formattedData.map(Object.values),
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [63, 81, 181] },
    });

    doc.save("loan_report.pdf");
  };

  return (
    <div className="relative">
      <div className="flex space-x-2">
        <button
          onClick={exportToExcel}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <FaFileExcel className="mr-2" />
          Excel
        </button>
        <button
          onClick={exportToPDF}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <FaFilePdf className="mr-2" />
          PDF
        </button>
      </div>
    </div>
  );
};

export default ReportExport;
