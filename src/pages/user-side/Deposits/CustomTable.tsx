import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Modal, Button, Form } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';
import { getUserDeposits, createDeposit } from '../../../helpers/api/deposits'; // Importando funções da API

// Definindo o tipo para os depósitos
type Deposit = {
    id: number;
    user_id: number;
    valorDepositado: number;
    saldoAtual: number;
    status: string;
    dataDeposito: string;
    comprovante?: string;
};

// Configurando as colunas da tabela
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

// Função para formatar valores no formato R$ brasileiro
const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

// Configuração do tamanho das páginas na tabela
const sizePerPageList = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '25', value: 25 },
    { text: 'Todos', value: 50 },
];

const UserDeposits = () => {
    const [userDeposits, setUserDeposits] = useState<Deposit[]>([]);
    const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
    const [depositValue, setDepositValue] = useState<string>('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [showShake, setShowShake] = useState(false);

    // Obtendo o ID do usuário dinamicamente
    const userId = localStorage.getItem('user_id') || sessionStorage.getItem('user_id'); // ID do usuário autenticado

    // Função para alternar o estado de visibilidade do modal
    const toggleResponsiveModal = () => setResponsiveModal(!responsiveModal);

    // Função para buscar os depósitos do backend
    const fetchUserDeposits = async () => {
        try {
            const response = await getUserDeposits(Number(userId)); // Chama a API
            setUserDeposits(response.data);
        } catch (error) {
            swal.fire('Erro', 'Não foi possível carregar os depósitos.', 'error');
        }
    };

    useEffect(() => {
        fetchUserDeposits();
    }, []);

    // Função para validar o valor digitado
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^\d.,]/g, '');
        if (!inputValue || parseFloat(inputValue.replace(',', '.')) < 100) {
            setIsInvalid(true);
            setShowShake(true);
            setTimeout(() => setShowShake(false), 300);
        } else {
            setIsInvalid(false);
        }
        setDepositValue(inputValue);
    };

    // Função para criar um novo depósito
    const handleCreateDeposit = async () => {
        const valorNumerico = parseFloat(depositValue.replace('.', '').replace(',', '.'));
        if (!valorNumerico || isInvalid || valorNumerico < 100) {
            setShowShake(true);
            setTimeout(() => setShowShake(false), 300);
            return;
        }

        const newDeposit = {
            user_id: Number(userId), // ID dinâmico do usuário
            valorDepositado: valorNumerico,
        };

        try {
            await createDeposit(newDeposit); // Chama a API para criar o depósito
            swal.fire('Sucesso', 'Depósito criado com sucesso!', 'success');
            fetchUserDeposits(); // Atualiza a lista após a criação
            toggleResponsiveModal();
        } catch (error) {
            swal.fire('Erro', 'Falha ao criar depósito.', 'error');
        }
    };

    return (
        <>
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

            <Modal show={responsiveModal} onHide={toggleResponsiveModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Adicione um Novo Depósito</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="deposit-value" className="form-label">
                            Valor do Depósito (R$)
                        </label>
                        <Form.Control
                            type="text"
                            id="deposit-value"
                            value={depositValue}
                            onChange={handleValorChange}
                            isInvalid={isInvalid}
                            placeholder="Insira o valor do depósito (mínimo R$100,00)"
                            className={showShake && isInvalid ? 'shake' : ''}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            O valor mínimo para depósito é R$100,00
                        </Form.Control.Feedback>
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
                        disabled={!depositValue || isInvalid || parseFloat(depositValue.replace(',', '.')) < 100}
                    >
                        Confirmar Depósito
                    </Button>
                </Modal.Footer>
            </Modal>

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
