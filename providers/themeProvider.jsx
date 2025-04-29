"use client";
import { ConfigProvider } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ThemeProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    }); // Initialize AOS
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          screenXSMin: 480,
          screenXS: 480,
          screenXSMax: 640,

          screenSMMin: 640,
          screenSM: 640,
          screenSMMax: 767,

          screenMDMin: 768,
          screenMD: 768,
          screenMDMax: 1023,

          screenLGMin: 1024,
          screenLG: 1024,
          screenLGMax: 1279,

          screenXLMin: 1280,
          screenXL: 1280,
          screenXLMax: 1535,

          screenXXLMin: 1536,
          screenXXL: 1536,
        },
      }}
      // theme={{
      //   token: {
      //     colorPrimary: "#8a2be2",
      //     colorLink: "#8a2be2",
      //     colorLinkHover: "#aa54f0",
      //   },
      // }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
