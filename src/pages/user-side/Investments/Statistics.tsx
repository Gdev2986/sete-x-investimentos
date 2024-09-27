import React, { useState } from 'react';
import { Card, Col,Dropdown, Row, Button, Modal, Form } from 'react-bootstrap';


const Statistics = () => {
    const totalInvestido = 5000;
    const disponivelRetirada = 1200;
    const totalCarteira = totalInvestido + disponivelRetirada;

    const [showModalRetirada, setShowModalRetirada] = useState(false);
    const [showModalRealocar, setShowModalRealocar] = useState(false);
    const [valor, setValor] = useState<number | string>('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [nomeTitular, setNomeTitular] = useState('');
    const [chavePix, setChavePix] = useState('');
    const [showShake, setShowShake] = useState(false);

    // Função para abrir o modal de retirada
    const handleRetiradaClick = () => setShowModalRetirada(true);

    // Função para fechar o modal de retirada
    const handleCloseModalRetirada = () => setShowModalRetirada(false);

    // Função para abrir o modal de realocar saldo
    const handleRealocarSaldoClick = () => setShowModalRealocar(true);

    // Função para fechar o modal de realocar saldo
    const handleCloseModalRealocar = () => setShowModalRealocar(false);

    // Função para formatar valores no formato R$ brasileiro
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    // Função para validar o valor digitado e aplicar a lógica de limite
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value);

        if (inputValue > disponivelRetirada) {
            setIsInvalid(true);
            setShowShake(true);
            setTimeout(() => setShowShake(false), 300); // Remove a classe shake após 300ms
        } else {
            setIsInvalid(false);
        }

        setValor(inputValue);
    };

    const isFormValid = () => {
        const valorNumerico = typeof valor === 'string' ? parseFloat(valor) : valor;
        return nomeTitular && chavePix && !isInvalid && valorNumerico > 0;
    };

    const handleInvalidSubmit = () => {
        setShowShake(true);
        setTimeout(() => setShowShake(false), 300); // Remove a classe shake após 300ms
    };

    return (
        <>
            <Row>
                <Col xl={3} md={6}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mt-0 mb-4">Total Investido</h4>
                            <div className="widget-chart-1">
                                <div className="widget-detail-1 text-end">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <i className="mdi mdi-cash-lock" style={{ fontSize: '40px', color: '#6c757d' }}></i>
                                        <h2 className="fw-normal pt-2 mb-1">{formatCurrency(totalInvestido)}</h2>
                                    </div>
                                    <p className="text-muted mb-1">Valor Alocado</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} md={6}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mt-0 mb-4">Total Carteira</h4>
                            <div className="widget-chart-1">
                                <div className="widget-detail-1 text-end">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <i className="mdi mdi-wallet-outline" style={{ fontSize: '40px', color: '#6c757d' }}></i>
                                        <h2 className="fw-normal pt-2 mb-1">{formatCurrency(totalCarteira)}</h2>
                                    </div>
                                    <p className="text-muted mb-1">Todos os valores</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} md={6}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mt-0 mb-4">Rendimento Médio</h4>
                            <div className="widget-chart-1">
                                <div className="widget-detail-1 text-end">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <i className="mdi mdi-chart-timeline-variant" style={{ fontSize: '40px', color: '#6c757d' }}></i>
                                        <h2 className="fw-normal pt-2 mb-1">2%</h2>
                                    </div>
                                    <p className="text-muted mb-1">Rendimento por dia útil</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} md={6}>
                    <Card>
                        <Card.Body>
                            <Dropdown className="float-end" align="end">
                                <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleRetiradaClick}>Solicitar Retirada</Dropdown.Item>
                                    <Dropdown.Item onClick={handleRealocarSaldoClick}>Realocar Saldo</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <h4 className="header-title mt-0 mb-4">Disponível para Retirada</h4>
                            <div className="widget-chart-1">
                                <div className="widget-detail-1 text-end">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <i className="mdi mdi-cash-multiple" style={{ fontSize: '40px', color: '#41c56d' }}></i>
                                        <h2 className="fw-normal pt-2 mb-1" style={{ color: '#41c56d' }}>
                                            {formatCurrency(disponivelRetirada)}
                                        </h2>
                                    </div>
                                    <p className="text-muted mb-1">Rendimento Disponível</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Modal para Solicitar Retirada */}
            <Modal show={showModalRetirada} onHide={handleCloseModalRetirada}>
                <Modal.Header closeButton>
                    <Modal.Title>Solicitar Retirada</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="nome">
                            <Form.Label>Nome Titular</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o nome completo do titular da conta"
                                value={nomeTitular}
                                onChange={(e) => setNomeTitular(e.target.value)}
                                isInvalid={!nomeTitular && showShake}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="pix" className="mt-3">
                            <Form.Label>Chave Pix</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite a chave Pix"
                                value={chavePix}
                                onChange={(e) => setChavePix(e.target.value)}
                                isInvalid={!chavePix && showShake}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="valor" className="mt-3">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="number"
                                value={valor}
                                onChange={handleValorChange}
                                isInvalid={isInvalid}
                                placeholder={`Digite o valor (Máximo: ${formatCurrency(disponivelRetirada)})`}
                                className={showShake && isInvalid ? 'shake' : ''}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                O valor máximo disponível é {formatCurrency(disponivelRetirada)}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalRetirada}>
                        Cancelar
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => (isFormValid() ? handleCloseModalRetirada() : handleInvalidSubmit())}
                    >
                        Confirmar Retirada
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Realocar Saldo */}
            <Modal show={showModalRealocar} onHide={handleCloseModalRealocar}>
                <Modal.Header closeButton>
                    <Modal.Title>Realocar Saldo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Ao realocar seu saldo disponível, ele será adicionado automaticamente ao seu valor total alocado,
                        aumentando suas futuras oportunidades de investimento.
                    </p>
                    <Form>
                        <Form.Group controlId="realocar-valor" className="mt-3">
                            <Form.Label>Valor para Realocar</Form.Label>
                            <Form.Control
                                type="number"
                                value={valor}
                                onChange={handleValorChange}
                                isInvalid={isInvalid}
                                placeholder={`Digite o valor (Máximo: ${formatCurrency(disponivelRetirada)})`}
                                className={showShake && isInvalid ? 'shake' : ''}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                O valor máximo disponível é {formatCurrency(disponivelRetirada)}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalRealocar}>
                        Cancelar
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => (isFormValid() ? handleCloseModalRealocar() : handleInvalidSubmit())}
                    >
                        Confirmar Realocação
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* CSS para shake animation */}
            <style>
                {`
                    .shake {
                        animation: shake 0.3s;
                    }

                    @keyframes shake {
                        0% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        50% { transform: translateX(5px); }
                        75% { transform: translateX(-5px); }
                        100% { transform: translateX(0); }
                    }
                `}
            </style>
        </>
    );
};

export default Statistics;
