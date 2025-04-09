import React, { createContext, useContext } from 'react';

const initialProfileContextData = {};
type ProfileContextData = typeof initialProfileContextData;

const ProfileContext = createContext(initialProfileContextData);
export const ProfileProvider: React.FC<React.PropsWithChildren> = (props) => {
    return (
        <ProfileContext.Provider value={initialProfileContextData}>
            {props.children}
        </ProfileContext.Provider>
    );
}

export const useProfileData = () => useContext(ProfileContext);