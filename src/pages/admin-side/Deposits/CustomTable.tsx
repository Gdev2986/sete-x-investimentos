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
    const [depositsData, setDepositsData] = useState<Deposit[]>([]);
    const [originalDepositsData, setOriginalDepositsData] = useState<Deposit[]>([]);
    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

    // Função para buscar depósitos
    useEffect(() => {
        const fetchDeposits = async () => {
            try {
                const deposits = await getDeposits(); // Ajustado para não usar `.data`
                const formattedDeposits = deposits.map((deposit: any) => ({
                    id: deposit.id,
                    nome: deposit.nome,
                    valorDepositado: parseFloat(deposit.valorDepositado),
                    saldoAtual: parseFloat(deposit.saldoAtual),
                    dataDeposito: new Date(deposit.dataDeposito).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                    status: deposit.status,
                }));
                setDepositsData(formattedDeposits);
                setOriginalDepositsData(formattedDeposits);
            } catch (error) {
                swal.fire('Erro', 'Não foi possível carregar os depósitos.', 'error');
            }
        };

        fetchDeposits();
    }, []);

    // Função para atualizar o status de um depósito
    const handleStatusChange = (id: number, newStatus: string) => {
        const updatedDeposits = depositsData.map((deposit) =>
            deposit.id === id ? { ...deposit, status: newStatus } : deposit
        );
        setDepositsData(updatedDeposits);

        // Habilitar o botão Salvar se houver alterações
        const hasChanges = updatedDeposits.some(
            (deposit, index) => deposit.status !== originalDepositsData[index].status
        );
        setIsSaveButtonEnabled(hasChanges);
    };

    // Função para salvar alterações
    const handleSave = async () => {
        try {
            const updatedDeposits = await Promise.all(
                depositsData.map(async (deposit) => {
                    const original = originalDepositsData.find((u) => u.id === deposit.id);
                    if (original && deposit.status !== original.status) {
                        const response = await updateDeposit(deposit.id, { status: deposit.status });
                        return response; // Atualizado com os dados retornados da API
                    }
                    return deposit;
                })
            );

            setDepositsData(updatedDeposits);
            setOriginalDepositsData(updatedDeposits);
            setIsSaveButtonEnabled(false);
            swal.fire('Sucesso!', 'Os depósitos foram atualizados.', 'success');
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            swal.fire('Erro', 'Não foi possível salvar as alterações.', 'error');
        }
    };

    const columns = [
        { Header: 'ID', accessor: 'id', sort: true },
        { Header: 'Nome', accessor: 'nome', sort: true },
        {
            Header: 'Valor Depositado (R$)',
            accessor: 'valorDepositado',
            sort: true,
            Cell: ({ value }: any) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        },
        {
            Header: 'Saldo Atual (R$)',
            accessor: 'saldoAtual',
            sort: true,
            Cell: ({ value }: any) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        },
        { Header: 'Data do Depósito', accessor: 'dataDeposito', sort: true },
        {
            Header: 'Status',
            accessor: 'status',
            sort: false,
            Cell: ({ row }: any) => (
                <Form.Select
                    value={row.original.status}
                    onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
                >
                    <option value="pending">Pendente</option>
                    <option value="approved">Aprovado</option>
                    <option value="rejected">Rejeitado</option>
                </Form.Select>
            ),
        },
    ];

    const sizePerPageList = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: 'Todos', value: depositsData.length },
    ];

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h4 className="header-title">Gerenciar Depósitos</h4>
                        <Table
                            columns={columns}
                            data={depositsData}
                            pageSize={5}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            pagination={true}
                        />
                        <div className="d-flex justify-content-end mt-3">
                            <Button variant="success" onClick={handleSave} disabled={!isSaveButtonEnabled}>
                                Salvar Alterações
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default CustomAdvancedTable;
