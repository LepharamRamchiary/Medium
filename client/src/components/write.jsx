import React, { useContext, useState } from "react";
import { GoBell } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import avatarImage from "../assets/ang.jpeg";
import { CiCirclePlus } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CiImageOn } from "react-icons/ci";
import { FaUnsplash } from "react-icons/fa6";
import { PiYoutubeLogoThin } from "react-icons/pi";
import { ImEmbed } from "react-icons/im";
import { PiBracketsCurlyLight } from "react-icons/pi";
import { AiOutlinePartition } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Write() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarHoverd, setIsAvatarHoverd] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoggout = () => {
    logout();
    navigate("/");
  };

  let hoverTimeout;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsAvatarHoverd(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsAvatarHoverd(false);
    }, 3000);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full">
      <nav className="fixed top-2 w-full z-50">
        <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-14 items-center md:justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              <div className="sm:ml-6 flex sm:block md:flex md:gap-2">
                <div className="flex space-x-4">
                  <Link
                    to="/feed"
                    className="px-3 py-2 text-4xl font-bold text-black font-serif"
                  >
                    Medium
                  </Link>
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
                  <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      className="h-10 w-10 rounded-full p-1 hidden md:block"
                      src={avatarImage}
                      alt="avatar"
                    />
                    {isAvatarHoverd && (
                      <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-20 flex flex-col text-center">
                        <button
                          onClick={handleLoggout}
                          className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-blue-400 font-semibold hover:rounded-md"
                        >
                          Logout
                        </button>
                        <Link
                          to="/user-profile"
                          className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-blue-400 font-semibold hover:rounded-md"
                        >
                          Profile
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="relative top-32 md:max-w-4xl md:mx-auto">
        <div className="">
          <div className="flex flex-col gap-5 px-3 md:items-start">
            <div className="flex items-center divide-x divide-gray-100 gap-3">
              {isOpen ? (
                <IoCloseCircleOutline
                  className="md:text-4xl text-xl font-thin cursor-pointer"
                  onClick={toggleMenu}
                />
              ) : (
                <CiCirclePlus
                  className="md:text-4xl text-xl font-thin cursor-pointer"
                  onClick={toggleMenu}
                />
              )}
              <input
                type="text"
                className="md:text-3xl text-sm font-bold p-3 rounded-md focus:outline-none"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {isOpen && (
                <div className="absolute ml-12 p-4 bg-white ">
                  <div className="flex gap-2">
                    <CiImageOn className="h-9 text-sm w-9 text-green-400 border border-green-400 rounded-full p-2" />
                    <FaUnsplash className="h-9 w-9 text-sm text-green-400 border border-green-400 rounded-full p-2" />
                    <PiYoutubeLogoThin className="h-9 w-9 text-sm text-green-400 border border-green-400 rounded-full p-2" />
                    <ImEmbed className="h-9 w-9 text-sm text-green-400 border border-green-400 rounded-full p-2" />
                    <PiBracketsCurlyLight className="h-9 w-9 text-sm text-green-400 border border-green-400 rounded-full p-2" />
                    <AiOutlinePartition className="h-9 w-9 text-sm text-green-400 border border-green-400 rounded-full p-2" />
                  </div>
                </div>
              )}
            </div>
            <ReactQuill
              theme="snow"
              placeholder="Tell your story..."
              value={value}
              onChange={setValue}
              className="md:w-full md:h-96 h-44"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
