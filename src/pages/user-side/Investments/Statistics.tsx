import React, { useState, useEffect } from 'react';
import { Card, Col, Dropdown, Row, Button, Modal, Form } from 'react-bootstrap';
import swal from 'sweetalert2';
import { createWithdrawal } from '../../../helpers/api/withdrawals';
import { updateUserBalance, getUserById } from '../../../helpers/api/users';

const Statistics = ({ user }: { user?: { total_allocated: number; balance: number; id: number } }) => {
    const [totalInvestido, setTotalInvestido] = useState(0);
    const [saldoDisponivel, setSaldoDisponivel] = useState(0);
    const [totalCarteira, setTotalCarteira] = useState(0);
    const [userId, setUserId] = useState<number | null>(null);

    const [showModalRetirada, setShowModalRetirada] = useState(false);
    const [showModalRealocar, setShowModalRealocar] = useState(false);
    const [valorRetirada, setValorRetirada] = useState<string>('');
    const [valorRealocar, setValorRealocar] = useState<string>('');
    const [nomeTitular, setNomeTitular] = useState('');
    const [chavePix, setChavePix] = useState('');
    const [isInvalidRetirada, setIsInvalidRetirada] = useState(false);
    const [isInvalidRealocar, setIsInvalidRealocar] = useState(false);

    useEffect(() => {
        if (user) {
            setUserId(user.id);
            setTotalInvestido(user.total_allocated);
            setSaldoDisponivel(user.balance);
        } else {
            const fetchUser = async () => {
                try {
                    const userIdFromSession = 1; // ID do usuário (ex.: do contexto ou sessão)
                    const response = await getUserById(userIdFromSession);
                    const userData = response.data;
                    setUserId(userData.id);
                    setTotalInvestido(userData.total_allocated);
                    setSaldoDisponivel(userData.balance);
                } catch (error) {
                    swal.fire('Erro', 'Não foi possível carregar os dados do usuário.', 'error');
                }
            };
            fetchUser();
        }
    }, [user]);

    useEffect(() => {
        setTotalCarteira(totalInvestido + saldoDisponivel);
    }, [totalInvestido, saldoDisponivel]);

    const handleRetiradaClick = () => setShowModalRetirada(true);
    const handleCloseModalRetirada = () => setShowModalRetirada(false);

    const handleRealocarSaldoClick = () => setShowModalRealocar(true);
    const handleCloseModalRealocar = () => setShowModalRealocar(false);

    const handleValorChangeRetirada = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(',', '.');
        const numericValue = parseFloat(inputValue);
        if (isNaN(numericValue) || numericValue > saldoDisponivel) {
            setIsInvalidRetirada(true);
        } else {
            setIsInvalidRetirada(false);
        }
        setValorRetirada(e.target.value);
    };

    const handleValorChangeRealocar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(',', '.');
        const numericValue = parseFloat(inputValue);
        if (isNaN(numericValue) || numericValue > saldoDisponivel) {
            setIsInvalidRealocar(true);
        } else {
            setIsInvalidRealocar(false);
        }
        setValorRealocar(e.target.value);
    };

    const handleSubmitRetirada = async () => {
        try {
            await createWithdrawal({
                amount: parseFloat(valorRetirada),
                pix_key: chavePix,
                name_account_withdrawal: nomeTitular,
            });
            setSaldoDisponivel(saldoDisponivel - parseFloat(valorRetirada));
            swal.fire('Sucesso', 'Solicitação de retirada enviada com sucesso!', 'success');
            handleCloseModalRetirada();
        } catch (error) {
            swal.fire('Erro', 'Não foi possível enviar a solicitação de retirada.', 'error');
        }
    };

    const handleSubmitRealocar = async () => {
        try {
            const valorRealocarNumerico = parseFloat(valorRealocar);
            if (userId) {
                await updateUserBalance(userId, {
                    balance: saldoDisponivel - valorRealocarNumerico,
                    total_allocated: totalInvestido + valorRealocarNumerico,
                });
                setSaldoDisponivel(saldoDisponivel - valorRealocarNumerico);
                setTotalInvestido(totalInvestido + valorRealocarNumerico);
                swal.fire('Sucesso', 'Saldo realocado com sucesso!', 'success');
                handleCloseModalRealocar();
            }
        } catch (error) {
            swal.fire('Erro', 'Não foi possível realocar o saldo.', 'error');
        }
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
                            <h2 className="fw-normal pt-2 mb-1">
                                {totalInvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h2>
                        </div>
                        <p className="text-muted mb-1">Valor Total Alocado</p>
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
                            <h2 className="fw-normal pt-2 mb-1">
                                {totalCarteira.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h2>
                        </div>
                        <p className="text-muted mb-1">Carteira Total</p>
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
                        <p className="text-muted mb-1">Rendimento por Dia Útil</p>
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
                                {saldoDisponivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h2>
                        </div>
                        <p className="text-muted mb-1">Saldo Disponível</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </Col>
</Row>


            {/* Implementação dos Modais permanece a mesma */}
        </>
    );
};

export default Statistics;
