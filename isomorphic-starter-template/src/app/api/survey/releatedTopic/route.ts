import { PrismaClient } from '@prisma/client';
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse>  {
    const lang = req.nextUrl.searchParams.get('lang') as string;
    const id=parseInt(req.nextUrl.searchParams.get('id')||'',10);
    console.log(lang, id)
    try {
        console.log('test')
        const relatedTopics = await prisma.relatedTopic.findMany({
            orderBy: {
                topic_id: 'asc',
            },
            where: {
                survay_id: id
            },
        });

        const modifiedRelatedTopicsWithQuestions = relatedTopics.map(topic => {
            return {
                topic_id: topic.topic_id,
                topic_name: lang === 'en' ? topic.topic_name_en : topic.topic_name_ch,
            };
        });

        return NextResponse.json({ modifiedRelatedTopicsWithQuestions });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update RelatedTopic' });
    }

}