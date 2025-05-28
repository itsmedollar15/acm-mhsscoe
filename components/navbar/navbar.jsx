"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Grid, message as showMessage } from "antd";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Home,
  Trophy,
  Users,
  BookOpen,
  Image as ImageIcon,
} from "lucide-react";
import NavbarDesktopAccount from "./desktopAccount";
import NavbarMobileView from "./mobileView";
import UserService from "@/services/user";
import { getFilteredLinksByRole } from "@/utils/auth";
import Image from "next/image";

const AppNavbar = () => {
  const { sm } = Grid.useBreakpoint();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  const logoutUser = async () => {
    UserService.logout()
      .then((message) => {
        showMessage.success(message);
        router.replace("/login");
      })
      .catch((message) => showMessage.error(message));
  };

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "auto";
  }, [isMobileNavOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "shadow-sm backdrop-blur-lg bg-white/80"
            : "bg-transparent"
        }`}
      >
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="ACM MHSSCOE"
                width={48}
                height={48}
                className="object-contain w-12 h-12"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:items-center md:gap-2">
              <Link
                href="/"
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                  pathname === "/"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link
                href="/events"
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                  pathname === "/events"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Trophy size={18} />
                <span>Events</span>
              </Link>
              <Link
                href="/teams"
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                  pathname === "/teams"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Users size={18} />
                <span>Our Team</span>
              </Link>
              <Link
                href="/magazines"
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                  pathname === "/magazines"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <BookOpen size={18} />
                <span>Magazines</span>
              </Link>
            </div>

            {/* Desktop Account Section */}
            <div className="hidden md:block">
              <NavbarDesktopAccount logoutUser={logoutUser} />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="p-2 md:hidden"
              onClick={() => setMobileNavOpen(!isMobileNavOpen)}
            >
              <Menu size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {!sm && isMobileNavOpen && (
        <NavbarMobileView
          pathname={pathname}
          closeMobileNav={closeMobileNav}
          logoutUser={logoutUser}
          getFilteredLinksByRole={getFilteredLinksByRole}
        />
      )}
    </>
  );
};

export default AppNavbar;
