import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// hooks
import { useRedux } from '../../hooks/';

//actions
import { resetAuth, signupUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/form/';
import Loader from '../../components/Loader';

import AuthLayout from './AuthLayout';

type UserData = {
    fullname: string;
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
                    {t('Já tem uma conta?')}{' '}
                    <Link to={'/auth/login'} className="text-dark fw--medium ms-1">
                        <b>{t('Fazer Login')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Register = () => {
    const { t } = useTranslation();
    const { dispatch, appSelector } = useRedux();

    const { loading, userSignUp, error } = appSelector((state) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            fullname: yup.string().required(t('Por favor, digite o Nome Completo')),
            email: yup.string().required('Por favor, digite o E-mail').email('Por favor, digite um E-mail válido'),
            password: yup.string().required(t('Por favor, digite a Senha')),
            checkboxsignup: yup.bool().oneOf([true], 'Deve aceitar os Termos e Condições'),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        dispatch(signupUser(formData['fullname'], formData['email'], formData['password']));
    };

    return (
        <>
            {userSignUp ? <Navigate to={'/auth/confirm'} replace /> : null}

            <AuthLayout bottomLinks={<BottomLink />}>
                <div className="text-center mb-4">
                    <h4 className="text-uppercase mt-0">{t('Registrar')}</h4>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                {loading && <Loader />}
                <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                    <FormInput
                        label={t('Nome Completo')}
                        type="text"
                        name="fullname"
                        placeholder={t('Digite seu nome')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Endereço de E-mail')}
                        type="email"
                        name="email"
                        placeholder={t('Digite seu e-mail')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Senha')}
                        type="password"
                        name="password"
                        placeholder={t('Digite sua senha')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Aceito os Termos e Condições')}
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass={'mb-3'}
                    />

                    <div className="mb-3 text-center d-grid">
                        <Button type="submit" disabled={loading}>
                            {t('Inscrever-se')}
                        </Button>
                    </div>
                </VerticalForm>
            </AuthLayout>
        </>
    );
};

export default Register;
