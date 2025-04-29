import React from "react";

const MagazineCard = ({ title, description, thumbnail }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg group">
      {/* Image */}
      <img
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${thumbnail}`}
        alt={title}
      />
      {/* Card Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end w-full h-full gap-3 p-5 text-white transition-all duration-300 ease-in-out opacity-0 md:gap-5 group-hover:opacity-100 bg-gradient-to-t from-primary to-primary-light/50">
        <h2 className="text-2xl font-bold md:text-4xl">{title}</h2>
        <p className="text-base md:text-lg">{description}</p>
      </div>
    </div>
  );
};

export default MagazineCard;
