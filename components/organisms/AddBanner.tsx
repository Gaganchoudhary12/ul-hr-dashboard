"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button, DateValue, Select, SelectItem } from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import type { RangeValue } from "@react-types/shared";
import {
  today,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";

import fetchData from "@/util/ApiHelper";
import { IBanner } from "@/util/Types";
import { getFormateDateOfINtDate } from "@/util/Date";

import RangeDatePicker from "@/components/molecules/RangeDatePicker";
import { useRouter, useSearchParams } from "next/navigation";

const types = [
  { key: "ANNIVERSARIES", label: "ANNIVERSARIES" },
  { key: "TOWNHALL", label: "TOWNHALL" },
];

const AddBanner = ({ bannerData }: { bannerData: IBanner }) => {
  const [image, setImage] = useState<string | null>("");
  const [data, setData] = useState({
    image:
      "https://cdn.universityliving.com/files/1724231997756group-10373.png",
    title: "",
  });
  let [date, setDate] = useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  });
  const id = useSearchParams().get("id");

  const { push } = useRouter();

  useEffect(() => {
    if (bannerData.title) {
      setData({
        image: bannerData.image,
        title: bannerData.title,
      });
      setDate({
        start: parseAbsoluteToLocal(bannerData.startDate as any),
        end: parseAbsoluteToLocal(bannerData.endDate as any),
      });
    }
  }, [bannerData.title]);

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
    },
  });
 
  const handleSubmit = async () => {
    const bannerDate:IBanner = {
      ...data,
      startDate: getFormateDateOfINtDate(date.start),
      endDate: getFormateDateOfINtDate(date.end),
    };
    if (id) {
      bannerDate._id = id;
      await fetchData("api/banner", {
        method: "PUT",
        body: JSON.stringify(bannerDate),
      });
    } else {
      await fetchData("api/banner", {
        method: "POST",
        body: JSON.stringify(bannerDate),
      });
    }
    push('/dashboard/banner')
  };

  const handleType = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, ["title"]: value }));
  };

  return (
    <>
      <p className="text-2xl font-bold">Add Banner</p>
      <div className="flex items-center pt-12">
        <div className="w-2/4 flex flex-col gap-7">
          <Select
            label="Select an type"
            className="max-w-xs"
            onChange={(e) => handleType(e)}
            selectedKeys={[data.title]}
          >
            {types.map((type, index) => (
              <SelectItem key={type.key}>{type.label}</SelectItem>
            ))}
          </Select>
          <RangeDatePicker value={date} setValue={setDate} minValue={today(getLocalTimeZone())}/>
        </div>
        <div className="w-2/4">
          <div className="flex flex-col items-center justify-center">
            <div
              {...getRootProps()}
              className="w-96 p-6 py-20 border-2 border-dashed border-gray-400 rounded-lg text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <p className="text-gray-600">Drag & drop any file here</p>
              <p className="text-gray-600">or browse file from device</p>
            </div>
          </div>
          {image && (
            <div className="mt-4">
              <img src={image} alt="Uploaded" className="max-w-full h-auto" />
            </div>
          )}
        </div>
      </div>
      <Button
        isDisabled={!(data.image && data.title)}
        color="primary"
        className="w-full mt-12"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};

export default AddBanner;
