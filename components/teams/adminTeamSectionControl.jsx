import React, { useEffect, useState } from "react";
import Glassmorphism from "../common/glassmorphism";
import { Button, Col, Input, Row, Space, message as showMessage } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import TeamService from "@/services/team";
import { useQuery } from "react-query";
import AdminTeamSectionPostControl from "./adminTeamSectionPostControl";
import ButtonGroup from "antd/es/button/button-group";

const AdminTeamSectionControl = ({
  teamYear,
  refresh,
  _id: sectionId,
  isFirst,
  isLast,
}) => {
  const teamSectionDetailsQuery = useQuery(
    ["teamSectionDetails", sectionId],
    async () => TeamService.getTeamSectionDetails(teamYear, sectionId),
    { retry: false }
  );

  const { data: { section: { title = "", posts = [] } = {} } = {} } =
    teamSectionDetailsQuery;

  const [sectionTitle, setSectionTitle] = useState(title);

  useEffect(() => {
    setSectionTitle(title);
  }, [title]);

  const updateSectionTitle = () => {
    TeamService.updateTeamSectionTitle(teamYear, sectionId, sectionTitle)
      .then((message) => {
        showMessage.success(message);
        teamSectionDetailsQuery.refetch();
      })
      .catch((message) => showMessage.error(message));
  };

  const moveSection = (direction) => {
    TeamService.moveTeamSection(teamYear, sectionId, direction)
      .then((message) => {
        showMessage.success(message);
        refresh();
      })
      .catch((message) => showMessage.error(message));
  };

  const deleteSection = () => {
    TeamService.deleteTeamSection(teamYear, sectionId)
      .then((message) => {
        showMessage.success(message);
        refresh();
      })
      .catch((message) => showMessage.error(message));
  };
  return (
    <>
      <Glassmorphism className="p-5">
        <div className="flex flex-col gap-3 justify-between items-center sm:flex-row">
          <Space.Compact className="w-full sm:w-fit">
            <Input
              placeholder="Enter Section Title"
              value={sectionTitle}
              onChange={({ target: { value } }) => setSectionTitle(value)}
            />
            <Button
              icon={<CheckOutlined />}
              onClick={updateSectionTitle}
              type="primary"
              disabled={!sectionTitle || title === sectionTitle}
            >
              Save
            </Button>
          </Space.Compact>

          <div className="flex gap-3 justify-between items-center w-full sm:w-fit">
            <Button
              className="flex-1 sm:flex-auto"
              disabled={isFirst}
              icon={<UpOutlined />}
              onClick={() => moveSection("UP")}
            />

            <Button
              className="flex-1 sm:flex-auto"
              disabled={isLast}
              icon={<DownOutlined />}
              onClick={() => moveSection("DOWN")}
            />

            <Button
              className="flex-1 sm:flex-auto !bg-red-500 hover:!bg-red-400"
              icon={<DeleteOutlined />}
              onClick={deleteSection}
              type="primary"
            />
          </div>
        </div>
      </Glassmorphism>
      <Row gutter={[32, 32]}>
        {[...posts, { isNew: true }].map((post, index) => (
          <Col
            span={24}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            lg={{ span: 6 }}
            key={`admin_teams_sections_posts_${index}`}
          >
            <AdminTeamSectionPostControl
              refresh={() => teamSectionDetailsQuery.refetch()}
              teamYear={teamYear}
              sectionId={sectionId}
              isFirst={index === 0}
              isLast={index === posts.length - 1}
              {...post}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AdminTeamSectionControl;
