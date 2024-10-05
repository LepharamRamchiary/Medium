import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

function OtpVerification({ isOpen, onClose, onVerifySuccess }) {
  const [email, setEmail] = useState(""); // State for email
  const [otp, setOtp] = useState(""); // State for OTP

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate OTP verification logic
    if (otp === "123456") { // Replace with your actual OTP logic
      alert("OTP verified! You can now reset your password.");
      onVerifySuccess(); // Notify parent component to open SetNewPassword modal
      onClose(); // Close the OTP verification modal
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <MdOutlineClose />
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-6">OTP Verification</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block text-left mb-2">Email:</label>
            <input
              type="email"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-2">Enter OTP:</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)} // Update OTP state
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
