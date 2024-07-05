import React from "react";

function OurStory() {
  return (
    <div className="w-full h-full">
      <div className="border-b border-gray-950">
        <div className="flex flex-col mx-5 mt-10 lg:ml-16 lg:my-24 md:ml-10 md:my-24 md:w-3/6 lg:w-3/6">
          <h1 className="md:text-7xl text-3xl font-bold font-serif">Everyone has a story to tell.</h1>
          <p className="md:mt-20 mt-14 font-serif md:text-xl">
            Medium is a home for human stories and ideas. Here, anyone can share
            insightful perspectives, useful knowledge, and life wisdom with the
            world—without building a mailing list or a following first. The
            internet is noisy and chaotic; Medium is quiet yet full of insight.
            It’s simple, beautiful, collaborative, and helps you find the right
            audience for whatever you have to say.
          </p>
          <p className="md:mt-6 mt-3 font-serif md:text-xl">
            We believe that what you read and write matters. Words can divide or
            empower us, inspire or discourage us. In a world where the most
            sensational and surface-level stories often win, we’re building a
            system that rewards depth, nuance, and time well spent. A space for
            thoughtful conversation more than drive-by takes, and substance over
            packaging.
          </p>
          <h3 className="md:mt-8 mt-4 font-semibold md:text-2xl text-xl">
            Ultimately, our goal is to deepen our collective understanding of
            the world through the power of writing.
          </h3>
          <p className="md:mt-8 mt-4 font-serif md:text-xl">
            Over 100 million people connect and share their wisdom on Medium
            every month. Many are professional writers, but just as many
            aren’t — they’re CEOs, computer scientists, U.S. presidents, amateur
            novelists, and anyone burning with a story they need to get out into
            the world. They write about what they’re working on, what’s keeping
            them up at night, what they’ve lived through, and what they’ve
            learned that the rest of us might want to know too.
          </p>
          <p className="md:mt-6 mt-3 font-serif md:text-xl">
            Instead of selling ads or selling your data, we’re supported by a
            growing community of Medium members who align with our mission. If
            you’re new here, start exploring. Dive deeper into whatever matters
            to you. Find a post that helps you learn something new, or
            reconsider something familiar—and then share your own story.
          </p>
        </div>
      </div>
      <div className="flex my-5 gap-2 items-center justify-center ">
        <p>About</p>
        <p>Terms</p>
      </div>
    </div>
  );
}

export default OurStory;
