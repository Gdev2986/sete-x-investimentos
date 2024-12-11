import React, { useState, useEffect, useRef } from 'react';
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
    const [depositsData, setDepositsData] = useState<Deposit[]>([]);
    const [originalDepositsData, setOriginalDepositsData] = useState<Deposit[]>([]);
    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
    const intervalRef = useRef<number | null>(null);

    // Busca os depósitos do banco
    const fetchDeposits = async () => {
        try {
            const deposits = await getDeposits();
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
                status: deposit.status, // Mantém o status original para comunicação com o backend
            }));

            setDepositsData(formattedDeposits);
            setOriginalDepositsData(formattedDeposits);
        } catch (error) {
            swal.fire('Erro', 'Não foi possível carregar os depósitos.', 'error');
        }
    };

    useEffect(() => {
        // Primeira busca
        fetchDeposits();

        // Configura um intervalo para consulta constante
        intervalRef.current = window.setInterval(() => {
            fetchDeposits();
        }, 10000); // 5 segundos (ajustável)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Atualiza o status localmente
    const handleStatusChange = (id: number, newStatus: string) => {
        const updatedDeposits = depositsData.map((deposit) =>
            deposit.id === id ? { ...deposit, status: newStatus } : deposit
        );
        setDepositsData(updatedDeposits);
        setIsSaveButtonEnabled(true); // Habilita o botão de salvar
    };

    // Função para exibir o modal de confirmação
    const showConfirmationModal = (onConfirm: () => void) => {
        swal.fire({
            title: 'Tem certeza?',
            text: 'O usuário será notificado sobre as alterações.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm();
            }
        });
    };

    // Salva as alterações e sincroniza com o banco
    const handleSave = () => {
        showConfirmationModal(async () => {
            try {
                const updatedDeposits = await Promise.all(
                    depositsData.map(async (deposit) => {
                        const original = originalDepositsData.find((u) => u.id === deposit.id);
                        if (original && deposit.status !== original.status) {
                            const response = await updateDeposit(deposit.id, {
                                status: revertStatusTranslation(deposit.status), // Reverte a tradução para o backend
                            });
                            return {
                                ...deposit,
                                status: response.status, // Atualiza com o status do banco
                            };
                        }
                        return deposit;
                    })
                );

                setDepositsData(updatedDeposits); // Atualiza os dados locais
                setOriginalDepositsData(updatedDeposits); // Sincroniza os dados originais
                setIsSaveButtonEnabled(false); // Desabilita o botão de salvar
                swal.fire('Sucesso!', 'Os depósitos foram atualizados.', 'success');
            } catch (error) {
                console.error('Erro ao salvar alterações:', error);
                swal.fire('Erro', 'Não foi possível salvar as alterações.', 'error');
            }
        });
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
                    value={translateStatus(row.original.status)} // Mostra o status traduzido
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
