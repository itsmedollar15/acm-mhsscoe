import React from "react";
import Image from "next/image";
import Glassmorphism from "../common/glassmorphism";
import PostLevelIcon from "../common/postLevelIcon";
import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";

const TeamSectionsPostCard = ({ title, level, user }) => {
  return (
    <Glassmorphism className="relative overflow-hidden transition-all duration-300 group rounded-xl hover:shadow-lg">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-blue-50 to-white"></div>
      
      {/* Content Container */}
      <div className="relative flex flex-col p-5">
        {/* Profile Image Container */}
        <div className="relative mx-auto mb-4">
          <div className="relative w-48 h-48 overflow-hidden shadow-md rounded-xl will-change-transform">
            <Image
              src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${user.profilePicture ?? DEFAULT_PROFILE_PICTURE}`}
              alt={user.name ?? user.email}
              fill
              sizes="192px"
              className="object-cover transform-gpu transition-all duration-200 ease-out group-hover:scale-105"
              priority
              loading="eager"
            />
          </div>
          
          {/* Level Badge */}
          <div className="absolute p-2 -translate-x-1/2 bg-white border-2 border-blue-100 rounded-full shadow-md -bottom-2 left-1/2">
            <PostLevelIcon level={level} className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* User Information */}
        <div className="mt-4 text-center">
          <h3 
            className="mb-2 text-xl font-bold text-gray-800 line-clamp-1"
            title={user.name ?? user.email}
          >
            {user.name ?? user.email}
          </h3>

          <div className="relative">
            <p className="inline-block px-4 py-1 text-base font-medium text-blue-600 rounded-full bg-blue-50">
              {title}
            </p>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 transition-opacity duration-200 ease-out opacity-0 bg-gradient-to-t from-blue-600/10 to-transparent group-hover:opacity-100"></div>
      </div>
    </Glassmorphism>
  );
};

export default TeamSectionsPostCard;
