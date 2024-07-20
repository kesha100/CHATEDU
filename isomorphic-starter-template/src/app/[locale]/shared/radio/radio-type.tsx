import React, { useState, FC } from 'react';
import { Radio } from "rizzui";
import axios from "axios";
import { useSession } from "next-auth/react";
import { apiService } from '@/api.axios/api';
import {surveyState} from "@/app/lib/store/features/profile-slicer/ProfileSlicer";
import {useAppDispatch, useAppSelector} from "@/app/lib/hook/storeHooks";

interface OptionsProps {
    option_id: number;
    option_text: string;
    question_id?: number;
    isChecked: boolean
}

interface AnswerProps {
    answer_text: string;
    answer_id: number;
    question_id: number;
    user_id: number;
}

interface QueProps {
    question_id: number;
    question_text: string;
    answer_type: string;
    related_topic_id: number;
    options: OptionsProps[]; // Array of OptionProps
    answers: AnswerProps[]; // Array of AnswerProps
}

interface RadioTypeProps {
    data: QueProps,
    style?: string
}

const RadioType: FC<RadioTypeProps> = ({ data, style }) => {
    const { data: session, status } = useSession();
    const [selectedOption, setSelectedOption] = useState<null | number>(null);

    const surveyStatus = useAppSelector(state => state.survey.isSurvey)
    const dispatch = useAppDispatch()
    const handleCheckboxChange = async (index: number, qid: number, ansid: number, text: string | string[] | boolean, option_id: number) => {
        if (selectedOption === index) {
            setSelectedOption(null);
        } else {
            setSelectedOption(index);
        }

        const userId = (session?.user as { id?: number })?.id;
        if (userId !== undefined) {
            try {
                const res = await axios.put(`${apiService?.defaults?.baseURL}/api/survey/answer`, {
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
        <div className={`${style === 'matrix' && 'flex'}`}>
            {data?.options?.map((el, index: number) => (
                <div className='flex items-center' key={index}>
                    <Radio
                        checked={el.isChecked}
                        className='m-2'
                        onChange={() => handleCheckboxChange(index, data.question_id, data.answers[0] ? data.answers[0].answer_id : -1, el.option_text, el.option_id)}
                    />
                    <label>{el.option_text}</label>
                </div>
            ))}
        </div>
    );
};

export default RadioType;
