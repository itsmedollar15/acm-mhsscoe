import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { Info } from "lucide-react";
import Image from "next/image";

const EventHeader = ({ title, description, poster }) => {
  return (
    <>
      {/* Event Title & Description */}
      <Glassmorphism className="p-6 rounded-xl shadow-lg md:p-8">
        <h2 className="flex gap-3 items-center text-2xl font-bold text-blue-700 md:text-4xl">
          <Info className="flex-shrink-0 w-6 h-6 text-blue-600 md:w-7 md:h-7" />
          {title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-700 md:text-xl">
          {description}
        </p>
      </Glassmorphism>

      {/* Event Poster */}
      <Glassmorphism className="overflow-hidden mt-8 rounded-xl shadow-lg">
        <div className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
          {/* Blurred Background */}
          <div className="absolute inset-0 bg-black/5">
            <Image
              className="object-cover w-full h-full opacity-50 blur-md"
              src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${poster}`}
              alt="Event Poster Background"
              fill
              sizes="100vw"
            />
          </div>

          {/* Main Poster Image */}
          <div className="flex relative justify-center items-center p-4 w-full h-full">
            <Image
              className="w-auto h-auto max-w-full max-h-[calc(100vh-200px)] rounded-lg shadow-xl"
              src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${poster}`}
              alt="Event Poster"
              width={800}
              height={1000}
              priority
            />
          </div>
        </div>
      </Glassmorphism>
    </>
  );
};

export default EventHeader;
