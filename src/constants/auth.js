import { USER_ROLES, LENDER_SUB_ROLES } from "./roles";

export const AUTH_STEPS = {
  INITIAL: "INITIAL",
  EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
  ROLE_SELECTION: "ROLE_SELECTION",
  TERMS_ACCEPTANCE: "TERMS_ACCEPTANCE",
  PROFILE_COMPLETION: {
    PERSONAL_IDENTIFICATION: {
      id: "PERSONAL_IDENTIFICATION",
      title: "Personal Identification",
      required: true,
      order: 1,
    },
    LENDER: {
      COMPANY_DETAILS: {
        id: "LENDER_COMPANY_DETAILS",
        title: "Company Details",
        required: true,
        order: 2,
      },
      DIRECTOR_DETAILS: {
        id: "LENDER_DIRECTOR_DETAILS",
        title: "Director Details",
        required: true,
        order: 3,
      },
      BANKING_DETAILS: {
        id: "LENDER_BANKING_DETAILS",
        title: "Banking Details",
        required: true,
        order: 4,
      },
    },
    BORROWER: {
      ADDRESS: {
        id: "BORROWER_ADDRESS",
        title: "Address Information",
        required: true,
        order: 2,
      },
      EMPLOYMENT: {
        id: "BORROWER_EMPLOYMENT",
        title: "Employment Information",
        required: true,
        order: 3,
      },
    },
    LENDER_STAFF: {
      DETAILS: {
        id: "LENDER_STAFF_DETAILS",
        title: "Staff Details",
        required: true,
        order: 2,
      },
      COMPLIANCE: {
        id: "LENDER_STAFF_COMPLIANCE",
        title: "Compliance Information",
        required: true,
        order: 3,
      },
    },
  },
};

export const AUTH_PROVIDERS = {
  EMAIL: "EMAIL",
  GOOGLE: "GOOGLE",
};

export const AUTH_ERRORS = {
  "auth/invalid-email": "Invalid email address. Please try again.",
  "auth/email-already-in-use": "This email address is already in use.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/weak-password": "Password is too weak. Use a stronger password.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/unauthorized-domain": "This domain is not authorized.",
  "email/not-verified": "Please verify your email address first!",
  "auth/too-many-requests": "Too many failed attempts. Try again later.",
  default: "Authentication failed. Please try again.",
};

export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email",
  PROFILE_SETUP: "/profile-setup",
  REGISTRATION_FLOW: "/registration/registration-flow",
};
