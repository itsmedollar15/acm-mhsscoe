import React from "react";
import Link from "next/link";
import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";
import { Settings, User, QrCode, Users, Calendar, LogOut } from "lucide-react";

const DropdownMenu = ({ user, onLogout }) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 p-2 transition-all bg-gray-100 shadow-md rounded-xl">
        <div className="relative w-10 h-10">
          <img
            src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
              user?.profilePicture ?? DEFAULT_PROFILE_PICTURE
            }`}
            alt="Profile"
            className="object-cover w-full h-full border-2 border-gray-100 shadow-sm rounded-xl"
          />
          {user?.role === "admin" && (
            <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-500 border-2 border-white rounded-full -bottom-1 -right-1">
              <span className="text-[8px] font-bold text-white">A</span>
            </span>
          )}
        </div>
        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold text-gray-800 line-clamp-1">
            {user?.name || "Guest"}
          </p>
          <p className="text-xs text-gray-500 line-clamp-1">{user?.email}</p>
        </div>
      </div>

      {/* Profile & Management Section */}
      <div className="absolute right-0 z-50 mt-3 origin-top-right bg-white shadow-lg w-72 rounded-2xl ring-1 ring-black/5 backdrop-blur-sm">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <img
              src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
                user?.profilePicture ?? DEFAULT_PROFILE_PICTURE
              }`}
              alt="Profile"
              className="object-cover w-16 h-16 border-2 border-gray-100 shadow-sm rounded-xl"
            />
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-gray-900 truncate mb-0.5">
                {user?.name}
              </p>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="p-2">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors rounded-xl hover:bg-gray-50 group"
          >
            <User className="w-5 h-5 text-gray-400 transition-colors group-hover:text-blue-500" />
            <span className="font-medium">Update Profile</span>
          </Link>
          <Link
            href="/qr-code"
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors rounded-xl hover:bg-gray-50 group"
          >
            <QrCode className="w-5 h-5 text-gray-400 transition-colors group-hover:text-blue-500" />
            <span className="font-medium">QR Code</span>
          </Link>

          {/* Admin Section */}
          {user?.role === "admin" && (
            <div className="pt-2 my-2 border-t border-gray-100">
              <Link
                href="/admin/events"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors rounded-xl hover:bg-gray-50 group"
              >
                <Calendar className="w-5 h-5 text-gray-400 transition-colors group-hover:text-blue-500" />
                <span className="font-medium">Manage Events</span>
              </Link>
              <Link
                href="/admin/teams"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors rounded-xl hover:bg-gray-50 group"
              >
                <Users className="w-5 h-5 text-gray-400 transition-colors group-hover:text-blue-500" />
                <span className="font-medium">Manage Teams</span>
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors rounded-xl hover:bg-gray-50 group"
              >
                <Settings className="w-5 h-5 text-gray-400 transition-colors group-hover:text-blue-500" />
                <span className="font-medium">Manage Users</span>
              </Link>
            </div>
          )}
        </div>

        <div className="p-2 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="flex items-center w-full gap-3 px-4 py-3 text-sm text-red-600 transition-colors rounded-xl hover:bg-red-50 group"
          >
            <LogOut className="w-5 h-5 transition-colors group-hover:text-red-600" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
