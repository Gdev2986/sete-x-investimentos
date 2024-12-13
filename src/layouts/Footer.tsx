import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <Container fluid>
                <Row>
                <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
                    {new Date().getFullYear()} &copy; Sete X Investimentos - Todos os direitos reservados
                </Col>

                    <Col md={6}>
                        <div className="text-md-end footer-links d-none d-md-block" >
                            <h5 style={{color: "#727b83"}}>Precisa de Ajuda? <Link to="#" style={{color: "#41C56D"}}>Fale Consoco</Link> </h5>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
