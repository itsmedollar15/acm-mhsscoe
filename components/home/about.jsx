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
      className="relative py-16 mt-16 overflow-hidden"
    >
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
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Side - Content */}
          <motion.div
            className="max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              <span className="block text-[#007bff]">About ACM MHSSCOE</span>
              {/* <span className="block mt-2">Fostering Innovation & Excellence</span> */}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              MHSSCOE-ACM is a student chapter of ACM (Association for Computing
              Machinery), the world&apos;s largest educational and scientific
              computing society. Established in 2014 under the guidance of
              esteemed faculty members, this committee is dedicated to fostering{" "}
              <span className="font-semibold">technical excellence</span> and
              leadership.
            </p>

            {/* Counters with Lucide Icons */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {counters.map((counter, i) => (
                <motion.div
                  key={counter.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="p-5 transition-all bg-blue-50 rounded-xl hover:bg-blue-100"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-blue-100 rounded-lg text-[#007bff]">
                      {counter.icon}
                    </span>
                    <h3 className="text-2xl font-bold text-[#007bff]">
                      {animatedValues[i]}+
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    {counter.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Link href="/teams">
                <button className="flex items-center gap-2 px-6 py-3 text-base font-bold text-white transition-all bg-[#007bff] rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-blue-500/50">
                  More About Us <ArrowRight size={20} />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Images */}
          <motion.div
            className="relative lg:pl-10"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/3] w-full">
              {/* Main Image */}
              <motion.div
                className="absolute z-10 overflow-hidden rounded-2xl w-[85%] h-[85%] top-0 right-0 shadow-xl"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${HOME_ABOUT_IMAGES[currImage]}`}
                  alt="ACM Activity"
                  fill
                  className="object-cover transition-transform duration-500 transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Overlapping Image */}
              <motion.div
                className="absolute z-20 overflow-hidden rounded-2xl w-[65%] h-[65%] bottom-0 left-0 shadow-2xl"
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
                  className="object-cover transition-transform duration-500 transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute z-0 w-40 h-40 rounded-full bg-blue-100/50 -top-6 -right-6 blur-2xl"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              <motion.div
                className="absolute z-0 w-40 h-40 rounded-full bg-indigo-100/50 -bottom-6 -left-6 blur-2xl"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
