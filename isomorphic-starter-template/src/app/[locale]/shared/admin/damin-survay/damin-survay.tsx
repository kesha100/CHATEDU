'use client';


import AdminSurvayQue from "@/app/[locale]/shared/admin/damin-survay/admin-survay-que";
import AdminSurvayTopic from "@/app/[locale]/shared/admin/damin-survay/admin-survay-topic";
import AdminSurveySurvey from "@/app/[locale]/shared/admin/damin-survay/admin-survey-survey";

export default function AdminSurvayCreate(
{
  params,
}:
{
  params:{
      id?: string,
      locale?:string
  }
}) {

    return (
        <>
            <AdminSurveySurvey/>
            <AdminSurvayTopic params={params}/>
            <AdminSurvayQue params={params}/>
        </>
    );
}
