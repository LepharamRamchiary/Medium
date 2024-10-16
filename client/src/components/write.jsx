import React, { useContext, useState } from "react";
import { GoBell } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import avatarImage from "../assets/ang.jpeg";
import { CiCirclePlus } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CiImageOn } from "react-icons/ci";
import { PiYoutubeLogoThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Write() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarHoverd, setIsAvatarHoverd] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState("");

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
      setVideo(null);
      setVideoName("");
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setVideoName(file.name);
      setImage(null);
      setImageName("");
    }
  };

  const handlePublish = async () => {
    if (!title || !value) {
      alert("Please enter title and content");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", value);

    if (image) {
      formData.append("image", image);
    } else if (video) {
      formData.append("video", video);
    }

    const token = localStorage.getItem('accessToken');
    if(!token) {
      alert("You are not logged in. Please log in to publish.");
      navigate('/login')
      return;
    }
  

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/blogs/publish",
        {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": `Bearer ${token}`
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error("Failed to publish post");
      }

      const data = await response.json();
      alert("Blog published successfully!");
      navigate("/feed");
    } catch (error) {
      console.log("Error publishing post:", error);
      alert("Error publishing post. Please try again.");
    }
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
                  <button className="bg-green-300 p-1 rounded-full px-2 text-sm text-white"
                  onClick={handlePublish}>
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
                <div className="absolute ml-12 p-4 bg-white flex gap-3">
                  <div className="flex gap-2">
                    <label>
                      <CiImageOn className="h-9 text-sm w-9 text-green-400 border border-green-400 rounded-full p-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={!!video}
                        className="hidden"
                      />
                    </label>
                    <label>
                      <PiYoutubeLogoThin className="h-9 w-9 text-sm text-green-400 border border-green-400 rounded-full p-2" />
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        disabled={!!image}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="mt-2 text-gray-600">
                    {imageName && <p>Image: {imageName}</p>}
                    {videoName && <p>Video: {videoName}</p>}
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
