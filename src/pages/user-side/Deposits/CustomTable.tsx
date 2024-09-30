import React, { useState } from 'react';
import { Card, Col, Row, Modal, Button, Form } from 'react-bootstrap';
import Table from '../../../components/Table';
import { depositos } from '../../../helpers/data'; // Dados dos depósitos
import { user } from '../../../helpers/fake-backend'; // Dados do usuário logado

// Definindo o tipo para os depósitos
type Deposit = {
    id: number;
    userId: number;
    nome: string;
    valorDepositado: number;
    saldoAtual: number;
    status: string;
    dataDeposito: string;
    comprovante: string;
    ultimaAtualizacao: string;
    observacoes: string;
};

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Data',
        accessor: 'dataDeposito', // Atualizado para refletir o nome correto do campo de data
        sort: true,
    },
    {
        Header: 'Valor Depositado (R$)', // Exibe o valor depositado
        accessor: 'valorDepositado', 
        sort: true,
        Cell: ({ value }: any) => formatCurrency(value), // Exibe o valor formatado corretamente
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: ({ value }: any) => <span>{value}</span>, // Apenas texto para exibir o status
    },
];

// Função para formatar valores no formato R$ brasileiro
const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

const sizePerPageList = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '25', value: 25 },
    { text: 'Todos', value: depositos.length },
];

const UserDeposits = () => {
    // Filtrando os depósitos pelo ID do usuário logado
    const userId = user.id; // Pegando o ID do usuário logado
    const [userDeposits, setUserDeposits] = useState<Deposit[]>(
        depositos.filter((deposito) => deposito.userId === userId)
    );

    const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
    const [depositValue, setDepositValue] = useState<string>(''); // Valor do depósito inserido
    const [isInvalid, setIsInvalid] = useState(false); // Verificação se o campo é inválido
    const [showShake, setShowShake] = useState(false); // Animação de erro ao campo ser inválido

    // Função para alternar o estado de visibilidade do modal
    const toggleResponsiveModal = () => setResponsiveModal(!responsiveModal);

    // Função para validar o valor digitado e aplicar a lógica de obrigatoriedade
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^\d.,]/g, ''); // Remove caracteres que não sejam números, ponto ou vírgula

        if (!inputValue || parseFloat(inputValue.replace(',', '.')) < 100) {
            setIsInvalid(true);
            setShowShake(true);
            setTimeout(() => setShowShake(false), 300); // Remove a classe shake após 300ms
        } else {
            setIsInvalid(false);
        }

        setDepositValue(inputValue); // Mantém o valor formatado no estado
    };

    // Função para converter string formatada para número antes de salvar no backend
    const parseToNumber = (value: string) => {
        return parseFloat(value.replace('.', '').replace(',', '.')); // Remove os pontos e substitui a vírgula por ponto
    };

    // Função para criar um novo depósito
    const handleCreateDeposit = () => {
        const valorNumerico = parseToNumber(depositValue);
        if (!valorNumerico || isInvalid || valorNumerico < 100) {
            setShowShake(true);
            setTimeout(() => setShowShake(false), 300);
            return; // Não permite salvar se o valor for inválido
        }

        const newDeposit: Deposit = {
            id: userDeposits.length + 1, // Gerando ID sequencial
            userId: userId, // Associando ao ID do usuário
            nome: `${user.firstName} ${user.lastName}`, // Nome completo do usuário
            valorDepositado: valorNumerico, // Valor do depósito como número
            saldoAtual: 0.00, 
            status: 'Pendente', // Status inicial do depósito
            dataDeposito: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
            comprovante: '', // Comprovante vazio inicialmente
            ultimaAtualizacao: new Date().toISOString().split('T')[0], // Última atualização com a data atual
            observacoes: '', // Observações vazias
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
                        disabled={!depositValue || isInvalid || parseToNumber(depositValue) < 100} // Desativa o botão se o valor for inválido ou menor que 100
                    >
                        Confirmar Depósito
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

export default UserDeposits;
