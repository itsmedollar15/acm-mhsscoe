import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";
import { NAVBAR_AUTH_LINKS } from "@/constants/navbarItems";
import { LogoutOutlined } from "@ant-design/icons";
import { LogIn, CheckCircle } from "lucide-react";
import { Divider, Menu, Popover } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { getFilteredLinksByRole } from "@/utils/auth";

const NavbarDesktopAccount = ({ logoutUser }) => {
  const pathname = usePathname();
  const { isLoggedIn, role, profilePicture, name, email } = useSelector(
    (state) => state.auth
  );

  return isLoggedIn ? (
    <div className="py-1">
      <Popover
        trigger="click"
        overlayClassName="shadow-xl rounded-xl border border-gray-200"
        content={
          <div className="w-64 p-4 space-y-4 bg-white rounded-lg shadow-lg">
            {name && email && (
              <>
                <Link href={`/user?email=${email}`} className="block">
                  <div className="flex items-center gap-3 p-3 transition-all rounded-lg hover:bg-gray-100">
                    <div className="flex-grow">
                      <p className="text-base font-semibold text-gray-900 truncate">
                        {name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{email}</p>
                    </div>
                    <div className="w-12 h-12">
                      <img
                        className="object-cover w-full h-full border border-gray-300 rounded-full"
                        src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
                          profilePicture ?? DEFAULT_PROFILE_PICTURE
                        }`}
                        alt="Profile"
                      />
                    </div>
                  </div>
                </Link>
                <Divider className="my-3" />
              </>
            )}
            <Menu
              className="w-full"
              mode="inline"
              selectedKeys={[pathname]}
              items={getFilteredLinksByRole(NAVBAR_AUTH_LINKS, role)}
            />
            <button
              className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-all bg-red-500 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg focus:ring-2 focus:ring-red-300"
              onClick={logoutUser}
            >
              <LogoutOutlined />
              Logout
            </button>
          </div>
        }
      >
        <img
          className="object-cover w-10 h-10 transition-transform border border-gray-300 rounded-full shadow-sm cursor-pointer hover:ring-2 hover:ring-gray-400 hover:scale-110"
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
