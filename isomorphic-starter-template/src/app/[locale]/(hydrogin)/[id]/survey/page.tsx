'use client';

import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "rizzui";
import {PiArrowLeft, PiArrowRight} from "react-icons/pi";
import ProfileSurvay from "@/app/[locale]/shared/profile-survey/profile-survey";
import { useRouter } from 'next/router';
import { apiService } from '@/api.axios/api';
import {useAppSelector} from "@/app/lib/hook/storeHooks";

interface dataProps{
    topic_id: number,
    topic_name: string,
    questions?: QueProps[]
}

interface AnswerProps{
    answer_text: string,
    answer_id: number,
    question_id: number,
    user_id: number
}

interface OptionsProps{
    option_id: number,
    option_text: string,
    question_id: number,
    isChecked: boolean
}

interface QueProps{
    question_id: number,
    question_text: string,
    answer_type: string,
    related_topic_id: number,
    answers: AnswerProps[],
    options: OptionsProps[]
}

const elementsPerPage = 1

const UserSurvay = (
    {
        params,
    }:
    {
        params:{
            id: string,
            locale?:string
        }
    }) => {
    // console.log(params)

    const [data, setData] = useState<dataProps[]>([])
    const [quetionsId, setQuetions] = useState<dataProps[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = quetionsId.slice(indexOfFirstElement, indexOfLastElement);
    const surveyStatus = useAppSelector(state => state.survey.isSurvey)
    useEffect(() => {
        const data = async () => {
            try {
                const res = await axios.get(`${apiService?.defaults?.baseURL}api/survey/releatedTopic?lang=${params?.locale}&id=${params?.id}`)
                setData(res?.data.modifiedRelatedTopicsWithQuestions)
            }catch (e) {
                console.log(e)
            }
        }
        data()
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${apiService?.defaults?.baseURL}api/survey/id?lang=${params?.locale}&id=${params?.id}`);
                setQuetions(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [params.id, params?.locale, surveyStatus]);
    console.log(currentElements)

    const handleNextPage = () => {
        if (indexOfLastElement < data.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <section className='rounded-2xl h-full '>
            survey {params.id}
            <div className='flex flex-col gap-6'>
                <div className='flex justify-evenly'>
                    {data?.map((el, index) => (
                        <div key={el.topic_id} data-id={el.topic_id} className='text-center text-xl'>
                            <button className={`rounded-3xl text-blue-50  w-10 h-10 ${index+1 === currentPage ? 'bg-green-500' : 'bg-blue-500'}`}>{index + 1}</button>
                            <p className='text-sm md:text-2xl'>{el?.topic_name}</p>
                        </div>
                    ))}
                </div>

                <div className='p-[40px_50px_0px_40px]  flex flex-col gap-7 md:p-[40px_250px_0px_40px] '>
                    {currentElements[0]?.questions?.map((el, index) => (
                        <div key={index} className='border-2 p-5 rounded-2xl border-amber-950'>
                            <ProfileSurvay el={el} key={index}/>
                        </div>
                    ))}
                </div>

                <div className=' flex justify-between'>
                    <Button onClick={() => handlePrevPage()}>
                        <PiArrowLeft />
                        Back
                    </Button>

                    <Button onClick={() => handleNextPage()}>
                        {currentPage === data.length ? <div>Submit</div> : <div>Next</div>}
                        <PiArrowRight />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default UserSurvay;