// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
  TIMEOUT: 30000,
  VERSION: "v1",
};

// Application Constants
export const APP_CONSTANTS = {
  APP_NAME: "Nayy Lender",
  COMPANY_NAME: "Nayy Lender",
  MAX_RESULTS: 10,
  SUPPORTED_FILE_TYPES: {
    DOCUMENTS: ["application/pdf"],
    IMAGES: ["image/jpeg", "image/png"],
    ALL: ["application/pdf", "image/jpeg", "image/png"],
  },
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
};

// User Roles and Permissions
export const USER_ROLES = {
  LENDER: "LENDER",
  BORROWER: "BORROWER",
  LENDER_STAFF: "LENDER_STAFF",
};

export const LENDER_SUB_ROLES = {
  ADMIN: "ADMIN",
  ACCOUNTANT: "ACCOUNTANT",
  REVIEWER: "REVIEWER",
  APPROVER: "APPROVER",
  REPORTS: "REPORTS",
};

// Registration Steps Configuration
export const REGISTRATION_STEPS = {
  INITIAL_PROFILE: {
    id: "INITIAL_PROFILE",
    order: 1,
    requiredFor: ["LENDER", "BORROWER"],
    validations: {
      firstName: { type: "text", required: true },
      lastName: { type: "text", required: true },
      dateOfBirth: { type: "date", required: true },
      phoneNumber: { type: "phone", required: true },
    },
  },
  DOCUMENTS: {
    id: "DOCUMENTS",
    order: 2,
    requiredFor: ["LENDER", "BORROWER"],
    validations: {
      identificationDocument: { type: "file", required: true },
      proofOfAddress: { type: "file", required: true },
    },
  },
  VERIFICATION: {
    id: "VERIFICATION",
    order: 3,
    requiredFor: ["LENDER"],
    validations: {
      businessLicense: { type: "file", required: true },
      taxRegistration: { type: "file", required: true },
    },
  },
};

// Loan Types and Status
export const LOAN_TYPES = {
  COLLATERAL_BASED: "COLLATERAL_BASED",
  EMPLOYMENT_BASED: "EMPLOYMENT_BASED",
};

export const LOAN_STATUS = {
  DRAFT: "DRAFT",
  PENDING: "PENDING",
  UNDER_REVIEW: "UNDER_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  DEFAULTED: "DEFAULTED",
};

// Task Management
export const TASK_TYPES = {
  DOCUMENT_VERIFICATION: "DOCUMENT_VERIFICATION",
  CREDIT_ASSESSMENT: "CREDIT_ASSESSMENT",
  COLLATERAL_VALUATION: "COLLATERAL_VALUATION",
  EMPLOYMENT_VERIFICATION: "EMPLOYMENT_VERIFICATION",
  FINAL_APPROVAL: "FINAL_APPROVAL",
};

export const TASK_STATUS = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  REJECTED: "REJECTED",
};

// Error Messages
export const ERROR_MESSAGES = {
  "auth/invalid-email": "Invalid email address. Please try again.",
  "auth/email-already-in-use":
    "This email address is already in use. Please try another one.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/weak-password": "Password is too weak. Please use a stronger password.",
  "auth/network-request-failed":
    "Network error. Please check your internet connection.",
  "auth/unauthorized-domain": "This domain is not authorized.",
  "email/not-verified": "Please verify your email address first!",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",
  "profile/incomplete": "Please complete your profile to continue.",
  "upload/file-too-large": "File size exceeds the maximum limit.",
  "upload/invalid-file-type": "Invalid file type.",
  default: "An error occurred. Please try again later.",
};

// Validation Rules
export const VALIDATION_RULES = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
  },
  phoneNumber: {
    pattern: /^\+?[1-9]\d{1,14}$/,
    message: "Please enter a valid phone number",
  },
  idNumber: {
    nrc: /^[0-9]{6}\/[0-9]{2}\/[1-9]$/,
    passport: /^[A-Z]{2}[0-9]{7}$/,
  },
};

// Route Paths
export const ROUTES = {
  PUBLIC: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
  },
  LENDER: {
    DASHBOARD: "/lender/dashboard",
    PROFILE: "/lender/profile",
    LOAN_APPROVAL: "/lender/loan-approval",
    REPORTS: "/lender/reports",
    RISK_ASSESSMENT: "/lender/risk-assessment",
    TEAM_ACTIVITY: "/lender/team-activity",
    LOAN_TERMS: "/lender/loan-terms",
  },
  BORROWER: {
    DASHBOARD: "/borrower/dashboard",
    PROFILE: "/borrower/profile",
    LOAN_APPLICATION: "/borrower/loan-application",
    DOCUMENTS: "/borrower/documents",
  },
  COMMON: {
    UNAUTHORIZED: "/unauthorized",
    NOT_FOUND: "/404",
  },
};

// WebSocket Events
export const WS_EVENTS = {
  LOAN_STATUS_UPDATE: "LOAN_STATUS_UPDATE",
  DASHBOARD_UPDATE: "DASHBOARD_UPDATE",
  NOTIFICATION: "NOTIFICATION",
  TASK_ASSIGNED: "TASK_ASSIGNED",
};

export const REGISTRATION_FLOW = {
  INITIAL: "EMAIL_VERIFICATION",
  ROLE_SELECTION: "ROLE_SELECTION",
  PROFILE_COMPLETION: "PROFILE_COMPLETION",
  VERIFICATION: "VERIFICATION",
  COMPLETE: "COMPLETE",
};
