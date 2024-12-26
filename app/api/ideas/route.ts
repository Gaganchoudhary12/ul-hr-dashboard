import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import Ideas from "../../../lib/models/ideas";

export async function GET(): Promise<NextResponse> {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    const ideas = await Ideas.find({}).sort({ date: -1 });
    return NextResponse.json(
      { data: ideas },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching events",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}