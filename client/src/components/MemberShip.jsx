import React, { useEffect, useState } from "react";
import { PiStarThin } from "react-icons/pi";

function MemberShip() {
  const [bgColor, setBgColor] = useState('bg-white-50'); // Initial background color
  const colors = ['bg-white-100','bg-red-100','bg-yellow-100', 'bg-blue-100', 'bg-green-100', 'bg-purple-100','bg-pink-100']; 

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = colors.indexOf(bgColor);
      const nextIndex = (currentIndex + 1) % colors.length;
      setBgColor(colors[nextIndex]);
    }, 6000)

    return () => clearInterval(interval)
  }, [bgColor, colors]);

  return (
    <div className="h-full w-ful">
      <div className="mt-20 flex flex-wrap">
        <div className={`flex flex-col md:w-3/5 p-5 md:p-10 md:border-r border-gray-950 border-b ${bgColor}`}>
          <div className="md:my-16 my-10">
            <div className="">
              <h1 className="md:text-8xl text-5xl lg:text-8xl font-serif">
                Support human stories
              </h1>
              <p className="md:my-9 my-4 md:text-xl font-semibold">
                Become a member to read without limits or ads, fund great
                writers, and join a global community of people who care about
                high-quality storytelling.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex bg-black h-8 w-auto p-3 md:p-4 lg:p-5 rounded-full items-center justify-center hover:bg-gray-800 transition-all">
                <button className="text-white">Get started</button>
              </div>
              <div className="flex bg-transparent h-8 w-auto p-3 md:p-4 lg:p-5 rounded-full items-center border border-gray-600 justify-center hover:bg-slate-200 transition-all">
                <button className="text-black">View plans</button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:p-10 p-6 md:w-2/5 border-gray-950 border-b flex flex-col justify-end">
          <div className="flex flex-col md:my-10 my-20">
            <div className="flex my-2 items-center bg-yellow-300 w-44 text-sm p-2 justify-center gap-3 rounded-full">
              <PiStarThin />
              <button>Member-only story</button>
            </div>
            <h1 className="text-2xl font-semibold font-serif my-6">
              Hello world ewfgewfiewhfieohw ewfihewofihewofih efhoewifhew9
            </h1>
            <div className="flex gap-3 md:mt-4 items-center">
              <div className="bg-red-500 h-10 w-10 rounded-full flex justify-center items-center">
                A
              </div>
              <div className="">
                <p>name</p>
                <p>how is he/she ?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberShip;
