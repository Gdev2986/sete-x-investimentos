import React, { useState } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';
import { depositos } from '../../../helpers/data'; // Importando os dados

const CustomAdvancedTable = () => {
    const [usersData, setUsersData] = useState(depositos); // Usando os dados importados
    const [tempUsersData, setTempUsersData] = useState(depositos); // Dados temporários
    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false); // Estado para o botão "Salvar"

    // Função para lidar com a mudança de status
    const handleStatusChange = (id: number, newStatus: string) => {
        const updatedUsers = usersData.map((user) => {
            if (user.id === id) {
                return { ...user, status: newStatus };
            }
            return user;
        });
        setUsersData(updatedUsers);
        setIsSaveButtonEnabled(true); // Habilitar o botão "Salvar" após uma mudança
    };

    // Função para salvar as alterações
    const handleSave = () => {
        swal.fire({
            title: 'Tem Certeza?',
            text: "Uma notificação será enviada para o usuário.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Alterar Status',
        }).then((result) => {
            if (result.isConfirmed) {
                swal.fire('Alteração Realizada', 'Status alterado com sucesso! O cliente foi notificado.', 'success');
                setTempUsersData(usersData); // Atualiza os dados temporários para refletir o novo estado
                setIsSaveButtonEnabled(false); // Desabilitar o botão após salvar
            } else {
                setUsersData(tempUsersData); // Restaura os dados se o modal for cancelado
            }
        });
    };

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
            className: 'text-center',
            Cell: ({ value }: any) => <span style={{ whiteSpace: 'nowrap' }}>{value}</span>,
        },
        {
            Header: 'Nome',
            accessor: 'nome',
            sort: true,
            className: 'text-center',
        },
        {
            Header: 'Contato',
            accessor: 'contato',
            sort: false,
            className: 'text-center',
            Cell: ({ value }: any) => <span style={{ whiteSpace: 'nowrap', fontSize: '0.9rem' }}>{value}</span>,
        },
        {
            Header: 'Total Alocado (R$)',
            accessor: 'totalAlocado',
            sort: true,
            className: 'text-center',
        },
        {
            Header: 'Saldo Atual (R$)',
            accessor: 'saldoAtual',
            sort: true,
            className: 'text-center',
        },
        {
            Header: 'Data',
            accessor: 'data',
            sort: true,
            className: 'text-center',
            Cell: ({ value }: any) => <span style={{ whiteSpace: 'nowrap', fontSize: '0.9rem' }}>{value}</span>,
        },
        {
            Header: 'Email',
            accessor: 'email',
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
                    className="text-center"
                    style={{ marginRight: '1.5rem', fontSize: '0.9rem' }}
                >
                    <option value="Pendente">Pendente</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Cancelado">Cancelado</option>
                </Form.Select>
            ),
        },
        {
            Header: 'Enviar Comprovante',
            accessor: 'comprovante',
            sort: false,
            className: 'text-center',
            Cell: ({ row }: any) => (
                <Form.Group controlId={`file-upload-${row.original.id}`} className="d-flex align-items-center justify-content-center">
                    <label
                        htmlFor={`file-upload-${row.original.id}`}
                        className="btn btn-light btn-sm d-flex align-items-center"
                        style={{
                            backgroundColor: '#41C56D',
                            color: '#FFFFFF',
                            fontSize: '0.85rem',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <i
                            className="mdi mdi-cloud-upload"
                            style={{ fontSize: '18px', marginRight: '5px', color: '#FFFFFF' }}
                        ></i>
                        Arquivo
                    </label>
                    <Form.Control type="file" id={`file-upload-${row.original.id}`} style={{ display: 'none' }} />
                </Form.Group>
            ),
        },
    ];

    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '25',
            value: 25,
        },
        {
            text: 'Todos',
            value: usersData.length,
        },
    ];

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="header-title">Solicitações de Depósitos</h4>
                            </div>
                            <br />
                            <Table
                                columns={columns}
                                data={usersData}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={false}
                                tableClass="text-center"
                            />
                            <div className="d-flex justify-content-end mt-3">
                                <Button
                                    variant="success"
                                    onClick={handleSave}
                                    disabled={!isSaveButtonEnabled}
                                    style={{ justifyContent: 'flex-end' }}
                                >
                                    Salvar
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CustomAdvancedTable;
