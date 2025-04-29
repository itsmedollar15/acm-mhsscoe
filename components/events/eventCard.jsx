"use client";

import { Button } from "antd";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const EventCard = ({
  _id,
  title,
  description,
  poster,
  allowEditDelete,
  onDelete,
}) => {
  return (
    <div
      data-aos="fade-up"
      className="transition-all duration-300 hover:scale-105"
    >
      <div className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-lg">
        <div
          className={`relative ${
            allowEditDelete ? "aspect-[3/4]" : "aspect-square"
          } rounded-xl overflow-hidden`}
        >
          {/* Blurred Background */}
          <div className="absolute inset-0 opacity-40">
            <Image
              className="object-cover w-full h-full blur-md"
              src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${poster}`}
              alt="Event Poster"
              fill
            />
          </div>

          {/* Main Content */}
          <div className="relative flex flex-col w-full h-full gap-4 p-4">
            {/* Event Image */}
            <div className="event-card-banner w-full flex-[6] overflow-hidden transition-all duration-300">
              <Image
                className="object-contain h-full mx-auto rounded-lg shadow-sm"
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${poster}`}
                alt={title}
                width={280}
                height={200}
              />
            </div>

            {/* Event Details */}
            <div className="event-card-info w-full flex-[2] bg-white py-3 px-5 rounded-lg flex flex-col justify-center items-center shadow-sm">
              <h1
                className="text-2xl font-bold text-center text-gray-900 line-clamp-1"
                title={title}
              >
                {title}
              </h1>
              <p className="text-gray-600 text-center text-sm line-clamp-2 min-h-[44px]">
                {description}
              </p>
            </div>

            {/* Edit/Delete Buttons */}
            {allowEditDelete && (
              <div className="w-full flex-[1] flex items-center justify-between px-2">
                <Link href={`/admin/events/${_id}`}>
                  <Button
                    type="primary"
                    icon={<Edit size={18} />}
                    className="rounded-lg"
                  >
                    Edit
                  </Button>
                </Link>

                {onDelete && (
                  <Button
                    className="!bg-red-500 hover:!bg-red-400 rounded-lg"
                    type="primary"
                    icon={<Trash2 size={18} />}
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(_id);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
