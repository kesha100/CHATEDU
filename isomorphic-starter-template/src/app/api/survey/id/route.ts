"use server"
import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {

    const lang = req.nextUrl.searchParams.get('lang') as string;
    const id=parseInt(req.nextUrl.searchParams.get('id')||'',10);
    console.log(lang,id);

    if (!lang) {
        return NextResponse.json({ message: 'Language parameter is missing' }, { status: 400 });
    }

    try {
        const existingSurvey = await prisma.survay.findUnique({
            where: {
                survay_id: id,
            }
        });

        if (!existingSurvey) {
            return NextResponse.json({ message: 'Survey not found' }, { status: 404 });
        }

        const relatedTopicsWithQuestions = await prisma.relatedTopic.findMany({
            where: {
                questions: {
                    some: {
                        survay_id: id,
                    },
                },
            },
            include: {
                questions: {
                    where: {
                        survay_id: id,
                    },
                    include:{
                        answers: true,
                        options: {
                            include: {}
                        }
                    }
                }
            }
        });

        // Modify the text and options based on the language preference
        const modifiedRelatedTopicsWithQuestions = relatedTopicsWithQuestions.map(topic => {
            const modifiedQuestions = topic.questions.map(question => {
                const modifiedOptions = question.options.map(option => ({
                    option_id: option.option_id,
                    isChecked: option.isChecked,
                    option_text: lang === 'en' ? option.option_text_en : option.option_text_ch
                }));

                return {
                    question_id: question.question_id,
                    question_text: lang === 'en' ? question.question_text_en : question.question_text_ch,
                    answer_type: question.answer_type,
                    related_topic_id: question.related_topic_id,
                    survay_id: question.survay_id,
                    answers: question.answers,
                    options: modifiedOptions
                };
            });

            return {
                topic_id: topic.topic_id,
                topic_name: lang === 'en' ? topic.topic_name_en : topic.topic_name_ch,
                questions: modifiedQuestions
            };
        });

        return NextResponse.json(modifiedRelatedTopicsWithQuestions);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error}, { status: 500 });
    }
}