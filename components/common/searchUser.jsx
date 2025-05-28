import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";
import { YEARS } from "@/constants/years";
import UserService from "@/services/user";
import { Col, Empty, Flex, Row, Select, message as showMessage } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const SearchUser = ({ selectedUser, onUserSearched }) => {
  const [users, setUsers] = useState(selectedUser ? [selectedUser] : []);

  useEffect(() => {
    setUsers(selectedUser ? [selectedUser] : []);
  }, [selectedUser]);

  let timeout;

  const onSearch = (searchQuery) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    const currQuery = searchQuery;
    timeout = setTimeout(() => {
      if (currQuery === searchQuery) {
        if (searchQuery === "") {
          setUsers(selectedUser ? [selectedUser] : []);
        } else {
          UserService.searchUsers(searchQuery)
            .then(({ users: searchedUsers = [] }) => {
              setUsers(searchedUsers);
            })
            .catch((message) => showMessage.error(message));
        }
      }
    }, 750);
  };

  return (
    <Select
      className="w-full"
      placeholder="Search User"
      showSearch
      size="large"
      filterOption={false}
      onSearch={onSearch}
      onChange={(value) =>
        onUserSearched(users.find(({ _id }) => _id === value))
      }
      notFoundContent={
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="User not Found"
        />
      }
      value={selectedUser?._id ?? null}
      optionRender={({ value: optionUserId }) => (
        <div className="flex justify-center items-center py-1">
          <Image
            className="object-cover w-12 rounded-full aspect-square"
            src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
              users.find(({ _id }) => _id === optionUserId)?.profilePicture ??
              DEFAULT_PROFILE_PICTURE
            }`}
            alt="User profile"
            width={48}
            height={48}
          />
          <p className="overflow-hidden flex-grow px-1 text-sm font-semibold text-ellipsis">
            {users.find(({ _id }) => _id === optionUserId)?.name ??
              users.find(({ _id }) => _id === optionUserId)?.email}
          </p>
          {users.find(({ _id }) => _id === optionUserId)?.year &&
            users.find(({ _id }) => _id === optionUserId)?.branch && (
              <p className="text-sm">
                {
                  YEARS.find(
                    ({ value }) =>
                      users.find(({ _id }) => _id === optionUserId)?.year ===
                      value
                  )?.label
                }{" "}
                • {users.find(({ _id }) => _id === optionUserId)?.branch}
              </p>
            )}
        </div>
      )}
      options={users.map(({ _id, name, email, year, branch }) => ({
        value: _id,
        label: (
          <div className="flex justify-center items-center py-1">
            <p className="overflow-hidden flex-grow px-1 text-sm font-semibold text-ellipsis">
              {name ?? email}
            </p>
            {year && branch && (
              <p>
                {YEARS.find(({ value }) => year === value)?.label} • {branch}
              </p>
            )}
          </div>
        ),
      }))}
    />
  );
};

export default SearchUser;
