"use client";

import Loader from "@/components/atoms/Loader";
import fetchData, { ApiResponse } from "@/util/ApiHelper";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const AddEmploy = () => {
  const [file, setFile] = useState(null);
  const [convertedData, setConvertedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmployeeDataUploaded, setIsEmployeeDataUploaded] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to convert Excel date format to JS Date
  const convertExcelDate = (excelDate:any) => {
    const millisecondsPerDay = 86400000; // Number of milliseconds in a day
    const excelStartDate = new Date(Date.UTC(1900, 0, 1)); // January 1, 1900
    return new Date(excelStartDate.getTime() + excelDate * millisecondsPerDay);
  };

  // Function to generate a dummy ObjectId similar to MongoDB ObjectId format
  const generateObjectId = () => {
    return (
      Math.floor(Date.now() / 1000).toString(16) +
      "xxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
    ).toLowerCase();
  };

  const handleCheckData = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const dataRows = jsonData.slice(3, jsonData.length - 3);

      // Map each row to the object format
      const result = dataRows.map((row: any) => {
        const obj:any = {
          employeeNumber: row[1] || "",
          fullName: row[2] || "",
          email: row[3] || "",
          dob: row[4] ? convertExcelDate(row[4]) : "",
          gender: row[5] || "",
          bloodGroup: row[6] || "",
          location: row[7] || "",
          businessUnit: row[8] || "",
          department: row[9] || "",
          jobTitle: row[10] || "",
          reportingTo: row[11] || "",
          reportingManagerID: row[12] || "",
          dottedLineManager: row[13] || "",
          workerType: row[14] || "",
          joiningDate: row[15] ? convertExcelDate(row[15]) : "",
        };

        // Remove empty keys
        Object.keys(obj).forEach((key) => {
          if (obj[key] === "") delete obj[key];
        });

        return obj;
      });

      setConvertedData(result);
    };

    reader.readAsArrayBuffer(file);
  };
  const handleUpload = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData("api/employee", {
      method: "POST",
      body: JSON.stringify(convertedData),
    });
    setIsEmployeeDataUploaded(true);
    setIsLoading(false);
  };

  return (
    <>
      <h1>Upload Excel File and Convert</h1>
      <div className="flex justify-between pt-6">
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <div className="gap-6 flex flex-row">
          <button
            className="w-36 py-3 bg-slate-950 text-white rounded-lg"
            onClick={handleCheckData}
          >
            Check Data
          </button>
          <button
            className="w-36 py-3 bg-slate-950 text-white rounded-lg"
            onClick={handleUpload}
          >
            {isLoading ? (
              <Loader color='white' size='sm'/>
            ) : isEmployeeDataUploaded ? (
              "Uploaded"
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>

      {convertedData.length > 0 && (
        <div>
          <h2>Converted Data:</h2>
          <pre>{JSON.stringify(convertedData, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default AddEmploy;
