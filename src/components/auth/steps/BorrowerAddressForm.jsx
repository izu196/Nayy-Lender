import React from "react";
import BaseStepForm from "./BaseStepForm";

const BorrowerAddressForm = (props) => {
  const stepConfig = {
    fields: [
      {
        name: "residentialAddress",
        label: "Residential Address",
        type: "textarea",
        required: true,
      },
      {
        name: "residencyStatus",
        label: "Residency Status",
        type: "select",
        options: ["OWNED", "RENTED", "OTHER"],
        required: true,
      },
      {
        name: "yearsAtAddress",
        label: "Years at Address",
        type: "number",
        required: true,
      },
    ],
    documents: [
      {
        type: "proofOfResidence",
        label: "Proof of Residence",
        accept: ".pdf,image/*",
        required: true,
      },
    ],
  };

  return <BaseStepForm {...props} stepConfig={stepConfig} />;
};

export default BorrowerAddressForm;
