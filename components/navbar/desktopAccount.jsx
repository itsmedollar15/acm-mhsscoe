import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";
import { LogoutOutlined } from "@ant-design/icons";
import {
  LogIn,
  CheckCircle,
  Settings,
  User,
  QrCode,
  Users,
} from "lucide-react";
import { Popover } from "antd";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

const NavbarDesktopAccount = ({ logoutUser }) => {
  const { isLoggedIn, isAuthLoading, role, profilePicture, name, email } =
    useSelector((state) => state.auth);

  if (isAuthLoading) {
    return (
      <div className="flex gap-4 items-center">
        <div className="w-24 h-9 bg-gray-200 rounded-lg animate-pulse" />
        <div className="w-24 h-9 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    );
  }

  return isLoggedIn ? (
    <div className="py-1">
      <Popover
        trigger="click"
        overlayClassName="shadow-xl rounded-xl border border-gray-200"
        content={
          <div className="p-2 space-y-1 w-64 bg-white rounded-lg">
            {/* Profile Header */}
            <div className="flex gap-3 items-center p-3 mb-2 rounded-lg transition-all hover:bg-gray-50">
              <Link
                href={`/user?email=${email}`}
                className="flex gap-3 items-center w-full"
              >
                <div className="flex-shrink-0">
                  <Image
                    className="object-cover w-12 h-12 rounded-lg border border-gray-200 shadow-sm"
                    src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
                      profilePicture ?? DEFAULT_PROFILE_PICTURE
                    }`}
                    alt="Profile"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{email}</p>
                </div>
              </Link>
            </div>

            {/* My Account Section */}
            <Link href="/myaccount/update-profile">
              <div className="flex gap-2 items-center px-3 py-2 text-sm text-gray-700 rounded-lg transition-all hover:bg-gray-50">
                <User size={18} className="text-gray-400" />
                <span>Update Profile</span>
              </div>
            </Link>

            <Link href="/myaccount/qr-code">
              <div className="flex gap-2 items-center px-3 py-2 text-sm text-gray-700 rounded-lg transition-all hover:bg-gray-50">
                <QrCode size={18} className="text-gray-400" />
                <span>QR Code</span>
              </div>
            </Link>

            {/* Admin Section */}
            {role && (
              <>
                <div className="my-2 h-px bg-gray-100" />
                <Link href="/admin/events">
                  <div className="flex gap-2 items-center px-3 py-2 text-sm text-gray-700 rounded-lg transition-all hover:bg-gray-50">
                    <Settings size={18} className="text-gray-400" />
                    <span>Manage Events</span>
                  </div>
                </Link>
                <Link href="/admin/teams">
                  <div className="flex gap-2 items-center px-3 py-2 text-sm text-gray-700 rounded-lg transition-all hover:bg-gray-50">
                    <Users size={18} className="text-gray-400" />
                    <span>Manage Teams</span>
                  </div>
                </Link>
                <Link href="/admin/users">
                  <div className="flex gap-2 items-center px-3 py-2 text-sm text-gray-700 rounded-lg transition-all hover:bg-gray-50">
                    <Settings size={18} className="text-gray-400" />
                    <span>Manage Users</span>
                  </div>
                </Link>
              </>
            )}

            {/* Logout Button */}
            <div className="my-2 h-px bg-gray-100" />
            <button
              onClick={logoutUser}
              className="flex gap-2 items-center px-3 py-2 w-full text-sm text-red-600 rounded-lg transition-all hover:bg-red-50"
            >
              <LogoutOutlined className="text-red-500" />
              <span>Logout</span>
            </button>
          </div>
        }
      >
        <Image
          className="object-cover w-10 h-10 rounded-lg border border-gray-200 shadow-sm transition-transform cursor-pointer hover:ring-2 hover:ring-gray-300 hover:scale-105"
          src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
            profilePicture ?? DEFAULT_PROFILE_PICTURE
          }`}
          alt="User Avatar"
          width={40}
          height={40}
        />
      </Popover>
    </div>
  ) : (
    <div className="flex gap-4 items-center">
      <Link href="/login">
        <button className="flex gap-2 items-center px-5 py-2 text-sm font-semibold text-blue-600 bg-white rounded-lg border border-blue-500 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md focus:ring-2 focus:ring-blue-300">
          <LogIn size={18} />
          Login
        </button>
      </Link>
      <Link href="/register">
        <button className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white transition-all bg-[#007bff] rounded-lg shadow-sm hover:bg-[#007bff] hover:shadow-md focus:ring-2 focus:ring-blue-300">
          <CheckCircle size={18} />
          Register
        </button>
      </Link>
    </div>
  );
};

export default NavbarDesktopAccount;
