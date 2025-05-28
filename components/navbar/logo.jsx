import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="flex gap-2 items-center transition-transform duration-300 hover:scale-105 group"
    >
      <Image
        src="/logo.png"
        alt="ACM Logo"
        width={36}
        height={36}
        className="h-9 w-auto transition-transform duration-300 group-hover:rotate-[-8deg]"
      />
      <span className="hidden text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500 md:block">
        ACM MHSSCOE
      </span>
    </Link>
  );
};

export default NavbarLogo;
