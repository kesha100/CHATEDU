'use client';

import {Controller, useFormContext} from 'react-hook-form';
import {Button, Input } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from "@/app/[locale]/shared/form-survay";
import {typeOption} from "@/app/[locale]/shared/form-utilits";
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { MdDelete } from "react-icons/md";
import {useEffect, useState} from "react";
import {CiCirclePlus} from "react-icons/ci";
import axios from "axios";
import {changeState} from "@/app/lib/store/features/admin-survay/AdminSlicer";
import {useAppDispatch, useAppSelector} from "@/app/lib/hook/storeHooks";
import {RootState} from "@/app/lib/store/store";
import {apiService} from "@/api.axios/api";


const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
    ssr: false,
    loading: () => <SelectLoader/>,
});

interface OptionType {
    id?: number
    label: string;
    value: string;
}
interface DataProps {
    topic_id: number,
    topic_name: string
}

type dataProps = {
    relatedTopics: DataProps[]
}
export default function AdminSurvayQue(
    {params, className}
    :
    { className?: string,
        params:{
            id?: string,
            locale?:string
        }}
) {
    const {
        register,
        control,
        formState: {errors},
    } = useFormContext();

    const [getValueType, setValueType] = useState<OptionType | string>()
    const [getValue1Type, setValue1Type] = useState<(number | undefined)[]>([])
    const [myArray, setMyArray] = useState([{id: 0, option_text: ''}]);
    const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([]);
    const [topicName, setTopicName] = useState('')

    const stateAdmin = useAppSelector((state: RootState) => state.admin.value)
    const dispatch = useAppDispatch()

    const m = myArray.map(item => ({option_text: item.option_text}))

    const onSubmit = async () => {
        console.log(topicName, getValueType, getValue1Type?.[0], m)
        try {
            const res = await axios.post(`${apiService?.defaults?.baseURL}api/admin/question`, {
                question_text: topicName,
                answer_type: getValueType,
                related_topic_id: getValue1Type?.[0],
                options: m
            })
            dispatch(changeState(!stateAdmin))
            setTopicName('')
            setValueType('')
            setValue1Type([])
            setMyArray([{id: 0, option_text: ''}])
        } catch (e) {
            console.log(e)
        }
    }

    const addElementToArray = () => {
        setMyArray(prevArray => [
            ...prevArray,
            {id: prevArray.length, option_text: ''}
        ]);
    };

    const handleInputChange = (id: number, newValue: string) => {
        setMyArray(prevArray =>
            prevArray.map(item => item.id === id ? {...item, option_text: newValue} : item)
        );
    };

    const deleteElementAtIndex = (index: number) => {
        setMyArray(prevArray => prevArray.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${apiService?.defaults?.baseURL}api/survey/releatedTopic?lang=${params?.locale}&id=${params?.id}`)

                const categoryOptions = res?.data?.modifiedRelatedTopicsWithQuestions?.map((category: any)  => ({
                    id: category.topic_id,
                    value: category.topic_name,
                    label: category.topic_name,
                }));
                setCategoryOptions(categoryOptions);
            }catch (e) {
                console.log(e)
            }
        }
        getData()
    }, []);

    return (
        <>
            <FormGroup
                onSubmit={onSubmit}
                title="Add quetion"
                description="Edit your quetion description and necessary information from here"
                className={cn(className)}
            >
                <Input
                    label="Title"
                    placeholder="Product title"
                    onChange={(e) => {
                        setTopicName(e.target.value);
                    }}
                />

                <Controller
                    name="categories"
                    control={control}
                    rules={{required: "Product type is required"}}
                    render={({field: {onChange, value}}) => (
                        <Select
                            dropdownClassName="!z-0"
                            options={categoryOptions}
                            value={value}
                            onChange={(selectedOption: string | undefined) => {
                                if (selectedOption) {
                                    onChange(selectedOption)
                                    const matchingData = categoryOptions.filter((item) =>
                                        item.value?.includes(selectedOption)
                                    )
                                    const ids = matchingData.map((el) => el.id);
                                    setValue1Type(ids);                                }
                            }}
                            label="Categories Type"
                            error={errors?.type?.message as string}
                            getOptionValue={(option) => option.value}
                        />
                    )}
                />

                <Controller
                    name="type"
                    control={control}
                    rules={{required: "Product type is required"}}
                    render={({field: {onChange, value}}) => (
                        <Select
                            dropdownClassName="!z-0"
                            options={typeOption}
                            value={value}
                            onChange={(selectedOption: OptionType | undefined) => {
                                if (selectedOption) {
                                    onChange(selectedOption);
                                    setValueType(selectedOption);
                                }
                            }}
                            label="Product Type"
                            error={errors?.type?.message as string}
                            getOptionValue={(option) => option.value}
                        />
                    )}
                />
                {(getValueType === 'text_input' || getValueType === undefined || getValueType == 'matrix') ? (
                    <></>
                ): (
                    <div>
                        {myArray.map((item, index) => (
                            <div key={item.id} className='flex'> {/* Use item.id instead of index */}
                                <Input
                                    placeholder="Title"
                                    value={item.option_text}
                                    onChange={(e) => handleInputChange(item.id, e.target.value)} // Use item.id here
                                />
                                <button onClick={() => deleteElementAtIndex(item.id)}> {/* Use item.id here */}
                                    <MdDelete size='30px'/>
                                </button>
                            </div>
                        ))}
                        <button onClick={addElementToArray}><CiCirclePlus size='40px'/></button>
                    </div>

                )}

                <Button onClick={onSubmit}>ADD</Button>
            </FormGroup>


        </>
    );
}
