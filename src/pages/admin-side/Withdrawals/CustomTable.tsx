import React, { useState, useEffect, useRef } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';
import { getAllWithdrawals, updateWithdrawal } from '../../../helpers/api/withdrawals';
import { getUsers } from '../../../helpers/api/users';

type Withdrawal = {
    id: number;
    titularConta: string;
    nomeUsuario: string;
    saldoUsuario: number;
    valorSolicitado: number;
    dataSolicitacao: string;
    status: string;
    metodoPagamento: string;
};

const translateStatus = (status: string): string => {
    switch (status) {
        case 'pending':
            return 'Pendente';
        case 'approved':
            return 'Aprovado';
        case 'rejected':
            return 'Rejeitado';
        default:
            return status;
    }
};

const revertStatusTranslation = (translatedStatus: string): string => {
    switch (translatedStatus) {
        case 'Pendente':
            return 'pending';
        case 'Aprovado':
            return 'approved';
        case 'Rejeitado':
            return 'rejected';
        default:
            return translatedStatus;
    }
};

const CustomAdvancedTable = () => {
    const [withdrawalsData, setWithdrawalsData] = useState<Withdrawal[]>([]);
    const [originalWithdrawalsData, setOriginalWithdrawalsData] = useState<Withdrawal[]>([]);
    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
    const intervalRef = useRef<number | null>(null);

    // Combina dados de usuários e retiradas
    const fetchWithdrawalsWithUsers = async () => {
        try {
            const [usersResponse, withdrawalsResponse] = await Promise.all([
                getUsers(),
                getAllWithdrawals(),
            ]);

            const users = usersResponse.data || [];
            console.log('Data user', usersResponse)
            const userMap = users.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {} as Record<number, { name: string; balance: number }>);

            const withdrawals = withdrawalsResponse.map((withdrawal: any) => {
                const user = userMap[withdrawal.user_id] || {};
                return {
                    id: withdrawal.id || 0,
                    titularConta: withdrawal.name_account_withdrawal || 'Não Informado',
                    nomeUsuario: user.username || 'Usuário Desconhecido',
                    saldoUsuario: user.saldoAtual || 0,
                    valorSolicitado: parseFloat(withdrawal.amount) || 0,
                    dataSolicitacao: withdrawal.created_at
                        ? new Date(withdrawal.created_at).toLocaleString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                          })
                        : 'Data Inválida',
                    status: withdrawal.status || 'pending',
                    metodoPagamento: withdrawal.pix_key || 'Não Informado',
                };
            });

            setWithdrawalsData(withdrawals);
            setOriginalWithdrawalsData(withdrawals);
        } catch (error) {
            console.error('Erro ao buscar retiradas e usuários:', error);
            swal.fire('Erro', 'Não foi possível carregar as retiradas e usuários.', 'error');
        }
    };

    useEffect(() => {
        fetchWithdrawalsWithUsers();

        // Atualização periódica
        intervalRef.current = window.setInterval(() => {
            fetchWithdrawalsWithUsers();
        }, 10000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleStatusChange = (id: number, newStatus: string) => {
        const updatedWithdrawals = withdrawalsData.map((withdrawal) =>
            withdrawal.id === id ? { ...withdrawal, status: newStatus } : withdrawal
        );
        setWithdrawalsData(updatedWithdrawals);
        setIsSaveButtonEnabled(true);
    };

    const handleSave = () => {
        swal.fire({
            title: 'Tem certeza?',
            text: 'O usuário será notificado sobre as alterações.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, confirmar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                const saveChanges = async () => {
                    try {
                        const updatedWithdrawals = await Promise.all(
                            withdrawalsData.map(async (withdrawal) => {
                                const original = originalWithdrawalsData.find((u) => u.id === withdrawal.id);
                                if (original && withdrawal.status !== original.status) {
                                    const response = await updateWithdrawal(withdrawal.id, {
                                        status: revertStatusTranslation(withdrawal.status),
                                    });
                                    return { ...withdrawal, status: response.status };
                                }
                                return withdrawal;
                            })
                        );

                        setWithdrawalsData(updatedWithdrawals);
                        setOriginalWithdrawalsData(updatedWithdrawals);
                        setIsSaveButtonEnabled(false);
                        swal.fire('Sucesso!', 'As retiradas foram atualizadas.', 'success');
                    } catch (error) {
                        console.error('Erro ao salvar alterações:', error);
                        swal.fire('Erro', 'Não foi possível salvar as alterações.', 'error');
                    }
                };

                saveChanges();
            }
        });
    };

    const columns = [
        { Header: 'ID', accessor: 'id', sort: true },
        { Header: 'Titular da Conta', accessor: 'titularConta', sort: true },
        { Header: 'Nome do Usuário', accessor: 'nomeUsuario', sort: true },
        {
            Header: 'Saldo (R$)',
            accessor: 'saldoUsuario',
            sort: true,
            Cell: ({ value }: any) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        },
        {
            Header: 'Valor Solicitado (R$)',
            accessor: 'valorSolicitado',
            sort: true,
            Cell: ({ value }: any) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        },
        { Header: 'Data de Solicitação', accessor: 'dataSolicitacao', sort: true },
        { Header: 'Método de Pagamento', accessor: 'metodoPagamento', sort: false },
        {
            Header: 'Status',
            accessor: 'status',
            sort: false,
            Cell: ({ row }: any) => (
                <Form.Select
                    value={translateStatus(row.original.status)}
                    onChange={(e) => handleStatusChange(row.original.id, revertStatusTranslation(e.target.value))}
                >
                    <option value="Pendente">{translateStatus('pending')}</option>
                    <option value="Aprovado">{translateStatus('approved')}</option>
                    <option value="Rejeitado">{translateStatus('rejected')}</option>
                </Form.Select>
            ),
        },
    ];

    const sizePerPageList = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: 'Todos', value: withdrawalsData.length },
    ];

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h4 className="header-title">Gerenciar Retiradas</h4>
                        <Table
                            columns={columns}
                            data={withdrawalsData}
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
