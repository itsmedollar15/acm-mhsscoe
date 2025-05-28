import React, { useEffect, useState } from "react";
import Glassmorphism from "../common/glassmorphism";
import {
  Avatar,
  Button,
  Col,
  Input,
  Row,
  Select,
  Space,
  message as showMessage,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { POST_LEVELS } from "@/constants/postLevels";
import TeamService from "@/services/team";
import SearchUser from "../common/searchUser";
import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";
import Image from "next/image";

const AdminTeamSectionPostControl = ({
  refresh,
  teamYear,
  sectionId,
  isNew,
  _id: postId,
  title,
  level,
  user,
  isFirst = false,
  isLast = false,
}) => {
  const [postDetails, setPostDetails] = useState({
    title,
    level,
    user: user,
  });

  useEffect(() => {
    setPostDetails({
      title,
      level,
      user: user,
    });
  }, [postId]);

  const resetDetails = () => {
    setPostDetails({
      title,
      level,
      user: user,
    });
  };

  const assignPost = () => {
    TeamService.assignPost(teamYear, sectionId, {
      ...postDetails,
      userId: postDetails.user?._id,
      user: undefined,
    })
      .then((message) => {
        showMessage.success(message);
        refresh();
      })
      .catch((message) => showMessage.error(message));
  };

  const updatePostDetails = () => {
    TeamService.updatePostDetails(teamYear, sectionId, postId, {
      ...postDetails,
      userId: postDetails.user._id,
      user: undefined,
    })
      .then((message) => {
        showMessage.success(message);
        refresh();
      })
      .catch((message) => showMessage.error(message));
  };

  const movePost = (direction) => {
    TeamService.moveTeamSectionPost(teamYear, sectionId, postId, direction)
      .then((message) => {
        showMessage.success(message);
        refresh();
      })
      .catch((message) => showMessage.error(message));
  };

  const removePost = () => {
    TeamService.removePost(teamYear, sectionId, postId)
      .then((message) => {
        showMessage.success(message);
        refresh();
      })
      .catch((message) => showMessage.error(message));
  };

  return (
    <Glassmorphism className="flex flex-col justify-center items-center p-5 h-full">
      {postDetails.user ? (
        <Image
          className="object-cover mb-3 w-3/4 rounded-full aspect-square"
          src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
            postDetails.user?.profilePicture ?? DEFAULT_PROFILE_PICTURE
          }`}
          width={300}
          height={300}
          alt="User Profile"
        />
      ) : (
        <div className="flex justify-center items-center mb-3 w-3/4 text-white bg-gray-400 rounded-full aspect-square">
          <UserOutlined className="text-7xl" />
        </div>
      )}

      <SearchUser
        selectedUser={postDetails.user}
        onUserSearched={(userDetails) =>
          setPostDetails({ ...postDetails, user: userDetails })
        }
      />

      <Space.Compact className="my-3 w-full">
        <Select
          className="min-w-[60px]"
          size="large"
          options={POST_LEVELS}
          value={postDetails.level}
          onChange={(value) => setPostDetails({ ...postDetails, level: value })}
        />
        <Input
          placeholder="Enter Post Title"
          value={postDetails.title}
          onChange={({ target: { value } }) =>
            setPostDetails({ ...postDetails, title: value })
          }
        />
      </Space.Compact>
      <Row className="w-full" justify="space-between" gutter={[0, 12]}>
        <Col span={11}>
          <Button
            type="primary"
            block
            icon={<CheckOutlined />}
            onClick={isNew ? assignPost : updatePostDetails}
            disabled={
              (user?._id === postDetails?.user?._id &&
                level === postDetails.level &&
                title === postDetails.title) ||
              !postDetails?.user ||
              !postDetails.level < 0 ||
              !postDetails.title
            }
          >
            Save
          </Button>
        </Col>

        <Col span={11}>
          <Button
            className="!bg-red-500 hover:!bg-red-400"
            type="primary"
            block
            icon={!isNew ? <DeleteOutlined /> : <CloseOutlined />}
            onClick={!isNew ? removePost : resetDetails}
          >
            {!isNew ? "Delete" : "Clear"}
          </Button>
        </Col>

        {!isNew && (
          <>
            <Col span={11}>
              <Button
                type="primary"
                block
                icon={<LeftOutlined />}
                onClick={() => movePost("LEFT")}
                disabled={isFirst}
              />
            </Col>

            <Col span={11}>
              <Button
                type="primary"
                block
                icon={<RightOutlined />}
                onClick={() => movePost("RIGHT")}
                disabled={isLast}
              />
            </Col>
          </>
        )}
      </Row>
    </Glassmorphism>
  );
};

export default AdminTeamSectionPostControl;
