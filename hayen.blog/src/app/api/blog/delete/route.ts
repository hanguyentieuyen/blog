import prisma from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const blogId = url.searchParams.get("id");
    const deleteBlog = await prisma.blog.delete({
      where: {
        id: Number(blogId),
      },
    });

    if (deleteBlog) {
      return NextResponse.json({
        status: true,
        message: "Deleted blog successfully!",
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "Someting went wrong! Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "Delete blog failed!",
    });
  }
}
