import { PrismaClient } from '@prisma/client';
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request){
    try {
        const url = new URL(req.url, 'https://front.d39fjnjgbjikf2.amplifyapp.com/api/survey/releatedTopic/answer');

        const userid = parseInt(url.searchParams.get('userid') || '', 10);
        const relationid = parseInt(url.searchParams.get('relationid') || '', 10);


        const questions = await prisma.question.findMany({
            where: {related_topic_id: relationid},
            include: {
                answers: {
                    where: {
                        user_id: userid,
                    }
                },
                options: true,
            },
        });

        return NextResponse.json({ questions });
    } catch (e) {
        return NextResponse.json({ error: "These questions are not available" }, { status: 500 });
    }
}