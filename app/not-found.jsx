import Glassmorphism from "@/components/common/glassmorphism";
import React from "react";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4 min-h-screen">
      <Glassmorphism className="flex flex-col gap-4 items-center p-6 text-center rounded-lg shadow-md backdrop-blur-md bg-white/50">
        {/* 404 Image */}
        <img
          className="w-3/4 max-w-xs"
          src="/images/void.png"
          alt="404 Not Found"
        />

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          404 - Page Not Found
        </h2>
        <p className="text-sm text-gray-600">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Go Back Button */}
        <Link href="/">
          <button className="px-4 py-2 mt-3 text-sm font-medium text-white bg-blue-600 rounded-md shadow transition-transform transform hover:scale-105 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Go Back Home
          </button>
        </Link>
      </Glassmorphism>
    </div>
  );
};

export default PageNotFound;
