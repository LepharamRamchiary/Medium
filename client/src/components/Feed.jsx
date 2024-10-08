import React, { useContext, useState } from "react";
import { TfiWrite } from "react-icons/tfi";
import { GoBell } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import avatarImage from "../assets/ang.jpeg";
import ContentCard from "./contentCard";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { cardData } from "./cardData";
import { Link } from "react-router-dom";

function Feed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAvatarHoverd, setIsAvatarHoverd] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const titles = [
    "React Hooks",
    "JavaScript",
    "CSS",
    "Node.js",
    "Angular",
    "Next",
    "Python",
    "C++",
    "Java",
    "C#",
    "CSS",
    "HTML",
  ];

  const titlesToShow = 5; 
  const slideWidth = 100 / titlesToShow;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= titles.length - titlesToShow + 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? titles.length - titlesToShow : prevIndex - 1
    );
  };

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
      <nav className="fixed top-0 w-full z-50 shadow bg-gray-100 border-b border-gray-950">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-14 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              <div className="sm:ml-6  flex sm:block md:flex md:gap-2">
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
      <div className="mt-14 md:px-6">
        <div className="md:flex flex-wrap items-center">
          <div className="flex justify-center items-center flex-1 md:p-6 border-0 md:border-r md:border-gray-950">
            <div className="flex flex-col">
              <div className="md:flex hidden justify-center items-center border-b border-gray-300 p-1">
                <button
                  onClick={handlePrev}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  &lt;
                </button>
                <div className="overflow-hidden mx-4 flex flex-grow">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentIndex * slideWidth}%)`,
                    }}
                  >
                    {titles.map((title, index) => (
                      <div
                        key={index}
                        className="flex-none w-[calc(100%/5)] text-sm"
                      >
                        {title}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  &gt;
                </button>
              </div>
              <div className="md:mt-6 mt-0">
                {cardData.map((item) => (
                  <ContentCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    imageSrc={item.imageSrc}
                    autherName={item.autherName}
                    autherImage={item.autherImage}
                    publicationDate={item.publicationDate}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <h1>Lepharam Ramchiary</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
