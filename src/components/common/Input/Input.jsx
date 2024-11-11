import React from "react";
import { motion } from "framer-motion";
import InputWrapper from "./InputWrapper";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import FileInput from "./FileInput";

const Input = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  placeholder,
  icon,
  error,
  theme,
  required = false,
  validation = {},
  showToggle = false,
  options = [],
  accept,
  disabled = false,
  className = "",
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <SelectInput
            name={name}
            value={value}
            onChange={onChange}
            options={options}
            theme={theme}
            disabled={disabled}
            placeholder={placeholder}
          />
        );
      case "date":
        return (
          <DateInput
            name={name}
            value={value}
            onChange={onChange}
            theme={theme}
            disabled={disabled}
          />
        );
      case "file":
        return (
          <FileInput
            name={name}
            onChange={onChange}
            accept={accept}
            theme={theme}
            disabled={disabled}
          />
        );
      default:
        return (
          <TextInput
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            theme={theme}
            showToggle={showToggle}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <InputWrapper
      name={name}
      label={label}
      icon={icon}
      error={error}
      theme={theme}
      required={required}
      className={className}
    >
      {renderInput()}
    </InputWrapper>
  );
};

export default Input;
