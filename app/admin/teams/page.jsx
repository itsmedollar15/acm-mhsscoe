"use client";

import AdminTeamControl from "@/components/teams/adminTeamControl";
import AdminTeamSectionControl from "@/components/teams/adminTeamSectionControl";
import TeamService from "@/services/team";
import { PlusOutlined, TeamOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  message as showMessage,
} from "antd";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

const AdminTeamsPage = () => {
  const allTeamsQuery = useQuery(
    "teams",
    async () => TeamService.getAllTeams(),
    { retry: false }
  );

  const [currTeamYear, setCurrTeamYear] = useState();

  const teamSectionsQuery = useQuery(
    ["teamSections", currTeamYear],
    async () => currTeamYear && TeamService.getTeamDetails(currTeamYear),
    { retry: false }
  );
  const { data: { team: { sections = [] } = {} } = {} } = teamSectionsQuery;

  const createNewSection = () => {
    TeamService.createTeamSection(currTeamYear)
      .then((message) => {
        showMessage.success(message);
        teamSectionsQuery.refetch();
      })
      .catch((message) => showMessage.error(message));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] pt-24 pb-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="p-8 mb-6 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex gap-4 items-center mb-6">
            <div className="flex justify-center items-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl transition-all duration-300 transform hover:rotate-6 hover:scale-105">
              <TeamOutlined className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Manage Teams
              </h1>
              <p className="text-gray-600">Create and organize team sections</p>
            </div>
          </div>
          <AdminTeamControl
            allTeamsQuery={allTeamsQuery}
            currTeamYear={currTeamYear}
            setCurrTeamYear={setCurrTeamYear}
          />
        </div>

        {currTeamYear && (
          <>
            {sections && sections.length > 0 ? (
              <div className="flex flex-col gap-5 pb-10">
                {sections.map((section, index) => (
                  <div
                    key={`admin_team_section_control_${index}`}
                    className="bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1"
                  >
                    <AdminTeamSectionControl
                      teamYear={currTeamYear}
                      refresh={() => teamSectionsQuery.refetch()}
                      isFirst={index === 0}
                      isLast={index === sections.length - 1}
                      {...section}
                    />
                  </div>
                ))}
                <div className="p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <Button
                    type="primary"
                    size="large"
                    onClick={createNewSection}
                    icon={<PlusOutlined />}
                    className="min-w-[200px] bg-gradient-to-r from-blue-500 to-purple-500 border-0 transition-all duration-300 hover:scale-105"
                  >
                    Add New Section
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-16 text-center bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                <Empty
                  description={
                    <span className="block mt-4 text-lg text-gray-600">
                      No sections created yet. Create your first section to get
                      started.
                    </span>
                  }
                >
                  <Button
                    type="primary"
                    size="large"
                    onClick={createNewSection}
                    icon={<PlusOutlined />}
                    className="mt-6 min-w-[200px] bg-gradient-to-r from-blue-500 to-purple-500 border-0 transition-all duration-300 hover:scale-105"
                  >
                    Create First Section
                  </Button>
                </Empty>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTeamsPage;
