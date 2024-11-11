import { AUTH_ROUTES, AUTH_STEPS } from "../constants/auth";
import { USER_ROLES } from "../constants/roles";
import { ROUTES } from "../constants/routes";

export const getDashboardRoute = (role) => {
  switch (role) {
    case USER_ROLES.LENDER:
      return ROUTES.LENDER.DASHBOARD;
    case USER_ROLES.BORROWER:
      return ROUTES.BORROWER.DASHBOARD;
    case USER_ROLES.LENDER_STAFF:
      return ROUTES.LENDER_STAFF.DASHBOARD;
    default:
      // If no role or unknown role, redirect to role selection
      return `${AUTH_ROUTES.REGISTER}?step=${AUTH_STEPS.ROLE_SELECTION}`;
  }
};
