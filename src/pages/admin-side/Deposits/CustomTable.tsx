import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';
import { getDeposits, updateDeposit } from '../../../helpers/api/deposits';

type Deposit = {
    id: number;
    nome: string;
    valorDepositado: number;
    saldoAtual: number;
    dataDeposito: string;
    status: string;
};

const CustomAdvancedTable = () => {
    const [usersData, setUsersData] = useState<Deposit[]>([]);
    const [tempUsersData, setTempUsersData] = useState<Deposit[]>([]);
    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDeposits();
                const data = response.data as Deposit[];
                // Ordenar pela dataDeposito do mais recente para o mais antigo, 
                // assumindo dataDeposito como string ISO ou algo compatível
                // Ajuste conforme o formato da data
                const sortedData = data.sort((a, b) => {
                    // Supondo data no formato "YYYY-MM-DD HH:mm:ss"
                    // Ajuste conforme seu formato
                    const dateA = new Date(a.dataDeposito).getTime();
                    const dateB = new Date(b.dataDeposito).getTime();
                    return dateB - dateA; // mais recente primeiro
                });

                setUsersData(sortedData);
                setTempUsersData(sortedData);
            } catch (error) {
                swal.fire('Erro', 'Não foi possível carregar os dados.', 'error');
            }
        };

        fetchData();
    }, []);

    const handleStatusChange = (id: number, newStatus: string) => {
        const updatedUsers = usersData.map((user) =>
            user.id === id ? { ...user, status: newStatus } : user
        );
        setUsersData(updatedUsers);

        // Se houve alteração no status de algum depósito, habilita o botão "Salvar"
        const hasChanges = updatedUsers.some((updated, i) => updated.status !== tempUsersData[i].status);
        setIsSaveButtonEnabled(hasChanges);
    };

    const handleSave = async () => {
        swal.fire({
            title: 'Tem Certeza?',
            text: 'Uma notificação será enviada ao usuário.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Alterar Status',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Atualizar apenas os depósitos cujo status mudou
                    for (const user of usersData) {
                        const original = tempUsersData.find((u) => u.id === user.id);
                        if (original && user.status !== original.status) {
                            await updateDeposit(user.id, { status: user.status });
                        }
                    }

                    swal.fire('Alteração Realizada!', 'Status alterado com sucesso, o cliente foi notificado.', 'success');
                    setTempUsersData(usersData);
                    setIsSaveButtonEnabled(false);
                } catch (error) {
                    swal.fire('Erro', 'Falha ao salvar alterações.', 'error');
                    // Em caso de erro ao salvar, restaura o estado anterior
                    setUsersData(tempUsersData);
                    setIsSaveButtonEnabled(false);
                }
            } else {
                // Se clicar em "Cancelar", restaura os dados antigos
                setUsersData(tempUsersData);
                setIsSaveButtonEnabled(false);
            }
        });
    };

    const columns = [
        { Header: 'ID', accessor: 'id', sort: true, className: 'text-center' },
        { Header: 'Nome', accessor: 'nome', sort: true, className: 'text-center' },
        {
            Header: 'Valor Depositado (R$)',
            accessor: 'valorDepositado',
            sort: true,
            className: 'text-center',
            Cell: ({ value }: any) => (value ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00'),
        },
        {
            Header: 'Saldo Atual (R$)',
            accessor: 'saldoAtual',
            sort: true,
            className: 'text-center',
            Cell: ({ value }: any) => (value ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00'),
        },
        { Header: 'Data do Depósito', accessor: 'dataDeposito', sort: true, className: 'text-center' },
        {
            Header: 'Status',
            accessor: 'status',
            sort: false,
            className: 'text-center',
            Cell: ({ row }: any) => (
                <Form.Select
                    value={row.original.status}
                    onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
                    className="text-center"
                >
                    <option value="Pendente">Pendente</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Cancelado">Cancelado</option>
                </Form.Select>
            ),
        },
    ];

    const sizePerPageList = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: 'Todos', value: usersData.length },
    ];

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h4 className="header-title">Solicitações de Depósitos</h4>
                        <Table
                            columns={columns}
                            data={usersData}
                            pageSize={5}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            pagination={true}
                        />
                        <div className="d-flex justify-content-end mt-3">
                            <Button variant="success" onClick={handleSave} disabled={!isSaveButtonEnabled}>
                                Salvar
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default CustomAdvancedTable;
