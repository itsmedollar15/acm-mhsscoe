"use client";
import { getAllTeams } from "@/actions/teams";
import { Select, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TeamChangeControl = ({ currYear }) => {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    getAllTeams().then((teams) => {
      setTeams(teams);
    });
  }, []);
  return (
    <div className="flex gap-3 justify-center items-center p-5 mt-5 sm:justify-end">
      <h2 className="text-2xl italic font-bold text-gray-700">Our Team</h2>
      {teams.length > 0 ? (
        <Select
          value={currYear}
          options={teams.map(({ year }) => ({
            label: (
              <p className="text-xl font-bold text-gray-700 itaic">{year}</p>
            ),
            value: year,
          }))}
          size="large"
          onChange={(value) => router.push(`/teams/${value}`)}
        />
      ) : (
        <Skeleton.Button size="large" active />
      )}
    </div>
  );
};

export default TeamChangeControl;
