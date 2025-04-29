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
    <section className="relative flex items-center justify-center min-h-screen pt-24 mt-0 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 "></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('/images/circuit-pattern.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        <div className="absolute bg-blue-200 rounded-full top-1/4 -left-24 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bg-indigo-200 rounded-full top-1/4 -right-4 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-6 mx-auto text-center">
        {/* Main Title with Animation */}
        <motion.div
          className="relative inline-block"
          initial="hidden"
          animate="visible"
          variants={titleAnimation}
        >
          <h1
            className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-black tracking-tight leading-none text-transparent bg-clip-text select-none"
            style={{
              backgroundImage: `url('/images/cloudy.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              filter: 'contrast(1.2) brightness(0.9)',
              textShadow: '0 0 80px rgba(0,123,255,0.2)'
            }}
          >
            ACM MHSSCOE
          </h1>
          <motion.div
            className="absolute -top-12 -right-12 text-[#007bff] opacity-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Code size={100} strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Student Chapter */}
        <motion.div
          className="mt-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#007bff]">
            Student Chapter
          </h2>
          <p className="mt-4 text-2xl font-bold tracking-normal text-gray-700 md:text-2xl">
            M.H. Saboo Siddik College of Engineering
          </p>
          <p className="mt-2 text-lg font-bold tracking-widest text-blue-500/90">
            2025-26
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Sparkles className="w-6 h-6 text-[#007bff]" strokeWidth={1.5} />
          <p className="text-xl font-medium tracking-wide text-gray-600 md:text-2xl">
            Where Innovation Meets Excellence
          </p>
          <Sparkles className="w-6 h-6 text-[#007bff]" strokeWidth={1.5} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-5 mt-12"
          initial="hidden"
          animate="visible"
          variants={buttonContainer}
        >
          <motion.div variants={buttonItem} whileHover={buttonHover.whileHover}>
            <Link href="/register">
              <button className="flex items-center gap-3 px-8 py-4 text-base font-bold text-white transition-all bg-[#007bff] rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-blue-500/50">
                <Users size={20} strokeWidth={2} /> Join ACM MHSSCOE
              </button>
            </Link>
          </motion.div>

          <motion.div variants={buttonItem} whileHover={buttonHover.whileHover}>
            <Link href="/teams">
              <button className="flex items-center gap-3 px-8 py-4 text-base font-bold text-[#007bff] transition-all bg-white/90 backdrop-blur-sm border-2 border-[#007bff] rounded-xl shadow-lg hover:bg-blue-50 hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-blue-500/50">
                Explore Our Team <ArrowRight size={20} strokeWidth={2} />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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
