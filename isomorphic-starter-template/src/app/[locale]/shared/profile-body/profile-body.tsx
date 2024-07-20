import React from 'react';
import ProfileFiles from "@/app/[locale]/shared/profile-files/profile-files";
import {Button} from "rizzui";
import Link from "next/link";

function ProfileBody() {
    const array = [1,2,3]

    return (
        <div className="flex flex-wrap gap-8">
            {array.map((el, ind) => (
                <div key={ind} className="flex flex-col max-w-[200px]">
                    <ProfileFiles/>
                    <Link href={"1/survey"}>
                        <Button className="w-full">Refresh</Button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ProfileBody;