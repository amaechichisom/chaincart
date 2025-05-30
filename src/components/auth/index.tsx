import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { InputField } from "../shared/InputField";
import AppButton from "../shared/AppButton";
import { LoginSchema, RegisterSchema } from "./validation";
import useAuth from "./hook/useAuth";

export function Register() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { loginAuth, registerAuth, loginLoad, registerLoad } = useAuth();

  const toggleForm = useCallback(() => setIsSignUp((prev) => !prev), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});
      const validation = isSignUp
        ? RegisterSchema.safeParse(formData)
        : LoginSchema.safeParse(formData);
      if (!validation.success) {
        const formattedErrors: { [key: string]: string } = {};
        validation.error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
        return;
      }

      if (isSignUp && formData.password !== formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
        return;
      }

      if (isSignUp) {
        registerAuth(formData.email, formData.password);
      } else {
        loginAuth(formData.email, formData.password);
      }
    },
    [formData, isSignUp, registerAuth, loginAuth]
  );

  const formTitle = isSignUp
    ? "Create Account Seller"
    : "Login to Your Account";
  const toggleText = isSignUp
    ? "Already have an account?"
    : "Don't have an account?";

  return (
    <div className="h-full py-6 flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 p-8 shadow-lg rounded-lg w-full max-w-md"
      >
        {/* <AppButton
          label="Connect With Xion Meta"
          disabled
          variant="default"
          className="w-full my-4"
        /> */}
        <h2 className="text-2xl font-bold text-center mb-6">{formTitle}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            errorMessage={errors.email}
            required
          />

          <InputField
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            errorMessage={errors.password}
            required
          />

          {isSignUp && (
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              errorMessage={errors.confirmPassword}
              required
            />
          )}

          <AppButton
            isLoading={loginLoad || registerLoad}
            label={isSignUp ? "Sign Up" : "Login"}
            buttonStyle="w-full"
            type="submit"
          />
        </form>

        <p className="text-center text-sm text-gray-600 mt-4 ">
          {toggleText}
          <button
            onClick={toggleForm}
            className="text-codeline-500 font-medium ml-1 border-0 focus:outline-none focus:ring-0"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
