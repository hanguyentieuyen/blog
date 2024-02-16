import prisma from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const req = await request.json();
    const updateBlogData = await prisma.blog.update({
      where: {
        id: Number(req.id),
      },
      data: {
        comments: req.comments,
      },
    });
    if (updateBlogData) {
      return NextResponse.json({
        status: true,
        message: "Updated blog successfully!",
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "Failed to update blog. Please try again",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      status: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
