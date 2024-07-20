import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { answer_text, answerid, question_id, user_id } = body;

        const existingUser = await prisma.user.findUnique({ where: { id: parseInt(user_id) } });
        const existingQuestion = await prisma.question.findUnique({ where: { question_id: question_id } });

        if (!existingUser || !existingQuestion) {
            return NextResponse.json({ error: 'User or question does not exist' }, { status: 404 });
        }

        let response;
        if (answerid) {
            const existingAnswer = await prisma.answer.findUnique({ where: { answer_id: answerid, question_id: question_id } });
            if (!existingAnswer) {
                response = await prisma.answer.create({
                    data: {
                        user_id: parseInt(user_id),
                        answer_text: answer_text,
                        question_id: question_id
                    }
                });
                return NextResponse.json({ response });
            }
            response = await prisma.answer.update({
                where: { answer_id: answerid, question_id: question_id },
                data: { answer_text: answer_text },
            });
            return NextResponse.json({ response });
        }

    } catch (e) {
        console.error('Error:', e);
        let errorMessage = 'An error occurred';
        let statusCode = 500;

        if (e instanceof SyntaxError) {
            errorMessage = 'Invalid JSON payload';
            statusCode = 400;
        }

        return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }
}
