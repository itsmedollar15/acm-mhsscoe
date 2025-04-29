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
        <h2 className="text-center font-bold text-3xl">Profile Incomplete</h2>
      </Glassmorphism>
    );

  return (
    <div className="min-h-[calc(100vh-64px-40px)] bg-gray-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 group">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur opacity-5 group-hover:opacity-10 transition-opacity"></div>
                <img
                  src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
                    user.profilePicture ?? DEFAULT_PROFILE_PICTURE
                  }`}
                  alt="Profile Photo"
                  className="relative w-40 h-40 rounded-2xl object-cover ring-4 ring-white shadow-sm"
                />
              </div>
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{user.name}</h1>
              <div className="flex flex-wrap gap-3">
                {user.teams.map((team, index) => (
                  <div
                    key={index}
                    className="group relative bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm font-medium shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
                    <span className="relative flex items-center gap-2">
                      <PostLevelIcon level={team.level} className="text-blue-500" />
                      <span className="font-semibold">{team.post}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600">{team.section}</span>
                    </span>
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                      {team.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Contact & Links */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                Contact & Links
              </h2>
              <ul className="space-y-4">
                <li>
                  <div className="flex items-center gap-3 text-gray-600 group">
                    <span className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
                      <MailOutlined className="text-gray-400 text-lg group-hover:text-blue-500 transition-colors" />
                    </span>
                    <a 
                      href={`mailto:${user.email}`} 
                      className="hover:text-blue-600 transition-colors break-all"
                    >
                      {user.email}
                    </a>
                  </div>
                </li>
                {user.links.map(({ label, url }, index) => (
                  <li key={index}>
                    <div className="flex items-center gap-3 text-gray-600 group">
                      <span className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
                        {label.toLowerCase().includes("github") ? (
                          <GithubFilled className="text-gray-400 text-lg group-hover:text-blue-500 transition-colors" />
                        ) : label.toLowerCase().includes("linkedin") ? (
                          <LinkedinFilled className="text-gray-400 text-lg group-hover:text-blue-500 transition-colors" />
                        ) : label.toLowerCase().includes("twitter") ? (
                          <TwitterCircleFilled className="text-gray-400 text-lg group-hover:text-blue-500 transition-colors" />
                        ) : (
                          <LinkOutlined className="text-gray-400 text-lg group-hover:text-blue-500 transition-colors" />
                        )}
                      </span>
                      <a 
                        href={url} 
                        target="_blank" 
                        className="hover:text-blue-600 transition-colors"
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
            <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                Academic Information
              </h2>
              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div className="group">
                  <h3 className="text-sm font-medium text-gray-500 mb-1 group-hover:text-blue-500 transition-colors">Branch</h3>
                  <p className="text-gray-900 font-medium">
                    {BRANCHES.find(({ value }) => value === user.branch).label}
                  </p>
                </div>
                <div className="group">
                  <h3 className="text-sm font-medium text-gray-500 mb-1 group-hover:text-blue-500 transition-colors">Year</h3>
                  <p className="text-gray-900 font-medium">
                    {YEARS.find(({ value }) => value === user.year).label}
                  </p>
                </div>
                <div className="group">
                  <h3 className="text-sm font-medium text-gray-500 mb-1 group-hover:text-blue-500 transition-colors">Roll No</h3>
                  <p className="text-gray-900 font-medium">{user.rollno}</p>
                </div>
                {user.membershipId && (
                  <div className="group">
                    <h3 className="text-sm font-medium text-gray-500 mb-1 group-hover:text-blue-500 transition-colors">Membership ID</h3>
                    <p className="text-gray-900 font-medium">{user.membershipId}</p>
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