import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Feedback from "../../../lib/models/feedback";

export async function POST(req: any): Promise<NextResponse> {
  try {
    const res = await req.json();
    const startOfDay = `${res.startDate.split("T")[0]}T00:00:00Z`;
    const endOfDay = `${res.endDate.split("T")[0]}T23:59:59Z`;

    await mongoose.connect(process.env.DB_URL as string);
    const types = await Feedback.distinct("type", {
      type: { $ne: "feedback" },
    });
    let feedbacks = [];
    for (const key of types) {
      const data = await Feedback.find({
        type: key,
        date: {
          $gte: new Date(startOfDay),
          $lte: new Date(endOfDay),
        },
      });

      feedbacks.push({ type: key, data });
    }
    return NextResponse.json(
      { data: feedbacks },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching feedback",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    const feedbacks = await Feedback.find({ type: "feedback" }).sort({
      date: -1,
    });
    return NextResponse.json(
      { data: feedbacks },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching feedback",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
