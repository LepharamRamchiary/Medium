import { useState } from 'react';
import React from "react";
import SignInModal from './SignUp'; 

function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("")

  const openModal =(title) => {
    setModelTitle(title);
    setModalOpen(true);
  }

  const closeModel = () => setModalOpen(false);

  return (
    <div>
      <nav className="fixed top-0 w-full z-50 shadow bg-gray-100 border-b border-gray-950">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              <div className="sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="/"
                    className=" px-3 py-2 text-4xl font-bold text-black font-serif"
                  >
                    Medium
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative flex mr-2 md:mr-10 lg:mr-12 md:items-center">
                <div className="hidden md:flex md:gap-5 lg:gap-7 p-2 md:p-5 lg:p-18 text-sm cursor-pointer items-center">
                  <a href="/ourstory">Our Story</a>
                  <a href="/member">Membership</a>
                  <button onClick={() => openModal("Create an account to start writing.")}>Write</button>
                  
                  <button onClick={() => openModal("Welcome back.")}>Sign in</button>
                  
                </div>
                <div className="flex bg-black h-8 w-auto p-3 md:p-4 lg:p-5 rounded-full items-center justify-center">
                  <button className="text-white" onClick={() => openModal("Join Medium.")}>Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <SignInModal isOpen={isModalOpen} onClose={closeModel} title={modelTitle} />
    </div>
  );
}

export default Header;
