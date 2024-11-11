import React from "react";
import { motion } from "framer-motion";
import { APP_CONSTANTS } from "../../constants/constants";
import { Link } from "react-router-dom";
import Input from "../common/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import GoogleSignInButton from "../common/GoogleSignInButton";

const LoginForm = ({
  formData = { email: "", password: "" },
  setFormData,
  onSubmit,
  onGoogleSignIn,
  theme,
  errors = {},
  loading,
}) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2
          className={`text-center text-3xl font-bold tracking-tight ${theme.headingText}`}
        >
          Welcome to {APP_CONSTANTS.APP_NAME}
        </h2>
        <p className={`mt-2 text-center text-sm ${theme.mutedText}`}>
          Or{" "}
          <Link
            to="/register"
            className={`font-medium  ${theme.primaryButtonHover}`}
          >
            create a new account
          </Link>
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <Input
          name="email"
          type="email"
          label="Email Address"
          icon={<FaEnvelope className={`h-4 w-4 ${theme.icon}`} />}
          value={formData.email || ""}
          onChange={handleInputChange}
          placeholder="john.doe@example.com"
          required
          theme={theme}
          error={errors.email}
        />

        <Input
          name="password"
          label="Password"
          icon={<FaLock className={`h-4 w-4 ${theme.icon}`} />}
          value={formData.password || ""}
          onChange={handleInputChange}
          placeholder="••••••••"
          required
          showToggle
          theme={theme}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              to="/forgot-password"
              className={`font-medium  ${theme.primaryButtonHover}`}
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${theme.primaryButton} ${theme.primaryButtonHover}`}
          >
            Sign in
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${theme.divider}`} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${theme.cardBackground} ${theme.mutedText}`}
              >
                Or continue with
              </span>
            </div>
          </div>

          <GoogleSignInButton
            onClick={onGoogleSignIn}
            loading={loading}
            theme={theme}
          />
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
