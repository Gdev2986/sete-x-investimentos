import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer" style={{ }}>
            <Container fluid>
                <Row>
                    <Col md={6}>
                        {new Date().getFullYear()} &copy; Sete X Investimentos - Todos os direitos reservados
                    </Col>
                    <Col md={6}>
                        <div className="text-md-end footer-links d-none d-md-block" >
                            <h5 style={{color: "#727b83"}}>Alguma duvida? <Link to="#" style={{color: "#1c8ce3"}}>Fale Consoco</Link> </h5>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
