import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "../../../lib/models/user";

export async function POST(req: any): Promise<NextResponse> {
  try {
    const res = await req.json();
    const { email, password } = res;
    await mongoose.connect(process.env.DB_URL as string);
    const data = await User.findOne({ email, password });
    if (data) {
        const { email, roles } = data;
      return NextResponse.json(
        { data: {email,roles} },
        {
          status: 200,
        }
      );
    }
    return NextResponse.json(
      { data: "user not found" },
      {
        status: 401,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while login",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
