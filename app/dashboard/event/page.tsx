"use client";

import Loader from "@/components/atoms/Loader";
import EventsTable from "@/components/organisms/EventsTable";
import fetchData, { ApiResponse } from "@/util/ApiHelper";
import { IEvents } from "@/util/Types";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

const Events = () => {
  const [eventsData, setEventsData] = useState<IEvents[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();

  useLayoutEffect(() => {
    getEventsData();
  }, []);
  const getEventsData = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData("api/events", {
      method: "GET",
    });
    setEventsData(data.data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetchData("api/events", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    getEventsData();
  };

  const handleEdit = async (id: string) => {
    push(`event/add?id=${id}`);
  };

  return isLoading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <EventsTable
      eventsData={eventsData}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default Events;
