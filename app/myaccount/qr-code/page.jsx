"use client";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useSelector } from "react-redux";
import colors from "tailwindcss/colors";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const MyProfileQrCodePage = () => {
  const { email } = useSelector((state) => state.auth);
  const [link, setLink] = useState("");

  useEffect(() => {
    if (email)
      setLink(
        decodeURIComponent(new URL(`/user?email=${email}`, window.location.href).toString())
      );
  }, [email]);

  if (!link) return <></>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 mt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px'
      }}></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/myaccount"
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-gray-600 transition-colors rounded-lg hover:text-blue-600 hover:bg-blue-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </Link>

        {/* Main Content */}
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Profile QR Code</h1>
            <p className="text-gray-600">Share your profile by showing this QR code to others</p>
          </div>

          {/* QR Code Card */}
      <Link href={link} target="_blank">
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200/50">
              {/* QR Code */}
              <div className="flex justify-center">
          <div className="hidden sm:block">
            <QRCode
                    size={360}
              value={link}
              qrStyle="dots"
                    eyeColor={colors.blue[600]}
              bgColor="transparent"
                    fgColor={colors.blue[600]}
              eyeRadius={45}
            />
          </div>
          <div className="sm:hidden">
            <QRCode
                    size={220}
              value={link}
              qrStyle="dots"
                    eyeColor={colors.blue[600]}
              bgColor="transparent"
                    fgColor={colors.blue[600]}
              eyeRadius={45}
            />
          </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-blue-600/0 rounded-2xl transition-all duration-300 group-hover:bg-blue-600/5">
                <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-sm font-medium text-blue-600 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  View Profile
                </span>
              </div>
            </div>
      </Link>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-600 text-center">
              Click on the QR code to open your profile in a new tab
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileQrCodePage;
