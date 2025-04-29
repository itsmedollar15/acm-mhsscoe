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
    <div className="min-h-[calc(100vh-64px)] pt-24 pb-12 px-4 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
              <UsergroupAddOutlined className="text-xl text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Manage Users</h1>
              <p className="text-gray-500">Found: {users.length} User{users.length > 1 ? "s" : ""}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 items-center">
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
            <div className="w-full sm:w-fit ml-auto">
              <Link href="/admin/users/create">
                <Button 
                  icon={<PlusOutlined />} 
                  type="primary" 
                  size="large"
                  className="w-full sm:w-auto min-w-[140px]"
                >
                  Add User
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {users.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow">
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
                    <div className="h-full">
                      <AdminUserCard {...user} type={type} />
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <Empty 
              description={
                <span className="text-gray-500 mt-4 block">
                  No users found. Add your first user to get started.
                </span>
              }
            >
              <Link href="/admin/users/create">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  size="large"
                  className="mt-4"
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
