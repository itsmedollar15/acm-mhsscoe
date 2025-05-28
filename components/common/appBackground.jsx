import React from "react";

const AppBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />

      {/* Animated Shapes */}
      <div className="overflow-hidden absolute inset-0">
        {/* Top Right Blob */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob" />

        {/* Bottom Left Blob */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />

        {/* Center Blob */}
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-200 rounded-full opacity-20 mix-blend-multiply filter blur-xl transform -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-4000" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                           linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};

export default AppBackground;
