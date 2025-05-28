"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Skeleton } from "antd";
import { Mail, Hash, Award, Calendar } from "lucide-react";
import Image from "next/image";

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
      <div className="px-4 pt-24 pb-16 min-h-screen">
        <div className="mx-auto max-w-4xl">
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="overflow-hidden bg-white rounded-2xl shadow-lg">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-400"></div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute left-6 -top-16">
              <div className="overflow-hidden relative w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg">
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${member?.photo}`}
                  alt={member?.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority
                />
              </div>
            </div>

            {/* Name and Role */}
            <div className="pt-20">
              <h1 className="text-3xl font-bold text-gray-900">{member?.name}</h1>
              <p className="mt-1 text-lg font-medium text-blue-600">
                {member?.position}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div className="flex gap-3 items-center p-4 bg-gray-50 rounded-xl">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{member?.email}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center p-4 bg-gray-50 rounded-xl">
                <Hash className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Roll Number</p>
                  <p className="font-medium text-gray-900">{member?.rollNo}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center p-4 bg-gray-50 rounded-xl">
                <Award className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Membership ID</p>
                  <p className="font-medium text-gray-900">
                    {member?.membershipId}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-center p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Academic Year</p>
                  <p className="font-medium text-gray-900">{member?.year}</p>
                </div>
              </div>
            </div>

            {/* Committee Details */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Committee Details
              </h2>
              <div className="p-6 bg-gray-50 rounded-xl">
                <div className="flex flex-wrap gap-4">
                  {member?.committees?.map((committee, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-white rounded-lg shadow-sm"
                    >
                      <p className="text-sm text-gray-500">
                        {committee.academicYear}
                      </p>
                      <p className="font-medium text-gray-900">
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