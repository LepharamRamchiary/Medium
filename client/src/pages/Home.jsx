import React from "react";

function Home() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex mt-20 w-full min-h-full border-b border-gray-950 justify-between">
        <div className="flex flex-col justify-center">
          <div className="ml-16">
            <h1 className="text-9xl font-serif font-medium">Human</h1>
            <h1 className="text-8xl font-serif font-medium">
              stories & ideas
            </h1>
          </div>
          <p className="ml-16 text-lg mt-12 font-semibold">
            A place to read, write, and deepen your understanding
          </p>
          <div className="ml-16 mt-12 bg-black h-10 max-w-36 rounded-full flex items-center justify-center font-sans font-semibold text-xl hover:bg-gray-700">
            <button className="text-white">Start reading</button>
          </div>
        </div>
        <div className="hidden lg:flex md:flex justify-end items-end ml-auto">
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
      <div className="flex justify-center items-center mt-6 gap-4 text-gray-600 font-semibold">
        <p>Help</p>
        <p>Status</p>
        <p>About</p>
      </div>
    </div>
  );
}

export default Home;
