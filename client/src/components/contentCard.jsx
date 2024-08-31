import React from "react";
import { PiHandsClappingLight } from "react-icons/pi";
import { FaComment } from "react-icons/fa";
import { CiCircleMinus } from "react-icons/ci";
import { TbBookmarkPlus } from "react-icons/tb";
import { IoIosMore } from "react-icons/io";
import CurrentDate from "./CurrentDate";
import { Link } from "react-router-dom";
import { cardData } from "./cardData";
import { formatDate } from "../utils/formatDate";

const IconWithTooltip = ({ icon: Icon, label }) => {
  return (
    <div className="relative flex items-start group">
      <Icon className="md:text-2xl text-xs text-gray-500 hover:text-gray-950" />
      <span className="absolute p-2 bottom-full mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap max-w-xs">
        {label}
      </span>
    </div>
  );
};

function contentCard({
  id,
  title,
  description,
  imageSrc,
  autherName,
  autherImage,
  publicationDate
}) {
  

  const formattedDate = publicationDate
    ? formatDate(publicationDate)
    : "Unknown date";

  return (
    <div className="">
      <div className="md:flex w-full items-center gap-3 border-b p-4 md:my-10">
        <div className="md:w-3/4 mb-3">
          <div className="flex items-center gap-1 md:gap-2">
            <img
              className="h-8 w-8 rounded-full"
              src={autherImage}
              alt="avatar"
            />
            <p>{autherName}</p>
          </div>
          <div className="md:mt-3 mt-2">
            <Link to={`/card-details/${id}`}>
              <h1 className="font-serif md:text-2xl line-clamp-2 md:line-clamp-0 text-xl font-semibold capitalize">
                {title}
              </h1>
              <p className="mt-2 line-clamp-2 font-sans font-semibold text-gray-500">
                {description}
              </p>
            </Link>
          </div>
          <div className="flex justify-between mt-3 cursor-pointer">
            <div className="flex md:gap-4 text-xs gap-1 items-center text-gray-500">
              <p>{formattedDate}</p>
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
        <div className="md:w-1/4 mb-3 flex justify-center">
          <img className="md:h-32 md:w-48 h-28 w-" src={imageSrc} alt="cardImage" />
        </div>
      </div>
    </div>
  );
}

export default contentCard;
