"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { textVariants } from "@/utils/animation";
import { HOME_ABOUT_IMAGES } from "@/constants/home";
import { Users, CalendarCheck, ArrowRight } from "lucide-react";

const counters = [
  { label: "Events Hosted", endValue: 50, icon: <CalendarCheck size={28} /> },
  { label: "Active Members", endValue: 200, icon: <Users size={28} /> },
];

export default function AboutSection() {
  const [currImage, setCurrImage] = useState(0);
  const [animatedValues, setAnimatedValues] = useState([0, 0]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Counter Animation
  useEffect(() => {
    if (isInView) {
      counters.forEach((counter, index) => {
        let start = 0;
        const stepTime = Math.abs(Math.floor(2000 / counter.endValue));
        const timer = setInterval(() => {
          start += 1;
          setAnimatedValues((prev) => {
            const updated = [...prev];
            updated[index] = start;
            return updated;
          });

          if (start >= counter.endValue) clearInterval(timer);
        }, stepTime);
      });
    }
  }, [isInView]);

  // Image Rotation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrImage((prev) => (prev + 1) % HOME_ABOUT_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="overflow-hidden relative py-12 sm:py-16" // Reduced padding
    >
      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 items-center lg:gap-12 lg:grid-cols-2">
          {" "}
          {/* Reduced gap */}
          {/* Left Side - Content */}
          <motion.div
            className="mx-auto max-w-xl lg:mx-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {" "}
              {/* Reduced text sizes */}
              <span className="block text-[#007bff] bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                About ACM MHSSCOE
              </span>
            </h2>
            <p className="mt-6 text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
              {" "}
              {/* Reduced text and margin */}
              MHSSCOE-ACM is a student chapter of ACM (Association for Computing
              Machinery), the world&apos;s largest educational and scientific
              computing society. Established in 2014 under the guidance of
              esteemed faculty members, this committee is dedicated to fostering{" "}
              <span className="font-bold text-blue-600">
                technical excellence
              </span>{" "}
              and leadership.
            </p>

            {/* Counters with Lucide Icons */}
            <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2">
              {" "}
              {/* Reduced gap and margin */}
              {counters.map((counter, i) => (
                <motion.div
                  key={counter.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="p-4 rounded-xl border border-blue-100 shadow-md transition-all hover:shadow-lg hover:border-blue-200 hover:-translate-y-1" // Reduced padding and shadow
                >
                  <div className="flex gap-3 items-center mb-2">
                    {" "}
                    {/* Reduced gap and margin */}
                    <span className="p-2 text-blue-600 bg-blue-50 rounded-lg">
                      {counter.icon}
                    </span>
                    <h3 className="text-2xl font-bold text-blue-600">
                      {" "}
                      {/* Reduced text size */}
                      {animatedValues[i]}+
                    </h3>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    {" "}
                    {/* Reduced text size */}
                    {counter.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8" // Reduced margin
            >
              <Link href="/teams">
                <button className="group flex items-center gap-2 px-6 py-3 text-base font-bold text-white transition-all bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] focus:ring-2 focus:ring-blue-500/30">
                  {" "}
                  {/* Reduced padding and text */}
                  More About Us
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </Link>
            </motion.div>
          </motion.div>
          {/* Right Side - Images */}
          <motion.div
            className="relative lg:pl-8" // Reduced padding
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/3] w-full">
              {/* Main Image */}
              <motion.div
                className="absolute z-10 overflow-hidden rounded-2xl w-[65%] h-[65%] top-[-15px] right-0 shadow-lg" // Reduced shadow and position
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${HOME_ABOUT_IMAGES[currImage]}`}
                  alt="ACM Activity"
                  fill
                  className="object-cover transition-transform duration-500 transform hover:scale-105" // Reduced hover scale
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Overlapping Image */}
              <motion.div
                className="absolute z-20 overflow-hidden rounded-2xl w-[85%] h-[85%] bottom-[-15px] left-0 shadow-lg" // Reduced shadow and position
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
                    HOME_ABOUT_IMAGES[
                      (currImage + 1) % HOME_ABOUT_IMAGES.length
                    ]
                  }`}
                  alt="ACM Activity 2"
                  fill
                  className="object-cover transition-transform duration-500 transform hover:scale-105" // Reduced hover scale
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
