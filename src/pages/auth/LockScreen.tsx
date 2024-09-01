import { Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

// hooks
import { useRedux } from '../../hooks/';

// actions
import { resetAuth, unlockUser } from '../../redux/actions'; // Usando 'unlockUser'

// components
import { VerticalForm, FormInput } from '../../components/form/';
import AuthLayout from './AuthLayout';

// images
import userImg from '../../assets/images/users/user-1.jpg';

type UserData = {
    password: string;
};

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();
    return (
        <Row className="mt-3">
            <Col xs={12} className="text-center">
                <p className="text-muted">
                    {t('Não é você?')}{' '}
                    <Link to={'/auth/register'} className="text-dark ms-1">
                        <b>{t('Cadastre-se')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const LockScreen = () => {
    const { t } = useTranslation();
    const { dispatch, appSelector } = useRedux();

    // Obtendo estados do Redux
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
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            password: yup.string().required(t('Insira sua senha')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        if (user) {
            dispatch(unlockUser(user.email, formData['password'])); // Chama a ação 'unlockUser'
        }
    };

    // Redireciona para a página correta após o desbloqueio
    let redirectUrl = '/';
    if (userLoggedIn && user) {
        redirectUrl = user.role === 'admin' ? '/dashboard-admin' : '/dashboard-user';
    }

    return (
        <>
            {userLoggedIn && user && <Navigate to={redirectUrl} replace />}

            <AuthLayout bottomLinks={<BottomLink />}>
                <div className="text-center mb-4">
                    <h4 className="text-uppercase mt-0 mb-4">{t('Bem-vindo de volta')}</h4>
                    <img src={userImg} alt="" width="88" className="rounded-circle img-thumbnail" />
                    <p className="text-muted my-4">{t('Insira sua senha')}</p>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder={t('Insira sua senha')}
                        containerClass={'mb-3'}
                    />

                    <div className="mb-0 d-grid text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Entrar')}
                        </Button>
                    </div>
                </VerticalForm>
            </AuthLayout>
        </>
    );
};

export default LockScreen;
