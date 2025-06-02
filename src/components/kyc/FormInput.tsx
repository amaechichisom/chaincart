import React, { useState, ChangeEvent, FocusEvent } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface FormikLike {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any>) => void;
  handleFocus?: (e: FocusEvent<any>) => void;
}

interface FormInputProps {
  label?: string;
  name: string;
  type?: string;
  formik: FormikLike;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  helpText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  autoComplete?: string;
  maxLength?: number;
  showCharCount?: boolean;
  validateOnChange?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  formik,
  placeholder,
  rows,
  disabled = false,
  required = false,
  helpText,
  leftIcon,
  rightIcon,
  autoComplete,
  maxLength,
  showCharCount = false,
  validateOnChange = true,
  className = '',
  labelClassName = '',
  inputClassName = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const hasError = formik.touched[name] && formik.errors[name];
  const hasValue = formik.values[name];
  const isValid = formik.touched[name] && !formik.errors[name] && hasValue;

  const InputComponent = rows ? 'textarea' : 'input';
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (type === 'tel') {
      // Format phone number as user types
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
      } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      }
      e.target.value = value;
    }
    formik.handleChange(e);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setIsFocused(true);
    if (formik.handleFocus) {
      formik.handleFocus(e);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setIsFocused(false);
    formik.handleBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputClasses = () => {
    const baseClasses = `
      w-full px-3 py-2 border rounded-lg transition-all duration-200
      focus:ring-2 focus:ring-blue-500 focus:border-transparent
      disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
      ${leftIcon ? 'pl-10' : ''}
      ${(rightIcon || type === 'password') ? 'pr-10' : ''}
    `;

    let statusClasses = 'border-gray-300';

    if (hasError) {
      statusClasses = 'border-red-500 focus:ring-red-500';
    } else if (isValid) {
      statusClasses = 'border-green-500 focus:ring-green-500';
    } else if (isFocused) {
      statusClasses = 'border-blue-500';
    }

    return `${baseClasses} ${statusClasses} ${inputClassName}`;
  };

  const characterCount = formik.values[name]?.length || 0;
  const isNearLimit = maxLength && characterCount > maxLength * 0.8;

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Help Text */}
      {helpText && (
        <div className="flex items-start gap-1 text-xs text-gray-600">
          <Info size={12} className="mt-0.5 flex-shrink-0" />
          <span>{helpText}</span>
        </div>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <InputComponent
          id={name}
          name={name}
          type={inputType}
          rows={rows}
          value={formik.values[name] || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          className={getInputClasses()}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            hasError ? `${name}-error` :
              helpText ? `${name}-help` : undefined
          }
        />

        {/* Right Icons */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
          {/* Validation Icon */}
          {hasError && (
            <AlertCircle size={16} className="text-red-500" />
          )}
          {isValid && (
            <CheckCircle size={16} className="text-green-500" />
          )}

          {/* Password Toggle */}
          {type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}

          {/* Custom Right Icon */}
          {rightIcon && !hasError && !isValid && (
            <div className="text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
      </div>

      {/* Character Count */}
      {showCharCount && maxLength && (
        <div className={`text-xs text-right ${
          isNearLimit ? 'text-amber-600' : 'text-gray-500'
        }`}>
          {characterCount}/{maxLength}
        </div>
      )}

      {/* Error Message */}
      {hasError && (
        <div id={`${name}-error`} className="flex items-start gap-1 text-sm text-red-600">
          <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
          <span>{formik.errors[name]}</span>
        </div>
      )}
    </div>
  );
};

// Specialized Input Components
export const EmailInput: React.FC<Omit<FormInputProps, 'type'>> = (props) => (
  <FormInput
    {...props}
    type="email"
    autoComplete="email"
    placeholder={props.placeholder || "Enter your email address"}
  />
);

export const PhoneInput: React.FC<Omit<FormInputProps, 'type'>> = (props) => (
  <FormInput
    {...props}
    type="tel"
    autoComplete="tel"
    placeholder={props.placeholder || "(555) 123-4567"}
    maxLength={14}
  />
);

export const PasswordInput: React.FC<Omit<FormInputProps, 'type'>> = (props) => (
  <FormInput
    {...props}
    type="password"
    autoComplete={props.autoComplete || "current-password"}
    placeholder={props.placeholder || "Enter your password"}
  />
);

export const TextAreaInput: React.FC<Omit<FormInputProps, 'type'>> = (props) => (
  <FormInput
    {...props}
    rows={props.rows || 4}
    showCharCount={props.maxLength ? true : false}
  />
);

export const DateInput: React.FC<Omit<FormInputProps, 'type'>> = (props) => (
  <FormInput
    {...props}
    type="date"
    autoComplete="bday"
  />
);

export default FormInput;