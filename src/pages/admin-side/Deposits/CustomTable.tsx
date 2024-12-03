import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';
import { getDeposits, updateDeposit } from '../../../helpers/api/deposits'; // Funções de API para o backend

const CustomAdvancedTable = () => {
    const [usersData, setUsersData] = useState([]); // Estado inicial para dados dos depósitos
    const [tempUsersData, setTempUsersData] = useState([]);
    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

    // Carregar dados do backend ao montar o componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDeposits();
                setUsersData(response.data); // Dados do backend
                setTempUsersData(response.data); // Estado temporário
            } catch (error) {
                swal.fire('Erro', 'Não foi possível carregar os dados.', 'error');
            }
        };

        fetchData();
    }, []);

    // Alterar status localmente
    const handleStatusChange = (id: number, newStatus: string) => {
        const updatedUsers = usersData.map((user) => {
            if (user.id === id) {
                return { ...user, status: newStatus };
            }
            return user;
        });
        setUsersData(updatedUsers);
        setIsSaveButtonEnabled(true); // Habilitar botão de salvar
    };

    // Salvar alterações no backend
    const handleSave = async () => {
        swal.fire({
            title: 'Confirmação',
            text: 'Deseja salvar as alterações? Uma notificação será enviada ao usuário.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Salvar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    for (const user of usersData) {
                        if (user.status !== tempUsersData.find((u) => u.id === user.id)?.status) {
                            await updateDeposit(user.id, { status: user.status }); // Atualização no backend
                        }
                    }
                    swal.fire('Sucesso', 'As alterações foram salvas.', 'success');
                    setTempUsersData(usersData); // Atualiza estado temporário
                    setIsSaveButtonEnabled(false); // Desabilita botão de salvar
                } catch (error) {
                    swal.fire('Erro', 'Falha ao salvar alterações.', 'error');
                }
            } else {
                setUsersData(tempUsersData); // Reverte alterações
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
            Cell: ({ value }: any) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        },
        {
            Header: 'Saldo Atual (R$)',
            accessor: 'saldoAtual',
            sort: true,
            className: 'text-center',
            Cell: ({ value }: any) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
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
