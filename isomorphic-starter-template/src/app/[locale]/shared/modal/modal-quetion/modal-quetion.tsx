import React, {useEffect, useState} from 'react';
import {GrUpdate} from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import {Button, Checkbox, Input} from "rizzui";
import {MdDelete} from "react-icons/md";
import axios from "axios";
import {changeState} from "@/app/lib/store/features/admin-survay/AdminSlicer";
import {useAppDispatch, useAppSelector} from "@/app/lib/hook/storeHooks";
import {RootState} from "@/app/lib/store/store";


interface OptionsProps {
    option_id: number;
    option_text: string;
    question_id?: number;
}
interface QuetionProps{
    question_text: string,
    question_id: number,
    answer_type: string,
    options?: OptionsProps[]
}
interface dataProps{
    el: QuetionProps
}
const ModalQuetion = ({el}: dataProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [quetionName, setQuetionName] = useState<string>(el.question_text)
    const [inputValues, setInputValues] = useState<OptionsProps[]>([]);
    const dispatch = useAppDispatch()
    const stateAdmin = useAppSelector((state: RootState) => state.admin.value)

    useEffect(() => {
        if (el.options) {
            const values = el.options.map(option => ({
                option_id: option.option_id,
                option_text: option.option_text,
            }));
            setInputValues(values);
        }
    }, [el.options]);


    const handleInputChange = (newValue: string, optionId: number) => {
        setInputValues(prevValues =>
            prevValues.map(item =>
                item.option_id === optionId ? { ...item, option_text: newValue } : item
            )
        );
    };

    const handleSubmit = async (id:number) => {
        console.log(quetionName)
        try {
            const res2 = await axios.put(`http://localhost:3000/api/admin/question/${id}`,
                {
                    question_text: quetionName
                })
            const res = await axios.put('http://localhost:3000/api/admin/option', inputValues)

            console.log(res2, res)
            setIsModalOpen(false)
            dispatch(changeState(!stateAdmin))
        }catch (error) {
            console.log(error)
        }
    };

    const deleteHandle = async (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            const res = await axios.delete(`http://localhost:3000/api/admin/option/${id}`)
            console.log(res)

            setInputValues(prevValues => prevValues.filter(item => item.option_id !== id));
            dispatch(changeState(!stateAdmin))
        }catch (e) {
            console.log(e)
        }
    }

    const deleteQuetion = async (id: number) =>{
        try {
            const res = await axios.delete(`http://localhost:3000/api/admin/question/${id}`)
            console.log(res)
            setIsModalOpen(false)
            dispatch(changeState(!stateAdmin))
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        setQuetionName(el.question_text);
    }, [el.question_text]);

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>
                <GrUpdate size='20px' className='m-5'/>
            </button>

            {isModalOpen && (
                <div>
                    <div
                        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[20px] bg-amber-50 z-10 flex flex-col gap-4 border-2 rounded-2xl w-full md:w-auto'>
                        <div className='w-full flex justify-end'>
                            <button onClick={() => setIsModalOpen(false)}><RxCross1 size='40px'/></button>
                        </div>
                        <p className='text-2xl'>Before: {el.question_text}</p>

                        <div className='flex items-center'>
                            <p className='text-2xl'>After: </p>
                            <Input
                                onChange={(e) => setQuetionName(e.target.value)}
                                className='text-2xl w-full'
                                defaultValue={el.question_text}/>
                        </div>
                        {el.answer_type !== 'text_input' && (
                            <div className='flex flex-wrap gap-3'>
                                {el.options?.map((el, index) => (
                                    <div key={index} className='flex items-center'>
                                        <Input
                                            defaultValue={el.option_text}
                                            onChange={(event) => handleInputChange(event.target.value, el.option_id)}
                                        />
                                        <button onClick={(event) => deleteHandle(el.option_id, event)}><MdDelete size='30px'/></button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className='w-full flex justify-between'>
                            <Button onClick={() => deleteQuetion(el.question_id)}>Delete</Button>
                            <Button onClick={() => handleSubmit(el.question_id)}>Update</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalQuetion;