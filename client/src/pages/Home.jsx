import React from "react";

function Home() {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex mt-10 md:mt-20 w-full min-h-full border-b border-gray-950 justify-between flex-wrap">
        <div className="flex flex-col justify-center w-full md:w-3/5 text-center md:text-left">
          <div className="mx-6 md:ml-16">
            <h1 className="text-5xl md:text-8xl font-serif font-medium">
              Human Lepha11 dfhdfhgfhfg
            </h1>
            <h1 className="text-5xl md:text-8xl font-serif font-medium">
              stories & ideas
            </h1>
          </div>
          <p className="mx-6 md:ml-16 text-base md:text-lg mt-6 md:mt-12 font-semibold">
            A place to read, write, and deepen your understanding
          </p>
          <div className="flex items-center justify-center md:justify-start lg:justify-start">
            <div className="mb-10 md:ml-16 mt-6 md:mt-12 bg-black h-10 md:w-40 lg:w-40 w-40 md:max-w-36 rounded-full flex items-center justify-center font-sans font-semibold text-base md:text-xl hover:bg-gray-700">
              <button className="text-white">Start reading</button>
            </div>
          </div>
        </div>
        <div className="hidden md:flex justify-end items-center ml-auto w-full md:w-2/5 mt-6 md:mt-0">
          <img
            alt="Brand image"
            className="py-5"
            src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
            width="460"
            height="600"
            loading="eager"
          />
        </div>
      </div>
      <div className="flex justify-center items-center my-4 gap-4 text-gray-600 font-semibold">
        <p>Help</p>
        <p>Status</p>
        <p>About</p>
      </div>
    </div>
  );
}

export default Home;
