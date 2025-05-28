import React from "react";

const Glassmorphism = ({ children, className }) => {
  return (
    <div
      className={`bg-transparent rounded-lg border border-white border-opacity-20 backdrop-blur-lg ${
        className ?? ""}`}
    >
      {children}
    </div>
  );
};

export default Glassmorphism;
