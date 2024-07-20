import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import {db} from '../../../lib/db';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const relatedTopics = await prisma.relatedTopic.findMany({
            select: {
                topic_id: true,
                topic_name_en: true,
                topic_name_ch: true
            },
        });

        // Respond with the fetched data
        return NextResponse.json(relatedTopics);
    } catch (error) {
        // Handle any errors
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch RelatedTopics' }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { topic_name_en, topic_name_ch, survay_id } = body;



        // Создаем связанный топик с указанным опросом
        const createRelatedTopic = await prisma.relatedTopic.create({
            data: {
                topic_name_en,
                topic_name_ch,
                survay: {
                    connect: { survay_id: survay_id },
                },
            },
        });

        return NextResponse.json({ createRelatedTopic });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create RelatedTopic' }, { status: 500 });
    }
}




