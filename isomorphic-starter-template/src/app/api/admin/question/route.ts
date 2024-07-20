import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const questions = await prisma.question.findMany({
            select: {
                question_id: true,
                question_text_en: true,
                question_text_ch: true,
                answer_type: true,
                related_topic: true,
                options: {
                    select: {
                        option_id: true,
                        option_text_en: true,
                        option_text_ch: true
                    }
                }
            },
        });

        // Respond with the fetched data
        return NextResponse.json(questions);
    } catch (error) {
        // Handle any errors
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch Questions' }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            question_text_en,
            question_text_ch,
            answer_type,
            survay_id,
            related_topic_id,
            options
        }: { 
            question_text_en: string;
            question_text_ch: string;
            answer_type: string;
            survay_id: number;
            related_topic_id: number; // Assuming it's a number, adjust if different
            options: { 
                option_text_en: string;
                option_text_ch: string;
            }[];
        } = body;

        const createdQuestion = await prisma.question.create({
            data: {
                question_text_en,
                question_text_ch,
                answer_type,
                survay_id,
                related_topic_id, // Include related_topic_id here
                options: {
                    create: options.map(option => ({
                        option_text_en: option.option_text_en,
                        option_text_ch: option.option_text_ch
                    }))
                }
            },
            include: {
                options: true // Assuming you want to include options in the response
            }
        });

        return NextResponse.json({ createdQuestion });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create question' }, { status: 500 });
    }
}