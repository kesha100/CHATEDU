import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {

        const body = await req.json();
        const { name } = body;

        const newSurvey = await prisma.survay.create({
            data: {
                name: name
            }
        });


        return NextResponse.json({ success: true, message: "Survey created successfully", data: newSurvey });
    } catch (error) {

        console.error("Error creating survey:", error);
        return NextResponse.json({ error: 'Failed to create new Survey' }, { status: 500 });
    }
}

export  async function PUT(req: Request) {
    try {
    
        const { id,name } = await req.json(); 

        
        const existingSurvey = await prisma.survay.findUnique({
            where: { survay_id: Number(id) }
        });

        
        if (!existingSurvey) {
            return NextResponse.json({ error: 'This survey does not exist' }, { status: 409});
        }

        const updatedSurvey = await prisma.survay.update({
            where: { survay_id: Number(id) },
            data: { name: name }
        });

        return NextResponse.json({ success: true, message: "Survey updated successfully", data: updatedSurvey });
    } catch (error) {

        console.error("Error updating survey:", error);
        return NextResponse.json({ error: 'Error ' }, { status: 500 });
    } 
}


export  async function DELETE(req: Request) {
    try {
    
        const { id} = await req.json(); 

        
        const existingSurvey = await prisma.survay.findUnique({
            where: { survay_id: Number(id) }
        });

        
        if (!existingSurvey) {
            return NextResponse.json({ error: 'This survey does not exist' }, { status: 409});
        }

        await prisma.survay.delete({
            where: { survay_id: Number(id) }
        });

        return NextResponse.json({ success: true, message: "Survey deleted successfully!" });
    } catch (error) {

        console.error("Error deleting survey:", error);
        return NextResponse.json({ error: 'Error ' }, { status: 500 });
    } 
}