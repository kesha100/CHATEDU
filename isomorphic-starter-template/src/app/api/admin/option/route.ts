import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

interface data{
    option_id: number,
    option_text_en: string
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();

        const updates = body.map(async (question: data) => {
            const { option_id, option_text_en } = question;
            return prisma.option.update({
                where: {option_id: option_id},
                data: {option_text_en},
            });
        });

        const updatedQuestions = await Promise.all(updates);

        return NextResponse.json({ updatedQuestions });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update RelatedTopic' }, { status: 500 });
    }
}
