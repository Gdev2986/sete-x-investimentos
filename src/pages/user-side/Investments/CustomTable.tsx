import React, { useEffect, useState, useRef } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';
import { getUserWithdrawals } from '../../../helpers/api/withdrawals';

// Define a tipagem dos dados de retirada
type Withdrawal = {
    id: number;
    dataSolicitacao: string;
    valorSolicitado: number;
    status: string;
    comprovante: string | null;
};

type CustomAdvancedTableProps = {
    user: {
        id: number;
    };
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
        Cell: ({ value }: any) => (
            <span>
                {value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })}
            </span>
        ),
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        className: 'text-center',
    },
    {
        Header: 'Comprovante',
        accessor: 'comprovante',
        sort: false,
        className: 'text-center',
        Cell: ({ row }: any) => (
            <a
                className={`btn btn-light btn-sm ${
                    !row.original.comprovante ? 'disabled' : ''
                }`}
                href={row.original.comprovante || '#'}
                download={row.original.comprovante ? 'comprovante.png' : ''}
                style={{
                    backgroundColor: row.original.comprovante ? '#41C56D' : '#d3d3d3',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                }}
            >
                <i
                    className="mdi mdi-cloud-download"
                    style={{ fontSize: '18px', marginRight: '5px', color: '#FFFFFF' }}
                ></i>
                {row.original.comprovante ? 'Baixar' : 'Indisponível'}
            </a>
        ),
    },
];

const sizePerPageList = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '25', value: 25 },
    { text: 'Todos', value: 100 },
];

const CustomAdvancedTable: React.FC<CustomAdvancedTableProps> = ({ user }) => {
    const [userWithdrawals, setUserWithdrawals] = useState<Withdrawal[]>([]);
    const intervalRef = useRef<number | null>(null);

    const formatWithdrawalData = (data: any[]): Withdrawal[] =>
        data.map((withdrawal) => ({
            id: withdrawal.id,
            dataSolicitacao: new Date(withdrawal.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
            valorSolicitado: withdrawal.amount,
            status:
                withdrawal.status === 'pending'
                    ? 'Pendente'
                    : withdrawal.status === 'approved'
                    ? 'Aprovado'
                    : 'Rejeitado',
            comprovante: withdrawal.receipt_path || null,
        }));

    const fetchUserWithdrawals = async () => {
        try {
            if (!user?.id) {
                console.log(user)
                console.error('Erro: ID do usuário não está disponível.');
                swal.fire('Erro', 'ID do usuário não está disponível.', 'error');
                return;
            }

            const response = await getUserWithdrawals(user.id);
            const formattedData = formatWithdrawalData(response);
            setUserWithdrawals(formattedData);
        } catch (error) {
            console.error('Erro ao buscar retiradas:', error);
            swal.fire('Erro', 'Não foi possível carregar as retiradas.', 'error');
        }
    };

    useEffect(() => {
        fetchUserWithdrawals();

        intervalRef.current = window.setInterval(() => {
            fetchUserWithdrawals();
        }, 5000000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [user?.id]);

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h4 className="header-title">Minhas Retiradas</h4>
                        <Table
                            columns={columns}
                            data={userWithdrawals}
                            pageSize={5}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            pagination={true}
                            isSelectable={false}
                            tableClass="text-center"
                        />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default CustomAdvancedTable;
