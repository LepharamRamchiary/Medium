import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

function SetNewPassword({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password is at least 6 characters long
    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    // Check if the passwords match
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Clear any previous error messages
    setErrorMessage("");

    // Proceed with the API call
    const response = await fetch("http://localhost:8000/api/v1/users/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Password reset successful. You can now log in.");
      onClose();
    } else {
      console.log("Error resetting password:", data);
      alert(data.message || "Password reset failed. Please try again.");
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
        <h2 className="text-2xl font-semibold mb-6">Set New Password</h2>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">
            {errorMessage}
          </div>
        )}
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
          <div className="mb-4">
            <label className="block text-left mb-2">New Password:</label>
            <input
              type="password"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-2">Confirm New Password:</label>
            <input
              type="password"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetNewPassword;
