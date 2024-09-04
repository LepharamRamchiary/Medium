import React, { useContext, useState } from "react";
import { TfiWrite } from "react-icons/tfi";
import { GoBell } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import avatarImage from "../assets/ang.jpeg";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfilePhoto from "../assets/photo.jpg";
import { IoIosMore } from "react-icons/io";

function UserProfile() {
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
  return (
    <div className="relative">
      <nav className="fixed top-0 w-full z-50 shadow bg-gray-50 border-b border-x-gray-300">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-14 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              <div className="sm:ml-6 flex sm:block md:flex md:gap-2">
                <div className="flex space-x-4">
                  <Link
                    to="/feed"
                    className="px-3 py-2 text-3xl font-bold text-black font-serif"
                  >
                    Medium
                  </Link>
                </div>
                <div className="flex justify-center items-center px-3">
                  <button className="px-4 h-10 py-1 rounded-l-full bg-white border border-r-0 border-gray-300 focus:outline-none focus:ring-0">
                    <CiSearch className="text-xl text-gray-500" />
                  </button>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full max-w-md h-10 py-1 border border-l-0 bg-white border-gray-300 rounded-r-full focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative flex mr-2 md:mr-10 lg:mr-12 md:items-center">
                <div className="md:flex hidden md:gap-3 lg:gap-5 p-2 md:p-5 lg:p-18 text-sm cursor-pointer items-center">
                  <Link
                    to="/write"
                    className="flex justify-center items-center gap-2"
                  >
                    <TfiWrite className="text-2xl" /> Write
                  </Link>
                  <GoBell className="text-2xl hidden md:block" />
                  <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      className="h-10 w-10 rounded-full p-1 hidden md:block"
                      src={avatarImage}
                      alt="avatar image"
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
      <div className="mt-14 md:divide-x md:flex flex-wrap w-full h-screen">
        <div className="w-3/5 md:px-20 pt-20">
          <div className="flex flex-col gap-16 py-2 border-b border-gray-300">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-semibold">Lepharam Ramchiary</h1>
              <span className="cursor-pointer text-2xl text-gray-500 hover:text-gray-950"><IoIosMore /></span>
            </div>
            <div className="flex gap-3">
              <span>Home</span>
              <span>About</span>
            </div>
          </div>
        </div>
        <div className="w-1/5 md:px-10 pt-20 mx-2">
          <div>
            <div className="md:flex md:flex-col md:gap-1">
              <img className="md:h-24 md:w-24 h-10 w-10 rounded-full" src={ProfilePhoto} alt="avatar image" />
              <span className="md:text-xl">Lepharam Ramchiary</span>
              <button className="md:flex md:justify-start text-teal-800">Edit profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
