import React, { useState } from 'react';
import { Card, Col, Row, Modal, Button, Form } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';

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
        Header: 'Valor Solicitado (R$)',
        accessor: 'valorSolicitado',
        sort: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
    },
];

const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: 'Todos',
        value: 20, // Ajuste para refletir o número de dados disponíveis
    },
];

const UserWithdrawals = ({ saldoDisponivel }: { saldoDisponivel: number }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
    const [withdrawals, setWithdrawals] = useState<any[]>([]); // Simula dados de retiradas

    const toggleModal = () => {
        setModalOpen(!modalOpen);
        if (modalOpen) setWithdrawalAmount(0); // Reseta o valor ao fechar o modal
    };

    const handleWithdrawRequest = () => {
        if (withdrawalAmount > saldoDisponivel) {
            swal.fire('Erro', 'O valor solicitado excede o saldo disponível.', 'error');
            return;
        }

        // Simula a criação de uma nova solicitação de retirada
        const newWithdrawal = {
            id: withdrawals.length + 1,
            data: new Date().toLocaleDateString('pt-BR'),
            valorSolicitado: withdrawalAmount,
            status: 'Pendente',
        };

        setWithdrawals([...withdrawals, newWithdrawal]);
        toggleModal();

        swal.fire('Solicitação Enviada', 'Sua solicitação de retirada foi enviada com sucesso.', 'success');
    };

    return (
        <>
            {/* Botão para abrir o modal */}
            <Button
                variant="success"
                className="waves-effect waves-light mb-3"
                style={{ borderRadius: '10px' }}
                onClick={toggleModal}
            >
                Solicitar Retirada
            </Button>

            {/* Modal para solicitar retirada */}
            <Modal show={modalOpen} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Nova Solicitação de Retirada</h4>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Saldo Disponível: R$ {saldoDisponivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Insira o valor da retirada"
                            value={withdrawalAmount}
                            onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                            min="1"
                            max={saldoDisponivel}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Cancelar
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleWithdrawRequest}
                        disabled={withdrawalAmount <= 0 || withdrawalAmount > saldoDisponivel}
                    >
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Tabela de retiradas */}
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Histórico de Retiradas</h4>
                            <Table
                                columns={columns}
                                data={withdrawals}
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

export default UserWithdrawals;
