import React from "react";
import BaseStepForm from "./BaseStepForm";

const LenderCompanyDetailsForm = (props) => {
  const stepConfig = {
    fields: [
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
      },
      {
        name: "registrationNumber",
        label: "Registration Number",
        type: "text",
        required: true,
        gridCols: 2,
      },
      {
        name: "taxNumber",
        label: "Tax Number",
        type: "text",
        required: true,
        gridCols: 2,
      },
      {
        name: "businessType",
        type: "select",
        options: ["PRIVATE_LIMITED", "PUBLIC_LIMITED", "PARTNERSHIP", "OTHER"],
        required: true,
      },
      {
        name: "registeredAddress",
        type: "textarea",
        required: true,
      },
      {
        name: "operatingAddress",
        type: "textarea",
        required: true,
      },
    ],
    documents: [
      {
        type: "certificateOfIncorporation",
        label: "Certificate of Incorporation",
        accept: ".pdf",
        required: true,
      },
      {
        type: "taxRegistration",
        label: "Tax Registration",
        accept: ".pdf",
        required: true,
      },
      {
        type: "operatingLicense",
        label: "Operating License",
        accept: ".pdf",
        required: true,
      },
    ],
  };

  return <BaseStepForm {...props} stepConfig={stepConfig} />;
};

export default LenderCompanyDetailsForm;
