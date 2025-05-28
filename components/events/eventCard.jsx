"use client";

import { Button } from "antd";
import { Edit, Trash2, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const EventCard = ({
  _id,
  title,
  description,
  poster,
  startDate,
  allowEditDelete,
  onDelete,
}) => {
  return (
    <div className="relative group">
      <div className="overflow-hidden relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md transition-all duration-500 hover:shadow-xl">
        {/* Image Container */}
        <div
          className={`relative ${
            allowEditDelete ? "aspect-[3/4]" : "aspect-[4/3]"
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Main Image */}
          <div className="flex relative z-10 justify-center items-center p-6 w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${poster}`}
                alt={title}
                fill
                className="object-contain transition-transform duration-700 transform group-hover:scale-105"
                style={{
                  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                }}
              />
            </div>
          </div>

          {/* Date Badge */}
          {startDate && (
            <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-lg">
              <div className="flex gap-2 items-center">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-800">
                  {new Date(startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 bg-white border-t border-gray-100">
          <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 line-clamp-1 group-hover:text-blue-600">
            {title}
          </h3>
          <p className="mb-4 text-gray-600 line-clamp-2">{description}</p>

          {/* Admin Controls */}
          {allowEditDelete && (
            <div className="flex gap-4 justify-between items-center mt-4">
              <Link href={`/admin/events/${_id}`} className="flex-1">
                <Button
                  type="primary"
                  icon={<Edit size={18} />}
                  className="w-full !rounded-lg !bg-blue-600 hover:!bg-blue-700 !border-0 !shadow-md hover:!shadow-lg transition-all duration-300"
                >
                  Edit
                </Button>
              </Link>

              {onDelete && (
                <Button
                  className="flex-1 !bg-red-500 hover:!bg-red-600 !rounded-lg !border-0 !shadow-md hover:!shadow-lg transition-all duration-300"
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
  );
};

export default EventCard;
