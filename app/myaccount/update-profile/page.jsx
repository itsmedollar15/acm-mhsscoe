"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { message as showMessage } from "antd";
import Glassmorphism from "@/components/common/glassmorphism";
import UserService from "@/services/user";
import UserProfileUpdateForm from "@/components/profile/profileUpdateForm";

const MyProfileUpdatePage = () => {
  const [profileDetails, setProfileDetails] = useState();

  const getProfileDetails = () => {
    UserService.getProfileDetails()
      .then((details) => setProfileDetails(details))
      .catch((message) => showMessage.error(message));
  };

  const updateProfileDetails = (details) => {
    UserService.updateProfileDetails(details)
      .then((message) => {
        showMessage.success(message);
        getProfileDetails();
        UserService.getAuthStatus();
      })
      .catch((message) => showMessage.error(message));
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] pt-16 pb-12 px-4 ">
      <div className="mx-auto space-y-8 max-w-4xl">
        {/* Header Section */}
        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex gap-6 items-center mb-4">
            <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl transition-transform duration-300 transform rotate-3 hover:rotate-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                Update Profile Details
              </h1>
              <p className="text-lg text-gray-600">
                Keep your profile information up to date to make the most of
                your ACM membership
              </p>
            </div>
          </div>
          <div className="pl-4 border-l-4 border-purple-100 ml-18">
            <ul className="space-y-2">
              <li className="flex gap-2 items-center text-gray-600">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Update your personal information
              </li>
              <li className="flex gap-2 items-center text-gray-600">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Add your social media links
              </li>
              <li className="flex gap-2 items-center text-gray-600">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                Keep your academic details current
              </li>
            </ul>
          </div>
        </div>

        {/* Form Section */}
        <UserProfileUpdateForm
          userDetails={profileDetails}
          updateUserDetails={updateProfileDetails}
        />
      </div>
    </div>
  );
};

export default MyProfileUpdatePage;
