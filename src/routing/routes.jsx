import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./route-type";
import { AUTH_ROUTES } from "../constants/auth";
import { USER_ROLES } from "../constants/roles";
import ErrorPage from "../components/ErrorPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import Login from "../pages/auth/Login";

// Lender Pages
import LenderDashboard from "../pages/lender/Dashboard";
import LenderProfile from "../pages/lender/Profile";
import LoanApproval from "../pages/lender/LoanApproval";
import Reports from "../pages/lender/Reports";
import RiskAssessment from "../pages/lender/RiskAssessment";
import TeamActivity from "../pages/lender/TeamActivity";
import LoanTerms from "../pages/lender/LoanTerms";

// Borrower Pages
import BorrowerDashboard from "../pages/borrower/Dashboard";
import BorrowerProfile from "../pages/borrower/Profile";
import LoanApplication from "../pages/borrower/LoanApplication";
import Documents from "../pages/borrower/Documents";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import RegistrationFlow from "../pages/auth/RegistrationFlow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: AUTH_ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: AUTH_ROUTES.REGISTER,
        element: <Register />,
      },
      {
        path: AUTH_ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: AUTH_ROUTES.VERIFY_EMAIL,
        element: <VerifyEmail />,
      },
      {
        path: "registration-flow",
        element: <RegistrationFlow />,
      },
    ],
  },
  {
    path: "/lender",
    element: <PrivateRoute allowedRoles={[USER_ROLES.LENDER]} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LenderDashboard />,
      },
      {
        path: "profile",
        element: <LenderProfile />,
      },
      {
        path: "loan-approval",
        element: <LoanApproval />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "risk-assessment",
        element: <RiskAssessment />,
      },
      {
        path: "team-activity",
        element: <TeamActivity />,
      },
      {
        path: "loan-terms",
        element: <LoanTerms />,
      },
    ],
  },
  {
    path: "/borrower",
    element: <PrivateRoute allowedRoles={[USER_ROLES.BORROWER]} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <BorrowerDashboard />,
      },
      {
        path: "profile",
        element: <BorrowerProfile />,
      },
      {
        path: "loan-application",
        element: <LoanApplication />,
      },
      {
        path: "documents",
        element: <Documents />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
