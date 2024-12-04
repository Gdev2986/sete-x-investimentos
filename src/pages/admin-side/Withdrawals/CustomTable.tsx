import React, { useState } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';
import { retiradas } from '../../../helpers/data'; // Importando corretamente as retiradas

// Definindo o tipo para os dados de retiradas
type Retirada = {
    id: number;
    userId: number;
    nome: string;
    valorSolicitado: number;
    valorDisponivel: number;
    status: string;
    dataSolicitacao: string;
    metodoPagamento: string;
    comprovante: string;
    ultimaAtualizacao: string;
    observacoes: string;
};

const CustomAdvancedTable = () => {
    const [usersData, setUsersData] = useState<Retirada[]>(retiradas); // Dados de retiradas
    const [tempUsersData, setTempUsersData] = useState<Retirada[]>(retiradas); // Backup dos dados originais
    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false); // Estado do botão "Salvar"

    // Lidar com a mudança de status
    const handleStatusChange = (id: number, newStatus: string) => {
        const updatedUsers = usersData.map((user) =>
            user.id === id ? { ...user, status: newStatus } : user
        );
        setUsersData(updatedUsers);
        setIsSaveButtonEnabled(true); // Habilitar botão após mudança
    };

    // Salvar as alterações confirmadas
    const handleSave = () => {
        swal.fire({
            title: 'Tem certeza?',
            text: 'Uma notificação será enviada ao usuário.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Alterar Status',
        }).then((result) => {
            if (result.isConfirmed) {
                swal.fire('Alteração Realizada!', 'Status atualizado com sucesso.', 'success');
                setTempUsersData(usersData); // Atualizar backup com os novos dados
                setIsSaveButtonEnabled(false); // Desativar botão após salvar
            } else {
                setUsersData(tempUsersData); // Restaurar backup se cancelado
            }
        });
    };

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
            className: 'text-center',
            Cell: ({ value }: any) => <span>{value}</span>,
        },
        {
            Header: 'Nome',
            accessor: 'nome',
            sort: true,
            className: 'text-center',
        },
        {
            Header: 'Valor Solicitado (R$)',
            accessor: 'valorSolicitado',
            sort: true,
            className: 'text-center',
            Cell: ({ value }: any) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        },
        {
            Header: 'Valor Disponível (R$)',
            accessor: 'valorDisponivel',
            sort: true,
            className: 'text-center',
            Cell: ({ value }: any) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        },
        {
            Header: 'Data de Solicitação',
            accessor: 'dataSolicitacao',
            sort: true,
            className: 'text-center',
        },
        {
            Header: 'Método de Pagamento',
            accessor: 'metodoPagamento',
            sort: false,
            className: 'text-center',
        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: false,
            className: 'text-center',
            Cell: ({ row }: any) => (
                <Form.Select
                    value={row.original.status}
                    onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
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
                        <h4 className="header-title">Solicitações de Retiradas</h4>
                        <Table
                            columns={columns}
                            data={usersData}
                            pageSize={5}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            pagination={true}
                        />
                        <div className="d-flex justify-content-end mt-3">
                            <Button
                                variant="success"
                                onClick={handleSave}
                                disabled={!isSaveButtonEnabled}
                            >
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
