"use client";

import Loader from "@/components/atoms/Loader";
import IdeaTable from "@/components/organisms/IdeaTable";
import fetchData, { ApiResponse } from "@/util/ApiHelper";
import { IIdeas } from "@/util/Types";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

const Ideas = () => {
  const [ideasDate, setIdeasDate] = useState<IIdeas[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();

  useLayoutEffect(() => {
    getIdeasData();
  }, []);
  const getIdeasData = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData("api/ideas", {
      method: "GET",
    });
    console.log(data.data);

    setIdeasDate(data.data);
    setIsLoading(false);
  };

  return isLoading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <IdeaTable data={ideasDate} />
  );
};

export default Ideas;
