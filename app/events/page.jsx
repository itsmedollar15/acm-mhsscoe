"use client";

import { useState, useEffect } from "react";
import { getAllEvents } from "@/actions/events";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Image from "next/image";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data.reverse());
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return null; // Remove loading spinner

  return (
    <>
      <div className="w-full px-6 py-16 mt-8">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-blue-600 sm:text-5xl md:text-6xl relative inline-block pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-blue-200 after:rounded-full">
            Our Events
          </h2>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            Discover our latest events and activities
          </p>
        </div>

        {/* Events Grid */}
        <div className="container grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {events.map((eventDetails, index) => (
            <motion.div
              key={`event_page_event_item_${index}`}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.1, // Reduced from 0.2 to 0.1
                ease: "easeOut",
                delay: index * 0.1, // Reduced from 0.1 to 0.05
              }}
              viewport={{ amount: 0.1 }} // Reduced from 0.2 to 0.1 for earlier trigger
            >
              <Link href={`/events/${eventDetails._id}`}>
                <div className="relative overflow-hidden transition-all duration-300 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 h-full">
                  {/* Image Container */}
                  <div className="relative w-full overflow-hidden bg-gray-100">
                    {/* Date Badge */}
                    <div className="absolute z-20 px-4 py-2 mt-6 rounded-full right-4 bg-white/90 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-800">
                          {new Date(eventDetails.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Main Image */}
                    <div className="relative w-full h-[300px] p-4">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${eventDetails.poster}`}
                        alt={eventDetails.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 6}
                        loading={index < 6 ? "eager" : "lazy"}
                        quality={60}
                      />
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h2 className="mb-2 text-xl font-bold text-gray-800 line-clamp-1">
                      {eventDetails.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">
                      {eventDetails.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
