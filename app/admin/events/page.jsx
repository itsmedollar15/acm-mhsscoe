"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import EventCard from "@/components/events/eventCard";
import EventService from "@/services/event";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
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
    <div className="min-h-[calc(100vh-64px)] pt-24 pb-12 px-4 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <div className="flex items-center gap-4 flex-grow">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <SearchOutlined className="text-lg text-blue-500" />
              </div>
              <Input.Search
                className="flex-grow max-w-xl"
                size="large"
                placeholder="Search events by title..."
                onChange={({ target: { value: query } }) => setSearchQuery(query)}
              />
            </div>
            <Link href="/admin/events/create">
              <Button 
                icon={<PlusOutlined />} 
                size="large" 
                type="primary"
                className="min-w-[140px] shadow-sm"
              >
                Create Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Events Grid */}
        {events.filter(({ title }) =>
          title.toLowerCase().includes(searchQuery.toLowerCase())
        ).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
            {events
              .filter(({ title }) =>
                title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((eventDetails, index) => (
                <div key={`admin_events_page_event_item_${index}`}>
                  <EventCard
                    allowEditDelete
                    onDelete={deleteEvent}
                    {...eventDetails}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <Empty 
              description={
                <span className="text-gray-500 mt-4 block">
                  No events found. Create your first event to get started.
                </span>
              }
            >
              <Link href="/admin/events/create">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  size="large"
                  className="mt-4"
                >
                  Create New Event
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
