import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();


export async function DELETE(req: Request, context: any){
    try {
        const { id } = context.params;

        const existingOption = await prisma.option.findUnique({
            where: {
                option_id: parseInt(id),
            },
        });

        if (!existingOption) {
            return NextResponse.json({ error: 'Option not found' }, { status: 404 });
        }

        const deleteOption = await prisma.option.delete({
            where: {
                option_id: parseInt(id),
            }
        })
        return NextResponse.json({ deleteOption });

    }catch (e) {
        return NextResponse.json({ error: 'Failed to update Option' }, { status: 500 });
    }
}