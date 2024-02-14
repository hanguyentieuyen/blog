import prisma from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const searchBlogList = await prisma.blog.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query || "",
            },
          },
          {
            content: {
              contains: query || "",
            },
          },
        ],
      },
    });

    if (searchBlogList) {
      return NextResponse.json({
        status: true,
        data: searchBlogList,
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "Something went wrong! Please try again.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Search failed!",
    });
  }
}
