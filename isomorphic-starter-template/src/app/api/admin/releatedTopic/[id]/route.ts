import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request, context: any) {
    try {
        const { id } = context.params;
        const body = await req.json();
        const { topic_name_en, topic_name_ch } = body;

        const existingRelatedTopic = await prisma.relatedTopic.findUnique({
            where: {
                topic_id: parseInt(id),
            },
        });

        if (!existingRelatedTopic) {
            return NextResponse.json({ error: 'RelatedTopic not found' }, { status: 404 });
        }

        const updatedRelatedTopic = await prisma.relatedTopic.update({
            where: {
                topic_id: parseInt(id),
            },
            data: {
                topic_name_en,
                topic_name_ch
            },
        });

        return NextResponse.json({ updatedRelatedTopic });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update RelatedTopic' }, { status: 500 });
    }
}

export async function DELETE(req: Request, context: any) {
    try {
        const { id } = context.params;

        const existingRelatedTopic = await prisma.relatedTopic.findUnique({
            where: {
                topic_id: parseInt(id),
            },
        });

        if (!existingRelatedTopic) {
            return NextResponse.json({ error: 'RelatedTopic not found' }, { status: 404 });
        }

        const deleteRelatedTopic = await prisma.relatedTopic.delete({
            where: {
                topic_id: parseInt(id),
            },
        });

        return NextResponse.json({ deleteRelatedTopic });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete RelatedTopic' }, { status: 500 });
    }
}