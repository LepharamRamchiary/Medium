import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

function ForgotPassword({ isOpen, onClose, onRecoveryEmailSent }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password recovery logic (e.g., send recovery email)
    console.log("Recovery email sent to:", email);
    alert("Password recovery email sent! Please check your inbox.");
    onRecoveryEmailSent(); // Notify parent component to open OTP verification
    // onClose(); // Optionally keep this if you want to close the modal immediately
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
        <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="w-full">
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Send Recovery Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
