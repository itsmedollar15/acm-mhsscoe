"use client";
import React from "react";
import { useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";

const AppLoading = () => {
  const { isLoading } = useSelector((state) => state.common);
  if (isLoading)
    return (
      <div className="fixed top-0 z-[10] h-screen w-full overflow-hidden bg-white bg-opacity-40 flex justify-center items-center">
        <PropagateLoader color="#1677ff" size={30} />
      </div>
    );

  return <></>;
};

export default AppLoading;
