import React from 'react';
import { Navigate } from 'react-router-dom';
import { APICore } from '../helpers/api/apiCore';

const api = new APICore();



const Root = () => {
    const loggedInUser = api.getLoggedInUser();

    const getRootUrl = () => {
        return `${loggedInUser.user.role}/dashboard`;
    };

    const url = getRootUrl();

    return <Navigate to={`/${url}`} />;
};

export default Root;
