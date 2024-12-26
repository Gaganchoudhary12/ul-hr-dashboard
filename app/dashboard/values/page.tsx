"use client";

import Loader from '@/components/atoms/Loader';
import fetchData, { ApiResponse } from '@/util/ApiHelper';
import { IValues } from '@/util/Types';
import React, { useLayoutEffect, useState } from 'react'

const Values = () => {

    const [valuesData, setValuesData] = useState<IValues[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useLayoutEffect(() => {
    getValuesData();
  }, []);
  const getValuesData = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData("api/values", {
      method: "GET",
    });
    setValuesData(data.data);
    setIsLoading(false);
    console.log(data.data);
    
  };
  return isLoading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <>
    {/* {valuesData} */}
    <div className="container mx-auto p-4">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-200">Months</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-200">No. of Submits</th>
          </tr>
        </thead>
        <tbody>
          {valuesData.map((item:IValues, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{item.date}</td>
              <td className="border border-gray-300 px-4 py-2">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Values