import Link from "next/link";
import React, { Suspense, useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sideBar = [
  {
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    label: "Banner",
    link: "/dashboard/banner",
  },
  {
    label: "Events",
    link: "/dashboard/event",
  },
  {
    label: "Employee",
    link: "/dashboard/employee",
  },
  {
    label: "Questions",
    link: "/dashboard/question",
  },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Suspense>
      <div className="flex">
        <div className="w-72 bg-gray-800 text-white h-screen flex flex-col items-center pt-14 gap-5">
          {sideBar.map((item, index) => (
            <div
              key={index}
              className="bg-slate-700 w-48 flex justify-center items-center h-11 rounded"
            >
              <Link key={index} href={item.link}>
                {item.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="w-full px-6 pt-10 h-screen overflow-auto">
          {children}
        </div>
      </div>
    </Suspense>
  );
};

export default DashboardLayout;
