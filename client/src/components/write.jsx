import React from "react";
import { GoBell } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import avatarImage from "../assets/ang.jpeg";
import { CiCirclePlus } from "react-icons/ci";

function write() {
  return (
    <div className="relative w-full">
      <nav className="fixed top-2 w-full z-50">
        <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-14 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              <div className="sm:ml-6 flex sm:block md:flex md:gap-2">
                <div className="flex space-x-4">
                  <a
                    href="/feed"
                    className="px-3 py-2 text-4xl font-bold text-black font-serif"
                  >
                    Medium
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative flex mr-2 md:mr-10 lg:mr-12 md:items-center">
                <div className="md:flex md:gap-3 lg:gap-5 p-2 md:p-5 lg:p-18 text-sm cursor-pointer md:justify-center md:items-center">
                  <button className="bg-green-300 p-1 rounded-full px-2 text-sm text-white">
                    Publish
                  </button>
                  <BsThreeDots className="text-xl hidden md:block md:text-gray-400 md:hover:text-gray-950" />
                  <GoBell className="text-xl hidden md:block md:text-gray-400 md:hover:text-gray-950" />
                  <div className="relative">
                    <img
                      className="h-10 w-10 rounded-full p-1 hidden md:block"
                      src={avatarImage}
                      alt="avatar image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="relative top-32 max-w-4xl mx-auto">
        <div className="">
          <div className="flex items-center divide-x divide-gray-100 gap-3">
            <CiCirclePlus className="text-4xl"/>
            <h1>Title</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default write;
