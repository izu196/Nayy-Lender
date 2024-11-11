export const USER_ROLES = {
  LENDER: "LENDER",
  BORROWER: "BORROWER",
  LENDER_STAFF: "LENDER_STAFF",
};

export const LENDER_SUB_ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  LOAN_OFFICER: "LOAN_OFFICER",
  COMPLIANCE_OFFICER: "COMPLIANCE_OFFICER",
};

export const ID_TYPES = {
  NRC: "NRC",
  PASSPORT: "PASSPORT",
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.LENDER]: ["manage_loans", "view_reports"],
  [USER_ROLES.BORROWER]: ["apply_loans", "view_profile"],
  [LENDER_SUB_ROLES.ADMIN]: ["manage_staff", "approve_loans"],
  [LENDER_SUB_ROLES.REVIEWER]: ["review_applications"],
  [LENDER_SUB_ROLES.APPROVER]: ["approve_loans"],
};

export const REGISTRATION_STEPS = {
  PERSONAL_INFO: "PERSONAL_INFO",
  CONTACT_INFO: "CONTACT_INFO",
  DOCUMENTS: "DOCUMENTS",
  VERIFICATION: "VERIFICATION",
};
