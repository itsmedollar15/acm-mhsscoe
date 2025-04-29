"use client";
import React from "react";
import { Skeleton } from "antd";

const TeamsPageLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-10 w-full sm:w-2/3 md:w-1/2">
        <Skeleton.Input className="!w-full" size="large" active />
      </div>
      <div className="mt-10 flex gap-10 justify-center items-center flex-wrap">
        <Skeleton.Node
          className="!w-52 !h-52 lg:!w-72 lg:!h-72"
          size="large"
          active
        >
          <></>
        </Skeleton.Node>

        <Skeleton.Node
          className="!w-52 !h-52 lg:!w-72 lg:!h-72"
          size="large"
          active
        >
          <></>
        </Skeleton.Node>

        <Skeleton.Node
          className="!w-52 !h-52 lg:!w-72 lg:!h-72"
          size="large"
          active
        >
          <></>
        </Skeleton.Node>
      </div>
    </div>
  );
};

export default TeamsPageLoading;
