import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { ROLES } from "@/constants/roles";
import { Card } from "antd";
import { DEFAULT_PROFILE_PICTURE } from "@/constants/common";
import { YEARS } from "@/constants/years";
import Image from "next/image";

const AdminUserCard = ({
  profilePicture,
  name,
  email,
  branch,
  year,
  role,
  type,
}) => {
  return (
    <Glassmorphism className="hover:scale-[1.03] transition-all duration-300">
      <Card
        className="!bg-transparent border-none"
        hoverable
        cover={
          <Image
            className="object-cover aspect-square"
            src={`${process.env.NEXT_PUBLIC_FILE_SERVER}${
              profilePicture ?? DEFAULT_PROFILE_PICTURE
            }`}
            alt={name ?? "User Profile"}
            width={300}
            height={300}
          />
        }
      >
        <Card.Meta
          className="text-center"
          title={name ?? email}
          description={
            <p className="italic">
              {type === "roles"
                ? Object.keys(ROLES)[
                    Object.values(ROLES).indexOf(role)
                  ]?.replace("_", " ")
                : year && branch
                ? YEARS.find(({ value }) => value === year).label +
                  " • " +
                  branch
                : "Profile incomplete"}
            </p>
          }
        />
      </Card>
    </Glassmorphism>
  );
};

export default AdminUserCard;
