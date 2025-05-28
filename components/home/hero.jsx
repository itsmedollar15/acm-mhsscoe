"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Code, Sparkles } from "lucide-react";
import { titleAnimation, fadeIn, buttonHover } from "@/utils/animation";

const buttonContainer = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

const buttonItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  return (
    <section className="flex overflow-hidden relative justify-center items-center pt-16 min-h-screen">
      {/* Enhanced Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0"></div>
        <div
          className="absolute inset-0 opacity-10 transform scale-110 rotate-3"
          style={{
            backgroundImage: `url('/images/circuit-pattern.svg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            animation: "patternFloat 20s linear infinite",
          }}
        ></div>
        <div className="absolute -left-24 top-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-30 mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -right-4 top-1/4 w-96 h-96 bg-blue-100 rounded-full opacity-30 mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 px-6 mx-auto max-w-6xl text-center">
        {/* Enhanced Main Title with Animation */}
        <motion.div
          className="inline-block relative mb-4"
          initial="hidden"
          animate="visible"
          variants={titleAnimation}
        >
          <h1
            className="text-[14vw] sm:text-[12vw] md:text-[9vw] lg:text-[7vw] font-black tracking-tight leading-none text-transparent bg-clip-text select-none"
            style={{
              backgroundImage: `url('/images/cloudy.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              color: "transparent",
              filter: "contrast(1.2) brightness(0.9)",
              textShadow: "0 0 80px rgba(0,123,255,0.3)",
              letterSpacing: "-0.02em",
            }}
          >
            ACM MHSSCOE
          </h1>
          <motion.div
            className="absolute -top-12 -right-12 text-[#007bff] opacity-10"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            <Code size={100} strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Enhanced Student Chapter */}
        <motion.div
          className="mt-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#007bff] drop-shadow-sm">
            Student Chapter
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-normal text-gray-700 md:text-3xl">
            M.H. Saboo Siddik College of Engineering
          </p>
          <p className="mt-1 text-lg font-bold tracking-widest text-blue-500/90">
            2024-2025
          </p>
        </motion.div>

        {/* Enhanced Tagline */}
        <motion.div
          className="flex gap-4 justify-center items-center mt-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Sparkles className="w-6 h-6 text-[#007bff]" strokeWidth={1.5} />
          </motion.div>
          <p className="text-xl font-medium tracking-wide text-gray-600 md:text-xl">
            Where Innovation Meets Excellence
          </p>
          <motion.div
            animate={{
              rotate: [0, -15, 15, 0],
              scale: [1, 1.2, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Sparkles className="w-6 h-6 text-[#007bff]" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-5 justify-center items-center mt-8"
          initial="hidden"
          animate="visible"
          variants={buttonContainer}
        >
          <motion.div variants={buttonItem} whileHover={buttonHover.whileHover}>
            <a
              href="https://forms.gle/ZUgCoh3vRf1tg5NR8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center gap-3 px-8 py-4 text-base font-bold text-white transition-all bg-[#007bff] rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-blue-500/50 group">
                <Users
                  className="transition-transform group-hover:scale-110"
                  size={20}
                  strokeWidth={2}
                />
                <span className="relative">
                  Join ACM MHSSCOE
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                </span>
              </button>
            </a>
          </motion.div>

          <motion.div variants={buttonItem} whileHover={buttonHover.whileHover}>
            <Link href="/teams">
              <button className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-[#007bff] transition-all bg-white/90 backdrop-blur-sm border-2 border-[#007bff] rounded-xl shadow-lg hover:bg-blue-50 hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-blue-500/50 group">
                <span className="relative">
                  Explore Our Team
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#007bff] transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                </span>
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={20}
                  strokeWidth={2}
                />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes patternFloat {
          0% {
            transform: rotate(3deg) scale(1.1) translateY(0);
          }
          50% {
            transform: rotate(3deg) scale(1.1) translateY(-20px);
          }
          100% {
            transform: rotate(3deg) scale(1.1) translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
