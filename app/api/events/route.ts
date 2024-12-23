import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import Events from "../../../lib/models/events";

export async function GET(req: any): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const _id = new URLSearchParams(url.searchParams).get("id");
    await mongoose.connect(process.env.DB_URL as string);
    if (_id) {
      const data = await Events.findOne({
        _id: new ObjectId(_id),
      });
      return NextResponse.json(
        { data },
        {
          status: 200,
        }
      );
    }
    const events = await Events.find({});
    return NextResponse.json(
      { data: events },
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

// To handle a POST request to /api/posts
export async function POST(req: NextRequest): Promise<NextResponse> {
  const res = await req.json();
  try {
    await mongoose.connect(process.env.DB_URL as string);
    await Events.create(res);
    return NextResponse.json("Banner Created", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error events",
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
    await Events.updateOne({ _id: new ObjectId(_id) }, body);
    return NextResponse.json("Banner updated", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error events",
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
    await Events.deleteOne(res._id);
    return NextResponse.json("Banner Deleted", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error events",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
