"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import EventCard from "@/components/events/eventCard";
import EventService from "@/services/event";
import { PlusOutlined } from "@ant-design/icons";
import { Calendar } from "lucide-react"; // Added this import
import { Button, Col, Empty, Input, Row, message as showMessage } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useQuery } from "react-query";

const AdminEventsPage = () => {
  const router = useRouter();
  const eventQuery = useQuery("events", async () => {
    return EventService.getAllEvents();
  });

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, error, data: { events = [] } = {} } = eventQuery;

  const deleteEvent = (eventId) => {
    EventService.deleteEvent(eventId)
      .then((message) => {
        showMessage.success(message);
        eventQuery.refetch();
      })
      .catch((message) => showMessage.error(message));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] pt-28 pb-12 px-4 ">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="p-8 mb-8 bg-white rounded-2xl border-0 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
          <div className="flex gap-6 items-center mb-8">
            <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:rotate-3">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Manage Events
              </h1>
              <p className="text-lg text-gray-600">
                Found:{" "}
                <span className="font-semibold text-blue-600">
                  {events.length}
                </span>{" "}
                Event{events.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-stretch sm:flex-row">
            <div className="flex-grow">
              <Input.Search
                size="large"
                placeholder="Search events by title..."
                onChange={({ target: { value: query } }) =>
                  setSearchQuery(query)
                }
                className="w-full shadow-sm transition-all duration-300 hover:shadow focus:shadow-md"
              />
            </div>
            <div className="flex-shrink-0">
              <Link href="/admin/events/create">
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  size="large"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5"
                >
                  Create Event
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {events.filter(({ title }) =>
          title.toLowerCase().includes(searchQuery.toLowerCase())
        ).length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events
              .filter(({ title }) =>
                title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
              .map((eventDetails, index) => (
                <div
                  key={`admin_events_page_event_item_${index}`}
                  className="transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
                >
                  <EventCard
                    allowEditDelete
                    onDelete={deleteEvent}
                    {...eventDetails}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="p-16 text-center bg-white rounded-2xl border-0 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="space-y-3">
                  <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    No Events Found
                  </p>
                  <p className="text-gray-600">
                    Get started by creating your first event
                  </p>
                </div>
              }
            >
              <Link href="/admin/events/create">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  className="px-8 mt-8 h-12 bg-gradient-to-r from-blue-500 to-purple-500 border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5"
                >
                  Create First Event
                </Button>
              </Link>
            </Empty>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsPage;
