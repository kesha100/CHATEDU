import React, {useEffect, useState} from 'react';
import cn from "@/utils/class-names";
import {Button, Input} from "rizzui";
import FormGroup from "@/app/[locale]/shared/form-survay";
import {className} from "postcss-selector-parser";
import axios from "axios";
import {changeState} from "@/app/lib/store/features/admin-survay/AdminSlicer";
import {useAppDispatch, useAppSelector} from "@/app/lib/hook/storeHooks";
import {RootState} from "@/app/lib/store/store";
import {apiService} from "@/api.axios/api";
import {Controller, useFormContext} from "react-hook-form";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";


const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
    ssr: false,
    loading: () => <SelectLoader/>,
});
interface SurvayPropm{
    survay_id: number,
    name: string
}
interface OptionType {
    id?: number
    label: string;
    value: string;
}
const AdminSurvayTopic = (
{
  params,
}:
{
  params:{
      id?: string,
      locale?:string
  }
}) => {
    const [topicMainCh, setTopicMainCh] = useState('')
    const [topicMainEn, setTopicMainEn] = useState('')
    const [getValue1Type, setValue1Type] = useState<(number | undefined)>()
    const [test, setTest] = useState()
    const dispatch = useAppDispatch()
    const stateAdmin = useAppSelector((state: RootState) => state.admin.value)
    const [survayData, setSurvayData] = useState<OptionType[]>([])

    const {
        register,
        control,
        formState: {errors},
    } = useFormContext();
    const onSubmit = async () => {
        try {
            const res = await axios.post(`${apiService?.defaults?.baseURL}api/admin/releatedTopic`, {
                topic_name_en: topicMainEn,
                topic_name_ch: topicMainCh,
                survay_id: getValue1Type,
            })
            console.log(res)
            dispatch(changeState(!stateAdmin))
            setTopicMainCh('')
            setTopicMainEn('')
            setSurvayData([])
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const data = async () => {
            try {
                const res = await axios.get(`${apiService?.defaults?.baseURL}api/survey/all`)
                const survetOptions = res?.data?.map((categorySurvey: any)  => ({
                    id: categorySurvey.survay_id,
                    value: categorySurvey.name,
                    label: categorySurvey.name,
                }));
                setSurvayData(survetOptions)
            }catch (e) {
                console.log(e)
            }
        }
        data()
    }, []);

    return (
        <div>
            <FormGroup
                onSubmit={onSubmit}
                title="Add Topic"
                description="Edit your main topic"
                className={cn(className)}>

                <Input
                    label="TitleChinese"
                    placeholder="Description"
                    value={topicMainCh}
                    onChange={(e) => {
                        setTopicMainCh(e.target.value);
                    }}
                />

                <Input
                    label="English"
                    placeholder="Description"
                    value={topicMainEn}
                    onChange={(e) => {
                        setTopicMainEn(e.target.value);
                    }}
                />

                <Controller
                    name="survey"
                    control={control}
                    rules={{required: "Product type is required"}}
                    render={({field: {onChange, value}}) => (
                        <Select
                            dropdownClassName="!z-0"
                            options={survayData}
                            value={value}
                            onChange={(selectedOptionS: string | undefined) => {
                                if (selectedOptionS) {
                                    onChange(selectedOptionS)
                                    const matchingData = survayData.filter((item) =>
                                        item.value?.includes(selectedOptionS)
                                    )
                                    const ids = matchingData.map((el) => el.id);
                                    setValue1Type(ids[0]);
                                }
                            }}
                            label="Categories Type"
                            error={errors?.type?.message as string}
                            getOptionValue={(option) => option.value}
                        />
                    )}
                />
                <Button className='mb-7' onClick={() => onSubmit()}>ADD</Button>
            </FormGroup>
        </div>
    );
};

export default AdminSurvayTopic;