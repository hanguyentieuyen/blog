import prisma from "@/utils/database";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const getAllBlogs = await prisma.blog.findMany();
    if (getAllBlogs && getAllBlogs.length) {
      return NextResponse.json({
        status: true,
        data: getAllBlogs,
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "Failed to fetch blog posts. Please try again",
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
