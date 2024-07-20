'use client';

import React, {useState} from 'react';
import AdminSurvayCreate from "@/app/[locale]/shared/admin/damin-survay/damin-survay";
import { useForm, FormProvider } from 'react-hook-form';
import AdminSurvay from "@/app/[locale]/(hydrogin)/admin_survay/admin_survay";


const Tabs = ({params}: any) => {
    const [activeTab, setActiveTab] = useState('survay');
    const methods = useForm();


    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };


    return (
        <>
            <ul
                className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
                role="tablist"
                data-te-nav-ref>
                {['create', 'survay', 'messages', 'contact'].map((tab: string, index: number) => (
                    <li key={index} role="presentation" className="flex-grow basis-0 text-center">
                        <a
                            className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                            data-te-toggle="pill"
                            data-te-target="#tabs-home02"
                            role="tab"
                            aria-controls="tabs-home02"
                            onClick={() => handleTabClick(tab)}
                            {...(tab === activeTab ? {'data-te-nav-active': true} : {})}
                        >{tab}</a
                        >
                    </li>
                ))}


            </ul>

            <div className="mb-6">
                {activeTab === 'create' && (
                    <div role="tabpanel" className='max-w-2xl mx-auto'>
                        <FormProvider {...methods}>
                            <AdminSurvayCreate params={params}/>
                        </FormProvider>
                    </div>
                )}
                {activeTab === 'survay' && (
                    <div role="tabpanel">
                        <AdminSurvay params={params}/>
                    </div>
                )}
                {activeTab === 'messages' && (
                    <div role="tabpanel">
                        Tab 3 content
                    </div>
                )}
                {activeTab === 'contact' && (
                    <div role="tabpanel">
                        Tab 4 content
                    </div>
                )}
            </div>
        </>
    );
};

export default Tabs;