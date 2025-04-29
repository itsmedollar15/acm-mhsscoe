import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { Info } from "lucide-react";

const EventHeader = ({ title, description, poster }) => {
  return (
    <>
      {/* Event Title & Description */}
      <Glassmorphism className="p-6 rounded-xl shadow-lg md:p-8">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-700 md:text-4xl">
          <Info className="flex-shrink-0 w-6 h-6 text-blue-600 md:w-7 md:h-7" />
          {title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-700 md:text-xl">
          {description}
        </p>
      </Glassmorphism>

      {/* Event Poster */}
      <Glassmorphism className="mt-8 rounded-xl shadow-lg overflow-hidden">
        <div className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
          {/* Blurred Background */}
          <div className="absolute inset-0 bg-black/5">
            <img
              className="object-cover w-full h-full opacity-50 blur-md"
              src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${poster}`}
              alt="Event Poster Background"
            />
          </div>

          {/* Main Poster Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              className="w-auto h-auto max-w-full max-h-[calc(100vh-200px)] rounded-lg shadow-xl"
              src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${poster}`}
              alt="Event Poster"
            />
          </div>
        </div>
      </Glassmorphism>
    </>
  );
};

export default EventHeader;
