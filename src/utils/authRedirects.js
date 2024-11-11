// utils/authRedirects.js
import { AUTH_ROUTES, AUTH_STEPS } from "../constants/auth";
import { USER_ROLES } from "../constants/roles";

export const getRedirectPath = (user) => {
  if (!user.isAuthenticated) return AUTH_ROUTES.LOGIN;
  if (!user.isVerified) {
    return {
      path: AUTH_ROUTES.VERIFY_EMAIL,
      state: { step: user?.nextStep || AUTH_STEPS.EMAIL_VERIFICATION },
    };
  }
  if (!user.profileComplete) {
    return {
      path: AUTH_ROUTES.REGISTRATION_FLOW,
      state: { step: user?.nextStep || AUTH_STEPS.ROLE_SELECTION },
    };
  }

  if (user.role === USER_ROLES.LENDER) return "/lender/dashboard";
  if (user.role === USER_ROLES.BORROWER) return "/borrower/dashboard";
  return "/unauthorized";
};

export const checkUserAccess = (user, allowedRoles) => {
  if (!user || !user.isAuthenticated) return false;
  return allowedRoles.includes(user.role);
};
