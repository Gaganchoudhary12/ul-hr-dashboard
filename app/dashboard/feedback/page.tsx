"use client";

import Loader from "@/components/atoms/Loader";
import FeedbackTable from "@/components/organisms/FeedbackTable";
import fetchData, { ApiResponse } from "@/util/ApiHelper";
import { IFeedback } from "@/util/Types";
import React, { useLayoutEffect, useState } from "react";

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState<IFeedback[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    getFeedbackData();
  }, []);
  const getFeedbackData = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData("api/feedback", {
      method: "GET",
    });
    setFeedbackData(data.data);
    setIsLoading(false);
  };

  return isLoading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <FeedbackTable
      data={feedbackData}
    />
  );
};

export default Feedback;
