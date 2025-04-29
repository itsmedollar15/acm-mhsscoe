import React from "react";

const Glassmorphism = ({ children, className }) => {
  return (
    <div
      className={`${
        className ?? ""
      } bg-transparent border border-white border-opacity-20 rounded-lg backdrop-blur-lg`}
    >
      {children}
    </div>
  );
};

export default Glassmorphism;
