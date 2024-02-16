import prisma from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const blogId = url.searchParams.get("blogId");
    const blogById = await prisma.blog.findUnique({
      where: {
        id: Number(blogId),
      },
    });

    if (blogById) {
      return NextResponse.json({
        status: true,
        data: blogById,
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "Something went wrong! Please try again",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "Failed to fetch blog!",
    });
  }
}
