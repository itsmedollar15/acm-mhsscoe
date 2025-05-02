import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";
import { LogoutOutlined } from "@ant-design/icons";
import { LogIn, CheckCircle, Settings, User, QrCode, Users } from "lucide-react";
import { Popover } from "antd";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const NavbarDesktopAccount = ({ logoutUser }) => {
  const { isLoggedIn, role, profilePicture, name, email } = useSelector(
    (state) => state.auth
  );

  return isLoggedIn ? (
    <div className="py-1">
      <Popover
        trigger="click"
        overlayClassName="shadow-xl rounded-xl border border-gray-200"
        content={
          <div className="w-64 p-2 space-y-1 bg-white rounded-lg">
            {/* Profile Header */}
            <div className="flex items-center gap-3 p-3 mb-2 transition-all rounded-lg hover:bg-gray-50">
              <Link href={`/user?email=${email}`} className="flex items-center gap-3 w-full">
                <div className="flex-shrink-0">
                  <img
                    className="object-cover w-12 h-12 border border-gray-200 rounded-lg shadow-sm"
                    src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
                      profilePicture ?? DEFAULT_PROFILE_PICTURE
                    }`}
                    alt="Profile"
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
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-all rounded-lg hover:bg-gray-50">
                <User size={18} className="text-gray-400" />
                <span>Update Profile</span>
              </div>
            </Link>
            
            <Link href="/myaccount/qr-code">
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-all rounded-lg hover:bg-gray-50">
                <QrCode size={18} className="text-gray-400" />
                <span>QR Code</span>
              </div>
            </Link>

            {/* Admin Section */}
            {role && (
              <>
                <div className="h-px my-2 bg-gray-100" />
                <Link href="/admin/events">
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-all rounded-lg hover:bg-gray-50">
                    <Settings size={18} className="text-gray-400" />
                    <span>Manage Events</span>
                  </div>
                </Link>
                <Link href="/admin/teams">
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-all rounded-lg hover:bg-gray-50">
                    <Users size={18} className="text-gray-400" />
                    <span>Manage Teams</span>
                  </div>
                </Link>
                <Link href="/admin/users">
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-all rounded-lg hover:bg-gray-50">
                    <Settings size={18} className="text-gray-400" />
                    <span>Manage Users</span>
                  </div>
                </Link>
              </>
            )}

            {/* Logout Button */}
            <div className="h-px my-2 bg-gray-100" />
            <button
              onClick={logoutUser}
              className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 transition-all rounded-lg hover:bg-red-50"
            >
              <LogoutOutlined className="text-red-500" />
              <span>Logout</span>
            </button>
          </div>
        }
      >
        <img
          className="object-cover w-10 h-10 transition-transform border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:ring-2 hover:ring-gray-300 hover:scale-105"
          src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
            profilePicture ?? DEFAULT_PROFILE_PICTURE
          }`}
          alt="User Avatar"
        />
      </Popover>
    </div>
  ) : (
    <div className="flex space-x-4">
      <Link href="/login">
        <button className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-blue-600 transition-all bg-white border border-blue-500 rounded-lg shadow-sm hover:bg-blue-50 hover:shadow-md focus:ring-2 focus:ring-blue-300">
          <LogIn size={16} /> Login
        </button>
      </Link>
      <Link href="/register">
        <button className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white transition-all bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 hover:shadow-md focus:ring-2 focus:ring-blue-300">
          <CheckCircle size={16} /> Register
        </button>
      </Link>
    </div>
  );
};

export default NavbarDesktopAccount;
