import React from "react";
import BaseStepForm from "./BaseStepForm";

const LenderDirectorDetailsForm = (props) => {
  const stepConfig = {
    fields: [
      {
        name: "directors",
        type: "array",
        label: "Directors",
        singularLabel: "Director",
        defaultItem: {
          name: "",
          position: "",
          idNumber: "",
        },
        fields: [
          {
            name: "name",
            label: "Full Name",
            type: "text",
            required: true,
          },
          {
            name: "position",
            label: "Position",
            type: "text",
            required: true,
          },
          {
            name: "idNumber",
            label: "ID Number",
            type: "text",
            required: true,
          },
        ],
      },
    ],
    documents: [
      {
        type: "directorIdentification",
        label: "Director Identification",
        accept: ".pdf,image/*",
        required: true,
      },
      {
        type: "shareholderDeclaration",
        label: "Shareholder Declaration",
        accept: ".pdf",
        required: true,
      },
    ],
  };

  return <BaseStepForm {...props} stepConfig={stepConfig} />;
};

export default LenderDirectorDetailsForm;
