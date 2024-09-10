"use client";

import Loader from "@/components/atoms/Loader";
import EmployeesTable from "@/components/organisms/EmployeesTable";
import fetchData, { ApiResponse } from "@/util/ApiHelper";
import { IEmployee } from "@/util/Types";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";


const User = () => {
  const [employeesData, setEmployeesData] = useState<IEmployee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();

  useLayoutEffect(() => {
    getEmployeesData();
  }, []);
  const getEmployeesData = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData("api/employee", {
      method: "GET",
    });
    setEmployeesData(data.data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetchData("api/employee", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    getEmployeesData();
  };

  const handleEdit = async (id: string) => {
    push(`employee/add?id=${id}`);
  };
  
  return isLoading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <EmployeesTable employeesData={employeesData} handleEdit={handleEdit}/>
  );
};

export default User;
