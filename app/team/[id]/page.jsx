"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Skeleton } from "antd";
import { Mail, Hash, Award, Calendar } from "lucide-react";

const TeamMemberPage = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`
        );
        setMember(response.data);
      } catch (error) {
        console.error("Error fetching team member:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-400"></div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-16 left-6">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                <img
                  src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${member?.photo}`}
                  alt={member?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name and Role */}
            <div className="pt-20">
              <h1 className="text-3xl font-bold text-gray-900">{member?.name}</h1>
              <p className="text-lg text-blue-600 font-medium mt-1">
                {member?.position}
              </p>
            </div>

            {/* Details Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">{member?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Hash className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Roll Number</p>
                  <p className="text-gray-900 font-medium">{member?.rollNo}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Award className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Membership ID</p>
                  <p className="text-gray-900 font-medium">
                    {member?.membershipId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Academic Year</p>
                  <p className="text-gray-900 font-medium">{member?.year}</p>
                </div>
              </div>
            </div>

            {/* Committee Details */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Committee Details
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex flex-wrap gap-4">
                  {member?.committees?.map((committee, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-white rounded-lg shadow-sm"
                    >
                      <p className="text-sm text-gray-500">
                        {committee.academicYear}
                      </p>
                      <p className="text-gray-900 font-medium">
                        {committee.name} - {committee.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberPage; 