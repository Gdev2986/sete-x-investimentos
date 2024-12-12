import React, { useEffect, useState, useRef } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';
import { getUserWithdrawals } from '../../../helpers/api/withdrawals';

type Withdrawal = {
    id: number;
    dataSolicitacao: string;
    valorSolicitado: number;
    status: string;
    comprovante: string | null;
};

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

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

const columns = [
    {
        Header: 'Data',
        accessor: 'dataSolicitacao',
        sort: true,
        className: 'text-center',
    },
    {
        Header: 'Valor Solicitado (R$)',
        accessor: 'valorSolicitado',
        sort: true,
        className: 'text-center',
        Cell: ({ value }: any) => <span>{formatCurrency(value)}</span>,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        className: 'text-center',
        Cell: ({ value }: any) => <span>{formatStatus(value)}</span>,
    },
    {
        Header: 'Comprovante',
        accessor: 'comprovante',
        sort: false,
        className: 'text-center',
        Cell: ({ row }: any) => (
            <a
                className={`btn btn-light btn-sm ${!row.original.comprovante ? 'disabled' : ''}`}
                href={row.original.comprovante || '#'}
                download={row.original.comprovante ? 'comprovante.png' : ''}
                style={{
                    backgroundColor: row.original.comprovante ? '#41C56D' : '#d3d3d3',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                }}
            >
                <i className="mdi mdi-cloud-download" style={{ fontSize: '18px', marginRight: '5px' }}></i>
                {row.original.comprovante ? 'Baixar' : 'Indisponível'}
            </a>
        ),
    },
];

const CustomAdvancedTable: React.FC = () => {
    const [userWithdrawals, setUserWithdrawals] = useState<Withdrawal[]>([]);
    const intervalRef = useRef<number | null>(null);

    const fetchUserWithdrawals = async () => {
        try {
            const response = await getUserWithdrawals();
            if (Array.isArray(response)) {
                const formattedData = response.map((withdrawal) => ({
                    id: withdrawal.id,
                    dataSolicitacao: new Date(withdrawal.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }),
                    valorSolicitado: withdrawal.amount,
                    status: withdrawal.status,
                    comprovante: withdrawal.receipt_path || null,
                }));
                setUserWithdrawals(formattedData);
            } else {
                setUserWithdrawals([]);
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchUserWithdrawals();

        intervalRef.current = window.setInterval(() => {
            fetchUserWithdrawals();
        }, 10000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h4 className="header-title">Historico de Rendimentos</h4>
                        <Table
                            columns={columns}
                            data={userWithdrawals}
                            pageSize={5}
                            sizePerPageList={[{ text: '5', value: 5 }]}
                            isSortable={true}
                            pagination={true}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default CustomAdvancedTable;
