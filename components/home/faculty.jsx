"use client";

import { FACULTY_INCHARGES } from "@/constants/home";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import Image from "next/image";

export default function FacultySection() {
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
            <span className="block text-[#007bff]">Meet Our Faculty</span>
            {/* <span className="block mt-2">Guiding Lights of Innovation</span> */}
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-gray-600">
            Our dedicated faculty members who inspire and guide students towards
            excellence.
          </p>
        </motion.div>

        {/* Faculty Grid */}
        <div className="flex flex-wrap gap-6 justify-center">
          {FACULTY_INCHARGES.map((faculty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-[280px] max-w-[320px]"
            >
              <div className="overflow-hidden relative bg-white rounded-xl shadow-sm transition-all duration-300 group hover:shadow-lg hover:-translate-y-1">
                {/* Faculty Image Container */}
                <div className="relative pt-[100%] overflow-hidden">
                  {/* Background Blur */}
                  <div className="absolute inset-0">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${faculty.photo}`}
                      alt={faculty.name}
                      className="object-cover w-full h-full opacity-30 blur-md scale-110"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Main Image */}
                  <div className="flex absolute inset-0 z-10 justify-center items-center p-4">
                    <div className="overflow-hidden relative w-40 h-40 rounded-full border-4 border-white shadow-lg">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${faculty.photo}`}
                        alt={faculty.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        fill
                        sizes="160px"
                      />
                    </div>
                  </div>

                  {/* Social Links Overlay */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-t to-transparent opacity-0 transition-all duration-300 from-black/90 via-black/40 group-hover:opacity-100">
                    <div className="flex absolute right-0 left-0 bottom-4 gap-3 justify-center transition-transform duration-300 translate-y-8 group-hover:translate-y-0">
                      {faculty.linkedin && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={faculty.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white bg-[#0077b5] rounded-full hover:bg-[#0077b5]/80 transition-all hover:shadow-lg"
                        >
                          <FaLinkedin size={18} />
                        </motion.a>
                      )}
                      {faculty.instagram && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={faculty.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white bg-[#E4405F] rounded-full hover:bg-[#E4405F]/80 transition-all hover:shadow-lg"
                        >
                          <FaInstagram size={18} />
                        </motion.a>
                      )}
                      {faculty.github && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={faculty.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white bg-[#333] rounded-full hover:bg-[#333]/80 transition-all hover:shadow-lg"
                        >
                          <FaGithub size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Faculty Info */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {faculty.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{faculty.post}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
