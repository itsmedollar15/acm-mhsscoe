import React from "react";
import NavbarLogo from "./logo";
import { Divider, Menu } from "antd";
import Link from "next/link";
import { LogIn, LogOut, CheckCircle, X } from "lucide-react";
import Glassmorphism from "../common/glassmorphism";
import { NAVBAR_AUTH_LINKS, NAVBAR_LINKS } from "@/constants/navbarItems";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";
import { getFilteredLinksByRole } from "../../utils/auth";

const NavbarMobileView = ({ closeMobileNav, logoutUser }) => {
  let pathname = usePathname();
  if (pathname.includes("/teams/") && !pathname.includes("/admin/"))
    pathname = "/teams";

  const { isLoggedIn, role, name, email, profilePicture } = useSelector(
    (state) => state.auth
  );

  const filteredLinks = React.useMemo(() => {
    if (typeof getFilteredLinksByRole !== 'function') {
      console.error('getFilteredLinksByRole is not a function');
      return [];
    }
    return getFilteredLinksByRole(NAVBAR_AUTH_LINKS, role);
  }, [role]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full h-screen overflow-y-auto bg-white shadow-xl"
      onClick={closeMobileNav}
    >
      <Glassmorphism className="sticky top-0 z-50 border-b border-gray-300 rounded-none">
        <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-100 to-white">
          <NavbarLogo />
          <button
            onClick={closeMobileNav}
            className="p-2 border border-gray-300 rounded-md shadow-md bg-white/20 backdrop-blur-lg hover:bg-gray-200"
          >
            <X
              size={28}
              className="text-gray-800 transition-transform duration-300 cursor-pointer hover:rotate-90 hover:scale-110"
            />
          </button>
        </nav>
      </Glassmorphism>

      <div className="px-6 py-6 space-y-5">
        {isLoggedIn && name && email && (
          <>
            <Link
              href={`/user?email=${email}`}
              className="block font-semibold text-gray-900 hover:text-gray-700"
            >
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex-grow truncate">
                  <p className="text-lg font-bold truncate">{name}</p>
                  <p className="text-sm text-gray-600 truncate">{email}</p>
                </div>
                {profilePicture && (
                  <div className="overflow-hidden border border-gray-400 rounded-full w-14 h-14">
                    <img
                      className="object-cover w-full h-full"
                      src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
                        profilePicture ?? DEFAULT_PROFILE_PICTURE
                      }`}
                      alt="Profile"
                    />
                  </div>
                )}
              </div>
            </Link>
            <Divider className="my-3" />
          </>
        )}

        <Menu
          className="w-full text-lg font-semibold"
          selectedKeys={[pathname]}
          items={NAVBAR_LINKS}
        />

        {isLoggedIn ? (
          <>
            <Divider className="my-3" />
            <Menu
              className="w-full text-lg font-bold"
              mode="inline"
              selectedKeys={[pathname]}
              items={filteredLinks}
              onClick={closeMobileNav}
            />
            <button
              className="flex items-center w-full gap-3 px-6 py-3 mt-4 font-bold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                logoutUser();
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Divider className="my-3" />
            <Link href="/login">
              <button className="flex items-center w-full gap-3 px-6 py-3 mt-4 font-bold text-blue-600 bg-white border border-blue-600 rounded-lg shadow-md hover:bg-blue-50">
                <LogIn size={18} /> Login
              </button>
            </Link>
            <Link href="/register">
              <button className="flex items-center w-full gap-3 px-6 py-3 mt-4 font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
                <CheckCircle size={18} /> Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarMobileView;
