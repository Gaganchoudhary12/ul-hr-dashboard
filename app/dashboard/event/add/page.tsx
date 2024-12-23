"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Calendar,
  DateValue,
  Input,
  Textarea,
} from "@nextui-org/react";
import {
  today,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { useRouter, useSearchParams } from "next/navigation";

import fetchData, { ApiResponse } from "@/util/ApiHelper";
import { getFormateDateOfINtDate } from "@/util/Date";
import { IEvents } from "@/util/Types";

const AddEvents = () => {
  let [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const id = useSearchParams().get("id");
  const { push } = useRouter();

  useEffect(() => {
    id && getBannerData();
  }, []);
  const getBannerData = async () => {
    const data: ApiResponse<any> = await fetchData(`api/events?id=${id}`, {
      method: "GET",
    });
    const { title, date, description, image } = data?.data;
    setTitle(title);
    setDate(parseAbsoluteToLocal(date as any));
    setDescription(description);
    setImage(image);
  };

  const handleSubmit = async () => {
    const data: IEvents = {
      title,
      date: getFormateDateOfINtDate(date as any),
      description,
      image,
    };
    if (id) {
      data._id = id;
      await fetchData("api/events", {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } else {
      await fetchData("api/events", {
        method: "POST",
        body: JSON.stringify(data),
      });
    }
    push("/dashboard/event");
  };
  return (
    <>
      <div className="flex">
        <div className="w-1/2">
          <div className="space-y-5">
            <Input
              type="text"
              label="Title"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              type="text"
              label="Description"
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="url"
              label="Image url*"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <Calendar
            aria-label="Date (Uncontrolled)"
            defaultValue={today(getLocalTimeZone())}
            minValue={today(getLocalTimeZone())}
            value={date}
            onChange={setDate}
          />
        </div>
      </div>
      <Button
        isDisabled={!title}
        color="primary"
        className="w-full mt-12"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};

export default AddEvents;
