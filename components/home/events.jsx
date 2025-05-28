"use client";

import { useState, useEffect } from "react";
import { getAllEvents } from "@/actions/events";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

const HomeEventsSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data.reverse().slice(0, 3));
      } catch (error) {
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="overflow-hidden relative py-12 mt-8 min-h-screen">
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
          className="mx-auto mb-8 max-w-3xl text-center" // Reduced mb-12 to mb-8
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <span className="block text-[#007bff]">Recent Events</span>
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-gray-600">
            Discover our latest events and activities designed to enhance your
            technical skills and connect with fellow tech enthusiasts.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <Link href={`/events/${event._id}`}>
                <div className="overflow-hidden relative bg-white rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  {/* Image Container with Background */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {/* Blurred Background */}
                    <div className="absolute inset-0 opacity-30">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${event.poster}`}
                        alt="background"
                        fill
                        className="object-cover blur-sm scale-110"
                      />
                    </div>

                    {/* Main Image */}
                    <div className="flex relative z-10 justify-center items-center p-4 w-full h-full">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${event.poster}`}
                        alt={event.title}
                        fill
                        className="object-contain transition-transform duration-700 transform group-hover:scale-105"
                      />
                    </div>

                    {/* Event Date Overlay */}
                    <div className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full backdrop-blur-sm bg-white/90">
                      <div className="flex gap-2 items-center">
                        <Calendar className="w-4 h-4 text-[#007bff]" />
                        <span className="text-sm font-medium text-gray-800">
                          {new Date(event.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="mb-4 text-gray-600 line-clamp-2">
                      {event.description}
                    </p>

                    {/* CTA */}
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2 text-[#007bff]">
                        <span className="text-sm font-semibold">
                          Learn More
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Events Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center" // Reduced from mt-12
        >
          <Link href="/events">
            <button className="inline-flex items-center gap-2 px-8 py-3 text-base font-bold text-white transition-all bg-[#007bff] rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-blue-500/50">
              View All Events <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeEventsSection;
