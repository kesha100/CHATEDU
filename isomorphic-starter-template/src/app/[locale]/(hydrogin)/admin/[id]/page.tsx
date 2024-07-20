'use client';

import ProfileHeader from "@/app/[locale]/shared/profile-header/profile-header";
import Tabs from "@/app/[locale]/shared/tabs/tabs";
import {useSession} from "next-auth/react";
import { redirect } from 'next/navigation'

const AmdinPage = (
{
    params,
}:
{
    params:{
        id: string,
        locale?:string
    }
}) => {
    const admin = {
        name: 'admin',
        email: 'admin@mail.com'
    }

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    console.log(session)
    // if (session?.user?.role !== 'admin') {
    //     redirect('/');
    // }

    return (
        <div>
            <ProfileHeader {...admin}/>
            <Tabs params={params}/>
        </div>
    )
};

export default AmdinPage;