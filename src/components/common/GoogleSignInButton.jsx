import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = ({ onClick, loading, theme }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={loading}
    className={`w-full flex items-center justify-center py-2 px-4 border ${theme.secondaryButton} rounded-md shadow-sm text-sm font-medium transition-colors duration-200`}
  >
    <FcGoogle className="h-5 w-5 mr-2" />
    {loading ? "Signing in..." : "Sign in with Google"}
  </button>
);

export default GoogleSignInButton;
