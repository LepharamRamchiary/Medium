import React from "react";

import { TfiWrite } from "react-icons/tfi";
import { GoBell } from "react-icons/go";
import avatarImage from "../assets/ang.jpeg";

function feed() {
  return (
    <div className="">
      <div className="">
        <nav className="fixed top-0 w-full z-50 shadow bg-gray-100 border-b border-gray-950">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-12 items-center justify-between">
              <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                <div className="sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <a
                      href="/feed"
                      className=" px-3 py-2 text-3xl font-bold text-black font-serif"
                    >
                      Medium
                    </a>
                  </div>
                  
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative flex mr-2 md:mr-10 lg:mr-12 md:items-center">
                  <div className="hidden md:flex md:gap-3 lg:gap-5 p-2 md:p-5 lg:p-18 text-sm cursor-pointer items-center">
                    <a
                      href="/write"
                      className="flex justify-center items-center gap-2"
                    >
                      <TfiWrite className="text-2xl" /> Write
                    </a>
                    <GoBell className="text-2xl" />
                    <img
                      className="h-10 w-10 rounded-full p-1"
                      src={avatarImage}
                      alt=" avatar iamge"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default feed;
