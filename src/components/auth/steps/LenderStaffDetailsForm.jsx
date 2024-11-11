import React from "react";
import BaseStepForm from "./BaseStepForm";
import { LENDER_SUB_ROLES } from "../../../constants/roles";

const LenderStaffDetailsForm = (props) => {
  const stepConfig = {
    fields: [
      {
        name: "staffRole",
        type: "select",
        label: "Staff Role",
        options: Object.values(LENDER_SUB_ROLES).map((role) => ({
          value: role,
          label: role.replace(/_/g, " "),
        })),
        required: true,
      },
      {
        name: "employeeId",
        type: "text",
        label: "Employee ID",
        required: true,
      },
      {
        name: "department",
        type: "text",
        label: "Department",
        required: true,
      },
    ],
    documents: [
      {
        type: "employmentContract",
        label: "Employment Contract",
        accept: ".pdf",
        required: true,
      },
    ],
  };

  return <BaseStepForm {...props} stepConfig={stepConfig} />;
};

export default LenderStaffDetailsForm;
