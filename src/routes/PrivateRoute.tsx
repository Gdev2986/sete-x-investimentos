import { Navigate, useLocation } from 'react-router-dom';

// helpers
import { APICore } from '../helpers/api/apiCore';

// hooks
import { useUser } from '../hooks';
import { user } from "../helpers/fake-backend"

type PrivateRouteProps = {
    component: React.ComponentType;
    roles?: string[];
};

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ component: RouteComponent, roles = [], ...rest }: PrivateRouteProps) => {
    let location = useLocation();
    const [loggedInUser] = useUser();

    const api = new APICore();

    /**
     * not logged in so redirect to login page with the return url
     */
    if (!api.isUserAuthenticated()) {
        return <Navigate to={'/auth/login'} state={{ from: location }} replace />;
    }

    // check if route is restricted by role
    if (roles.length > 0 && !roles.includes(loggedInUser.role.toLowerCase())) { // Ensure correct role check
        // role not authorised so redirect to home page
        return <Navigate to={{ pathname: `/dashboard-${user.role}` }} />;
    }

    return <RouteComponent />;
};

export default PrivateRoute;
