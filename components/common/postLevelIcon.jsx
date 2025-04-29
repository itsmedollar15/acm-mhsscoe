"use client";
import { POST_LEVELS } from "@/constants/postLevels";
import React from "react";

const PostLevelIcon = ({ level }) => {
  return <>{POST_LEVELS[level].label}</>;
};

export default PostLevelIcon;
