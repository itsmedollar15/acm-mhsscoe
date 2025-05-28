import React from "react";
import Image from "next/image";
import Glassmorphism from "../common/glassmorphism";
import PostLevelIcon from "../common/postLevelIcon";
import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";

const TeamSectionsPostCard = ({ title, level, user }) => {
  return (
    <Glassmorphism className="overflow-hidden relative rounded-xl transition-all duration-300 group hover:shadow-lg">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50"></div>

      {/* Content Container */}
      <div className="flex relative flex-col p-5">
        {/* Profile Image Container */}
        <div className="relative mx-auto mb-4">
          <div className="overflow-hidden relative w-48 h-48 rounded-xl shadow-md will-change-transform">
            <Image
              src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
                user.profilePicture ?? DEFAULT_PROFILE_PICTURE
              }`}
              alt={user.name ?? user.email}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-all duration-200 ease-out transform-gpu group-hover:scale-105"
              priority
              loading="eager"
              quality={75}
            />
          </div>

          {/* Level Badge */}
          <div className="absolute -bottom-2 left-1/2 p-2 bg-white rounded-full border-2 border-blue-100 shadow-md -translate-x-1/2">
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
            <p className="inline-block px-4 py-1 text-base font-medium text-blue-600 bg-blue-50 rounded-full">
              {title}
            </p>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-200 ease-out from-blue-600/10 group-hover:opacity-100"></div>
      </div>
    </Glassmorphism>
  );
};

export default TeamSectionsPostCard;
