import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';

// hooks
import { useRedux } from '../../hooks/';

// actions
import { resetAuth, signupUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/form/';
import Loader from '../../components/Loader';

import AuthLayout from './AuthLayout';

type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
};

/* Bottom Links */
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
    console.log('[Register Component] Montando componente...');
    dispatch(resetAuth());
    console.log('[Register Component] Resetando autenticação...');
  }, [dispatch]);

  /*
   * Form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      firstName: yup
        .string()
        .trim()
        .required(t('Por favor, digite seu Nome')),
      lastName: yup
        .string()
        .trim()
        .required(t('Por favor, digite seu Sobrenome')),
      username: yup
        .string()
        .trim()
        .required(t('Por favor, digite seu Nome de Usuário'))
        .test('no-spaces', t('O nome de usuário não pode conter espaços'), (value) => !/\s/.test(value || '')),
      email: yup
        .string()
        .required(t('Por favor, digite o E-mail'))
        .email(t('Por favor, digite um E-mail válido')),
      contact: yup
        .string()
        .required(t('Por favor, insira o Contato'))
        .matches(/\(\d{2}\) \d{5}-\d{4}/, t('O contato deve estar no formato (xx) xxxxx-xxxx')),
      password: yup
        .string()
        .required(t('Por favor, digite a Senha'))
        .min(8, t('A senha deve ter no mínimo 8 caracteres'))
        .matches(/[A-Z]/, t('A senha deve conter pelo menos uma letra maiúscula'))
        .matches(/[0-9]/, t('A senha deve conter pelo menos um número')),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], t('As senhas não coincidem'))
        .required(t('Por favor, confirme sua Senha')),
      checkboxsignup: yup.bool().oneOf([true], t('Deve aceitar os Termos e Condições')),
    })
  );

  /*
   * Handle form submission
   */
  const onSubmit = (formData: UserData) => {
    console.log('[Register Component] Dados capturados no formulário (antes da transformação):', formData);
  
    // Transformando os dados para o formato esperado
    const transformedData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      email: formData.email,
      contact: formData.contact.replace(/\D/g, ''), // Remove caracteres não numéricos
      password: formData.password,
    };
  
    console.log('[Register Component] Dados transformados:', transformedData);
  
    dispatch(
      signupUser(
        transformedData.first_name,
        transformedData.last_name,
        transformedData.username,
        transformedData.email,
        transformedData.contact,
        transformedData.password
      )
    );
  
    console.log('[Register Component] Dispatch realizado para signupUser com dados transformados.');
  };
  
  
  

  return (
    <>
      {console.log('[Register Component] Renderizando...')}
      {userSignUp ? (
        <>
          {console.log('[Register Component] Redirecionando para confirmação...')}
          <Navigate to={'/auth/confirm'} replace />
        </>
      ) : null}

      <AuthLayout bottomLinks={<BottomLink />}>
        <div className="text-center mb-4">
          <h4 className="text-uppercase mt-0">{t('Registrar')}</h4>
        </div>

        {error && (
          <Alert variant="danger" className="my-2">
            {console.log('[Register Component] Erro:', error)}
            {error}
          </Alert>
        )}

        {loading && (
          <>
            {console.log('[Register Component] Loader ativado...')}
            <Loader />
          </>
        )}
        <VerticalForm<UserData>
          onSubmit={(data) => {
            console.log('[Register Component] Tentando submissão do formulário:', data); // Log detalhado
            onSubmit(data);
          }}
          defaultValues={{
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            contact: '',
            password: '',
            confirmPassword: '',
          }}
        >
          <Row>
            <Col md={6}>
              <FormInput
                label={t('Nome')}
                type="text"
                name="firstName"
                placeholder={t('Digite seu Nome')}
                containerClass={'mb-3'}
              />
            </Col>
            <Col md={6}>
              <FormInput
                label={t('Sobrenome')}
                type="text"
                name="lastName"
                placeholder={t('Digite seu Sobrenome')}
                containerClass={'mb-3'}
              />
            </Col>
          </Row>
          <FormInput
            label={t('Nome de Usuário')}
            type="text"
            name="username"
            placeholder={t('Digite seu Nome de Usuário')}
            containerClass={'mb-3'}
          />
          <FormInput
            label={t('Endereço de E-mail')}
            type="email"
            name="email"
            placeholder={t('Digite seu E-mail')}
            containerClass={'mb-3'}
          />
          <div className="mb-3">
            <label htmlFor="contact">{t('Contato')}</label>
            <InputMask
              mask="(99) 99999-9999"
              placeholder="(xx) xxxxx-xxxx"
              className="form-control"
              name="contact"
            />
          </div>
          <FormInput
            label={t('Senha')}
            type="password"
            name="password"
            placeholder={t('Digite sua Senha')}
            containerClass={'mb-3'}
          />
          <FormInput
            label={t('Confirmar Senha')}
            type="password"
            name="confirmPassword"
            placeholder={t('Digite novamente sua Senha')}
            containerClass={'mb-3'}
          />
          <FormInput
            label={t('Aceito os Termos e Condições')}
            type="checkbox"
            name="checkboxsignup"
            containerClass={'mb-3'}
          />

          <div className="mb-3 text-center d-grid">
            <Button
              type="submit"
              disabled={loading}
              onClick={() => console.log('[Register Component] Botão Inscrever-se clicado!')}
            >
              {t('Inscrever-se')}
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default Register;
