'use client';

import {useEffect, useState} from "react";
import axios from "axios";
import QuetionComp from "@/app/[locale]/shared/quetion-comp/quetion-comp";
import ModalQuetion from "@/app/[locale]/shared/modal/modal-quetion/modal-quetion";
import ModalOption from "@/app/[locale]/shared/modal/modal-option/modal-option";
import {useAppSelector} from "@/app/lib/hook/storeHooks";
import {RootState} from "@/app/lib/store/store";
import {apiService} from "@/api.axios/api";


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
interface DataProps{
    topic_name: string,
    topic_id: number,
    questions: QueProps[]
}

const AdminSurvay = (
    {
        params,
    }:
    {
        params:{
            id?: string,
            locale?:string
        }
    }
) => {
    const [data, setData] = useState<DataProps[]>([])
    const stateAdmin = useAppSelector((state: RootState) => state.admin.value)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get<DataProps[]>(`${apiService?.defaults?.baseURL}api/survey/id?lang=${params?.locale}&id=${params?.id}`)
                setData(res.data)
            }catch (e) {
                console.log(e)
            }
        }
        getData()
    }, [stateAdmin]);

    return (
        <div>
            {data.map((que, index) => (
                <section key={index}>
                    <div className='flex items-center'>
                        <h1>{que.topic_name}</h1>
                        <ModalOption que={que}/>
                    </div>

                    {que.questions.map((el, index) => (
                        <div className='flex items-center' key={index}>
                            <QuetionComp el={el}/>
                            <ModalQuetion el={el}/>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};

export default AdminSurvay;