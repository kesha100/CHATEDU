
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const  GET=async(req:Request)=> {
    try{
        const relatedTopics = await prisma.relatedTopic.findMany({
            orderBy: {
                topic_id: 'asc',
            },
            include: {
                questions: {
                    orderBy: {
                        question_id: 'asc',
                    },
                    include: {
                        options: {
                            orderBy: {
                                option_id: 'asc',
                            },
                        }
                    }
                }
            }
        });

        return NextResponse.json(relatedTopics)

    }catch(error){
        console.error('Error fetching related topics:', error);
        return NextResponse.json({message:"Something went wrong.."},{status:500})
    }
}
