import React, { useContext, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function SignInModal({ isOpen, onClose, title, redirectPath }) {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to hold form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // New field for full name
  const [confirmPassword, setConfirmPassword] = useState(""); // New field for confirm password
  const [isRegistering, setIsRegistering] = useState(false); // To toggle between login and registration

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate authentication login or registration
    if (isRegistering) {
      // Registration logic
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      // Simulate registration (you can replace this with actual registration logic)
      console.log("Registering:", { fullName, email, password });
      alert("Registration successful! You can now log in.");
      setIsRegistering(false); // Switch back to login after registration
    } else {
      // Login logic
      if (email === "lepha@gmail.com" && password === "12345") {
        // Store user data locally
        localStorage.setItem("user", JSON.stringify({ email }));

        // Update authentication status
        setIsAuthenticated(true);
        navigate(redirectPath || "/feed");
      } else {
        alert("Invalid credentials");
      }
    }
  };

  if (isAuthenticated) {
    navigate(redirectPath || "/feed");
    return null;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"> {/* Increased opacity for a darker background */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"> {/* Adjusted padding and max width */}
        <div className="flex justify-end">
          <button onClick={onClose}>
            <MdOutlineClose />
          </button>
        </div>
        <div className="flex flex-col h-auto justify-center items-center">
          <h2 className="text-2xl font-semibold mb-6">
            {isRegistering ? "Sign Up" : title}
          </h2>
          <form onSubmit={handleSubmit} className="w-full">
            {isRegistering && (
              <div className="mb-4">
                <label className="block text-left mb-2">Full Name:</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
  );
}

export default SignInModal;
