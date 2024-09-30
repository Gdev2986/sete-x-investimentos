import React, { useState } from 'react';
import { Card, Col, Dropdown, Row, Button, Modal, Form } from 'react-bootstrap';

const Statistics = () => {
    const totalInvestido = 5000;
    const disponivelRetirada = 1200;
    const totalCarteira = totalInvestido + disponivelRetirada;

    const [showModalRetirada, setShowModalRetirada] = useState(false);
    const [showModalRealocar, setShowModalRealocar] = useState(false);
    const [valorRetirada, setValorRetirada] = useState<string>('');  // Separando os valores de retirada e realocar
    const [valorRealocar, setValorRealocar] = useState<string>(''); 
    const [isInvalidRetirada, setIsInvalidRetirada] = useState(false);
    const [isInvalidRealocar, setIsInvalidRealocar] = useState(false);
    const [nomeTitular, setNomeTitular] = useState('');
    const [chavePix, setChavePix] = useState('');
    const [showShakeNome, setShowShakeNome] = useState(false);
    const [showShakePix, setShowShakePix] = useState(false);

    // Função para abrir o modal de retirada
    const handleRetiradaClick = () => setShowModalRetirada(true);

    // Função para fechar o modal de retirada
    const handleCloseModalRetirada = () => setShowModalRetirada(false);

    // Função para abrir o modal de realocar saldo
    const handleRealocarSaldoClick = () => setShowModalRealocar(true);

    // Função para fechar o modal de realocar saldo
    const handleCloseModalRealocar = () => setShowModalRealocar(false);

    // Função para formatar valores no formato R$ brasileiro
    const formatCurrency = (value: string | number) => {
        const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d]/g, '')) : value;
        return numericValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    // Função para validar o valor digitado e aplicar a lógica de limite
    const handleValorChangeRetirada = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
    
        // Permitir apenas dígitos e uma vírgula
        if (/^[\d,.]*$/.test(inputValue)) {
            const numericValue = parseFloat(inputValue.replace(',', '.'));
            if (numericValue > disponivelRetirada) {
                setIsInvalidRetirada(true);
            } else {
                setIsInvalidRetirada(false);
            }
            setValorRetirada(inputValue);
        }
    };
    
    const handleValorBlurRetirada = () => {
        // Substitui a vírgula por ponto para cálculo e garante duas casas decimais
        const valorNumerico = parseFloat(valorRetirada.replace(',', '.'));
        if (!isNaN(valorNumerico) && valorNumerico > 0) {
            // Formata corretamente o valor com vírgula e dois decimais
            setValorRetirada(valorNumerico.toFixed(2).replace('.', ','));
        }
    };
    
    const handleValorChangeRealocar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
    
        // Permitir apenas dígitos e uma vírgula
        if (/^[\d,.]*$/.test(inputValue)) {
            const numericValue = parseFloat(inputValue.replace(',', '.'));
            if (numericValue > disponivelRetirada) {
                setIsInvalidRealocar(true);
            } else {
                setIsInvalidRealocar(false);
            }
            setValorRealocar(inputValue);
        }
    };
    
    const handleValorBlurRealocar = () => {
        // Substitui a vírgula por ponto para cálculo e garante duas casas decimais
        const valorNumerico = parseFloat(valorRealocar.replace(',', '.'));
        if (!isNaN(valorNumerico) && valorNumerico > 0) {
            // Formata corretamente o valor com vírgula e dois decimais
            setValorRealocar(valorNumerico.toFixed(2).replace('.', ','));
        }
    };
    
    

    const isFormValidRetirada = () => {
        const valorNumerico = typeof valorRetirada === 'string' ? parseFloat(valorRetirada.replace(/[^\d]/g, '')) : valorRetirada;
        return nomeTitular && chavePix && !isInvalidRetirada && valorNumerico > 0 && valorNumerico <= disponivelRetirada;
    };

    const isFormValidRealocar = () => {
        const valorNumerico = parseFloat(valorRealocar.replace(',', '.'));
        return !isNaN(valorNumerico) && valorNumerico > 0 && valorNumerico <= disponivelRetirada; // Verifica apenas se está dentro do limite
    };

    const handleInvalidSubmit = () => {
        setShowShakeNome(true);
        setShowShakePix(true);
        setTimeout(() => {
            setShowShakeNome(false);
            setShowShakePix(false);
        }, 300); // Remove a classe shake após 300ms
    };

    // Valida em tempo real os campos de texto
    const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeTitular(e.target.value);
        if (!e.target.value) setShowShakeNome(true);
    };

    const handlePixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChavePix(e.target.value);
        if (!e.target.value) setShowShakePix(true);
    };

    return (
        <>
            {/* Os quatro cards */}
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
                                onChange={handleNomeChange}
                                isInvalid={!nomeTitular && showShakeNome}
                                required
                                onBlur={() => setShowShakeNome(!nomeTitular)}
                            />
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="pix" className="mt-3">
                            <Form.Label>Chave Pix</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite a chave Pix"
                                value={chavePix}
                                onChange={handlePixChange}
                                isInvalid={!chavePix && showShakePix}
                                required
                                onBlur={() => setShowShakePix(!chavePix)}
                            />
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="valor" className="mt-3">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="text"
                                value={valorRetirada}
                                onChange={handleValorChangeRetirada}
                                onBlur={handleValorBlurRetirada}
                                isInvalid={isInvalidRetirada}
                                placeholder={`Digite o valor (Máximo: ${formatCurrency(disponivelRetirada)})`}
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
                        onClick={() => (isFormValidRetirada() ? handleCloseModalRetirada() : handleInvalidSubmit())}
                        disabled={!isFormValidRetirada()} // Desativa o botão se o formulário não for válido
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
                                type="text"
                                value={valorRealocar}
                                onChange={handleValorChangeRealocar}
                                onBlur={handleValorBlurRealocar}
                                isInvalid={isInvalidRealocar}
                                placeholder={`Digite o valor (Máximo: ${formatCurrency(disponivelRetirada)})`}
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
                        onClick={() => (isFormValidRealocar() ? handleCloseModalRealocar() : handleInvalidSubmit())}
                        disabled={!isFormValidRealocar()} // Desativa o botão apenas se o valor ultrapassar o limite
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
