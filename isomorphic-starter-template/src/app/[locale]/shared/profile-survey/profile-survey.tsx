import React, { FC } from 'react';
import { Checkbox, Input } from "rizzui";
import RadioType from "@/app/[locale]/shared/radio/radio-type";
import axios from "axios";
import { useSession } from "next-auth/react";
import { apiService } from '@/api.axios/api';
import {useAppDispatch, useAppSelector} from "@/app/lib/hook/storeHooks";
import {surveyState} from "@/app/lib/store/features/profile-slicer/ProfileSlicer";

interface AnswerProps {
    answer_text: string,
    answer_id: number,
    question_id: number,
    user_id: number
}

interface OptionsProps {
    option_id: number,
    option_text: string,
    question_id: number,
    isChecked: boolean
}

interface QueProps {
    question_id: number,
    question_text: string,
    answer_type: string,
    related_topic_id: number,
    answers: AnswerProps[],
    options: OptionsProps[]
}

interface Data {
    el: QueProps
}

const ProfileSurvay: FC<Data> = ({ el }) => {
    const { data: session, status } = useSession();


    // const [addAnswer, setAddAnswer] = useState<boolean | string>('')
    // const [addAnswerMul, setAddAnswerMul] = useState<boolean | string>('')
    const user = session?.user as { id?: number }; // Explicitly specify the type of session?.user

    const userId = user?.id ?? -1;
    const surveyStatus = useAppSelector(state => state.survey.isSurvey)
    const dispatch = useAppDispatch()

        const addAnswerToSurvey = async (addAnswer: string, answers: any, question_id: number, userId: number) => {
            if (addAnswer.trim() === '') return;
            try {
                const res = await axios.put(`${apiService?.defaults?.baseURL}/api/survey/answer/input`, {
                    answer_text: addAnswer,
                    question_id: question_id,
                    answerid: answers[0] ? answers[0].answer_id : -1,
                    user_id: userId,
                })
                dispatch(surveyState(!surveyStatus))
            } catch (e) {
                console.log(e)
            }
        }

        const handleCheckboxChange = async (qid: number, ansid: number, text: string | string[] | boolean, option_id: number) => {
            console.log(text)

            const userId = (session?.user as { id?: number })?.id;
            if (userId !== undefined) {
                try {
                    const res = await axios.put(`${apiService?.defaults?.baseURL}/api/survey/answer/multiple`, {
                        answer_text: text,
                        question_id: qid,
                        answerid: ansid,
                        user_id: userId,
                        option_id: option_id
                    });
                    dispatch(surveyState(!surveyStatus))
                } catch (e) {
                    console.log(e);
                }
            } else {
                console.log("User ID is undefined");
            }
        };


        return (
        <div>
            <p className='text-2xl text-black m-[5px_0px]'>{el.question_text}</p>
            {el.answer_type === 'text_input' && (
                <>
                    <Input
                        // defaultValue={}
                        onChange={(e) => addAnswerToSurvey(e.target.value,el.answers, el.question_id, userId)}
                    />
                </>
            )}
            {(el.answer_type === 'single_choice' || el.answer_type === 'matrix') && (
                <>
                    <RadioType data={el} />
                </>
            )}
            {el.answer_type === 'multiple_choice' && (
                <>
                    {el.options?.map((prop, index) => (
                        <div key={index} className='flex items-center'>
                            <Checkbox
                                checked={prop.isChecked}
                                onChange={(e) => handleCheckboxChange(el.question_id, el.answers[0] ? el.answers[0].answer_id : -1, e.target.checked === true ? prop.option_text : '', prop.option_id)}
                                className='m-2'
                            />
                            <label> {prop.option_text}</label>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default ProfileSurvay;
