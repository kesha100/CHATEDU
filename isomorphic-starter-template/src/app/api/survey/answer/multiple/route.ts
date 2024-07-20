import {NextResponse} from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { answer_text, answerid, question_id, user_id, option_id } = body;

        const existingUser = await prisma.user.findUnique({ where: { id: parseInt(user_id) } });
        const existingQuestion = await prisma.question.findUnique({ where: { question_id: question_id } });

        if (!existingUser || !existingQuestion ) {
            return NextResponse.json({ error: 'User, question does not exist' }, { status: 404 });
        }

        const existingOption = await prisma.option.findUnique({
            where: {
                option_id: option_id,
            },
        });
        console.log(existingOption)

        if (!existingOption) {
            return NextResponse.json({ error: 'Option does not exist' }, { status: 404 });
        }

        let response;
        if (answerid) {
            const existingAnswer = await prisma.answer.findUnique({ where: { answer_id: answerid, question_id: question_id, } });
            if (!existingAnswer) {
                response = await prisma.answer.create({
                    data: {
                        user_id: parseInt(user_id),
                        answer_text: answer_text,
                        question_id: question_id
                    }
                });

                const optionChange = await prisma.option.update({
                    where:{
                        option_id: option_id
                    },
                    data:{
                        isChecked: !existingOption.isChecked
                    }
                })
                return NextResponse.json({ response,optionChange });
            }

            const optionChange = await prisma.option.update({
                where:{
                    option_id: option_id
                },
                data:{
                    isChecked: !existingOption.isChecked
                }
            })
            response = await prisma.answer.update({
                where: { answer_id: answerid, question_id: question_id },
                data: { answer_text: answer_text },
            });
            return NextResponse.json({ response,optionChange });
        }

    } catch (e) {
        console.error('Error:', e);
        let errorMessage = 'An error occurred';
        let statusCode = 500;

        if (e instanceof SyntaxError) {
            errorMessage = 'Invalid JSON payload';
            statusCode = 400;
        } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
        }

        return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }
}