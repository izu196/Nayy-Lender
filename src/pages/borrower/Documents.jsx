import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { documentService } from "../../services/api";
import DocumentRequirements from "../../components/borrower/DocumentRequirements";
import DocumentUploader from "../../components/borrower/DocumentUploader";
import DocumentList from "../../components/borrower/DocumentList";
import Loader from "../../components/Loader/Loader";

const Documents = () => {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data } = await documentService.getBorrowerDocuments();
        setDocuments(data.documents);
        setRequirements(data.requirements);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleUpload = async (files, type) => {
    try {
      const { data } = await documentService.uploadDocuments(files, type);
      setDocuments((prev) => [...prev, ...data.documents]);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Document Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <DocumentRequirements requirements={requirements} />
          <DocumentUploader onUpload={handleUpload} />
        </div>
        <DocumentList documents={documents} />
      </div>
    </motion.div>
  );
};

export default Documents;
