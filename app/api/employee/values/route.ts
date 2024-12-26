import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import UserRating from "../../../../lib/models/userRating";
import Managers from "../../../../lib/models/managers";

export async function GET(req: any): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const email = new URLSearchParams(url.searchParams).get("email");
     if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await mongoose.connect(process.env.DB_URL as string);
    const rating = await UserRating.aggregate([
      {
        $match: { email: email },
      },
      {
        $addFields: {
          isoDate: { $toDate: "$date" },
        },
      },
      {
        $sort: {
          isoDate: -1,
        },
      },
    ]);
    const ratingByManager = await Managers.aggregate([
      {
        $match: { email: email },
      },
      {
        $addFields: {
          isoDate: { $toDate: "$date" },
        },
      },
      {
        $sort: {
          isoDate: -1,
        },
      },
    ]);
    const data = { rating, ratingByManager };
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
