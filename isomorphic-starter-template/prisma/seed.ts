import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

//create super-user*
async function createSuperUser() {

    const email = 'admin@mail.ru';
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.log('Суперпользователь с такой электронной почтой уже существует:', existingUser);
        return existingUser; // Возвращаем существующего пользователя
    }
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const superUser = await prisma.user.upsert({
            where: { email: 'admin@mail.com' },
            update: {}, // No updates needed
            create: {
                email: 'admin@mail.ru',
                username: 'admin',
                password: hashedPassword,
                role: "admin",
            },
        });
        console.log('Суперпользователь успешно создан:', superUser);
        return superUser
    } catch (error) {
        console.error('Ошибка при создании суперпользователя:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }

}



async function main() {
    const id=(await createSuperUser()).id
    //const id = 1;

    const survey1 = await prisma.survay.upsert({
        where: { name: 'Survey 1' },
        update: {},
        create: {
            name: 'Survey 1',
        },
    });

    const survey2 = await prisma.survay.upsert({
        where: { name: 'Survey 2' },
        update: {},
        create: {
            name: 'Survey 2',
        },
    });

    const file = await prisma.file.upsert({
        where: { file: 'file' },
        update: {},
        create: {
            file: 'file',
            user_id: id,
            survay_id: 1
        }
    });

    // Upsert the related topic 'Basic Personal Information'
    const relatedTopic = await prisma.relatedTopic.upsert({
        where: { topic_name_en: 'Basic Personal Information' },
        update: {},
        create: {
            topic_name_en: 'Basic Personal Information',
            topic_name_ch: '第 1 部分：个人基本信息',
            survay: { connect: { survay_id: survey1.survay_id } },
            questions: {
                create: [
                    {
                        question_text_en: 'Student user (First user,Last user)',
                        question_text_ch: '学生拼音/英文姓名',
                        answer_type: 'text_input',
                        survay_id: survey1.survay_id
                    },
                    {
                        question_text_en: 'Grade level',
                        question_text_ch: '年级 ', 
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '9 grade or below',option_text_ch:'九年级以下'},
                                { option_text_en: '9 grade',option_text_ch:'九年级' },
                                { option_text_en: '10 grade',option_text_ch:'十年级 ' },
                                { option_text_en: '11 grade',option_text_ch:'十一年级' }
                            ]
                        },

                        survay_id: survey1.survay_id
                    },
                    {
                        question_text_en: 'Gender',
                        question_text_ch: '性别', 
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'Male' ,option_text_ch:'男'},
                                { option_text_en: 'Female',option_text_ch:'女' }
                            ]
                        },
                        survay_id: survey1.survay_id
                    },
                ]
        }
    },
        include: {
            questions: true
        }
    });
    //survay 2 basic info
    const relatedTopicSurvay2 = await prisma.relatedTopic.upsert({
        where: { topic_name_en: 'Basic Personal Information2' },
        update: {},
        create: {
            topic_name_en: 'Basic Personal Information2',
            topic_name_ch: '第 1 部分：个人基本信息',
            survay: { connect: { survay_id: survey2.survay_id } },
            questions: {
                create: [
                    {
                        question_text_en: 'Student user (First user,Last user)',
                        question_text_ch: '学生拼音/英文姓名',
                        answer_type: 'text_input',
                        survay_id: survey2.survay_id
                    },
                    {
                        question_text_en: 'Grade level',
                        question_text_ch: '年级 ', 
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '9 grade or below',option_text_ch:'九年级以下'},
                                { option_text_en: '9 grade',option_text_ch:'九年级' },
                                { option_text_en: '10 grade',option_text_ch:'十年级 ' },
                                { option_text_en: '11 grade',option_text_ch:'十一年级' }
                            ]
                        },

                        survay_id: survey2.survay_id
                    },
                    {
                        question_text_en: 'Gender',
                        question_text_ch: '性别', 
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'Male' ,option_text_ch:'男'},
                                { option_text_en: 'Female',option_text_ch:'女' }
                            ]
                        },
                        survay_id: survey2.survay_id
                    },
                ]
        }
    },
        include: {
            questions: true
        }
    });

    ///////////////////survay 2 basic info end

    console.log('Related topic inserted successfully:', relatedTopic);

    const relatedTopic2 = await prisma.relatedTopic.upsert({
        where: { topic_name_en: 'The Big 5 Personality Traits' }, 
        update: {}, 
        create: {
            topic_name_en: 'The Big 5 Personality Traits',
            topic_name_ch:'个性（简短回答）四大人格特质',
            survay: { connect: { survay_id: survey1.survay_id } },
            questions: {
                create: [
                    {
                        question_text_en: 'Openness: You are willing to try new things',
                        question_text_ch:'开放性：你愿意尝试新事物',
                        answer_type: 'single_choice', 
                        options: {
                            create: [
                                { option_text_en: 'Strongly Disagree',option_text_ch:'强烈反对'},
                                { option_text_en: 'Disagree',option_text_ch:'不同意 ' },
                                { option_text_en: 'Neutral',option_text_ch:'适度' },
                                { option_text_en: 'Agree',option_text_ch:'同意' },
                                { option_text_en: 'Strongly Agree',option_text_ch:'非常同意 ' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    
                    {
                        question_text_en: 'Conscientiousness: You have desire to be careful and diligent',
                        question_text_ch:'责任心：你渴望谨慎和勤奋',
                        answer_type: 'single_choice', 
                        options: {
                            create: [
                                { option_text_en: 'Strongly Disagree',option_text_ch:'强烈反对'},
                                { option_text_en: 'Disagree',option_text_ch:'不同意 ' },
                                { option_text_en: 'Neutral',option_text_ch:'适度' },
                                { option_text_en: 'Agree',option_text_ch:'同意' },
                                { option_text_en: 'Strongly Agree',option_text_ch:'非常同意 ' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Extroversion: You are energetic, outgoing and confident',
                        question_text_ch:'"外向性：你充满活力，外向并且自信',
                        answer_type: 'single_choice', 
                        options: {
                            create: [
                                { option_text_en: 'Strongly Disagree',option_text_ch:'强烈反对'},
                                { option_text_en: 'Disagree',option_text_ch:'不同意 ' },
                                { option_text_en: 'Neutral',option_text_ch:'适度' },
                                { option_text_en: 'Agree',option_text_ch:'同意' },
                                { option_text_en: 'Strongly Agree',option_text_ch:'非常同意 ' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Agreeableness: You are good at interacts with others',
                        question_text_ch:'亲切性：你善于与人交往',
                        answer_type: 'single_choice', 
                        options: {
                            create: [
                                { option_text_en: 'Strongly Disagree',option_text_ch:'强烈反对'},
                                { option_text_en: 'Disagree',option_text_ch:'不同意 ' },
                                { option_text_en: 'Neutral',option_text_ch:'适度' },
                                { option_text_en: 'Agree',option_text_ch:'同意' },
                                { option_text_en: 'Strongly Agree',option_text_ch:'非常同意 ' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'MBTI',
                        question_text_ch:'请选择您的MBTI （迈尔斯-布里格斯性格分类法）结果',
                        answer_type: 'single_choice', 
                        options: {
                            create: [
                                { option_text_en: 'ISFJ',option_text_ch:'ISFJ'},
                                { option_text_en: 'INTJ',option_text_ch:'INTJ' },
                                { option_text_en: 'INFJ',option_text_ch:'INFJ' },
                                { option_text_en: 'ISTP',option_text_ch:'ISTP' },
                                { option_text_en: 'ISFP',option_text_ch:'ISFP' },
                                { option_text_en: 'INTP',option_text_ch:'INTP' },
                                { option_text_en: 'INFP',option_text_ch:'INFP' },
                                { option_text_en: 'ESTP',option_text_ch:'ESTP' },
                                { option_text_en: 'ESFP',option_text_ch:'ESFP' },
                                { option_text_en: 'ENTP',option_text_ch:'ENTP' },
                                { option_text_en: 'ENFP',option_text_ch:'ENFP' },
                                { option_text_en: 'ESTJ',option_text_ch:'ESTJ' },
                                { option_text_en: 'ESFJ',option_text_ch:'ESFJ' },
                                { option_text_en: 'ENTJ',option_text_ch:'ENTJ' },
                                { option_text_en: 'ENFJ',option_text_ch:'ENFJ' },
                                { option_text_en: 'No relevant tests have been done' ,option_text_ch:'没有做过相关测试'}

                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                ]
            }
        },
        include: {
            questions: true 
        }
    });
    console.log('Related topic inserted successfully:', relatedTopic2);

    //survay 2 the big 5
    const relatedTopic2Survay2 = await prisma.relatedTopic.upsert({
        where: { topic_name_en: 'The Big 5 Personality Traits2' }, 
        update: {}, 
        create: {
            topic_name_en: 'The Big 5 Personality Traits2',
            topic_name_ch:'个性（简短回答）四大人格特质',
            survay: { connect: { survay_id: survey2.survay_id } },
            questions: {
                create: [
                    {
                        question_text_en: 'Openness: You are willing to try new things',
                        question_text_ch:'开放性：你愿意尝试新事物',
                        answer_type: 'single_choice', 
                        options: {
                            create: [
                                { option_text_en: 'Strongly Disagree',option_text_ch:'强烈反对'},
                                { option_text_en: 'Disagree',option_text_ch:'不同意 ' },
                                { option_text_en: 'Neutral',option_text_ch:'适度' },
                                { option_text_en: 'Agree',option_text_ch:'同意' },
                                { option_text_en: 'Strongly Agree',option_text_ch:'非常同意 ' }
                            ]
                        },
                        survay_id:survey2.survay_id
                    },
                    
                    {
                        question_text_en: 'Conscientiousness: You have desire to be careful and diligent',
                        question_text_ch:'责任心：你渴望谨慎和勤奋',
                        answer_type: 'single_choice', 
                        options: {
                            create: [
                                { option_text_en: 'Strongly Disagree',option_text_ch:'强烈反对'},
                                { option_text_en: 'Disagree',option_text_ch:'不同意 ' },
                                { option_text_en: 'Neutral',option_text_ch:'适度' },
                                { option_text_en: 'Agree',option_text_ch:'同意' },
                                { option_text_en: 'Strongly Agree',option_text_ch:'非常同意 ' }
                            ]
                        },
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Extroversion: You are energetic, outgoing and confident',
                        question_text_ch:'"外向性：你充满活力，外向并且自信',
                        answer_type: 'single_choice', 
                        options: {
                            create: [
                                { option_text_en: 'Strongly Disagree',option_text_ch:'强烈反对'},
                                { option_text_en: 'Disagree',option_text_ch:'不同意 ' },
                                { option_text_en: 'Neutral',option_text_ch:'适度' },
                                { option_text_en: 'Agree',option_text_ch:'同意' },
                                { option_text_en: 'Strongly Agree',option_text_ch:'非常同意 ' }
                            ]
                        },
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Agreeableness: You are good at interacts with others',
                        question_text_ch:'亲切性：你善于与人交往',
                        answer_type: 'single_choice', 
                        options: {
                            create: [
                                { option_text_en: 'Strongly Disagree',option_text_ch:'强烈反对'},
                                { option_text_en: 'Disagree',option_text_ch:'不同意 ' },
                                { option_text_en: 'Neutral',option_text_ch:'适度' },
                                { option_text_en: 'Agree',option_text_ch:'同意' },
                                { option_text_en: 'Strongly Agree',option_text_ch:'非常同意 ' }
                            ]
                        },
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'MBTI',
                        question_text_ch:'请选择您的MBTI （迈尔斯-布里格斯性格分类法）结果',
                        answer_type: 'single_choice', 
                        options: {
                            create: [
                                { option_text_en: 'ISFJ',option_text_ch:''},
                                { option_text_en: 'INTJ',option_text_ch:'' },
                                { option_text_en: 'INFJ',option_text_ch:'' },
                                { option_text_en: 'ISTP',option_text_ch:'' },
                                { option_text_en: 'ISFP',option_text_ch:'' },
                                { option_text_en: 'INTP',option_text_ch:'' },
                                { option_text_en: 'INFP',option_text_ch:'' },
                                { option_text_en: 'ESTP',option_text_ch:'' },
                                { option_text_en: 'ESFP',option_text_ch:'' },
                                { option_text_en: 'ENTP',option_text_ch:'' },
                                { option_text_en: 'ENFP',option_text_ch:'' },
                                { option_text_en: 'ESTJ',option_text_ch:'' },
                                { option_text_en: 'ESFJ',option_text_ch:'' },
                                { option_text_en: 'ENTJ',option_text_ch:'' },
                                { option_text_en: 'ENFJ',option_text_ch:'' },
                                { option_text_en: 'No relevant tests have been done' ,option_text_ch:'没有做过相关测试'}

                            ]
                        },
                        survay_id:survey2.survay_id
                    },
                ]
            }
        },
        include: {
            questions: true 
        }
    });

    //survay 2 end

   


    const relatedTopic3 = await prisma.relatedTopic.upsert({
        where: { topic_name_en: 'Major Preferences' }, 
        update: {}, 
        create: {
            topic_name_en: 'Major Preferences',
            topic_name_ch:'第二部分：专业偏好',
            survay: { connect: { survay_id: survey1.survay_id } },
            questions: {
                create: [
                    {
                        question_text_en: 'Do you have a clear choice of college major?',
                        question_text_ch:'是否已经对大学专业有明确的选择?',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'yes',option_text_ch:'是' },
                                { option_text_en: 'no',option_text_ch:'否' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Please specify your chosen major(write "no" in case you have not chosen)',
                        question_text_ch:'请指明您选择的专业（如果您还没有选择，请写“没有”）。',
                        answer_type: 'text_input', 
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Favorite high school subjects (could be more than one, separated by comma)',
                        question_text_ch:'高中最喜欢的科目(可填写多个，用逗号分隔)',
                        answer_type: 'text_input', 
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about your favorite subjects in high school when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于高中喜欢的学科的在意程度 ',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Favorite extracurricular activities (list by project, separated by commas)',
                        question_text_ch: '喜欢的课外活动（按项目列出，用逗号分隔）',
                        answer_type: 'text_input', 
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about your extracurricular activities enjoyed in high school when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于高中喜欢的课外活动的在意程度 ',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Is there any future career preference (career goal)',
                        question_text_ch:'是否有未来职业偏好（职业目标)',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'yes',option_text_ch:'是' },
                                { option_text_en: 'no',option_text_ch:'否' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Please indicate existing future career preferences(print no if you do not have)',
                        question_text_ch:'请指明现有的未来职业偏好如果没有请打印“no”。',
                        answer_type: 'text_input', 
                         survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about future career when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'选择专业时您关心未来职业的程度(0-完全不关心5-最关心）',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Your most interested subject areas (multiple choice)',
                        question_text_ch:'偏好的学科范围(可多选)',
                        answer_type: 'multiple_choice',
                        options: {
                            create: [
                                { option_text_en: 'Natural Sciences (e.g., biology, physics, chemistry)',option_text_ch:'自然科学（如生物、物理、化学）' },
                                { option_text_en: 'Social Sciences (e.g., psychology, history, political science)',option_text_ch:'社会科学（如心理学、历史、政治学）' },
                                { option_text_en: 'Economics/Finance (e.g., economics, finance, accounting)',option_text_ch:'经济/金融（如经济学、金融学、会计）' },
                                { option_text_en: 'Engineering (e.g., mechanical, electronic, civil)',option_text_ch:'工程（如机械、电子、土木）' },
                                { option_text_en: 'Humanities (e.g., philosophy, literature, linguistics)',option_text_ch:'人文（如哲学、文学、语言学）' },
                                { option_text_en: 'Music/Art (e.g., music, fine arts, design)',option_text_ch:'音乐/艺术（如音乐、美术、设计）' }
                            ]
                        },
                        survay_id:survey1.survay_id 
                    },
                    {
                        question_text_en: 'Hobbies (could be more than one, separated by comma)',
                        question_text_ch:'爱好（可以填写多个，用逗号分隔',
                        answer_type: 'text_input', 
                        survay_id:survey1.survay_id 
                    },
                    {
                        question_text_en: 'The degree to which you care about your hobbies when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于爱好的在意程度 ',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Subject strengths in High school (multiple choice)',
                        question_text_ch:'高中优势学科（可多选)',
                        answer_type: 'multiple_choice',
                        options: {
                            create: [
                                { option_text_en: 'Mathematics',option_text_ch:'数学' },
                                { option_text_en: 'Physics',option_text_ch:'物理' },
                                { option_text_en: 'Chemistry',option_text_ch:'化学' },
                                { option_text_en: 'Biology',option_text_ch:'生物' },
                                { option_text_en: 'Geography',option_text_ch:'地理' },
                                { option_text_en: 'History' ,option_text_ch:'历史'},
                                { option_text_en: 'Politics',option_text_ch:'政治' },
                                { option_text_en: 'Literature',option_text_ch:'政治' },
                                { option_text_en: 'Language' ,option_text_ch:'语言'},
                                { option_text_en: 'Arts',option_text_ch:'美术' },
                                { option_text_en: 'Music',option_text_ch:'音乐' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about your strong subjects in high school when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于高中强势学科的在意程度',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Please state the discipline of award-winning competitions and user of the award',
                        question_text_ch:'请说明获奖比赛的学科和奖项名称',
                        answer_type: 'text_input',
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about your awards received in high school when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'在选择专业时， 您对高中获奖的重视程度是多少？（ 0-完全不关心， 5-非常关心）',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Other academic achievements (published papers, certificates, etc.)',
                        question_text_ch:'其他学术成就（发表论文、证书等）',
                        answer_type: 'text_input', 
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about other achievements in high school when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于其他成就的在意程度 ',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Resources that parents can provide',
                        question_text_ch:'父母可以提供的资源',
                        answer_type: 'multiple_choice',
                        options: {
                            create: [
                                { option_text_en: 'Financial support',option_text_ch:'经济支持' },
                                { option_text_en: 'Professional connections',option_text_ch:'职业关系' },
                                { option_text_en: 'Educational experience',option_text_ch:'教育经验' },
                                { option_text_en: 'Other',option_text_ch:'其他' }
                               
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about resources that parents can provide when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch: '专业选择中对于父母可提供的资源的在意程度 ',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Plan after undergraduate graduation',
                        question_text_ch:'本科毕业去向',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'Continue studying in graduate school (Masters, Ph.D., etc.)',option_text_ch:'继续在研究生院学习(硕士、博士等)' },
                                { option_text_en: 'Enter the market to find a job',option_text_ch:'进入行业找工作' },
                                { option_text_en: 'Entrepreneurship',option_text_ch:'创业' },
                                { option_text_en: 'Undecided',option_text_ch:'待定' }
                               
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about plan after undergraduate graduation when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'本科专业选择中对于本科后毕业去向的在意程度',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Expected annual income range (USD)',
                        question_text_ch:'预期年收入(美元)',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'Below $30,000',option_text_ch:'30,000 美元以下' },
                                { option_text_en: '$30,000 - $70,000',option_text_ch:'$30,000 - $70,000' },
                                { option_text_en: '$70,000 - $130,000',option_text_ch:'$70,000 - $130,000' },
                                { option_text_en: 'Above $130,000',option_text_ch:'超过 $130,000' },
                                { option_text_en: 'No requirement',option_text_ch:'无要求 ' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about expected annual income when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于预期年收入的在意程度',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Is there a preference for career prospects',
                        question_text_ch:'是否有对职业前景的偏好',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'yes',option_text_ch:'有' },
                                { option_text_en: 'no',option_text_ch:'无 ' },
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Please indicate existing preferences for career prospects(if you do not have print no)',
                        question_text_ch:'请指出您的职业前景偏好（如果没有，请打印“没有”）',
                        answer_type: 'text_input', 
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about preferences for career prospects when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于未来职业前景偏好的在意程度',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Expected annual tuition and living expenses range (USD)',
                        question_text_ch:'预期年度学费和生活费范围(美元)',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'List the countries you wish to study for your undergraduate degree (could be more than one, separated by comma)',
                        question_text_ch:'列出你希望的本科学习的国家（可以填写多个，用逗号分隔)',
                        answer_type: 'text_input', 
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about where the university is located when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于大学所在国家的在意程度',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Please list any other considerations or requirements',
                        question_text_ch:'请列出其他考虑或要求（可选）',
                        answer_type: 'text_input',
                        survay_id:survey1.survay_id 
                    },
                    /////////////////////////////////////////
                    ////////////////////////////////////////
                    ////////////////////////////////////////
                ]
            }
        },
        include: {
            questions: true 
        }
    });
    console.log('Related topic inserted successfully:', relatedTopic3);

    //survay2 major prefernces
    const relatedTopic3Survay2 = await prisma.relatedTopic.upsert({
        where: { topic_name_en: 'Major Preferences2' }, 
        update: {}, 
        create: {
            topic_name_en: 'Major Preferences2',
            topic_name_ch:'第二部分：专业偏好',
            survay: { connect: { survay_id: survey2.survay_id } },
            questions: {
                create: [
                    {
                        question_text_en: 'Do you have a clear choice of college major?',
                        question_text_ch:'是否已经对大学专业有明确的选择?',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'yes',option_text_ch:'是' },
                                { option_text_en: 'no',option_text_ch:'否' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Please specify your chosen major(write "no" in case you have not chosen)',
                        question_text_ch:'请指明您选择的专业（如果您还没有选择，请写“没有”）。',
                        answer_type: 'text_input', 
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Favorite high school subjects (could be more than one, separated by comma)',
                        question_text_ch:'高中最喜欢的科目(可填写多个，用逗号分隔)',
                        answer_type: 'text_input', 
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about your favorite subjects in high school when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于高中喜欢的学科的在意程度 ',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Favorite extracurricular activities (list by project, separated by commas)',
                        question_text_ch: '喜欢的课外活动（按项目列出，用逗号分隔）',
                        answer_type: 'text_input', 
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about your extracurricular activities enjoyed in high school when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于高中喜欢的课外活动的在意程度 ',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Is there any future career preference (career goal)',
                        question_text_ch:'是否有未来职业偏好（职业目标)',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'yes',option_text_ch:'是' },
                                { option_text_en: 'no',option_text_ch:'否' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Please indicate existing future career preferences(print no if you do not have)',
                        question_text_ch:'请指明现有的未来职业偏好如果没有请打印“no”。',
                        answer_type: 'text_input', 
                         survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about future career when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'选择专业时您关心未来职业的程度(0-完全不关心5-最关心）',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Your most interested subject areas (multiple choice)',
                        question_text_ch:'偏好的学科范围(可多选)',
                        answer_type: 'multiple_choice',
                        options: {
                            create: [
                                { option_text_en: 'Natural Sciences (e.g., biology, physics, chemistry)',option_text_ch:'自然科学（如生物、物理、化学）' },
                                { option_text_en: 'Social Sciences (e.g., psychology, history, political science)',option_text_ch:'社会科学（如心理学、历史、政治学）' },
                                { option_text_en: 'Economics/Finance (e.g., economics, finance, accounting)',option_text_ch:'经济/金融（如经济学、金融学、会计）' },
                                { option_text_en: 'Engineering (e.g., mechanical, electronic, civil)',option_text_ch:'工程（如机械、电子、土木）' },
                                { option_text_en: 'Humanities (e.g., philosophy, literature, linguistics)',option_text_ch:'人文（如哲学、文学、语言学）' },
                                { option_text_en: 'Music/Art (e.g., music, fine arts, design)',option_text_ch:'音乐/艺术（如音乐、美术、设计）' }
                            ]
                        },
                        survay_id:survey2.survay_id 
                    },
                    {
                        question_text_en: 'Hobbies (could be more than one, separated by comma)',
                        question_text_ch:'爱好（可以填写多个，用逗号分隔',
                        answer_type: 'text_input', 
                        survay_id:survey2.survay_id 
                    },
                    {
                        question_text_en: 'The degree to which you care about your hobbies when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于爱好的在意程度 ',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Subject strengths in High school (multiple choice)',
                        question_text_ch:'高中优势学科（可多选)',
                        answer_type: 'multiple_choice',
                        options: {
                            create: [
                                { option_text_en: 'Mathematics',option_text_ch:'数学' },
                                { option_text_en: 'Physics',option_text_ch:'物理' },
                                { option_text_en: 'Chemistry',option_text_ch:'化学' },
                                { option_text_en: 'Biology',option_text_ch:'生物' },
                                { option_text_en: 'Geography',option_text_ch:'地理' },
                                { option_text_en: 'History' ,option_text_ch:'历史'},
                                { option_text_en: 'Politics',option_text_ch:'政治' },
                                { option_text_en: 'Literature',option_text_ch:'政治' },
                                { option_text_en: 'Language' ,option_text_ch:'语言'},
                                { option_text_en: 'Arts',option_text_ch:'美术' },
                                { option_text_en: 'Music',option_text_ch:'音乐' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about your strong subjects in high school when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于高中强势学科的在意程度',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Please state the discipline of award-winning competitions and user of the award',
                        question_text_ch:'请说明获奖比赛的学科和奖项名称',
                        answer_type: 'text_input',
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about your awards received in high school when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'在选择专业时， 您对高中获奖的重视程度是多少？（ 0-完全不关心， 5-非常关心）',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Other academic achievements (published papers, certificates, etc.)',
                        question_text_ch:'其他学术成就（发表论文、证书等）',
                        answer_type: 'text_input', 
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about other achievements in high school when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于其他成就的在意程度 ',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Resources that parents can provide',
                        question_text_ch:'父母可以提供的资源',
                        answer_type: 'multiple_choice',
                        options: {
                            create: [
                                { option_text_en: 'Financial support',option_text_ch:'经济支持' },
                                { option_text_en: 'Professional connections',option_text_ch:'职业关系' },
                                { option_text_en: 'Educational experience',option_text_ch:'教育经验' },
                                { option_text_en: 'Other',option_text_ch:'其他' }
                               
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about resources that parents can provide when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch: '专业选择中对于父母可提供的资源的在意程度 ',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Plan after undergraduate graduation',
                        question_text_ch:'本科毕业去向',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'Continue studying in graduate school (Masters, Ph.D., etc.)',option_text_ch:'继续在研究生院学习(硕士、博士等)' },
                                { option_text_en: 'Enter the market to find a job',option_text_ch:'进入行业找工作' },
                                { option_text_en: 'Entrepreneurship',option_text_ch:'创业' },
                                { option_text_en: 'Undecided',option_text_ch:'待定' }
                               
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about plan after undergraduate graduation when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'本科专业选择中对于本科后毕业去向的在意程度',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Expected annual income range (USD)',
                        question_text_ch:'预期年收入(美元)',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'Below $30,000',option_text_ch:'30,000 美元以下' },
                                { option_text_en: '$30,000 - $70,000',option_text_ch:'$30,000 - $70,000' },
                                { option_text_en: '$70,000 - $130,000',option_text_ch:'$70,000 - $130,000' },
                                { option_text_en: 'Above $130,000',option_text_ch:'超过 $130,000' },
                                { option_text_en: 'No requirement',option_text_ch:'无要求 ' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about expected annual income when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于预期年收入的在意程度',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Is there a preference for career prospects',
                        question_text_ch:'是否有对职业前景的偏好',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'yes',option_text_ch:'有' },
                                { option_text_en: 'no',option_text_ch:'无 ' },
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Please indicate existing preferences for career prospects(if you do not have print no)',
                        question_text_ch:'请指出您的职业前景偏好（如果没有，请打印“没有”）',
                        answer_type: 'text_input', 
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about preferences for career prospects when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于未来职业前景偏好的在意程度',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Expected annual tuition and living expenses range (USD)',
                        question_text_ch:'预期年度学费和生活费范围(美元)',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'List the countries you wish to study for your undergraduate degree (could be more than one, separated by comma)',
                        question_text_ch:'列出你希望的本科学习的国家（可以填写多个，用逗号分隔)',
                        answer_type: 'text_input', 
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'The degree to which you care about where the university is located when choosing a major(0-not concerned at all,5-most concerned)',
                        question_text_ch:'专业选择中对于大学所在国家的在意程度',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' },
                                { option_text_en: '4',option_text_ch:'4' },
                                { option_text_en: '5',option_text_ch:'5' }
                            ]
                        } ,
                        survay_id:survey2.survay_id
                    },
                    {
                        question_text_en: 'Please list any other considerations or requirements',
                        question_text_ch:'请列出其他考虑或要求（可选）',
                        answer_type: 'text_input',
                        survay_id:survey2.survay_id 
                    },
                   
                ]
            }
        },
        include: {
            questions: true 
        }
    });


    //survay2 end


    const relatedTopic4 = await prisma.relatedTopic.upsert({
        where: { topic_name_en: 'Potential Major Exploration' }, 
        update: {}, 
        create: {
            topic_name_en: 'Potential Major Exploration',
            topic_name_ch:'潜在专业探索',
            survay: { connect: { survay_id: survey1.survay_id } },
            questions: {
                create: [
                    
                    {
                        question_text_en: 'Computer Science',
                        question_text_ch:'计算机科学',
                        answer_type: 'matrix',
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Electrical Engineering',
                        question_text_ch:'电子工程',
                        answer_type: 'matrix',
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Mechanical Engineering',
                        question_text_ch:'机械工程',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Data Science and Data Engineering',
                        question_text_ch:'数据科学与工程',
                        answer_type: 'matrix',
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Civil and Environmental Engineering',
                        question_text_ch:'土木与环境工程',
                        answer_type: 'matrix',
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Biomedical Engineering',
                        question_text_ch:'生物医学工程 ',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Chemical Engineering',
                        question_text_ch:'化学工程',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Industrial Engineering',
                        question_text_ch:'工业工程',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Economy',
                        question_text_ch:' 经济学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Finance',
                        question_text_ch:'金融',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Sociology',
                        question_text_ch:'社会学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Political Science',
                        question_text_ch:'政治科学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Organization managment',
                        question_text_ch:'组织管理',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Psycology',
                        question_text_ch:'心理学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Linguistiqs',
                        question_text_ch:'语言学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Literature',
                        question_text_ch:'文学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Art',
                        question_text_ch:'艺术',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Music',
                        question_text_ch:'音乐',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Anthropology',
                        question_text_ch:'人类学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Archaeology',
                        question_text_ch:'考古学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Philosophy',
                        question_text_ch:'哲学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'History',
                        question_text_ch:'历史',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Gender study',
                        question_text_ch:'性别研究',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Culture Study',
                        question_text_ch:'文化研究',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Math',
                        question_text_ch:'数学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Physics',
                        question_text_ch:'物理',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Chemistry',
                        question_text_ch:'化学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Material Science',
                        question_text_ch:'材料科学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Biology',
                        question_text_ch:'生物',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Astronomy',
                        question_text_ch:'天文学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'Earth Science',
                        question_text_ch:'地球科学',
                        answer_type: 'matrix', 
                        options: {
                            create: [
                                { option_text_en: '0' ,option_text_ch:'0'},
                                { option_text_en: '1',option_text_ch:'1' },
                                { option_text_en: '2',option_text_ch:'2' },
                                { option_text_en: '3',option_text_ch:'3' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    },
                    {
                        question_text_en: 'The most likely reasons for students not having a major preference or having difficulty choosing a major are',
                        question_text_ch:'学生没有专业偏好或难以选择专业的最可能原因是',
                        answer_type: 'single_choice',
                        options: {
                            create: [
                                { option_text_en: 'I never considered the choice of majors',option_text_ch:'我从未考虑过专业的选择问题' },
                                { option_text_en: 'I am not interested in anything',option_text_ch:'我对任何事情都不感兴趣' },
                                { option_text_en: 'There are too many interested majors.I do not know which one to choose' ,option_text_ch:'有兴趣的专业太多；我不知道该选择哪一个 '},
                                { option_text_en: 'I am not interested in anything',option_text_ch:'我对任何事情都不感兴趣 ' },
                                { option_text_en: 'Major(s) I like is different from my parents expectation',option_text_ch:'我喜欢的专业与我父母的期望不同 ' },
                                { option_text_en: 'I do not feel good about the future employment of the major(s) I like',option_text_ch:'我对自己喜欢的专业未来的就业情况感觉不理想' },
                                { option_text_en: 'It does not matter what the major is,as long as I could apply to an university',option_text_ch:'是什么专业并不重要，只要我能申请到大学就可以 ' }
                            ]
                        },
                        survay_id:survey1.survay_id
                    }  
                ]
            }
        },
        include: {
            questions: true 
        }
    });
   console.log('Related topic inserted successfully:', relatedTopic4);
}
main()
    .then(async () => {
    await prisma.$disconnect()
    })
    .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
    })


