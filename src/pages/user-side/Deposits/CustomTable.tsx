import React, { useEffect, useState, useRef } from 'react';
import { Card, Col, Row, Modal, Button, Form } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';
import { getUserDeposits, createDeposit } from '../../../helpers/api/deposits';

type Deposit = {
    id: number;
    dataDeposito: string;
    valorDepositado: number;
    status: string;
};

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

const formatDate = (rawDate: string) => {
    const [datePart, timePart] = rawDate.split(', ');
    const [day, month, year] = datePart.split('/');
    const [hour, minute] = timePart.split(':');
    return `${day}/${month}/${year} ${hour}:${minute}`;
};

// Tradução do status
const formatStatus = (status: string) => {
    switch (status) {
        case 'approved':
            return 'Aprovado';
        case 'pending':
            return 'Pendente';
        case 'rejected':
            return 'Rejeitado';
        default:
            return status;
    }
};

const UserDeposits = () => {
    const [userDeposits, setUserDeposits] = useState<Deposit[]>([]);
    const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
    const [depositValue, setDepositValue] = useState<string>('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [showShake, setShowShake] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const toggleResponsiveModal = () => setResponsiveModal(!responsiveModal);

    // Busca os depósitos do usuário e sincroniza somente as mudanças
    const fetchUserDeposits = async () => {
        try {
            const response = await getUserDeposits();
            const rawData = response || [];
            if (Array.isArray(rawData)) {
                const formattedDeposits = rawData.map((deposit) => ({
                    id: deposit.id,
                    dataDeposito: formatDate(deposit.dataDeposito),
                    valorDepositado: deposit.valorDepositado,
                    status: formatStatus(deposit.status), // Aplica tradução
                }));

                // Sincroniza somente os depósitos alterados
                const hasChanges = formattedDeposits.some(
                    (newDeposit, index) => 
                        !userDeposits[index] || 
                        newDeposit.status !== userDeposits[index].status
                );

                if (hasChanges) {
                    setUserDeposits(formattedDeposits);
                }
            } else {
                setUserDeposits([]);
            }
        } catch (error) {
            swal.fire('Erro', 'Não foi possível carregar os depósitos.', 'error');
        }
    };

    useEffect(() => {
        // Primeira busca
        fetchUserDeposits();

        // Configura um intervalo para consulta constante
        intervalRef.current = window.setInterval(() => {
            fetchUserDeposits();
        }, 5000); // 5 segundos (ajustável)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d.,]/g, '');
        setDepositValue(value);
        setIsInvalid(parseFloat(value.replace(',', '.')) < 100);
    };

    const handleCreateDeposit = async () => {
        const valorNumerico = parseFloat(depositValue.replace(',', '.'));
        if (valorNumerico < 100) {
            setShowShake(true);
            setTimeout(() => setShowShake(false), 300);
            return;
        }
        try {
            await createDeposit({ amount: valorNumerico });
            swal.fire('Sucesso', 'Depósito criado com sucesso!', 'success');
            fetchUserDeposits();
            toggleResponsiveModal();
            setDepositValue('');
        } catch (error) {
            swal.fire('Erro', 'Falha ao criar depósito.', 'error');
        }
    };

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Data do Depósito',
            accessor: 'dataDeposito',
            sort: true,
        },
        {
            Header: 'Valor Depositado (R$)',
            accessor: 'valorDepositado',
            sort: true,
            Cell: ({ value }: any) => formatCurrency(value),
        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: true,
        },
    ];

    return (
        <>
            <Button variant="success" className="mb-3" onClick={toggleResponsiveModal}>
                Novo Depósito
            </Button>

            <Modal show={responsiveModal} onHide={toggleResponsiveModal}>
                <Modal.Header closeButton>
                    <h4>Adicione um Novo Depósito</h4>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        value={depositValue}
                        onChange={handleValorChange}
                        isInvalid={isInvalid}
                        placeholder="Insira o valor do depósito (mínimo R$100,00)"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        O valor mínimo para depósito é R$100,00
                    </Form.Control.Feedback>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleResponsiveModal}>
                        Cancelar
                    </Button>
                    <Button onClick={handleCreateDeposit} disabled={!depositValue || isInvalid}>
                        Confirmar Depósito
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4>Meus Depósitos</h4>
                            <Table
                                columns={columns}
                                data={userDeposits}
                                pageSize={5}
                                sizePerPageList={[{ text: '5', value: 5 }]}
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
