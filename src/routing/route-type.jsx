import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import { getRedirectPath, checkUserAccess } from "../utils/authRedirects";

export const PrivateRoute = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (!isLoading && user) {
      const pathInfo = getRedirectPath(user);
      if (typeof pathInfo === "string" || (pathInfo && pathInfo.path)) {
        setRedirectPath(pathInfo);
      }
    }
  }, [isLoading, user]);

  if (isLoading) return <Loader />;

  if (redirectPath) {
    return (
      <Navigate
        to={typeof redirectPath === "string" ? redirectPath : redirectPath.path}
        state={redirectPath.state}
        replace
      />
    );
  }

  const hasRequiredRole = checkUserAccess(user, allowedRoles);
  if (!hasRequiredRole) return <Navigate to="/unauthorized" replace />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export const PublicRoute = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      // If the user is authenticated, determine the proper redirect path.
      if (user?.isAuthenticated) {
        const pathInfo = getRedirectPath(user);
        setRedirectPath(pathInfo);
      }
    }
  }, [isLoading, user]);

  // Show loader while loading or redirect decision is being made
  if (isLoading) return <Loader />;

  // If the user is authenticated, redirect them based on their profile completion status or role
  if (redirectPath) {
    return (
      <Navigate
        to={typeof redirectPath === "string" ? redirectPath : redirectPath.path}
        state={redirectPath.state}
        replace
      />
    );
  }

  // If not authenticated, render public routes as intended
  return <Outlet />;
};
