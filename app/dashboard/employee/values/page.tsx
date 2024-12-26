"use client";

import Loader from "@/components/atoms/Loader";
import fetchData, { ApiResponse } from "@/util/ApiHelper";
import { IValues } from "@/util/Types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EmployeeValues = () => {
  const email = useSearchParams().get("email");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [valuesData, setValuesData] = useState([]);
  const [valuesByManagerData, setValuesByManagerData] = useState([]);
  useEffect(() => {
    email && getBannerData();
  }, []);
  const getBannerData = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData(
      `api/employee/values/?email=${email}`,
      {
        method: "GET",
      }
    );
    setValuesData(data?.data?.rating);
    setValuesByManagerData(data?.data?.ratingByManager);
    setIsLoading(false);
  };
  return isLoading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <>
      <div className="grid grid-cols-2 border-2 border-black rounded-md p-4">
        <div className="border-r-2 border-black">
          <p className="text-center text-2xl font-bold">By Employee</p>
          {valuesData?.length ? (
            <div>
              {valuesData.map((item: any, index) => {
                const isObject = typeof item === "object";
                const keys = Object.keys(item);

                return (
                  <div key={index} className="border-b-2 border-black mb-4">
                    <p className="font-bold text-xl">{item.date}</p>
                    {isObject &&
                      keys.map((ans: any, i: number) => {
                        if (
                          ans === "_id" ||
                          ans === "date" ||
                          ans === "email" ||
                          ans === "isoDate"
                        ) {
                          return null;
                        }
                        const obj = item[ans];
                        const question = Object.keys(obj);
                        const answer = Object.values(obj);

                        return (
                          <div key={i} className="px-10 py-4 space-y-1">
                            <p className="font-semibold">{ans}</p>
                            {question.map((e, key) => (
                              <div className="flex justify-between px-24">
                                <p>{e}</p>
                                <p>{answer[key]}</p>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-2xl font-bold">No data found</p>
            </div>
          )}
        </div>
        <div className="pl-4">
          <p className="text-center text-2xl font-bold">By Manager</p>
          {valuesByManagerData?.length ? (
            <div>
              {valuesByManagerData.map((item: any, index) => {
                const isObject = typeof item === "object";
                const keys = Object.keys(item);

                return (
                  <div key={index} className="border-b-2 border-black mb-4">
                    <p className="font-bold text-xl">{item.date}</p>
                    {isObject &&
                      keys.map((ans: any, i: number) => {
                        if (
                          ans === "_id" ||
                          ans === "date" ||
                          ans === "email" ||
                          ans === "managerEmail" ||
                          ans === "isoDate"
                        ) {
                          return null;
                        }
                        const obj = item[ans];
                        const question = Object.keys(obj);
                        const answer = Object.values(obj);

                        return (
                          <div key={i} className="px-10 py-4 space-y-1">
                            <p className="font-semibold">{ans}</p>
                            {question.map((e, key) => (
                              <div className="flex justify-between px-24">
                                <p>{e}</p>
                                <p>{answer[key]}</p>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-2xl font-bold">No data found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeValues;
