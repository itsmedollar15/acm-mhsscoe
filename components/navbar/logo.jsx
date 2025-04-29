import React from "react";
import Link from "next/link";

const NavbarLogo = () => {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 group"
    >
      <img
        src="/logo.png"
        alt="ACM Logo"
        className="h-9 w-auto transition-transform duration-300 group-hover:rotate-[-8deg]"
      />
      <span className="hidden md:block text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
        ACM MHSSCOE
      </span>
    </Link>
  );
};

export default NavbarLogo;
