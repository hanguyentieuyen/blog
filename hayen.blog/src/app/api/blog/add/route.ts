import prisma from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(resquest: NextRequest) {
    try {
        const dataBlog = await resquest.json()
        const createBlog = await prisma.blog.create({data: dataBlog})

        if (createBlog) {
            return NextResponse.json({
                status: true,
                message: 'Created new blog successfully!'
            })
        } else {
            return NextResponse.json({
                status: false,
                message: 'Something went wrong! Please try again.'
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: false,
            message: 'Created blog failed!'
        })
    }
}