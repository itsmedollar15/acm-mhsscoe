"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { VIDEO_DATA } from "@/constants/home";

export default function VideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const goBack = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? VIDEO_DATA.length - 1 : prev - 1
      );
      setFade(false);
    }, 500);
  };

  const goForward = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === VIDEO_DATA.length - 1 ? 0 : prev + 1
      );
      setFade(false);
    }, 500);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                console.error("Playback failed:", error);
                setIsPlaying(false);
              });
          }
        }
      } catch (error) {
        console.error("Video control error:", error);
        setIsPlaying(false);
      }
    }
  };

  // Reset video when changing index
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentIndex]);

  // Handle video events
  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      goForward();
    };

    if (videoElement) {
      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);
      videoElement.addEventListener("ended", handleEnded);

      return () => {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
        videoElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentIndex]);

  return (
    <section className="overflow-hidden relative py-8 mt-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/grid.svg")',
            backgroundSize: "30px 30px",
            opacity: "0.5",
          }}
        ></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-3xl text-center"
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <span className="block text-[#007bff]">Event Videos</span>
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-gray-600">
            Watch highlights from our past events and get a glimpse of the
            amazing experiences we create.
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl group"
        >
          <div className="overflow-hidden relative bg-gray-900 rounded-2xl shadow-2xl aspect-video">
            {/* Video */}
            <motion.video
              ref={videoRef}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                fade ? "opacity-0" : "opacity-100"
              }`}
              src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${VIDEO_DATA[currentIndex].src}`}
              playsInline
            />

            {/* Video Controls Overlay */}
            <div className="flex absolute inset-0 justify-center items-center opacity-0 transition-opacity duration-300 bg-black/30 group-hover:opacity-100">
              {/* Navigation Controls */}
              <div className="flex absolute inset-x-0 top-1/2 justify-between items-center px-6 -translate-y-1/2 pointer-events-none">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goBack}
                  className="flex justify-center items-center w-12 h-12 text-white rounded-full backdrop-blur-sm transition-all pointer-events-auto bg-black/40 hover:bg-black/60"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goForward}
                  className="flex justify-center items-center w-12 h-12 text-white rounded-full backdrop-blur-sm transition-all pointer-events-auto bg-black/40 hover:bg-black/60"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>

              {/* Play/Pause Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="flex items-center justify-center w-20 h-20 text-white transition-all rounded-full bg-[#007bff] shadow-lg hover:bg-[#0056b3] hover:shadow-xl cursor-pointer pointer-events-auto z-10"
              >
                {isPlaying ? (
                  <Pause size={36} className="transform-none" />
                ) : (
                  <Play size={36} className="ml-1.5 transform-none" />
                )}
              </motion.button>

              {/* Video Title */}
              <div className="absolute right-0 bottom-0 left-0 p-4 bg-gradient-to-t to-transparent from-black/80">
                <h3 className="text-xl font-semibold text-white">
                  {VIDEO_DATA[currentIndex].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Video Navigation Dots */}
          <div className="flex gap-3 justify-center mt-6">
            {VIDEO_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                  }
                  setFade(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setFade(false);
                  }, 500);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-blue-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
