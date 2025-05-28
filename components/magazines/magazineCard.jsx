import React from "react";
import Image from "next/image";

const MagazineCard = ({ title, description, thumbnail }) => {
  return (
    <div className="overflow-hidden relative w-full h-full rounded-lg group">
      {/* Image */}
      <Image
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${thumbnail}`}
        alt={title}
        width={400}
        height={300}
        loading="lazy"
        quality={75}
      />
      {/* Card Overlay */}
      <div className="flex absolute inset-0 flex-col gap-3 justify-end p-5 w-full h-full text-white bg-gradient-to-t opacity-0 transition-all duration-300 ease-in-out md:gap-5 group-hover:opacity-100 from-primary to-primary-light/50">
        <h2 className="text-2xl font-bold md:text-4xl">{title}</h2>
        <p className="text-base md:text-lg">{description}</p>
      </div>
    </div>
  );
};

export default MagazineCard;
