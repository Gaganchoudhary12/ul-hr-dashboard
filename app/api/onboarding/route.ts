import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import EmployeeOnboardings from "../../../lib/models/onboardingEmployees";

export async function GET(req: any): Promise<NextResponse> {
  try {
    const data = await EmployeeOnboardings.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "email",
          foreignField: "email",
          pipeline: [
            {
              $project: {
                fullName: 1,
                joiningDate: 1,
                department: 1,
                gender: 1,
                employeeNumber: 1,
              },
            },
          ],
          as: "data",
        },
      },
      {
        $project: {
          email: 1,
          data: { $arrayElemAt: ["$data", 0] },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$data", { email: "$email" }] },
        },
      },
      {
        $group: {
          _id: "$email",
          document: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$document" },
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
        message: "Error fetching onboarding employees",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
