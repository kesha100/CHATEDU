import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request, context: any) {
    try {
        const { id } = context.params;
        const body = await req.json();
        const { question_text_en, question_text_ch } = body;

        const existingRelatedTopic = await prisma.question.findUnique({
            where: {
                question_id: parseInt(id),
            },
        });

        if (!existingRelatedTopic) {
            return NextResponse.json({ error: 'Quetion not found' }, { status: 404 });
        }

        const updatedQuestion = await prisma.question.update({
            where: {
                question_id: parseInt(id),
            },
            data: {
                question_text_en,
                question_text_ch
            },
        });


        return NextResponse.json({ updatedQuestion });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update Quetion' }, { status: 500 });
    }
}

export async function DELETE(req: Request, context: any){
    try {
        const { id } = context.params;

        const existingRelatedTopic = await prisma.question.findUnique({
            where: {
                question_id: parseInt(id),
            },
        });

        if (!existingRelatedTopic) {
            return NextResponse.json({ error: 'Quetion not found' }, { status: 404 });
        }

        const deleteQuestion = await prisma.question.delete({
            where: {
                question_id: parseInt(id),
            },
        })

        return NextResponse.json({ deleteQuestion });
    }catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to delete Quetion' }, { status: 500 });
    }
}