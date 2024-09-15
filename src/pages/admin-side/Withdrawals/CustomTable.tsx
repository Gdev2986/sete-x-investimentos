import React, { useState } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';

// Lista de usuários fictícios
const initialUsersData = [
    { id: 1, nome: 'Gabriel Campos', contato: '+55 31 91234-5678', totalAlocado: '7356.45', saldoAtual: '147.13', email: 'gabriel.campos@exemplo.com', status: 'Pendente' },
    { id: 2, nome: 'Ana Silva', contato: '+55 31 92345-6789', totalAlocado: '8123.87', saldoAtual: '162.48', email: 'ana.silva@exemplo.com', status: 'Pendente' },
    { id: 3, nome: 'Carlos Souza', contato: '+55 31 93456-7890', totalAlocado: '9512.23', saldoAtual: '190.24', email: 'carlos.souza@exemplo.com', status: 'Aprovado' },
    { id: 4, nome: 'Mariana Oliveira', contato: '+55 31 94567-8901', totalAlocado: '6920.54', saldoAtual: '138.41', email: 'mariana.oliveira@exemplo.com', status: 'Pendente' },
    { id: 5, nome: 'Lucas Pereira', contato: '+55 31 95678-9012', totalAlocado: '8321.78', saldoAtual: '166.44', email: 'lucas.pereira@exemplo.com', status: 'Cancelado' },
    { id: 6, nome: 'Julia Fernandes', contato: '+55 31 91234-5679', totalAlocado: '7845.22', saldoAtual: '154.22', email: 'julia.fernandes@exemplo.com', status: 'Pendente' },
    { id: 7, nome: 'Fernando Almeida', contato: '+55 31 92345-6780', totalAlocado: '8521.33', saldoAtual: '177.21', email: 'fernando.almeida@exemplo.com', status: 'Pendente' },
    { id: 8, nome: 'Patricia Costa', contato: '+55 31 93456-7891', totalAlocado: '9123.00', saldoAtual: '193.15', email: 'patricia.costa@exemplo.com', status: 'Aprovado' },
    { id: 9, nome: 'Thiago Silva', contato: '+55 31 94567-8902', totalAlocado: '6354.45', saldoAtual: '142.33', email: 'thiago.silva@exemplo.com', status: 'Pendente' },
    { id: 10, nome: 'Renata Lima', contato: '+55 31 95678-9013', totalAlocado: '8233.99', saldoAtual: '168.75', email: 'renata.lima@exemplo.com', status: 'Cancelado' },
];

const CustomAdvancedTable = () => {
    const [usersData, setUsersData] = useState(initialUsersData);
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
                // Realizar as operações de salvamento aqui
                swal.fire('Alteração Realizada', 'Status alterado com sucesso! O cliente foi notificado.', 'success');
                setIsSaveButtonEnabled(false); // Desabilitar o botão após salvar
            }
        });
    };

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Nome',
            accessor: 'nome',
            sort: true,
        },
        {
            Header: 'Contato',
            accessor: 'contato',
            sort: false,
        },
        {
            Header: 'Total Alocado (R$)',
            accessor: 'totalAlocado',
            sort: true,
        },
        {
            Header: 'Saldo Atual (R$)',
            accessor: 'saldoAtual',
            sort: true,
        },
        {
            Header: 'Email',
            accessor: 'email',
            sort: false,
        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: false,
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
        {
            Header: 'Enviar Comprovante',  // Coluna para o input de arquivo
            accessor: 'comprovante',
            sort: false,
            Cell: ({ row }: any) => (  // Renderiza um input de arquivo para cada linha
                <Form.Group controlId={`file-upload-${row.original.id}`} className="d-flex align-items-center">
                    <label
                        htmlFor={`file-upload-${row.original.id}`}
                        className="btn btn-light btn-sm d-flex align-items-center"
                        style={{
                            backgroundColor: '#41C56D',
                            color: '#FFFFFF', // Cor do texto branco
                        }}
                    >
                        <i
                            className="mdi mdi-cloud-upload"
                            style={{ fontSize: '18px', marginRight: '5px', color: '#FFFFFF' }} // Cor do ícone branco
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
            {/* Tabela de Solicitações de Retiradas */}
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="header-title">Solicitações de Retiradas</h4>
                            </div>
                            <br />
                            <Table
                                columns={columns}
                                data={usersData}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={false} // Remover o seletor
                            />
                            <Button
                                variant="success"
                                onClick={handleSave}
                                disabled={!isSaveButtonEnabled}
                                className="mt-3"
                            >
                                Salvar
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CustomAdvancedTable;
