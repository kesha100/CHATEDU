import React from 'react';
import ProfileHeader from "@/app/[locale]/shared/profile-header/profile-header";
import ProfileBody from "@/app/[locale]/shared/profile-body/profile-body";

const ProfilePage = () => {
    const user = {
        name: 'Ayana',
        email: 'Ayana@mail.com'
    }
    return (
        <div>
            <ProfileHeader {...user}/>
            <ProfileBody/>
        </div>
    );
};

export default ProfilePage;