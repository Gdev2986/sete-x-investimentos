import { useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Navigate, Link, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

// hooks
import { useRedux } from '../../hooks/';

// actions
import { resetAuth, loginUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/form/';
import Loader from '../../components/Loader';

import AuthLayout from './AuthLayout';

type LocationState = {
    from?: Location;
};

type UserData = {
    email: string;
    password: string;
};

/* bottom links */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col xs={12} className="text-center">
                <p className="text-muted">
                    <Link to="/auth/forget-password" className="text-muted ms-1">
                        <i className="fa fa-lock me-1"></i>
                        {t('Esqueceu sua Senha?')}
                    </Link>
                </p>
                <p className="text-muted">
                    {t("Não possui uma conta?")}{' '}
                    <Link to={'/auth/register'} className="text-dark ms-1">
                        <b>{t('Cadastre-se')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Login = () => {
    const { t } = useTranslation();
    const { dispatch, appSelector } = useRedux();

    const { user, userLoggedIn, loading, error } = appSelector((state) => ({
        user: state.Auth.user,
        loading: state.Auth.loading,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Insira seu e-mail')).email(t('Insira um e-mail válido')),
            password: yup.string().required(t('Por favor, insira sua senha')),
        })
    );

    /*
    handle form submission
    */
    const onSubmit = (formData: UserData) => {
        dispatch(loginUser(formData['email'], formData['password']));
    };

    const location = useLocation();
    let redirectUrl = '/';

    if (userLoggedIn && user) {
        // Redireciona com base na role do usuário
        if (user.role === 'admin') {
            redirectUrl = `/${user.role}/dashboard`; // Admin dashboard
        } else if (user.role === 'user') {
            redirectUrl = `/${user.role}/dashboard`; // User dashboard
        }
    } else if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : '/';
    }

    return (
        <>
            {userLoggedIn && user && <Navigate to={redirectUrl} replace />}

            <AuthLayout bottomLinks={<BottomLink />}>
                <div className="text-center mb-4">
                    <h4 className="text-uppercase mt-0">{t('Entrar')}</h4>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}
                {loading && <Loader />}

                <VerticalForm<UserData>
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ email: 'teste@teste.com', password: 'test' }}
                >
                    <FormInput
                        type="email"
                        name="email"
                        label={t('Email')}
                        placeholder={t('Insira seu e-mail')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Senha')}
                        type="password"
                        name="password"
                        placeholder="Insira sua senha"
                        containerClass={'mb-3'}
                    ></FormInput>

                    <FormInput
                        type="checkbox"
                        name="checkbox"
                        label={t('Manter conectado')}
                        containerClass={'mb-3'}
                        defaultChecked
                    />

                    <div className="text-center d-grid mb-3">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Entrar')}
                        </Button>
                    </div>
                </VerticalForm>
            </AuthLayout>
        </>
    );
};

export default Login;
