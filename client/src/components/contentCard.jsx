import React from "react";
import avatarImage from "../assets/ang.jpeg";
import { PiHandsClappingLight } from "react-icons/pi";
import { FaComment } from "react-icons/fa";
import { CiCircleMinus } from "react-icons/ci";
import { TbBookmarkPlus } from "react-icons/tb";
import { IoIosMore } from "react-icons/io";
import CurrentDate from "./CurrentDate";

const IconWithTooltip = ({ icon: Icon, label }) => {
  return (
    <div className="relative flex items-start group">
      <Icon className="text-2xl text-gray-500 hover:text-gray-950" />
      <span className="absolute p-2 bottom-full mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap max-w-xs">
        {label}
      </span>
    </div>
  );
};

function contentCard() {
  return (
    <div className="">
      <div className="flex w-full items-center gap-3 border-b">
        <div className="w-3/4 mb-3">
          <div className="md:flex md:items-center md:gap-2">
            <img
              className="h-8 w-8 rounded-full"
              src={avatarImage}
              alt="avatar"
            />
            <p>Lepharam Ramchiary</p>
          </div>
          <div className="md:mt-3">
            <h1 className="font-serif text-2xl font-semibold capitalize">
              10 powerful phrases for proactive communication
            </h1>
            <p className="mt-2 font-sans font-semibold text-gray-500">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste,
              deserunt tenetur est delectus temporibus accusantium atque
              voluptates veritatis quis dignissimos.
            </p>
          </div>
          <div className="flex justify-between mt-3 cursor-pointer">
            <div className="flex gap-4 items-center text-gray-500">
              <p>
                <CurrentDate />
              </p>
              <p className="flex items-center gap-1">
                <PiHandsClappingLight className="text-xl" /> 20
              </p>
              <p className="flex items-center gap-1 ">
                <FaComment className="text-xl transform scale-x-[-1]" /> 20
              </p>
            </div>
            <div className="flex gap-6 items-center">
              <p>
                <IconWithTooltip
                  icon={CiCircleMinus}
                  label="Show less like this"
                />
              </p>
              <p>
                <IconWithTooltip icon={TbBookmarkPlus} label="Save" />
              </p>
              <p>
                <IconWithTooltip icon={IoIosMore} label="More" />
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/4 mb-3">
          <img className="h-32 w-48" src={avatarImage} alt="cardImage" />
        </div>
      </div>
    </div>
  );
}

export default contentCard;
