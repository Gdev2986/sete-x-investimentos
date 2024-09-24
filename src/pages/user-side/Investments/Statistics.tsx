import React, { useState } from 'react';
import { Col, Row, Card, Dropdown, Modal, Button, Form } from 'react-bootstrap';

// Tipo de dados para os widgets
type StatisticsWidgetProps = {
    title: string;
    color: string;
    stats: number;
    subTitle: string;
};

// Widget 1 - Total Investido
const StatisticsWidget1 = ({ title, stats, subTitle }: StatisticsWidgetProps) => {
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-4">{title}</h4>
                <div className="widget-chart-1">
                    <div className="widget-detail-1 text-end">
                        <div className="d-flex align-items-center justify-content-between">
                            <i className="mdi mdi-cash-lock" style={{ fontSize: '40px', color: '#6c757d' }}></i>
                            <h2 className="fw-normal pt-2 mb-1">R${stats.toFixed(2)}</h2> {/* Exibir valor com "R$" */}
                        </div>
                        <p className="text-muted mb-1">{subTitle}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

// Widget 2 - Total Carteira
const StatisticsWidget2 = ({ title, stats, subTitle }: StatisticsWidgetProps) => {
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-4">{title}</h4>
                <div className="widget-chart-1">
                    <div className="widget-detail-1 text-end">
                        <div className="d-flex align-items-center justify-content-between">
                            <i className="mdi mdi-wallet-outline" style={{ fontSize: '40px', color: '#6c757d' }}></i>
                            <h2 className="fw-normal pt-2 mb-1">R${stats.toFixed(2)}</h2> {/* Exibir valor com "R$" */}
                        </div>
                        <p className="text-muted mb-1">{subTitle}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

// Widget 3 - Rendimento Médio
const StatisticsWidget3 = ({ title, stats, subTitle }: StatisticsWidgetProps) => {
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-4">{title}</h4>
                <div className="widget-chart-1">
                    <div className="widget-detail-1 text-end">
                        <div className="d-flex align-items-center justify-content-between">
                            <i className="mdi mdi-chart-timeline-variant" style={{ fontSize: '40px', color: '#6c757d' }}></i>
                            <h2 className="fw-normal pt-2 mb-1">{stats}%</h2> {/* Rendimento em percentual */}
                        </div>
                        <p className="text-muted mb-1">{subTitle}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

// Widget 4 - Disponível para Retirada
const StatisticsWidget4 = ({ title, stats, subTitle, handleRetiradaClick, handleRealocarSaldoClick }: StatisticsWidgetProps & { handleRetiradaClick: () => void, handleRealocarSaldoClick: () => void }) => {
    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleRetiradaClick}>Solicitar Retirada</Dropdown.Item> {/* Opção para Solicitar Retirada */}
                        <Dropdown.Item onClick={handleRealocarSaldoClick}>Realocar Saldo</Dropdown.Item> {/* Opção para Realocar Saldo */}
                    </Dropdown.Menu>
                </Dropdown>
                <h4 className="header-title mt-0 mb-4">{title}</h4>
                <div className="widget-chart-1">
                    <div className="widget-detail-1 text-end">
                        <div className="d-flex align-items-center justify-content-between">
                            <i className="mdi mdi-cash-multiple" style={{ fontSize: '40px', color: '#41c56d' }}></i>
                            <h2 className="fw-normal pt-2 mb-1" style={{ color: '#41c56d' }}>R${stats.toFixed(2)}</h2> {/* Exibir valor com "R$" */}
                        </div>
                        <p className="text-muted mb-1">{subTitle}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

const Statistics = () => {
    const totalInvestido = 5000; // Total investido como número
    const disponivelRetirada = 1200; // Valor disponível para retirada como número
    const totalCarteira = totalInvestido + disponivelRetirada; // Soma do total investido + disponível para retirada

    // Estado para controlar a abertura do modal de retirada
    const [showModalRetirada, setShowModalRetirada] = useState(false);

    // Estado para armazenar o valor digitado e a validação
    const [valor, setValor] = useState<number | string>(''); // Armazena o valor do input
    const [isInvalid, setIsInvalid] = useState(false); // Estado para controlar a validação visual

    // Função para abrir o modal de retirada
    const handleRetiradaClick = () => setShowModalRetirada(true);

    // Função para fechar o modal de retirada
    const handleCloseModalRetirada = () => setShowModalRetirada(false);

    // Função para a opção de Realocar Saldo (por enquanto, sem executar nada)
    const handleRealocarSaldoClick = () => {
        console.log('Função de Realocar Saldo ainda não implementada');
    };

    // Função para validar o valor digitado e aplicar a lógica de limite
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value); // Captura o valor do input como número

        // Verifica se o valor é maior que o disponível para retirada
        if (inputValue > disponivelRetirada) {
            setIsInvalid(true); // Exibe o alerta visual (campo vermelho)
        } else {
            setIsInvalid(false); // Remove o alerta se o valor for válido
        }

        setValor(inputValue); // Atualiza o valor digitado
    };

    return (
        <>
            <Row>
                <Col xl={3} md={6}>
                    <StatisticsWidget1
                        title="Total Investido"
                        stats={totalInvestido} // Valor como número
                        color={'#f05050'}
                        subTitle="Valor Alocado"
                    />
                </Col>
                <Col xl={3} md={6}>
                    <StatisticsWidget2
                        title="Total Carteira"
                        stats={totalCarteira} // Soma do total investido + disponível para retirada
                        color={'#f05050'}
                        subTitle="Todos os valores"
                    />
                </Col>
                <Col xl={3} md={6}>
                    <StatisticsWidget3
                        title="Rendimento Médio"
                        stats={2} // Rendimento em percentual
                        color={'#f05050'}
                        subTitle="Rendimento por dia útil"
                    />
                </Col>
                <Col xl={3} md={6}>
                    <StatisticsWidget4
                        title="Disponível para Retirada"
                        stats={disponivelRetirada} // Valor como número
                        color={'#41c56d'}
                        subTitle="Rendimento Disponível"
                        handleRetiradaClick={handleRetiradaClick} // Abertura do modal de retirada
                        handleRealocarSaldoClick={handleRealocarSaldoClick} // Função para Realocar Saldo
                    />
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
                            <Form.Control type="text" placeholder="Digite o nome completo do titular da conta" required />
                        </Form.Group>

                        <Form.Group controlId="pix" className="mt-3">
                            <Form.Label>Chave Pix</Form.Label>
                            <Form.Control type="text" placeholder="Digite a chave Pix" required />
                        </Form.Group>

                        <Form.Group controlId="valor" className="mt-3">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="number"
                                value={valor}
                                onChange={handleValorChange} // Chama a função de validação ao digitar
                                isInvalid={isInvalid} // Define o estado de erro visual
                                placeholder={`Digite o valor (Máximo: R$${disponivelRetirada.toFixed(2)})`}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                O valor máximo disponível é R${disponivelRetirada.toFixed(2)}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalRetirada}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleCloseModalRetirada}>
                        Confirmar Retirada
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Statistics;
