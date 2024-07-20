import React, {FC, useEffect, useState} from 'react';
import {GrUpdate} from "react-icons/gr";
import {RxCross1} from "react-icons/rx";
import {Button, Input} from "rizzui";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "@/app/lib/hook/storeHooks";
import {RootState} from "@/app/lib/store/store";
import {changeState} from "@/app/lib/store/features/admin-survay/AdminSlicer";

interface DataProps{
    topic_name: string,
    topic_id: number
}
interface ModalOptionProps {
    que: DataProps;
}
const ModalOption = ({que}: ModalOptionProps) => {

    const [optionName, setOptionName] = useState<string>(que.topic_name)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const stateAdmin = useAppSelector((state: RootState) => state.admin.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setOptionName(que.topic_name);
    }, [que.topic_name]);

    const handleSubmit = async (id:number) => {
        try {
            const res = await axios.put(`http://localhost:3000/api/admin/releatedTopic/${id}`,
                {
                    topic_name: optionName
                })
            console.log(res)
            setIsModalOpen(false)
            dispatch(changeState(!stateAdmin))
        }catch (error) {
            console.log(error)
        }
    };

    const deleteRelate = async (id: number) =>{
        try {
            const res = await axios.delete(`http://localhost:3000/api/admin/releatedTopic/${id}`)
            console.log(res)
            setIsModalOpen(false)
            dispatch(changeState(!stateAdmin))
        }catch (e) {
            console.log(e)
        }
    }

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
                        <p className='text-2xl'>Before: {que.topic_name}</p>

                        <div className='flex items-center'>
                            <p className='text-2xl'>After: </p>
                            <Input
                                onChange={(e) => setOptionName(e.target.value)}
                                className='text-2xl w-full'
                                defaultValue={que.topic_name}/>
                        </div>
                        <div className='w-full flex justify-between'>
                            <Button onClick={() => deleteRelate(que.topic_id)}>Delete</Button>
                            <Button onClick={() => handleSubmit(que.topic_id)}>Update</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalOption;