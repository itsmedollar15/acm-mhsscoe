"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// Dummy video data
const VIDEO_FILES = [
  {
    src: "/videos/1.mp4",
    title: "Welcome to ACM Student Chapter",
  },
  {
    src: "/videos/1.mp4",
    title: "Our Latest Event Highlights",
  },
  {
    src: "/videos/1.mp4",
    title: "Student Activities and Workshops",
  },
];

export default function VideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const goBack = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? VIDEO_FILES.length - 1 : prev - 1
      );
      setFade(false);
    }, 500);
  };

  const goForward = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === VIDEO_FILES.length - 1 ? 0 : prev + 1
      );
      setFade(false);
    }, 500);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("play", () => setIsPlaying(true));
      videoRef.current.addEventListener("pause", () => setIsPlaying(false));
      videoRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        goForward();
      });
    }
  }, [currentIndex]);

  return (
    <section className="relative py-16 mt-16 overflow-hidden">
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
          className="max-w-3xl mx-auto mb-12 text-center"
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
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden bg-gray-900 shadow-2xl aspect-video rounded-2xl">
            {/* Video */}
            <motion.video
              ref={videoRef}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                fade ? "opacity-0" : "opacity-100"
              }`}
              src={VIDEO_FILES[currentIndex].src}
              onClick={togglePlay}
              playsInline
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100">
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goBack}
                  className="flex items-center justify-center w-12 h-12 text-white transition-all rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goForward}
                  className="flex items-center justify-center w-12 h-12 text-white transition-all rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>

              {/* Play/Pause Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 text-white bg-[#007bff]/80 backdrop-blur-sm rounded-full hover:bg-[#007bff] transition-all"
              >
                {isPlaying ? (
                  <Pause size={32} />
                ) : (
                  <Play size={32} className="ml-1" />
                )}
              </motion.button>

              {/* Video Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white">
                  {VIDEO_FILES[currentIndex].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Video Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {VIDEO_FILES.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setFade(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setFade(false);
                  }, 500);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-6 bg-[#007bff]"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
