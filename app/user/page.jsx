import { getUserDetailsByEmail } from "@/actions/user";
import Glassmorphism from "@/components/common/glassmorphism";
import PostLevelIcon from "@/components/common/postLevelIcon";
import { BRANCHES } from "@/constants/branches";
import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";
import { POST_LEVELS } from "@/constants/postLevels";
import { ROLES } from "@/constants/roles";
import { YEARS } from "@/constants/years";
import {
  ExclamationCircleFilled,
  GithubFilled,
  LinkOutlined,
  LinkedinFilled,
  MailOutlined,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { redirect } from "next/navigation";
import Image from "next/image";

const UserDetailsPage = async ({ searchParams: { email: userEmail } }) => {
  let user;
  try {
    if (!userEmail) throw "Email Required";
    user = await getUserDetailsByEmail(userEmail);
  } catch (error) {
    redirect("/not-found");
  }

  if (!user.profilePicture)
    return (
      <Glassmorphism className="h-[calc(100vh-64px-40px)] text-primary-dark flex flex-col justify-center items-center gap-5">
        <ExclamationCircleFilled className="text-7xl" />
        <h2 className="text-3xl font-bold text-center">Profile Incomplete</h2>
      </Glassmorphism>
    );

  return (
    <div className="min-h-[calc(100vh-64px-40px)] bg-gray-50/50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Profile Header */}
        <div className="p-8 mb-6 bg-white rounded-2xl shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-8 items-start md:flex-row">
            <div className="flex-shrink-0 group">
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl opacity-5 blur transition-opacity group-hover:opacity-10"></div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
                    user.profilePicture ?? DEFAULT_PROFILE_PICTURE
                  }`}
                  alt="Profile Photo"
                  width={160}
                  height={160}
                  className="object-cover relative w-40 h-40 rounded-2xl ring-4 ring-white shadow-sm"
                />
              </div>
            </div>
            <div className="flex-grow">
              <h1 className="mb-4 text-3xl font-bold text-gray-900">
                {user.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                {user.teams
                  .sort((a, b) => {
                    // Extract years from the team data
                    const yearA = parseInt(a.year.split("-")[0]);
                    const yearB = parseInt(b.year.split("-")[0]);
                    // Sort in descending order (most recent first)
                    return yearB - yearA;
                  })
                  .map((team, index) => {
                    // Check if this is the most recent position
                    const isCurrentPosition = index === 0;
                    return (
                      <div
                        key={index}
                        className={`relative px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-xl border ${
                          isCurrentPosition
                            ? "border-blue-300 shadow-md scale-105"
                            : "border-gray-200 shadow-sm"
                        } transition-all group hover:border-blue-200 hover:shadow-md`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${
                            isCurrentPosition
                              ? "from-blue-50/80 to-indigo-50/80"
                              : "from-blue-50/0 to-indigo-50/0"
                          } rounded-xl opacity-0 transition-opacity group-hover:opacity-100`}
                        ></div>
                        <span className="flex relative gap-2 items-center">
                          <PostLevelIcon
                            level={team.level}
                            className={`${
                              isCurrentPosition
                                ? "text-blue-600"
                                : "text-blue-500"
                            }`}
                          />
                          <span className="font-semibold">{team.post}</span>
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-600">{team.section}</span>
                        </span>
                        <span
                          className={`absolute -top-2 -right-2 ${
                            isCurrentPosition ? "bg-blue-600" : "bg-gray-900"
                          } text-white text-xs px-2 py-0.5 rounded-full shadow-sm`}
                        >
                          {team.year}
                          {isCurrentPosition && " (Current)"}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          {/* Contact & Links */}
          <div className="md:col-span-5">
            <div className="p-8 bg-white rounded-2xl shadow-sm transition-shadow hover:shadow-md">
              <h2 className="flex gap-2 items-center mb-6 text-xl font-semibold text-gray-900">
                <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                Contact & Links
              </h2>
              <ul className="space-y-4">
                <li>
                  <div className="flex gap-3 items-center text-gray-600 group">
                    <span className="p-2 bg-gray-50 rounded-lg transition-colors group-hover:bg-blue-50">
                      <MailOutlined className="text-lg text-gray-400 transition-colors group-hover:text-blue-500" />
                    </span>
                    <a
                      href={`mailto:${user.email}`}
                      className="break-all transition-colors hover:text-blue-600"
                    >
                      {user.email}
                    </a>
                  </div>
                </li>
                {user.links.map(({ label, url }, index) => (
                  <li key={index}>
                    <div className="flex gap-3 items-center text-gray-600 group">
                      <span className="p-2 bg-gray-50 rounded-lg transition-colors group-hover:bg-blue-50">
                        {label.toLowerCase().includes("github") ? (
                          <GithubFilled className="text-lg text-gray-400 transition-colors group-hover:text-blue-500" />
                        ) : label.toLowerCase().includes("linkedin") ? (
                          <LinkedinFilled className="text-lg text-gray-400 transition-colors group-hover:text-blue-500" />
                        ) : label.toLowerCase().includes("twitter") ? (
                          <TwitterCircleFilled className="text-lg text-gray-400 transition-colors group-hover:text-blue-500" />
                        ) : (
                          <LinkOutlined className="text-lg text-gray-400 transition-colors group-hover:text-blue-500" />
                        )}
                      </span>
                      <a
                        href={url}
                        target="_blank"
                        className="transition-colors hover:text-blue-600"
                      >
                        {label}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Academic Info */}
          <div className="md:col-span-7">
            <div className="p-8 bg-white rounded-2xl shadow-sm transition-shadow hover:shadow-md">
              <h2 className="flex gap-2 items-center mb-6 text-xl font-semibold text-gray-900">
                <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                Academic Information
              </h2>
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="group">
                  <h3 className="mb-1 text-sm font-medium text-gray-500 transition-colors group-hover:text-blue-500">
                    Branch
                  </h3>
                  <p className="font-medium text-gray-900">
                    {BRANCHES.find(({ value }) => value === user.branch).label}
                  </p>
                </div>
                <div className="group">
                  <h3 className="mb-1 text-sm font-medium text-gray-500 transition-colors group-hover:text-blue-500">
                    Year
                  </h3>
                  <p className="font-medium text-gray-900">
                    {YEARS.find(({ value }) => value === user.year).label}
                  </p>
                </div>
                <div className="group">
                  <h3 className="mb-1 text-sm font-medium text-gray-500 transition-colors group-hover:text-blue-500">
                    Roll No
                  </h3>
                  <p className="font-medium text-gray-900">{user.rollno}</p>
                </div>
                {user.membershipId && (
                  <div className="group">
                    <h3 className="mb-1 text-sm font-medium text-gray-500 transition-colors group-hover:text-blue-500">
                      Membership ID
                    </h3>
                    <p className="font-medium text-gray-900">
                      {user.membershipId}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
