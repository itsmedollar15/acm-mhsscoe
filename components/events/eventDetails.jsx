import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { Button, Col, Row } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Link from "next/link";
import { CalendarDays, Clock, Coins, UserCheck, LogIn } from "lucide-react";

const EventDetails = ({
  startDate,
  endDate,
  registrationEndDate,
  entryFees,
  membersEntryFees,
  registrationLink,
}) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return (
    <Glassmorphism className="p-6 rounded-xl shadow-lg md:p-8">
      {/* Section Title */}
      <div className="flex gap-3 items-center pb-5 mb-6 border-b border-gray-200">
        <CalendarDays className="w-6 h-6 text-blue-600" />
        <h3 className="text-2xl font-bold text-blue-700">Event Details</h3>
      </div>

      {/* Event Details */}
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="p-4 rounded-lg transition-all duration-200 bg-white/50 hover:bg-white/70">
            <div className="flex gap-3 items-center mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-700">Start Date</h4>
            </div>
            <p className="text-gray-600">
              {dayjs(startDate)
                .utc()
                .tz("Asia/Kolkata")
                .format("ddd, MMM D, YYYY h:mm A")}
            </p>
          </div>

          <div className="p-4 rounded-lg transition-all duration-200 bg-white/50 hover:bg-white/70">
            <div className="flex gap-3 items-center mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-700">End Date</h4>
            </div>
            <p className="text-gray-600">
              {dayjs(endDate)
                .utc()
                .tz("Asia/Kolkata")
                .format("ddd, MMM D, YYYY h:mm A")}
            </p>
          </div>

          <div className="p-4 rounded-lg transition-all duration-200 bg-white/50 hover:bg-white/70">
            <div className="flex gap-3 items-center mb-2">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-700">
                Registration Deadline
              </h4>
            </div>
            <p className="text-gray-600">
              {dayjs(registrationEndDate)
                .utc()
                .tz("Asia/Kolkata")
                .format("ddd, MMM D, YYYY h:mm A")}
            </p>
          </div>

          <div className="p-4 rounded-lg transition-all duration-200 bg-white/50 hover:bg-white/70">
            <div className="flex gap-3 items-center mb-2">
              <Coins className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-700">Entry Fees</h4>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600">Regular: ₹{entryFees}</p>
              <p className="text-gray-600">Members: ₹{membersEntryFees}</p>
            </div>
          </div>
        </div>

        {/* Registration Button */}
        {dayjs().isBefore(dayjs(registrationEndDate)) && registrationLink && (
          <div className="pt-4">
            <Link
              href={registrationLink}
              target="_blank"
              className="block w-full"
            >
              <Button
                type="primary"
                size="large"
                className="flex gap-2 justify-center items-center w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
              >
                <LogIn className="w-5 h-5" />
                Register Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Glassmorphism>
  );
};

export default EventDetails;
