import Glassmorphism from "@/components/common/glassmorphism";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4 min-h-screen bg-gradient-to-b from-transparent to-blue-50/30">
      <Glassmorphism className="flex overflow-hidden relative flex-col gap-6 items-center p-8 w-full max-w-lg text-center rounded-2xl border shadow-lg backdrop-blur-lg sm:p-12 bg-white/60 border-white/20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br opacity-50 from-blue-50/50 to-purple-50/50"></div>

        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-3xl bg-blue-500/10"></div>
          <Image
            className="relative w-64 h-auto transition-transform duration-300 transform sm:w-80 hover:scale-105"
            src="/images/void.png"
            alt="404 Not Found"
            width={320}
            height={320}
            priority
          />
        </div>

        <div className="relative space-y-4">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 sm:text-4xl">
            404 - Page Not Found
          </h2>
          <p className="text-lg text-gray-600">
            Oops! The page you are looking for doesn&apos;t exist or has been moved.
          </p>

          <Link href="/" className="inline-block">
            <button className="px-6 py-3 font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md transition-all duration-300 transform hover:shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Return to Homepage
            </button>
          </Link>
        </div>
      </Glassmorphism>
    </div>
  );
};

export default PageNotFound;
