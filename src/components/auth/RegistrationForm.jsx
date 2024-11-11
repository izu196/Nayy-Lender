import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import Input from "../common/Input";

const RegistrationForm = ({
  formData,
  setFormData,
  loading,
  theme,
  errors = {},
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          name="firstName"
          label="First Name"
          icon={<FaUser className={`h-4 w-4 ${theme.icon}`} />}
          value={formData.firstName || ""}
          onChange={handleChange}
          placeholder="John"
          required
          theme={theme}
          error={errors.firstName}
        />

        <Input
          name="lastName"
          label="Last Name"
          icon={<FaUser className={`h-4 w-4 ${theme.icon}`} />}
          value={formData.lastName || ""}
          onChange={handleChange}
          placeholder="Doe"
          required
          theme={theme}
          error={errors.lastName}
        />
      </div>

      <Input
        name="email"
        type="email"
        label="Email Address"
        icon={<FaEnvelope className={`h-4 w-4 ${theme.icon}`} />}
        value={formData.email || ""}
        onChange={handleChange}
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
        onChange={handleChange}
        placeholder="••••••••"
        required
        showToggle
        theme={theme}
        error={errors.password}
      />

      <Input
        name="confirmPassword"
        label="Confirm Password"
        icon={<FaLock className={`h-4 w-4 ${theme.icon}`} />}
        value={formData.confirmPassword || ""}
        onChange={handleChange}
        placeholder="••••••••"
        required
        showToggle
        theme={theme}
        error={errors.confirmPassword}
      />
    </motion.div>
  );
};

export default RegistrationForm;
