"use client";

import Glassmorphism from "@/components/common/glassmorphism";
import AdminTeamControl from "@/components/teams/adminTeamControl";
import AdminTeamSectionControl from "@/components/teams/adminTeamSectionControl";
import TeamService from "@/services/team";
import { PlusOutlined, TeamOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  Input,
  Row,
  Select,
  Space,
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
    <div className="min-h-[calc(100vh-64px)] pt-24 pb-12 px-4 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
              <TeamOutlined className="text-xl text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Manage Teams</h1>
              <p className="text-gray-500">Create and organize team sections</p>
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
                  <div key={`admin_team_section_control_${index}`} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <AdminTeamSectionControl
                      teamYear={currTeamYear}
                      refresh={() => teamSectionsQuery.refetch()}
                      isFirst={index === 0}
                      isLast={index === sections.length - 1}
                      {...section}
                    />
                  </div>
                ))}
                <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow flex justify-center items-center">
                  <Button
                    type="primary"
                    size="large"
                    onClick={createNewSection}
                    icon={<PlusOutlined />}
                    className="min-w-[200px]"
                  >
                    Add New Section
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
                <Empty 
                  description={
                    <span className="text-gray-500 mt-4 block">
                      No sections created yet. Create your first section to get started.
                    </span>
                  }
                >
                  <Button 
                    type="primary" 
                    size="large" 
                    onClick={createNewSection}
                    icon={<PlusOutlined />}
                    className="mt-4"
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
