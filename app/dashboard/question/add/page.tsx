"use client";

import fetchData, { ApiResponse } from "@/util/ApiHelper";
import { IQuestion } from "@/util/Types";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const types = [
  { key: "TRANSPARENCY", label: "TRANSPARENCY" },
  { key: "INTEGRITY", label: "INTEGRITY" },
  { key: "EMPATHY & RESPECT", label: "EMPATHY & RESPECT" },
  { key: "ADAPTABILITY", label: "ADAPTABILITY" },
  { key: "ACCOUNTABILITY", label: "ACCOUNTABILITY" },
];

const rating = [
  { key: "1", label: "1" },
  { key: "2", label: "2" },
  { key: "3", label: "3" },
  { key: "4", label: "4" },
  { key: "5", label: "5" },
  { key: "6", label: "6" },
  { key: "7", label: "7" },
  { key: "8", label: "8" },
  { key: "9", label: "9" },
  { key: "10", label: "10" },
];

const QuestionAdd = () => {
  const [question, setQuestion] = useState({
    title: "",
    question: "",
    rationOutOf: "10",
  });

  const id = useSearchParams().get("id");
  const { push } = useRouter();

  useEffect(() => {
    id && getBannerData();
  }, []);
  const getBannerData = async () => {
    const data: ApiResponse<any> = await fetchData(`api/question?id=${id}`, {
      method: "GET",
    });
    setQuestion({
      ...data?.data,
      rationOutOf: data?.data.rationOutOf.toString(),
    });
  };

  const handleSubmit = async () => {
    const data: IQuestion = {
      ...question,
      rationOutOf: parseInt(question.rationOutOf),
    };
    if (id) {
      data._id = id;
      await fetchData("api/question", {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } else {
      await fetchData("api/question", {
        method: "POST",
        body: JSON.stringify(data),
      });
    }
    push("/dashboard/question");
  };

  const isButtonDisabled =
    !question.title || !question.question || !question.rationOutOf;

  return (
    <>
      <div className="flex flex-col gap-8">
        <Input
          type="text"
          label="Question"
          placeholder="Enter question"
          value={question.question}
          onChange={(e) =>
            setQuestion((prev) => ({ ...prev, question: e.target.value }))
          }
        />
        <div className="flex gap-8">
          <div className="w-1/2">
            <Select
              label="Select Title"
              className="w-full"
              onChange={(e) =>
                setQuestion((prev) => ({ ...prev, title: e.target.value }))
              }
              selectedKeys={[question.title]}
            >
              {types.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-1/2">
            <Select
              label="Select rating"
              className="w-full"
              onChange={(e) =>
                setQuestion((prev) => ({
                  ...prev,
                  rationOutOf: e.target.value,
                }))
              }
              selectedKeys={[question.rationOutOf]}
            >
              {rating.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <Button
        isDisabled={isButtonDisabled}
        color="primary"
        className="w-full mt-12"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};

export default QuestionAdd;
