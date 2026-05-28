import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const result = await prisma.questionnaireResult.create({
            data: {
                answers: body.answers,
                summary: body.summary,
            },
        });

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed submit questionnaire",
            },
            { status: 500 }
        );
    }
}