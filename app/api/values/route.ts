import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import UserRating from "../../../lib/models/userRating";

export async function GET(): Promise<NextResponse> {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    const data = await UserRating.aggregate([
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          ISODate: { $toDate: "$_id" },
          date: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          ISODate: -1,
        },
      },
    ]);

    return NextResponse.json(
      { data: data },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching values",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
