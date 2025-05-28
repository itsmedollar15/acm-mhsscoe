"use client";
import React from "react";
import { Skeleton } from "antd";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {/* Year Selector Skeleton */}
          <div className="flex justify-end mt-6">
            <Skeleton.Button active size="large" style={{ width: 200 }} />
          </div>

          {/* Team Sections Skeleton */}
          <div className="flex flex-col gap-12 mt-4">
            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-8">
                <Skeleton.Input active size="large" style={{ width: 200 }} />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((card) => (
                    <div key={card} className="space-y-4">
                      <Skeleton.Image
                        active
                        style={{ width: 192, height: 192 }}
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 150 }}
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 100 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
