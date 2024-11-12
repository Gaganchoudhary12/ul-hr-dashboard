import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import Employees from "../../../lib/models/employee";

export async function GET(req: any): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const _id = new URLSearchParams(url.searchParams).get("id");
    await mongoose.connect(process.env.DB_URL as string);
    if (_id) {
      const data = await Employees.findOne({
        _id: new ObjectId(_id),
      });
      return NextResponse.json(
        { data },
        {
          status: 200,
        }
      );
    }
    const employees = await Employees.find({});
    
    return NextResponse.json(
      { data: employees },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching employees",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const res = await req.json();
  try {
    await mongoose.connect(process.env.DB_URL as string);
    await Employees.deleteMany({});
    await Employees.insertMany(res);
    console.log(res,'res');
    
    return NextResponse.json("Employees data uploaded successful", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error employees",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}