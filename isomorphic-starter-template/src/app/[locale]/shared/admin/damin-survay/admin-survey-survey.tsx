import React, {useState} from 'react';
import FormGroup from "@/app/[locale]/shared/form-survay";
import cn from "@/utils/class-names";
import {className} from "postcss-selector-parser";
import {Button, Input} from "rizzui";
import {useAppDispatch, useAppSelector} from "@/app/lib/hook/storeHooks";
import {RootState} from "@/app/lib/store/store";
import axios from "axios";
import {apiService} from "@/api.axios/api";
import {changeState} from "@/app/lib/store/features/admin-survay/AdminSlicer";

const AdminSurveySurvey = () => {
    const [surveyMain, setSurveyMain] = useState('')
    const dispatch = useAppDispatch()
    const stateAdmin = useAppSelector((state: RootState) => state.admin.value)

    const onSubmit = async () => {
        console.log(surveyMain)
        try {
            const res = await axios.post(`${apiService?.defaults?.baseURL}api/admin/survey`, {
                name: surveyMain
            })
            console.log(res)
            dispatch(changeState(!stateAdmin))
            setSurveyMain('')
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <div>
                <FormGroup
                    onSubmit={onSubmit}
                    title="Add Survey"
                    description="Edit your survey name"
                    className={cn(className)}>

                    <Input
                        label="Title"
                        placeholder="Description"
                        value={surveyMain}
                        onChange={(e) => {
                            setSurveyMain(e.target.value);
                        }}
                    />
                    <Button className='mb-7' onClick={() => onSubmit()}>ADD</Button>
                </FormGroup>
            </div>
        </div>
    );
};

export default AdminSurveySurvey;