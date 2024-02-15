import prisma from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get("categoryId");
    const getBlogsByCategory = await prisma.blog.findMany({
      where: {
        category: categoryId || "",
      },
    });
    if (getBlogsByCategory) {
      return NextResponse.json({
        status: true,
        data: getBlogsByCategory,
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "Fetch failed blogs! Please try again",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "Something went wrongs! Please try again",
    });
  }
}
