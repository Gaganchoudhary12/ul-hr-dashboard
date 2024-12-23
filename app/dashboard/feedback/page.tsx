"use client";

import Loader from "@/components/atoms/Loader";
import FeedbackTable from "@/components/organisms/FeedbackTable";
import fetchData, { ApiResponse } from "@/util/ApiHelper";
import { IFeedback } from "@/util/Types";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState<IFeedback[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();

  useLayoutEffect(() => {
    getFeedbackData();
  }, []);
  const getFeedbackData = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData("api/feedback", {
      method: "GET",
    });
console.log(data.data);

    setFeedbackData(data.data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetchData("api/feedback", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    getFeedbackData();
  };

  return isLoading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <FeedbackTable
      data={feedbackData}
      handleDelete={handleDelete}
    />
  );
};

export default Feedback;
