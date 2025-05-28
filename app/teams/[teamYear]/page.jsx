import TeamSectionCard from "@/components/teams/teamSectionCard";
import { getTeamSections } from "@/actions/teams";
import { redirect } from "next/navigation";
import TeamChangeControl from "@/components/teams/teamChangeControl";

export const dynamic = "force-dynamic";

const TeamDetailsPage = async ({ params: { teamYear } }) => {
  let teamSections;

  try {
    teamSections = await getTeamSections(teamYear);
  } catch (error) {
    redirect("/not-found");
  }

  return (
    <div className="min-h-screen">
      <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {/* Year Selector */}
          <div className="flex justify-end mt-6">
            <TeamChangeControl currYear={teamYear} />
          </div>

          {/* Team Sections */}
          <div className="flex flex-col gap-12 mt-4">
            {teamSections.map((sectionId, index) => (
              <TeamSectionCard
                key={`teams_page_section_${index}`}
                teamYear={teamYear}
                sectionId={sectionId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
