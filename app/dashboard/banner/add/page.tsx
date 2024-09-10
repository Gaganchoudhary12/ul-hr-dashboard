"use client";

import AddBanner from "@/components/organisms/AddBanner";
import fetchData, { ApiResponse } from "@/util/ApiHelper";
import { IBanner } from "@/util/Types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Add = () => {
  const id = useSearchParams().get("id");
  const [bannerData, setBannerData] = useState<IBanner>({});
  useEffect(() => {
    id && getBannerData();
  }, []);
  const getBannerData = async () => {
    const data: ApiResponse<any> = await fetchData(`api/banner?id=${id}`, {
      method: "GET",
    });
    setBannerData(data.data);
  };
  return (
      <AddBanner bannerData={bannerData} />
  );
};

export default Add;
