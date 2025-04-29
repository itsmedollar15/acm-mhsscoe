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
    <div className="min-h-[calc(100vh-64px)] pt-24 pb-12 px-4 bg-gray-50/50">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-white" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Update Profile Details
            </h1>
          </div>
          <p className="text-gray-500 ml-12">
            Keep your profile information up to date to make the most of your ACM membership
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow">
          <UserProfileUpdateForm
            userDetails={profileDetails}
            updateUserDetails={updateProfileDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfileUpdatePage;