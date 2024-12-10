import React from 'react';
import { Navigate } from 'react-router-dom';
const user: any = sessionStorage.getItem('setex_user');

const Root = () => {

    const getRootUrl = () => {
        let url: string = `auth/login`;
        return url;
    };

    const url = getRootUrl();

    return <Navigate to={`/${url}`} />;
};

export default Root;
