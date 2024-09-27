import React, { useState } from 'react';
import { Card, Col, Row, Modal, Button, Form } from 'react-bootstrap';
import Table from '../../../components/Table';
import AdmintoDatepicker from '../../../components/Datepicker'; // Importando o Datepicker
import { depositos } from '../../../helpers/data'; // Dados dos depósitos
import { user } from '../../../helpers/fake-backend'; // Dados do usuário logado
import Statistics from './Statistics'; // Dados dos widgets de estatísticas

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Data',
        accessor: 'data',
        sort: true,
    },
    {
        Header: 'Valor Depositado (R$)', // Exibe o valor depositado
        accessor: 'totalAlocado', // Isso mostra o valor depositado como o total alocado
        sort: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: ({ value }: any) => <span>{value}</span>, // Apenas texto para exibir o status
    },
];


const sizePerPageList = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '25', value: 25 },
    { text: 'Todos', value: depositos.length },
];

const UserDeposits = () => {
    // Pegando dados dos widgets de estatísticas
    const totalInvestido = 5000; // Pegue isso de StatisticsWidget1
    const totalCarteira = 6200;  // Pegue isso de StatisticsWidget2
    const rendimentoDisponivel = 1200; // Pegue isso de StatisticsWidget4

    const [userDeposits, setUserDeposits] = useState(depositos.filter((deposito) => deposito.nome === user.username));
    const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [depositValue, setDepositValue] = useState<number>(0); // Valor do depósito inserido

    // Função para alternar o estado de visibilidade do modal
    const toggleResponsiveModal = () => setResponsiveModal(!responsiveModal);

    // Função para atualizar a data selecionada
    const handleDateChange = (date: Date) => {
        if (date) setSelectedDate(date);
    };

    // Função para criar um novo depósito
    const handleCreateDeposit = () => {
        const newDeposit = {
            id: userDeposits.length + 1, // Gerando ID sequencial
            nome: `${user.firstName} ${user.lastName}`, // Nome completo do usuário
            contato: '+55 31 91234-5678', // Contato fictício
            totalAlocado: depositValue.toFixed(2), // Valor do depósito como total alocado
            saldoAtual: '0.00', // Como o depósito é novo, o saldo pode começar como '0.00'
            email: user.email, // Email do usuário
            status: 'Pendente', // Status inicial do depósito
            data: selectedDate.toISOString().split('T')[0], // Data do depósito no formato YYYY-MM-DD
        };
    
        // Atualiza a lista de depósitos do usuário
        setUserDeposits([...userDeposits, newDeposit]);
    
        // Fecha o modal após criar o depósito
        toggleResponsiveModal();
    };
    

    return (
        <>
            {/* Botão para abrir o modal */}
            <Button
                variant="success"
                className="waves-effect waves-light mb-3 d-flex align-items-center"
                style={{ borderRadius: '10px' }}
                onClick={toggleResponsiveModal}
            >
                <i
                    className="mdi mdi-close"
                    style={{ transform: `rotate(45deg)`, marginRight: '10px', transition: 'transform 0.3s ease' }}
                ></i>
                Novo Depósito
            </Button>

            {/* Modal de Novo Depósito */}
            <Modal show={responsiveModal} onHide={toggleResponsiveModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Adicione um Novo Depósito</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Data do Depósito</label> <br />
                        <AdmintoDatepicker hideAddon={true} value={selectedDate} onChange={handleDateChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deposit-value" className="form-label">
                            Valor do Depósito (R$)
                        </label>
                        <Form.Control
                            type="number"
                            id="deposit-value"
                            value={depositValue}
                            onChange={(e) => setDepositValue(parseFloat(e.target.value))}
                            placeholder="Insira o valor do depósito"
                            required
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleResponsiveModal}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="btn btn-info waves-effect waves-light"
                        style={{ backgroundColor: '#41C56D' }}
                        onClick={handleCreateDeposit}
                    >
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Tabela de Depósitos */}
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Meus Depósitos</h4>
                            <Table
                                columns={columns}
                                data={userDeposits}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default UserDeposits;
