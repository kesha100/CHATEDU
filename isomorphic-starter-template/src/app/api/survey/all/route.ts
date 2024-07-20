import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
    try {
        const surveys = await prisma.survay.findMany({
            include: {
                questions: false
            }
        });
        return NextResponse.json(surveys);
    } catch (error) {
        console.error('Error fetching surveys:', error);
        return NextResponse.json({ message: 'Something went wrong..' }, { status: 500 });
    }
}
