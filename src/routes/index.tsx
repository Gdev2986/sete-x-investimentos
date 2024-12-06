import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

// layouts
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';

// components
import PrivateRoute from './PrivateRoute';
import Root from './Root';


// hooks
import { useRedux } from '../hooks';

// lazy load all the views
// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));

// Admin
const Clients = React.lazy(() => import('../pages/admin-side/Clients/index'));
const DashBoard1 = React.lazy(() => import('../pages/admin-side/DashBoardAdmin'));
const Deposits = React.lazy(() => import('../pages/admin-side/Deposits'));
const Yields = React.lazy(() => import('../pages/admin-side/Yields'));
const Withdrawals = React.lazy(() => import('../pages/admin-side/Withdrawals'));
const Profile = React.lazy(() => import('../pages/admin-side/Profile'));


//User
const DashBoardUser = React.lazy(() => import('../pages/user-side/DashBoardUser'));
const WithdrawalsUser = React.lazy(() => import('../pages/user-side/Withdrawals'));
const InvestmentsUser = React.lazy(() => import('../pages/user-side/Investments'));
const DepositsUser = React.lazy(() => import('../pages/user-side/Deposits'));
const ProfileUser = React.lazy(() => import('../pages/user-side/Profile'));


const Error404 = React.lazy(() => import('../pages/other/Error404'));
const Error500 = React.lazy(() => import('../pages/other/Error500'));
const Maintenance = React.lazy(() => import('../pages/other/Maintenance'));
const ComingSoon = React.lazy(() => import('../pages/other/ComingSoon'));


// lamding
const Landing = React.lazy(() => import('../pages/Landing'));

const loading = () => <div className=""></div>;

type LoadComponentProps = {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
};

const LoadComponent: React.FC<LoadComponentProps> = ({ component: Component }) => (
  <Suspense fallback={<div>Carregando...</div>}>
    <Component />
  </Suspense>
);


const AllRoutes = () => {
  const { appSelector } = useRedux();

  const { layout } = appSelector((state) => ({
    layout: state.Layout,
  }));

  const getLayout = () => {
    let layoutCls: React.ComponentType = VerticalLayout;

    return layoutCls;
  };
  let Layout = getLayout();

  return useRoutes([
    { path: '/', element: <Root /> },
    {
      // public routes
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: 'auth',
          children: [
            { path: 'login', element: <LoadComponent component={Login} /> },
            { path: 'register', element: <LoadComponent component={Register} /> },
            { path: 'confirm', element: <LoadComponent component={Confirm} /> },
            { path: 'forget-password', element: <LoadComponent component={ForgetPassword} /> },
            { path: 'logout', element: <LoadComponent component={Logout} /> },
          ],
        },
        {
          path: 'error-404',
          element: <LoadComponent component={Error404} />,
        },
        {
          path: 'error-500',
          element: <LoadComponent component={Error500} />,
        },
        {
          path: 'maintenance',
          element: <LoadComponent component={Maintenance} />,
        },
        {
          path: 'coming-soon',
          element: <LoadComponent component={ComingSoon} />,
        },
        {
          path: 'landing',
          element: <LoadComponent component={Landing} />,
        },
      ],
    },
    {
      // auth protected routes
      path: '/',
      element: <PrivateRoute roles={['admin']} component={Layout} />,
      children: [
        {
          path: 'admin/dashboard',
          element: <LoadComponent component={DashBoard1} />,
        },
        {
          path: 'admin/yields',
          element: <LoadComponent component={Yields} />,
        },
        {
          path: 'admin/clients',
          element: <LoadComponent component={Clients} />,
        },
        {
          path: 'admin/deposits',
          element: <LoadComponent component={Deposits} />,
        },
        {
          path: 'admin/withdrawals',
          element: <LoadComponent component={Withdrawals} />,
        },
        {
          path: 'admin/profile',
          element: <LoadComponent component={Profile} />,
        },]
      },
    {
      // User protected routes
      path: '/',
      element: <PrivateRoute roles={['user']} component={Layout} />,
      children: [
        {
          path: 'user/dashboard',
          element: <LoadComponent component={DashBoardUser} />,
        },
        {
          path: 'user/investments',
          element: <LoadComponent component={InvestmentsUser} />,
        },
        {
          path: 'user/deposits',
          element: <LoadComponent component={DepositsUser} />,
        },
        {
          path: 'user/withdrawals',
          element: <LoadComponent component={WithdrawalsUser} />,
        },
        {
          path: 'user/profile',
          element: <LoadComponent component={ProfileUser} />,
        },
      ],
    },
    
  ]);

  

};

export { AllRoutes };
