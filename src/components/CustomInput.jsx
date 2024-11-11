import { useState } from "react";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";

function Input({
  label,
  type,
  placeholder,
  isPassword = false,
  value,
  onChange,
  showEyeIcon = false,
  validation,
  min,
  max,
  onBlur,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const inputPadding = isPassword ? "pr-10" : "";

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const validateInput = (value) => {
    if (validation) {
      const message = validation(value);
      setValidationMessage(message);
      setIsValid(!message);
    }
  };

  return (
    <div className="relative flex flex-col space-y-1">
      <label
        className="block font-bold text-gray-700 mb-1 text-sm"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        placeholder={placeholder}
        min={min && min}
        max={max && max}
        className={`rounded border-2 pointer-events-auto border-purple-300 py-2 px-3 focus:outline-none text-sm ${inputPadding}`}
        type={inputType}
        id={label}
        name={label}
        value={value}
        onChange={(e) => {
          onChange(e);
          validateInput(e.target.value);
        }}
        onBlur={(e) => {
          onChange(e);
          validateInput(e.target.value);
        }}
        required
      />
      {showEyeIcon && isPassword && (
        <button
          type="button"
          className="absolute top-1/2 right-4 transform focus:outline-none"
          onClick={toggleShowPassword}
        >
          {showPassword ? (
            <FaEyeSlash className="text-purple-900" />
          ) : (
            <FaEye className="text-yellow-900" />
          )}
        </button>
      )}

      {validationMessage && (
        <div className="text-red-500 text-sm">{validationMessage}</div>
      )}
    </div>
  );
}

export default Input;
