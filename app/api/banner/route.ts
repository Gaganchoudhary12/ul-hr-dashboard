import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import Banner from "../../../lib/models/banner";

export async function GET(req: any): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const _id = new URLSearchParams(url.searchParams).get("id");
    await mongoose.connect(process.env.DB_URL as string);
    if (_id) {
      const data = await Banner.findOne({
        _id: new ObjectId(_id),
      });
      return NextResponse.json(
        { data },
        {
          status: 200,
        }
      );
    }
    const data = await Banner.find({});
    return NextResponse.json(
      { data: data },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching banner",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}

// To handle a POST request to /api/posts
export async function POST(req: NextRequest): Promise<NextResponse> {
  const res = await req.json();
  try {
    await mongoose.connect(process.env.DB_URL as string);
    await Banner.create(res);
    return NextResponse.json("Banner Created", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error banner",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const res = await req.json();
  try {
    await mongoose.connect(process.env.DB_URL as string);
    await Banner.deleteOne(res._id);
    return NextResponse.json("Banner Deleted", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error banner",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
export async function PUT(req: NextRequest): Promise<NextResponse> {
  const res = await req.json();
  const { _id, ...body } = res;
  try {
    await mongoose.connect(process.env.DB_URL as string);
    await Banner.updateOne({ _id: new ObjectId(_id) }, body);
    return NextResponse.json("Banner updated", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error banner",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
