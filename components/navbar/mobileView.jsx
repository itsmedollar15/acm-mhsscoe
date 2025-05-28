import React from "react";
import NavbarLogo from "./logo";
import { Divider, Menu } from "antd";
import Link from "next/link";
import { LogIn, LogOut, CheckCircle, X, UserPlus } from "lucide-react";
import Glassmorphism from "../common/glassmorphism";
import { NAVBAR_AUTH_LINKS, NAVBAR_LINKS } from "@/constants/navbarItems";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logoutState } from "@/redux/reducers/authReducer";
import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";
import { getFilteredLinksByRole } from "@/utils/auth";
import { BookOpen } from "lucide-react";
import Image from "next/image";

const NavbarMobileView = ({ closeMobileNav, logoutUser }) => {
  const pathname = usePathname();
  const normalizedPathname =
    pathname.includes("/teams/") && !pathname.includes("/admin/")
      ? "/teams"
      : pathname;

  const { isLoggedIn, isAuthLoading, role, name, email, profilePicture } =
    useSelector((state) => state.auth);

  const filteredLinks = React.useMemo(() => {
    if (typeof getFilteredLinksByRole !== "function") {
      console.error("getFilteredLinksByRole is not a function");
      return [];
    }
    return getFilteredLinksByRole(NAVBAR_AUTH_LINKS, role);
  }, [role]);

  if (isAuthLoading) {
    return (
      <div className="fixed top-0 right-0 left-0 z-50 w-full h-screen bg-white shadow-xl">
        <div className="flex flex-col gap-4 items-center p-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="mt-4 w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  const mobileNavLinks = [
    ...NAVBAR_LINKS,
    // {
    //   key: "/magazines",
    //   icon: <BookOpen size={20} />,
    //   label: <Link href="/magazines">Magazines</Link>,
    // },
  ];

  return (
    <div
      className="overflow-y-auto fixed top-0 right-0 left-0 z-50 w-full h-screen bg-white shadow-xl"
      onClick={(e) => {
        // Only close if clicking the backdrop
        if (e.target === e.currentTarget) {
          closeMobileNav();
        }
      }}
    >
      <Glassmorphism className="sticky top-0 z-50 rounded-none border-b border-gray-300">
        <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-100 to-white">
          <NavbarLogo />
          <button
            onClick={closeMobileNav}
            className="p-2 rounded-md border border-gray-300 shadow-md backdrop-blur-lg bg-white/20 hover:bg-gray-200"
            type="button"
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
              onClick={closeMobileNav}
            >
              <div className="flex gap-4 items-center p-4 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex-grow truncate">
                  <p className="text-lg font-bold truncate">{name}</p>
                  <p className="text-sm text-gray-600 truncate">{email}</p>
                </div>
                <div className="overflow-hidden w-14 h-14 rounded-full border border-gray-400">
                  <Image
                    className="object-cover w-full h-full"
                    src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
                      profilePicture ?? DEFAULT_PROFILE_PICTURE
                    }`}
                    alt={`${name}'s profile picture`}
                    width={56}
                    height={56}
                  />
                </div>
              </div>
            </Link>
            <Divider className="my-3" />
          </>
        )}

        <Menu
          className="w-full text-lg font-semibold"
          selectedKeys={[normalizedPathname]}
          items={mobileNavLinks}
          onClick={({ key }) => {
            closeMobileNav();
          }}
        />

        {isLoggedIn ? (
          <>
            <Divider className="my-3" />
            <Menu
              className="w-full text-lg font-bold"
              mode="inline"
              selectedKeys={[normalizedPathname]}
              items={filteredLinks}
              onClick={closeMobileNav}
            />
            <button
              className="flex gap-3 items-center px-6 py-3 mt-4 w-full font-bold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700"
              onClick={logoutUser}
              type="button"
            >
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Divider className="my-3" />
            <Link href="/login" onClick={closeMobileNav}>
              <button
                className="flex gap-3 items-center px-6 py-3 mt-4 w-full font-bold text-blue-500 bg-white rounded-lg border border-blue-500 shadow-md hover:bg-blue-50"
                type="button"
              >
                <LogIn size={18} /> Login
              </button>
            </Link>
            <Link href="/register" onClick={closeMobileNav}>
              <button
                className="flex gap-3 items-center px-6 py-3 mt-4 w-full font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
                type="button"
              >
                <UserPlus size={18} /> Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarMobileView;
