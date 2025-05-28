"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import SearchUser from "@/components/common/searchUser";
import AdminUserCard from "@/components/users/adminUserCard";
import { ADMIN_USERS_PAGE_TYPES } from "@/constants/common";
import UserService from "@/services/user";
import { PlusOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Col, Empty, Row, Select, message as showMessage } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminUsersPage = ({ searchParams: { type } }) => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    UserService.getUsersByType(type)
      .then(({ users = [] }) =>
        setUsers(
          users
          // .sort(
          //   ({ role: userRoleA }, { role: userRoleB }) =>
          //     Object.values(ROLES).indexOf(userRoleA) -
          //     Object.values(ROLES).indexOf(userRoleB)
          // )
        )
      )
      .catch((message) => showMessage.error(message));
  };

  const changeType = (value) => {
    router.push(`/admin/users?type=${value}`);
  };

  useEffect(() => {
    if (!ADMIN_USERS_PAGE_TYPES.map(({ value }) => value).includes(type)) {
      changeType("roles");
    } else {
      getUsers();
    }
  }, [type]);

  return (
    <div className="min-h-[calc(100vh-64px)] pt-24 pb-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="p-8 mb-6 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex gap-4 items-center mb-6">
            <div className="flex justify-center items-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl transition-all duration-300 transform hover:rotate-6 hover:scale-105">
              <UsergroupAddOutlined className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Manage Users</h1>
              <p className="text-gray-600">Found: {users.length} User{users.length > 1 ? "s" : ""}</p>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-center sm:flex-row">
            <div className="w-full sm:w-36">
              <Select
                className="w-full"
                value={type}
                size="large"
                options={ADMIN_USERS_PAGE_TYPES}
                onChange={(value) => changeType(value)}
              />
            </div>
            <div className="w-full sm:w-72">
              <SearchUser
                onUserSearched={({ _id: userId }) =>
                  router.push(`/admin/users/${userId}`)
                }
              />
            </div>
            <div className="ml-auto w-full sm:w-fit">
              <Link href="/admin/users/create">
                <Button 
                  icon={<PlusOutlined />} 
                  type="primary" 
                  size="large"
                  className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-blue-500 to-purple-500 border-0 transition-all duration-300 hover:scale-105"
                >
                  Add User
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {users.length > 0 ? (
          <div className="p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <Row gutter={[32, 32]} justify="start">
              {users.map(({ _id, ...user }, index) => (
                <Col
                  key={`admin_users_role_${index}`}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  className="flex"
                >
                  <Link href={`/admin/users/${_id}`} className="w-full">
                    <div className="h-full transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                      <AdminUserCard {...user} type={type} />
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <div className="p-16 text-center bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <Empty 
              description={
                <span className="block mt-4 text-lg text-gray-600">
                  No users found. Add your first user to get started.
                </span>
              }
            >
              <Link href="/admin/users/create">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  size="large"
                  className="mt-6 min-w-[160px] bg-gradient-to-r from-blue-500 to-purple-500 border-0 transition-all duration-300 hover:scale-105"
                >
                  Add New User
                </Button>
              </Link>
            </Empty>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
