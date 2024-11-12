"use client";

import {
  today,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { DateValue, RangeValue } from "@nextui-org/react";

import fetchData, { ApiResponse } from "@/util/ApiHelper";

import BarChart from "@/components/molecules/BarChart";
import RangeDatePicker from "@/components/molecules/RangeDatePicker";
import Feedback from "@/components/organisms/Feedback";
import { getFormateDateOfINtDate } from "@/util/Date";
import Loader from "@/components/atoms/Loader";
import { IFeedback } from "@/util/Types";

const page = () => {
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [feedbackData, setIsFeedbackData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  let [date, setDate] = useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  });

  useLayoutEffect(() => {
    getFeedbackData(date);
  }, []);

  const data = useMemo(() => {
    if (moodData.length) {
      return [
        ["", "Mood"],
        [
          "😍",
          moodData.filter((e: IFeedback) => Math.ceil(e.rating as number) === 5)
            .length,
        ],
        [
          "😊",
          moodData.filter((e: IFeedback) => Math.ceil(e.rating as number) === 4)
            .length,
        ],
        [
          "🙂",
          moodData.filter((e: IFeedback) => Math.ceil(e.rating as number) === 3)
            .length,
        ],
        [
          "😟",
          moodData.filter((e: IFeedback) => Math.ceil(e.rating as number) === 2)
            .length,
        ],
        [
          "😡",
          moodData.filter((e: IFeedback) => Math.ceil(e.rating as number) === 1)
            .length,
        ],
      ];
    } else {
      return [
        ["", "Mood"],
        ["😍", 0],
        ["😊", 0],
        ["🙂", 0],
        ["😟", 0],
        ["😡", 0],
      ];
    }
  }, [moodData]);

  const getFeedbackData = async (date: any) => {
    setIsFeedbackLoading(true);
    let start = { ...date.start };
    let end = { ...date.end };
    start.day += 1;
    end.day += 1;
    const data = {
      startDate: getFormateDateOfINtDate(start),
      endDate: getFormateDateOfINtDate(end),
    };
    const feedbackData: ApiResponse<any> = await fetchData("api/feedback", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setIsFeedbackData(feedbackData.data);
    setIsFeedbackLoading(false);
    const mood = feedbackData.data.filter(
      (e: IFeedback) => e.type === "dailyMood"
    )[0].data;
    setMoodData(mood);
  };

  const handleSetDate = (date: any) => {
    setDate(date);
    getFeedbackData(date);
  };

  return (
    <>
      <div className="flex gap-16 pb-20">
        <div className="w-[600px]">
          <BarChart data={data} />
        </div>
        <div className="w-64">
          <p>Select Range</p>
          <RangeDatePicker value={date} setValue={handleSetDate} />
        </div>
      </div>
      {isFeedbackLoading ? (
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Feedback feedbackData={feedbackData} />
      )}
    </>
  );
};

export default page;
