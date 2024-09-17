import React, { useState } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';

// Lista de usuários fictícios
const initialUsersData = [
    { id: 1, nome: 'Gabriel Campos', contato: '+55 31 91234-5678', totalAlocado: '7356.45', saldoAtual: '147.13', email: 'gabriel.campos@exemplo.com', status: 'Pendente', data: '2023-09-10' },
    { id: 2, nome: 'Ana Silva', contato: '+55 31 92345-6789', totalAlocado: '8123.87', saldoAtual: '162.48', email: 'ana.silva@exemplo.com', status: 'Pendente', data: '2023-09-12' },
    { id: 3, nome: 'Carlos Souza', contato: '+55 31 93456-7890', totalAlocado: '9512.23', saldoAtual: '190.24', email: 'carlos.souza@exemplo.com', status: 'Aprovado', data: '2023-09-11' },
    { id: 4, nome: 'Mariana Oliveira', contato: '+55 31 94567-8901', totalAlocado: '6920.54', saldoAtual: '138.41', email: 'mariana.oliveira@exemplo.com', status: 'Pendente', data: '2023-09-13' },
    { id: 5, nome: 'Lucas Pereira', contato: '+55 31 95678-9012', totalAlocado: '8321.78', saldoAtual: '166.44', email: 'lucas.pereira@exemplo.com', status: 'Cancelado', data: '2023-09-08' },
    { id: 6, nome: 'Julia Fernandes', contato: '+55 31 91234-5679', totalAlocado: '7845.22', saldoAtual: '154.22', email: 'julia.fernandes@exemplo.com', status: 'Pendente', data: '2023-09-14' },
    { id: 7, nome: 'Fernando Almeida', contato: '+55 31 92345-6780', totalAlocado: '8521.33', saldoAtual: '177.21', email: 'fernando.almeida@exemplo.com', status: 'Pendente', data: '2023-09-07' },
    { id: 8, nome: 'Patricia Costa', contato: '+55 31 93456-7891', totalAlocado: '9123.00', saldoAtual: '193.15', email: 'patricia.costa@exemplo.com', status: 'Aprovado', data: '2023-09-06' },
    { id: 9, nome: 'Thiago Silva', contato: '+55 31 94567-8902', totalAlocado: '6354.45', saldoAtual: '142.33', email: 'thiago.silva@exemplo.com', status: 'Pendente', data: '2023-09-05' },
    { id: 10, nome: 'Renata Lima', contato: '+55 31 95678-9013', totalAlocado: '8233.99', saldoAtual: '168.75', email: 'renata.lima@exemplo.com', status: 'Cancelado', data: '2023-09-04' },
    { id: 11, nome: 'Ricardo Carvalho', contato: '+55 31 91234-5680', totalAlocado: '7012.34', saldoAtual: '147.01', email: 'ricardo.carvalho@exemplo.com', status: 'Pendente', data: '2023-09-15' },
    { id: 12, nome: 'Sandra Rocha', contato: '+55 31 92345-6781', totalAlocado: '8129.50', saldoAtual: '162.98', email: 'sandra.rocha@exemplo.com', status: 'Aprovado', data: '2023-09-03' },
    { id: 13, nome: 'Eduardo Ribeiro', contato: '+55 31 93456-7892', totalAlocado: '9456.78', saldoAtual: '189.23', email: 'eduardo.ribeiro@exemplo.com', status: 'Pendente', data: '2023-09-16' },
    { id: 14, nome: 'Camila Martins', contato: '+55 31 94567-8903', totalAlocado: '6890.45', saldoAtual: '136.78', email: 'camila.martins@exemplo.com', status: 'Cancelado', data: '2023-09-02' },
    { id: 15, nome: 'Marcelo Araújo', contato: '+55 31 95678-9014', totalAlocado: '8235.12', saldoAtual: '168.99', email: 'marcelo.araujo@exemplo.com', status: 'Aprovado', data: '2023-09-01' },
    { id: 16, nome: 'Bruna Lopes', contato: '+55 31 91234-5681', totalAlocado: '7756.89', saldoAtual: '151.12', email: 'bruna.lopes@exemplo.com', status: 'Pendente', data: '2023-09-17' },
    { id: 17, nome: 'Felipe Nascimento', contato: '+55 31 92345-6782', totalAlocado: '8127.34', saldoAtual: '162.75', email: 'felipe.nascimento@exemplo.com', status: 'Pendente', data: '2023-09-18' },
    { id: 18, nome: 'Aline Farias', contato: '+55 31 93456-7893', totalAlocado: '9056.32', saldoAtual: '192.05', email: 'aline.farias@exemplo.com', status: 'Aprovado', data: '2023-09-19' },
    { id: 19, nome: 'Gustavo Santos', contato: '+55 31 94567-8904', totalAlocado: '6345.89', saldoAtual: '140.99', email: 'gustavo.santos@exemplo.com', status: 'Pendente', data: '2023-09-20' },
    { id: 20, nome: 'Isabela Dias', contato: '+55 31 95678-9015', totalAlocado: '8421.78', saldoAtual: '171.55', email: 'isabela.dias@exemplo.com', status: 'Cancelado', data: '2023-09-21' },
    { id: 21, nome: 'Rodrigo Mendes', contato: '+55 31 91234-5682', totalAlocado: '7018.45', saldoAtual: '148.23', email: 'rodrigo.mendes@exemplo.com', status: 'Aprovado', data: '2023-09-22' },
    { id: 22, nome: 'Larissa Teixeira', contato: '+55 31 92345-6783', totalAlocado: '8290.12', saldoAtual: '167.89', email: 'larissa.teixeira@exemplo.com', status: 'Pendente', data: '2023-09-23' },
    { id: 23, nome: 'André Macedo', contato: '+55 31 93456-7894', totalAlocado: '9156.44', saldoAtual: '194.32', email: 'andre.macedo@exemplo.com', status: 'Aprovado', data: '2023-09-24' },
    { id: 24, nome: 'Vanessa Souza', contato: '+55 31 94567-8905', totalAlocado: '6401.23', saldoAtual: '141.45', email: 'vanessa.souza@exemplo.com', status: 'Cancelado', data: '2023-09-25' },
    { id: 25, nome: 'Fabio Lopes', contato: '+55 31 95678-9016', totalAlocado: '8573.67', saldoAtual: '174.12', email: 'fabio.lopes@exemplo.com', status: 'Pendente', data: '2023-09-26' },
    { id: 26, nome: 'Helena Duarte', contato: '+55 31 91234-5683', totalAlocado: '7190.56', saldoAtual: '149.76', email: 'helena.duarte@exemplo.com', status: 'Aprovado', data: '2023-09-27' },
    { id: 27, nome: 'Roberto Braga', contato: '+55 31 92345-6784', totalAlocado: '8356.78', saldoAtual: '170.89', email: 'roberto.braga@exemplo.com', status: 'Pendente', data: '2023-09-28' },
    { id: 28, nome: 'Tatiane Ribeiro', contato: '+55 31 93456-7895', totalAlocado: '9000.00', saldoAtual: '188.67', email: 'tatiane.ribeiro@exemplo.com', status: 'Cancelado', data: '2023-09-29' },
    { id: 29, nome: 'Leonardo Souza', contato: '+55 31 94567-8906', totalAlocado: '6480.34', saldoAtual: '143.78', email: 'leonardo.souza@exemplo.com', status: 'Pendente', data: '2023-09-30' },
    { id: 30, nome: 'Carla Silva', contato: '+55 31 95678-9017', totalAlocado: '8745.21', saldoAtual: '176.23', email: 'carla.silva@exemplo.com', status: 'Aprovado', data: '2023-10-01' },

];

const CustomAdvancedTable = () => {
    const [usersData, setUsersData] = useState(initialUsersData);
    const [tempUsersData, setTempUsersData] = useState(initialUsersData); // Dados temporários para restaurar se o modal for cancelado
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
            className: 'text-center', // Centraliza o cabeçalho e a coluna de ID
            Cell: ({ value }: any) => <span style={{ whiteSpace: 'nowrap' }}>{value}</span>,
        },
        {
            Header: 'Nome',
            accessor: 'nome',
            sort: true,
            className: 'text-center', // Centraliza o cabeçalho e a coluna de Nome
        },
        {
            Header: 'Contato',
            accessor: 'contato',
            sort: false,
            className: 'text-center', // Centraliza o cabeçalho e a coluna de Contato
            Cell: ({ value }: any) => <span style={{ whiteSpace: 'nowrap', fontSize: '0.9rem' }}>{value}</span>,
        },
        {
            Header: 'Total Alocado (R$)',
            accessor: 'totalAlocado',
            sort: true,
            className: 'text-center', // Centraliza o cabeçalho e a coluna de Total Alocado
        },
        {
            Header: 'Saldo Atual (R$)',
            accessor: 'saldoAtual',
            sort: true,
            className: 'text-center', // Centraliza o cabeçalho e a coluna de Saldo Atual
        },
        {
            Header: 'Data',
            accessor: 'data',
            sort: true,
            className: 'text-center', // Centraliza o cabeçalho e a coluna de Data
            Cell: ({ value }: any) => <span style={{ whiteSpace: 'nowrap', fontSize: '0.9rem' }}>{value}</span>,
        },
        {
            Header: 'Email',
            accessor: 'email',
            sort: false,
            className: 'text-center', // Centraliza o cabeçalho e a coluna de Email
        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: false,
            className: 'text-center', // Centraliza o cabeçalho e a coluna de Status
            Cell: ({ row }: any) => (
                <Form.Select
                    value={row.original.status}
                    onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
                    className="text-center"
                    style={{ marginRight: '1.5rem', fontSize: '0.9rem' }} // Ajusta o padding e o tamanho da fonte
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
            className: 'text-center', // Centraliza o cabeçalho e a coluna de Enviar Comprovante
            Cell: ({ row }: any) => (  // Renderiza um input de arquivo para cada linha
                <Form.Group controlId={`file-upload-${row.original.id}`} className="d-flex align-items-center justify-content-center">
                    <label
                        htmlFor={`file-upload-${row.original.id}`}
                        className="btn btn-light btn-sm d-flex align-items-center"
                        style={{
                            backgroundColor: '#41C56D',
                            color: '#FFFFFF', // Cor do texto branco
                            fontSize: '0.85rem', // Ajusta o tamanho da fonte
                            whiteSpace: 'nowrap', // Previne quebra de linha
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
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="header-title">Solicitações de Depositos</h4>
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
                                    style={{ justifyContent: 'flex-end' }} // Estilo inline
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