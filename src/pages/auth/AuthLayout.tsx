import { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// images
import LogoDark from '../../assets/images/logo-dark.png';
import LogoLight from '../../assets/images/logo-light.png';

type AccountLayoutProps = {
    hasLogo?: boolean;
    bottomLinks?: any;
    children?: React.ReactNode;
};

const AuthLayout = ({ hasLogo, bottomLinks, children }: AccountLayoutProps) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (document.body) {
            document.body.classList.add('authentication-bg');
        }
        return () => {
            if (document.body) {
                document.body.classList.remove('authentication-bg');
            }
        };
    }, []);

    return (
        <div
            className="account-pages"
            style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh' // Faz o contêiner ocupar toda a altura da tela
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={4}>
                        {hasLogo && (
                            <div className="text-center">
                                <div className="auth-logo">
                                    <Link to="/" className="logo logo-dark text-center">
                                        <span className="logo-lg">
                                            <img src={LogoDark} alt="" height="70" />
                                        </span>
                                    </Link>
    
                                    <Link to="/" className="logo logo-light text-center">
                                        <span className="logo-lg">
                                            <img src={LogoLight} alt="" height="70" />
                                        </span>
                                    </Link>
                                </div>
                                <p className="text-muted mt-2 mb-4">{t('Sete X Investimentos')}</p>
                            </div>
                        )}
                        <Card>
                            <Card.Body className="p-4">{children}</Card.Body>
                        </Card>
    
                        {/* bottom links */}
                        {bottomLinks}
                    </Col>
                </Row>
            </Container>
        </div>
    );
    
};

AuthLayout.defaultProps = {
    hasLogo: true,
};

export default AuthLayout;
