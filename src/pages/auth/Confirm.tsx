import { useTranslation } from 'react-i18next';
import React from 'react';
import { Link } from 'react-router-dom';

// components
import AuthLayout from './AuthLayout';

// images
import mail_confirm from '../../assets/images/mail_confirm.png';

const Confirm = () => {
    const { t } = useTranslation();

    return (
        <AuthLayout>
            <div className="text-center">
                <div className="mb-4">
                    <h4 className="text-uppercase mt-0">{t('Confirmar E-mail')}</h4>
                </div>
                <img src={mail_confirm} alt="img" width="86" className="mx-auto d-block" />
    
                <p className="text-muted font-14 mt-2">
                    {t('Um e-mail foi enviado para ')}
                    <span className="fw-medium">{t('seuemail@dominio.com')}</span>
                    {t(
                        '. Verifique um e-mail da empresa e clique no link incluído para redefinir sua senha.'
                    )}
                </p>
                <Link className="btn d-block btn-pink waves-effect waves-light mt-3" to="/auth/login">
                    {t('Voltar para a Página Inicial')}
                </Link>
            </div>
        </AuthLayout>
    );
    
};

export default Confirm;
