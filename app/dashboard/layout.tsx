"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";

import { clearValueFromLocalStorage, getValueFromLocalStorage } from "@/util/StorageHelper";

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
  {
    label: "Feedback",
    link: "/dashboard/feedback",
  },
  {
    label: "Ideas",
    link: "/dashboard/ideas",
  },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { push } = useRouter();

  const handleLogout = () => {
    clearValueFromLocalStorage("user");
    push("/");
  };

  return (
    <Suspense>
      <div className="flex">
        <div className="w-72 bg-gray-800 text-white h-screen flex flex-col items-center justify-between py-14">
          <div className="flex flex-col items-center gap-5">
            {sideBar.map((item, index) => (
              <Link key={index} href={item.link}>
                <div
                  key={index}
                  className="bg-slate-700 w-48 flex justify-center items-center h-11 rounded"
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
          <div
            className="bg-slate-700 w-48 flex justify-center items-center h-11 rounded cursor-pointer"
            onClick={() => handleLogout()}
          >
            Logout
          </div>
        </div>
        <div className="w-full px-6 pt-10 h-screen overflow-auto">
          {children}
        </div>
      </div>
    </Suspense>
  );
};

export default DashboardLayout;
