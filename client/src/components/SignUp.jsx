import React, { useContext, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ForgotPasswordModal from "./ForgotPasswod";
import OtpVerification from "./OtpVerification";
import SetNewPassword from "./SetNewPassword";

function SignInModal({ isOpen, onClose, title, redirectPath }) {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState(""); // New state for username
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isOtpVerificationOpen, setIsOtpVerificationOpen] = useState(false);
  const [isSetNewPasswordOpen, setIsSetNewPasswordOpen] = useState(false);

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password, username }), // Include username
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! You can now log in.");
        setIsRegistering(false);
      } else {
        console.log("Registration failed: ", data);
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert(`Registration failed. Please try again. Error: ${error.message}`);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }), // Include username
      });

      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        alert("Login successful!");
        navigate(redirectPath || "/feed");
      } else {
        console.log("Login failed: ", data);
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert(`Login failed. Please try again. Error: ${error.message}`);
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleRecoveryEmailSent = () => {
    setIsForgotPasswordOpen(false);
    setIsOtpVerificationOpen(true);
  };

  const handleOtpVerified = () => {
    setIsOtpVerificationOpen(false);
    setIsSetNewPasswordOpen(true);
  };

  if (isAuthenticated) {
    navigate(redirectPath || "/feed");
    return null;
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <div className="flex justify-end">
            <button onClick={onClose}>
              <MdOutlineClose />
            </button>
          </div>
          <div className="flex flex-col h-auto justify-center items-center">
            <h2 className="text-2xl font-semibold mb-6">
              {isRegistering ? "Sign Up" : title}
            </h2>
            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="w-full">
              {isRegistering && (
                <div className="mb-4">
                  <label className="block text-left mb-2">Full Name:</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              )}
              {isRegistering && (
                <div className="mb-4">
                  <label className="block text-left mb-2">Username:</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-left mb-2">Email:</label>
                <input
                  type="email"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-left mb-2">Password:</label>
                <input
                  type="password"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {isRegistering && (
                <div className="mb-4">
                  <label className="block text-left mb-2">Confirm Password:</label>
                  <input
                    type="password"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {isRegistering ? "Register" : "Login"}
              </button>
            </form>
            {!isRegistering && (
              <p className="mt-2 text-blue-400 text-sm">
                <button
                  onClick={handleForgotPassword}
                  className="text-green-600 underline"
                >
                  Forgot Password?
                </button>
              </p>
            )}
            <p className="mt-4 text-blue-400">
              {isRegistering ? (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-green-600 underline cursor-pointer"
                    onClick={() => setIsRegistering(false)}
                  >
                    Sign In
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span
                    className="text-green-600 underline cursor-pointer"
                    onClick={() => setIsRegistering(true)}
                  >
                    Sign Up
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onRecoveryEmailSent={handleRecoveryEmailSent}
      />
      <OtpVerification
        isOpen={isOtpVerificationOpen}
        onClose={() => setIsOtpVerificationOpen(false)}
        onVerifySuccess={handleOtpVerified}
      />
      <SetNewPassword
        isOpen={isSetNewPasswordOpen}
        onClose={() => setIsSetNewPasswordOpen(false)}
      />
    </>
  );
}

export default SignInModal;
