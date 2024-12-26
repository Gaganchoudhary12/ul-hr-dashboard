"use client";

import Loader from "@/components/atoms/Loader";
import OnboardingTable from "@/components/organisms/Onboarding";
import fetchData, { ApiResponse } from "@/util/ApiHelper";
import { IOnboarding } from "@/util/Types";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

const Onboarding = () => {
  const [feedbackData, setFeedbackData] = useState<IOnboarding[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();

  useLayoutEffect(() => {
    getFeedbackData();
  }, []);
  const getFeedbackData = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData("api/onboarding", {
      method: "GET",
    });
    setFeedbackData(data.data);
    setIsLoading(false);
  };

  const handleValues = (email: string) => {
    push(`onboarding/values?email=${email}`);
  };

  return isLoading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <OnboardingTable data={feedbackData} handleValues={handleValues} />
  );
};

export default Onboarding;
