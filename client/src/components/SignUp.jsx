// import React, { useContext, useState } from "react";
// import { MdOutlineClose } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import ForgotPasswordModal from "./ForgotPasswod"; // Import the new component
// import OtpVerification from "./OtpVerification"; // Import OTP verification component

// function SignInModal({ isOpen, onClose, title, redirectPath }) {
//   const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // State to hold form input values
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // State for forgot password modal
//   const [isOtpVerificationOpen, setIsOtpVerificationOpen] = useState(false); // State for OTP verification modal

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isRegistering) {
//       if (password !== confirmPassword) {
//         alert("Passwords do not match.");
//         return;
//       }
//       console.log("Registering:", { fullName, email, password });
//       alert("Registration successful! You can now log in.");
//       setIsRegistering(false);
//     } else {
//       if (email === "lepha@gmail.com" && password === "12345") {
//         localStorage.setItem("user", JSON.stringify({ email }));
//         setIsAuthenticated(true);
//         navigate(redirectPath || "/feed");
//       } else {
//         alert("Invalid credentials");
//       }
//     }
//   };

//   const handleForgotPassword = () => {
//     setIsForgotPasswordOpen(true); // Open the forgot password modal
//   };

//   const handleRecoveryEmailSent = () => {
//     setIsForgotPasswordOpen(false); // Close the forgot password modal
//     setIsOtpVerificationOpen(true); // Open the OTP verification modal
//   };

//   if (isAuthenticated) {
//     navigate(redirectPath || "/feed");
//     return null;
//   }

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//           <div className="flex justify-end">
//             <button onClick={onClose}>
//               <MdOutlineClose />
//             </button>
//           </div>
//           <div className="flex flex-col h-auto justify-center items-center">
//             <h2 className="text-2xl font-semibold mb-6">
//               {isRegistering ? "Sign Up" : title}
//             </h2>
//             <form onSubmit={handleSubmit} className="w-full">
//               {isRegistering && (
//                 <div className="mb-4">
//                   <label className="block text-left mb-2">Full Name:</label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full p-2 border border-gray-300 rounded"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                   />
//                 </div>
//               )}
//               <div className="mb-4">
//                 <label className="block text-left mb-2">Email:</label>
//                 <input
//                   type="email"
//                   required
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-left mb-2">Password:</label>
//                 <input
//                   type="password"
//                   required
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               {isRegistering && (
//                 <div className="mb-4">
//                   <label className="block text-left mb-2">Confirm Password:</label>
//                   <input
//                     type="password"
//                     required
//                     className="w-full p-2 border border-gray-300 rounded"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </div>
//               )}
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//               >
//                 {isRegistering ? "Register" : "Login"}
//               </button>
//             </form>
//             {!isRegistering && (
//               <p className="mt-2 text-blue-400 text-sm">
//                 <button
//                   onClick={handleForgotPassword} // Open forgot password modal
//                   className="text-green-600 underline"
//                 >
//                   Forgot Password?
//                 </button>
//               </p>
//             )}
//             <p className="mt-4 text-blue-400">
//               {isRegistering ? (
//                 <>
//                   Already have an account?{" "}
//                   <span
//                     className="text-green-600 underline cursor-pointer"
//                     onClick={() => setIsRegistering(false)}
//                   >
//                     Sign In
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   Don't have an account?{" "}
//                   <span
//                     className="text-green-600 underline cursor-pointer"
//                     onClick={() => setIsRegistering(true)}
//                   >
//                     Sign Up
//                   </span>
//                 </>
//               )}
//             </p>
//           </div>
//         </div>
//       </div>
//       <ForgotPasswordModal
//         isOpen={isForgotPasswordOpen}
//         onClose={() => setIsForgotPasswordOpen(false)} // Close forgot password modal
//         onRecoveryEmailSent={handleRecoveryEmailSent} // Prop to handle email sent
//       />
//       <OtpVerification
//         isOpen={isOtpVerificationOpen}
//         onClose={() => setIsOtpVerificationOpen(false)} // Close OTP verification modal
//       />
//     </>
//   );
// }

// export default SignInModal;



import React, { useContext, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ForgotPasswordModal from "./ForgotPasswod"; // Import the new component
import OtpVerification from "./OtpVerification"; // Import OTP verification component
import SetNewPassword from "./SetNewPassword"; // Import the new password component

function SignInModal({ isOpen, onClose, title, redirectPath }) {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to hold form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // State for forgot password modal
  const [isOtpVerificationOpen, setIsOtpVerificationOpen] = useState(false); // State for OTP verification modal
  const [isSetNewPasswordOpen, setIsSetNewPasswordOpen] = useState(false); // State for setting new password modal

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      console.log("Registering:", { fullName, email, password });
      alert("Registration successful! You can now log in.");
      setIsRegistering(false);
    } else {
      if (email === "lepha@gmail.com" && password === "12345") {
        localStorage.setItem("user", JSON.stringify({ email }));
        setIsAuthenticated(true);
        navigate(redirectPath || "/feed");
      } else {
        alert("Invalid credentials");
      }
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordOpen(true); // Open the forgot password modal
  };

  const handleRecoveryEmailSent = () => {
    setIsForgotPasswordOpen(false); // Close the forgot password modal
    setIsOtpVerificationOpen(true); // Open the OTP verification modal
  };

  const handleOtpVerified = () => {
    setIsOtpVerificationOpen(false); // Close the OTP verification modal
    setIsSetNewPasswordOpen(true); // Open the set new password modal
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
                <label className="block text-left mb-2">Username</label>
                <input
                  type="email"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-left mb-2">Email:</label>
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
                  <label className="block text-left mb-2">Password:</label>
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
                  onClick={handleForgotPassword} // Open forgot password modal
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
        onClose={() => setIsForgotPasswordOpen(false)} // Close forgot password modal
        onRecoveryEmailSent={handleRecoveryEmailSent} // Prop to handle email sent
      />
      <OtpVerification
        isOpen={isOtpVerificationOpen}
        onClose={() => setIsOtpVerificationOpen(false)} // Close OTP verification modal
        onVerifySuccess={handleOtpVerified} // Prop to handle OTP verification success
      />
      <SetNewPassword
        isOpen={isSetNewPasswordOpen}
        onClose={() => setIsSetNewPasswordOpen(false)} // Close set new password modal
      />
    </>
  );
}

export default SignInModal;
