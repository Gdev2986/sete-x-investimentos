import { Navigate } from 'react-router-dom';
import { user } from "../helpers/fake-backend"
// import { APICore } from '../helpers/api/apiCore';

const Root = () => {
    // const api = new APICore();

    const getRootUrl = () => {
        let url: string = `dashboard-${user.role}`;
        return url;
    };

    const url = getRootUrl();

    return <Navigate to={`/${url}`} />;
};

export default Root;
