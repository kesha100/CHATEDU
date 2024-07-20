import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import {parseInt} from "lodash-es";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url, 'https://front.d39fjnjgbjikf2.amplifyapp.com/api/survey/answer');
        const userid = parseInt(url.searchParams.get('userid') || '', 10);
        const questionid = parseInt(url.searchParams.get('questionid') || '', 10);
        console.log(userid, questionid)

        const existing = await prisma.answer.findMany({
            where: {
                user_id: userid,
                question_id: questionid
            }
        });

        if (!existing || existing.length === 0) {
            return NextResponse.json({ error: 'User or question does not exist' }, { status: 404 });
        }

        return NextResponse.json({ answers: existing });
    } catch (e) {
        console.error('Error:', e);
        return NextResponse.json({ error: "An error occurred while fetching answers" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { answer_text, answerid, question_id, user_id, option_id } = body;

        const existingUser = await prisma.user.findUnique({ where: { id: parseInt(user_id) } });
        const existingQuestion = await prisma.question.findUnique({ where: { question_id: question_id } });

        if (!existingUser || !existingQuestion) {
            return NextResponse.json({ error: 'User or question does not exist' }, { status: 404 });
        }

        const existingOption = await prisma.option.findUnique({
            where: {
                option_id: option_id,
            },
        });

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

                // Update options
                await prisma.option.updateMany({
                    where: { question_id: question_id },
                    data: { isChecked: false },
                });

                const optionChange = await prisma.option.update({
                    where: { option_id: option_id },
                    data: { isChecked: !existingOption.isChecked }
                });

                return NextResponse.json({ response, optionChange });
            }

            // Update options
            await prisma.option.updateMany({
                where: { question_id: question_id },
                data: { isChecked: false },
            });

            const optionChange = await prisma.option.update({
                where: { option_id: option_id },
                data: { isChecked: !existingOption.isChecked }
            });

            response = await prisma.answer.update({
                where: { answer_id: answerid, question_id: question_id },
                data: { answer_text: answer_text },
            });

            return NextResponse.json({ response, optionChange });
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
