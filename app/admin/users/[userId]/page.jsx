"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import UserProfileUpdateForm from "@/components/profile/profileUpdateForm";
import UserService from "@/services/user";
import getRoleOptions from "@/utils/getRoleOptions";
import { LeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, message as showMessage } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminUserDetailsPage = ({ params: { userId } }) => {
  const router = useRouter();
  const { role: currRole } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState();

  const updateMembership = () => {
    UserService.updateMembership(userId)
      .then((message) => {
        showMessage.success(message);
        getDetails();
      })
      .catch((message) => showMessage.error(message));
  };

  const changeRole = (value) => {
    UserService[value ? "assignRole" : "removeRole"](userId, value)
      .then((message) => {
        showMessage.success(message);
        setUserDetails({ ...userDetails, role: value });
      })
      .catch((message) => showMessage.error(message));
  };

  const getDetails = () => {
    UserService.getUserDetails(userId)
      .then(({ user }) => {
        setUserDetails(user);
      })
      .catch((message) => showMessage.error(message));
  };

  const createUser = (details) => {
    UserService.createUser(details)
      .then(({ message, data: { newUserId } }) => {
        showMessage.success(message);
        router.replace(`/admin/users/${newUserId}`);
      })
      .catch((message) => showMessage.error(message));
  };

  const updateDetails = (details) => {
    UserService.updateUserDetails(userId, details)
      .then((message) => {
        showMessage.success(message);
        getDetails();
      })
      .catch((message) => showMessage.error(message));
  };

  useEffect(() => {
    if (userId !== "create") getDetails();
  }, [userId]);

  return (
    <div className="flex flex-col gap-5 my-10 h-full">
      <Glassmorphism className="flex flex-col gap-5 items-center p-5 sm:flex-row">
        <div className="flex-grow w-full sm:w-fit">
          <Button
            className="w-full sm:w-fit"
            type="primary"
            icon={<LeftOutlined />}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
        <div className="flex gap-3 justify-center items-center w-full sm:w-fit">
          <p className="text-lg">Role:</p>
          <Select
            className="flex-grow sm:w-40"
            placeholder="Select Role"
            value={userDetails?.role ?? null}
            options={getRoleOptions(currRole, userDetails?.role)}
            onChange={changeRole}
            disabled={userId === "create"}
          />
        </div>
        <div className="w-full sm:w-fit">
          <Space.Compact className="w-full sm:w-fit">
            <Input
              placeholder="Membership Id"
              disabled={true}
              value={userDetails?.membershipId ?? "Not a Member"}
            />
            <Button
              type="primary"
              disabled={userId === "create"}
              icon={<ReloadOutlined />}
              onClick={() => updateMembership()}
            />
          </Space.Compact>
        </div>
      </Glassmorphism>
      <Glassmorphism className="flex-grow">
        <UserProfileUpdateForm
          userDetails={userDetails}
          updateUserDetails={userId !== "create" ? updateDetails : createUser}
        />
      </Glassmorphism>
    </div>
  );
};

export default AdminUserDetailsPage;
