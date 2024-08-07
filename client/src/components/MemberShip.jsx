import React, { useEffect, useState } from "react";
import { PiStarThin } from "react-icons/pi";

function MemberShip() {
  const [bgColor, setBgColor] = useState("bg-white-50");
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    {
      src: "https://miro.medium.com/v2/1*YhmNsow7HNTf0Wu5raYD8A.png",
      title: "Title 1",
      name: "John Doe",
      description: "Description for John Doe",
      bgColor: "#FDE68A",
    },
    {
      src: "https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg",
      title: "Title 2",
      name: "Jane Smith",
      description: "Description for Jane Smith",
      bgColor: "#FECACA",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJmGQU-YJkAWvjqyS0zA6Ul5zqRPNBK_8YA&s",
      title: "Title 3",
      name: "Lepharam Ramchiary",
      description: "Description for Lepha",
      bgColor: "#FDE68A",
    },
    {
      src: "https://media.istockphoto.com/id/1198931639/photo/writing-a-blog-blogger-influencer-reading-text-on-screen.jpg?s=612x612&w=0&k=20&c=4FJ_fzzZYqBoGG-RY8fcohpaOKKwnnI-ik58cPy6t-g=",
      title: "Title 4",
      name: "Rekha Bty",
      description: "Description for Rekha Bty",
      bgColor: "#FECACA",
    },
    {
      src: "https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg",
      title: "Title 5",
      name: "Goba Bty",
      description: "Description for Goba Bty",
      bgColor: "#FDE68A",
    },
  ];

  const colors = [
    "bg-white-100",
    "bg-red-100",
    "bg-yellow-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-pink-100",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = colors.indexOf(bgColor);
      const nextIndex = (currentIndex + 1) % colors.length;
      setBgColor(colors[nextIndex]);
    }, 6000);

    return () => clearInterval(interval);
  }, [bgColor, colors]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const { src, title, name, description } = images[imageIndex];

  return (
    <div className="h-full w-ful">
      <div className="mt-20 flex flex-wrap">
        <div
          className={`flex flex-col md:w-3/5 p-5 md:p-10 md:border-r border-gray-950 border-b ${bgColor}`}
        >
          <div className="md:mt-10 mt-5">
            <div className="">
              <h1 className="md:text-8xl text-5xl lg:text-8xl font-serif">
                Support human stories
              </h1>
              <p className=" md:mt-48 md:my-10 mt-10 my-4 md:text-xl font-semibold">
                Become a member to read without limits or ads, fund great
                writers, and join a global community of people who care about
                high-quality storytelling.
              </p>
            </div>
            <div className="flex gap-3 mt-10 md:mt-12">
              <div className="flex bg-black h-8 w-auto p-3 md:p-4 lg:p-5 rounded-full items-center justify-center hover:bg-gray-800 transition-all">
                <button className="text-white">Get started</button>
              </div>
              <div className="flex bg-transparent h-8 w-auto p-3 md:p-4 lg:p-5 rounded-full items-center border border-gray-600 justify-center hover:bg-slate-200 transition-all">
                <button className="text-black">View plans</button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/5 w-full border-gray-950 border-b flex flex-col justify-end bg-gray-200 relative">
          <div
            className="absolute inset-0 bg-cover bg-center md:h-[440px] lg:h-[440px]"
            style={{
              backgroundImage: `url(${src})`,
              filter: `brightness(0.7)`,
            }}
          />
          <div className="relative z-10">
            <div
              className="flex flex-col md:p-10 p-6"
              style={{ backgroundColor: bgColor }}
            >
              <div className="flex my-2 items-center bg-yellow-300 w-44 text-sm p-2 justify-center gap-3 rounded-full">
                <PiStarThin />
                <button>Member-only story</button>
              </div>
              <h1 className="text-2xl font-semibold font-serif my-6">
                {title}
              </h1>
              <div className="flex gap-3 md:mt-4 items-center">
                <div className="bg-red-500 h-10 w-10 rounded-full flex justify-center items-center text-white font-bold">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{name}</p>
                  <p className="text-white">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div class="relative">
          <div class="sticky top-0 h-screen flex flex-col bg-gradient-to-b from-green-50 to-blue-50">
            <div className="flex h-screen my-5">
              <div className="flex">
                <div className="flex w-2/5 p-6">
                  <h1 className="text-7xl font-serif flex justify-center items-center">
                    Why membership?
                  </h1>
                </div>
                <div className="flex w-2/4 flex-col">
                  <div className="">
                    <h1 className="text-5xl font-serif">Reward writers</h1>
                    <p className="mt-3 text-xl">
                      Your membership directly supports the writers, editors,
                      curators, and teams who make Medium a vibrant, inclusive
                      home for human stories. A portion of your membership is
                      allocated to the writers of the stories you read and
                      interact with.
                    </p>
                  </div>
                  <div className="mt-10">
                    <h1 className="text-5xl font-serif">Unlock every story</h1>
                    <p className="mt-3 text-xl">
                      Get access to millions of original stories that spark
                      bright ideas, answer big questions, and fuel bold
                      ambitions.
                    </p>
                  </div>
                  <div className="mt-10">
                    <h1 className="text-5xl font-serif">
                      Enhance your reading experience
                    </h1>
                    <p className="mt-3 text-xl">
                      Immerse yourself in audio stories, read offline wherever
                      you go, and connect with the Medium community on Mastodon.
                    </p>
                  </div>
                  <div className="mt-10">
                    <h1 className="text-5xl font-serif">Elevate your writing</h1>
                    <p className="mt-3 text-xl">
                      Create and contribute to publications to collaborate with
                      other writers, create a custom domain for your profile,
                      and level up your writing with our simple but powerful
                      publishing tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-blue-50 border-t border-gray-950">
            <h2 class="text-4xl font-bold">The Second slide</h2>
            <p class="mt-2">Scroll Down for next slide</p>
          </div>
          <div class="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-blue-50 border-t border-gray-950">
            <h2 class="text-4xl font-bold">The Third slide</h2>
            <p class="mt-2">Scroll Down</p>
          </div>
          <div class="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-blue-50 border-t border-b border-gray-950">
            <h2 class="text-4xl font-bold">The Fourth slide</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberShip;
