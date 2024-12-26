import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import EmployeeOnboardings from "@/lib/models/onboardingEmployees";
import ManagerOnboardings from "@/lib/models/onboardingManager";

export async function GET(req: any): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const email = new URLSearchParams(url.searchParams).get("email");

    await mongoose.connect(process.env.DB_URL as string);
    const [rating, ratingByManager] = await Promise.all([
      EmployeeOnboardings.aggregate([
        { $match: { email } },
        { $sort: { days: 1 } },
      ]),
      ManagerOnboardings.aggregate([
        { $match: { email } },
        { $sort: { days: 1 } },
      ]),
    ]);

    return NextResponse.json(
      { data: { rating, ratingByManager } },
      { status: 200 }
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
