import { useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import React from 'react';

// hooks
import { useRedux } from '../../hooks/';

//actions
import { resetAuth, forgotPassword } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/form/';

import AuthLayout from './AuthLayout';

type UserData = {
    email: string;
};

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Voltar para')}{' '}
                    <Link to={'/auth/login'} className="text-dark ms-1">
                        <b>{t('Entrar')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const ForgetPassword = () => {
    const { dispatch, appSelector } = useRedux();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading, passwordReset, resetPasswordSuccess, error } = appSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        passwordReset: state.Auth.passwordReset,
        resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    }));

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Insira seu e-mail')).email(t('Insira seu e-mail')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        dispatch(forgotPassword(formData['email']));
    };

    return (
        <AuthLayout bottomLinks={<BottomLink />}>
            <div className="text-center mb-4">
                <h4 className="text-uppercase mt-0 mb-3">{t('Redefinir Senha')}</h4>
                <p className="text-muted mb-0 font-13">
                    {t(
                        "Digite seu endereço de e-mail e enviaremos um e-mail com instruções para redefinir sua senha."
                    )}
                </p>
            </div>

            {resetPasswordSuccess && <Alert variant="success">{resetPasswordSuccess.message}</Alert>}

            {error && !resetPasswordSuccess && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}

            {!passwordReset && (
                <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
                    <FormInput
                        label={t('Email')}
                        type="email"
                        name="email"
                        placeholder={t('Insira seu e-mail')}
                        containerClass={'mb-3'}
                    />

                    <div className="mb-3 d-grid text-center">
                        <Button type="submit" disabled={loading}>
                            {t('Redefinir Senha')}
                        </Button>
                    </div>
                </VerticalForm>
            )}
        </AuthLayout>
    );
};

export default ForgetPassword;
