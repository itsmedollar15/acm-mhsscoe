"use client";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useSelector } from "react-redux";
import colors from "tailwindcss/colors";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button, message } from "antd";

const MyProfileQrCodePage = () => {
  const { email } = useSelector((state) => state.auth);
  const [link, setLink] = useState("");

  useEffect(() => {
    if (email)
      setLink(
        decodeURIComponent(new URL(`/user?email=${email}`, window.location.href).toString())
      );
  }, [email]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'My ACM Profile',
        text: 'Check out my ACM profile!',
        url: link
      });
    } catch (error) {
      message.info('Sharing is not supported on this device');
    }
  };

  if (!link) return <></>;

  return (
    <div className="min-h-[calc(100vh-64px)]  mt-16">
      <div className="relative container mx-auto px-4 py-8">
        <Link 
          href="/myaccount"
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-gray-600 transition-colors rounded-lg hover:text-blue-600 hover:bg-blue-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </Link>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Profile QR Code</h1>
            <p className="text-sm text-gray-600">Scan to view profile</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-center mb-4">
              <div className="hidden sm:block cursor-pointer" onClick={() => window.location.href = link}>
                <QRCode
                  size={260}  // Increased size
                  value={link}
                  qrStyle="dots"
                  eyeColor={colors.blue[600]}
                  bgColor="transparent"
                  fgColor={colors.blue[600]}
                  eyeRadius={8}
                />
              </div>
              <div className="sm:hidden cursor-pointer" onClick={() => window.location.href = link}>
                <QRCode
                  size={200}  // Increased size
                  value={link}
                  qrStyle="dots"
                  eyeColor={colors.blue[600]}
                  bgColor="transparent"
                  fgColor={colors.blue[600]}
                  eyeRadius={8}
                />
              </div>
            </div>

            <Button 
              type="primary"
              icon={<Share2 className="w-4 h-4" />}
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 !bg-blue-600 !border-blue-600 hover:!bg-blue-600 hover:!border-blue-600"
            >
              Share Profile Link
            </Button>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-sm font-medium text-blue-900 mb-2">How to use</h3>
            <ul className="text-sm space-y-1.5 text-blue-700">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>Open camera and point at QR code</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>Tap the notification</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>View profile in browser</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileQrCodePage;
