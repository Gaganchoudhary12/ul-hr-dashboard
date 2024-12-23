"use client";

import Loader from "@/components/atoms/Loader";
import QuestionTable from "@/components/organisms/QuestionTable";
import fetchData, { ApiResponse } from "@/util/ApiHelper";
import { IQuestion } from "@/util/Types";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

const Question = () => {
  const [questionData, setQuestionData] = useState<IQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();

  useLayoutEffect(() => {
    getEventsData();
  }, []);
  const getEventsData = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData("api/question", {
      method: "GET",
    });

    setQuestionData(data.data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetchData("api/question", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    getEventsData();
  };

  const handleEdit = async (id: string) => {
    push(`question/add?id=${id}`);
  };

  return isLoading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <QuestionTable
      data={questionData}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default Question;
