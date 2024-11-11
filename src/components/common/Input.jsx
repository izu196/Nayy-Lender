import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  name,
  type = "text",
  label,
  icon,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  theme,
  showToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputGroupClasses = `
    relative group
    ${theme.inputGroup}
    ${error ? "ring-2 ring-red-500" : ""}
  `;

  const inputClasses = `
    block w-full px-3 py-2.5
    ${icon ? "pl-10" : "pl-3"}
    ${theme.input} border-0
    text-sm transition-all duration-200
    focus:outline-none
    ${error ? "border-red-500" : ""}
  `;

  const actualType = showToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium ${theme.text} mb-1.5`}
        >
          {label}
          {required && <span className={theme.error}>*</span>}
        </label>
      )}

      <div className={inputGroupClasses}>
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={actualType}
          value={value}
          onChange={onChange}
          className={inputClasses}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />

        {showToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaEyeSlash
                className={`h-4 w-4 ${theme.icon} opacity-70 hover:opacity-100`}
              />
            ) : (
              <FaEye
                className={`h-4 w-4 ${theme.icon} opacity-70 hover:opacity-100`}
              />
            )}
          </button>
        )}
      </div>

      {error && (
        <p id={`${name}-error`} className={`text-sm ${theme.error} mt-1`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
