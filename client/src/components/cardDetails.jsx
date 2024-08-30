import React, { useContext, useState } from "react";
import { TfiWrite } from "react-icons/tfi";
import { GoBell } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import avatarImage from "../assets/ang.jpeg";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CurrentDate from "./CurrentDate";
import { PiHandsClappingLight } from "react-icons/pi";
import { FaComment } from "react-icons/fa";
import { TbBookmarkPlus } from "react-icons/tb";
import { IoIosMore } from "react-icons/io";
import { IoPlayCircleOutline } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { cardData } from "./cardData";

const IconWithTooltip = ({ icon: Icon, label }) => {
  return (
    <div className="relative flex items-start group">
      <Icon className="md:text-2xl text-gray-500 hover:text-gray-950" />
      <span className="absolute p-2 bottom-full mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap max-w-xs">
        {label}
      </span>
    </div>
  );
};

function cardDetails() {
  const [isAvatarHoverd, setIsAvatarHoverd] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const card = cardData.find((item) => item.id === parseInt(id));

  console.log(card);
  if(!card){
    return <div>Card not found</div>
  }
  

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
                  <a
                    href="/feed"
                    className="px-3 py-2 text-3xl font-bold text-black font-serif"
                  >
                    Medium
                  </a>
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
                  <a
                    href="/write"
                    className="flex justify-center items-center gap-2"
                  >
                    <TfiWrite className="text-2xl" /> Write
                  </a>
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
                      <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-20 flex text-center">
                        <button
                          onClick={handleLoggout}
                          className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-blue-400 font-semibold hover:rounded-md"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full min-h-screen mt-20">
        <div className="md:max-w-3xl px-5 md:px-0 text-xl mx-auto">
          <div className="">
            <h1 className="md:text-4xl font-semibold font-serif">{card.title}</h1>
            <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
              <img
                className="md:h-10 md:w-10 h-8 w-8 rounded-full"
                src={avatarImage}
                alt="avatar"
              />
              <div>
                <div className="flex md:gap-2 gap-1 items-center text-xs md:text-sm">
                  <p>{card.name}</p>
                  <span className="relative">
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-0.5 h-0.5 bg-black rounded-full">
                        .
                      </span>
                    </span>
                  </span>
                  <button className="text-red-300">Follow</button>
                </div>
                <div className="flex md:gap-2 gap-1 items-center md:text-sm text-xs">
                  <p>Published in Coding at Dawn</p>
                  <span className="relative">
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-0.5 h-0.5 bg-black rounded-full">
                        .
                      </span>
                    </span>
                  </span>
                  <p>2 min read</p>{" "}
                  <span className="relative">
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-0.5 h-0.5 bg-black rounded-full">
                        .
                      </span>
                    </span>
                  </span>
                  <p>
                    <CurrentDate />
                  </p>
                </div>
              </div>
            </div>
            <div className="my-9 md:py-3 md:px-4 py-2 px-2 border-t border-b flex justify-between">
              <div className="flex gap-3">
                <p className="flex items-center gap-1 text-gray-500">
                  <IconWithTooltip icon={PiHandsClappingLight} label="Clab" />
                  20
                </p>
                <p className="flex items-center gap-1 text-gray-500">
                  <IconWithTooltip icon={FaComment} label="comment" />
                  20
                </p>
              </div>
              <div className="flex gap-3 justify-center items-center">
                <p className="flex items-center text-xl text-gray-500">
                  <IconWithTooltip icon={TbBookmarkPlus} label="Save" />
                </p>
                <p className="flex items-center text-xl text-gray-500">
                  <IconWithTooltip icon={IoPlayCircleOutline} label="Listen" />
                </p>
                <p className="flex items-center text-xl text-gray-500">
                  <IconWithTooltip icon={IoShareOutline} label="Share" />
                </p>
                <p className="flex items-center text-xl text-gray-500">
                  <IconWithTooltip icon={IoIosMore} label="More" />
                </p>
              </div>
            </div>
            <div className="">
              <p>
                <img
                  className="md:h-[400px] h-[200px] w-full"
                  src={avatarImage}
                  alt=""
                />
              </p>
            </div>
            <div className="my-9">
              <p className="md:text-xl text-sm">{card.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default cardDetails;
