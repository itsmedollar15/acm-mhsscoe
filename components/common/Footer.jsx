import { NAVBAR_LINKS } from "@/constants/navbarItems";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const AppFooter = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#0a1930] via-[#112244] to-[#0a1930] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-[#007bff] via-[#0056b3] to-[#007bff] animate-gradient bg-[length:400%_400%]"></div>
      </div>

      <div className="relative px-6 py-10 mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12">
          {/* Logo & About Section */}
          <div className="space-y-4 lg:col-span-5">
            <Image
              className="w-32 transition-opacity hover:opacity-90"
              src="/logo.png"
              alt="Logo"
              width={128}
              height={128}
            />
            <p className="max-w-md text-[15px] leading-relaxed text-gray-200 font-medium">
              A team of students organizing and managing technical &
              extra-curricular events, workshops, and competitions.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/acm_mhssce"
                target="_blank"
                className="p-2 text-gray-300 rounded-full transition-all duration-200 hover:text-pink-500 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/acm-mhsscoe-b6b54824a"
                target="_blank"
                className="p-2 text-gray-300 transition-all duration-200 rounded-full hover:text-[#007bff] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#007bff]/40"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-[15px] text-gray-200">
              {NAVBAR_LINKS.map(({ label, href }, index) => (
                <li
                  key={`footer_useful_link_${index}`}
                  className="transition-colors duration-200 hover:text-[#007bff] w-fit"
                >
                  <Link
                    href={href || "#"}
                    prefetch={false}
                    className="inline-flex items-center gap-1.5 hover:gap-2 transition-all duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & College Info */}
          <div className="lg:col-span-4">
            <h3 className="mb-4 text-lg font-semibold text-white">
              M. H. Saboo Siddik College of Engineering
            </h3>
            <div className="space-y-4">
              <Link
                href="https://mhssce.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[15px] text-gray-200 transition-all duration-200 hover:text-[#007bff] group font-medium"
              >
                <ExternalLink
                  size={18}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                mhssce.ac.in
              </Link>
              <div className="space-y-2">
                <p className="text-[15px] text-gray-300 font-medium">
                  8, Saboo Siddik Polytechnic Road, Byculla, Mumbai - 400008
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 mt-8 text-sm text-center text-gray-300 border-t border-gray-800/50">
          <div className="mx-auto max-w-2xl">
            © {new Date().getFullYear()} All rights reserved | Designed &
            Developed by MHSSCOE ACM Webmasters
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
