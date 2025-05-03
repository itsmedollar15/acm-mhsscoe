import EventHeader from "@/components/events/eventHeader";
import EventBlog from "@/components/events/eventsBlog";
import EventDetails from "@/components/events/eventDetails";
import { getEventDetails } from "@/actions/events";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const EventPage = async ({ params: { eventId } }) => {
  let event = {};
  try {
    event = await getEventDetails(eventId);
  } catch (error) {
    redirect("/not-found");
  }

  return (
    <div className="min-h-screen">
      <div className="container px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left Column - Header and Blog */}
          <div className="flex-1 mt-8 space-y-8">
            <EventHeader {...event} />
            <EventBlog blog={event.blog} />
          </div>

          {/* Right Column - Event Details */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="sticky top-24">
              <EventDetails {...event} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
