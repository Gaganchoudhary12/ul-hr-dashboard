"use client";

import { useLayoutEffect, useState } from "react";

import fetchData, { ApiResponse } from "@/util/ApiHelper";

import BannerTable from "@/components/organisms/BannerTable";
import { useRouter } from "next/navigation";
import Loader from "@/components/atoms/Loader";
import { IBanner } from "@/util/Types";


const Banner = () => {
  const [bannerData, setBannerData] = useState<IBanner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();

  useLayoutEffect(() => {
    getBannerData();
  }, []);
  const getBannerData = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData("api/banner", {
      method: "GET",
    });
    setBannerData(data.data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetchData("api/banner", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    getBannerData();
  };

  const handleEdit = async (id: string) => {
    push(`banner/add?id=${id}`);
  };

  return isLoading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <BannerTable
      bannerData={bannerData}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};
export default Banner;
