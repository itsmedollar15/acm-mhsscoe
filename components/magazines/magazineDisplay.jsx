"use client";

import MagazineCard from "@/components/magazines/magazineCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "antd";
import Link from "next/link";
import React, { useRef } from "react";
import {
  ResponsiveContainer,
  StackedCarousel,
} from "react-stacked-center-carousel";

const MagazineDisplay = ({ magazines }) => {
  const imgStackRef = useRef();

  return (
    <div className="w-full">
      {/* Our Magazines Section */}
      <div className="mt-10 text-center">
        <h2 className="text-3xl mt-16 font-extrabold text-blue-600 sm:text-4xl md:text-5xl relative inline-block pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-blue-200 after:rounded-full">
          Our Magazines
        </h2>
        <p className="mt-4 text-gray-600 text-md md:text-lg">
          Discover our latest magazines and articles
        </p>
      </div>

      {/* Magazine Carousel */}
      <div className="relative flex justify-center items-center gap-10 h-[calc(100vh-64px-40px)]">
        <div className="flex items-center justify-center w-full h-full">
          {magazines.length > 0 && (
            <ResponsiveContainer
              carouselRef={imgStackRef}
              render={(parentWidth, carouselRef) => {
                return (
                  <StackedCarousel
                    ref={carouselRef}
                    slideComponent={({ data: magazines, dataIndex }) => {
                      return (
                        <div
                          key={`magazines_page_thumbnail_${dataIndex}`}
                          className="my-10 w-full aspect-[1/1.414] transform transition-all duration-500 hover:scale-[1.02]"
                          data-aos="zoom-in"
                        >
                          <Link href={`/magazines/${magazines[dataIndex]._id}`}>
                            <div className="relative group">
                              <div className="absolute transition duration-500 opacity-25 -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur group-hover:opacity-50"></div>
                              <div className="relative">
                                <MagazineCard {...magazines[dataIndex]} />
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    }}
                    data={magazines}
                    slideWidth={
                      parentWidth > 480
                        ? parentWidth / (window.innerHeight - 104) > 1
                          ? (window.innerHeight - 244) / 1.414
                          : parentWidth - 250
                        : parentWidth - 64
                    }
                    carouselWidth={parentWidth}
                    maxVisibleSlide={5}
                    disableSwipe
                    transitionTime={450}
                  />
                );
              }}
            />
          )}
        </div>

        {/* Carousel Navigation Buttons */}
        <Button
          className="!absolute left-5 top-1/2 -translate-y-1/2 z-[3] !w-12 !h-12 !rounded-full !flex !items-center !justify-center hover:!scale-110 transition-transform"
          onClick={() => imgStackRef.current?.goBack()}
          icon={<ChevronLeft size={24} className="text-blue-600" />}
          type="text"
        />
        <Button
          className="!absolute right-5 top-1/2 -translate-y-1/2 z-[3] !w-12 !h-12 !rounded-full !flex !items-center !justify-center hover:!scale-110 transition-transform"
          onClick={() => imgStackRef.current?.goNext()}
          icon={<ChevronRight size={24} className="text-blue-600" />}
          type="text"
        />
      </div>
    </div>
  );
};

export default MagazineDisplay;
