import React from 'react';
import {Checkbox, Input} from "rizzui";
import RadioType from "@/app/[locale]/shared/radio/radio-type";



interface OptionsProps {
    option_id: number;
    option_text: string;
    question_id?: number;
    isChecked: boolean;
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
interface dataProps{
    el: QueProps
}

const QuetionComp = ({el}: dataProps) => {

    return (
        <div >
            <p className='text-2xl'>{el.question_text}</p>
            {el.answer_type === 'text_input' && (
                <Input disabled/>
            )}
            {el.answer_type === 'single_choice' && (
                <>
                    <RadioType data={el || []}/>
                </>
            )}
            <div className='flex'>
                {el.answer_type === 'matrix' && (
                    <>
                        <RadioType data={el || []} style={el.answer_type}/>
                    </>
                )}
            </div>
            {el.answer_type === 'multiple_choice' && (
                <>
                    {el.options?.map((el, index) => (
                        <div key={index} className='flex items-center'>
                            <Checkbox
                                className='m-2'
                            />
                            <label> {el.option_text}</label>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default QuetionComp;