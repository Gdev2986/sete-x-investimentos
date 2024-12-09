import React from 'react';
import { Navigate } from 'react-router-dom';
//import { user } from "../helpers/fake-backend"
// import { APICore } from '../helpers/api/apiCore';
const user: any = sessionStorage.getItem('setex_user');

const Root = () => {
    // const api = new APICore();

    const getRootUrl = () => {
        let url: string = `${user.role}/dashboard`;
        return url;
    };

    const url = getRootUrl();

    return <Navigate to={`/${url}`} />;
};

export default Root;
