import React from "react";
import { MdOutlineClose } from "react-icons/md";

function SignInModal({ isOpen, onClose, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl h-[600px] w-full">
        <div className="flex justify-end">
          <button className="" onClick={onClose}>
            <MdOutlineClose />
          </button>
        </div>
        <div className="flex flex-col h-[500px] justify-center items-center">
          <h2 className="text-2xl font-semibold mb-20">{title}</h2>
          <form className="">
            <div className="mb-4">
              <label className="block text-left mb-2">Email:</label>
              <input
                type="email"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-left mb-2">Password:</label>
              <input
                type="password"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
