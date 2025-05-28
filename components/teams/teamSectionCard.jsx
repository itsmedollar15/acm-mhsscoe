import Link from "next/link";
import TeamSectionsPostCard from "./teamSectionsPostCard";
import { getTeamSectionDetails } from "@/actions/teams";
import { redirect } from "next/navigation";

const TeamSectionCard = async ({ teamYear, sectionId }) => {
  let sectionDetails;

  try {
    sectionDetails = await getTeamSectionDetails(teamYear, sectionId);
  } catch (error) {
    redirect("/not-found");
  }

  return (
    <div data-aos="fade-up" data-aos-duration="600">
      {/* Section Title */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-center text-blue-600 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-blue-200 after:rounded-full">
          {sectionDetails?.title}
        </h3>
      </div>

      {/* Posts Grid */}
      <div
        className="grid gap-8 px-4 sm:px-6 md:px-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center max-w-[1600px] mx-auto"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="100"
      >
        {sectionDetails?.posts?.map((post, index) => (
          <Link
            key={`teams_page_section_post_${index}`}
            href={`/user?email=${post.user.email}`}
            className="block transition-transform duration-300 transform hover:-translate-y-1"
          >
            <TeamSectionsPostCard {...post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamSectionCard;
