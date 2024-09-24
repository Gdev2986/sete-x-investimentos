import React, { useState } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import Table from '../../../components/Table';
import AdmintoDatepicker from '../../../components/Datepicker'; // Importando o Datepicker
import logoDark from '../../../assets/images/logo-dark-2.png';

const initialUsersData = [
    { nome: 'Gabriel Campos', valorDisponivel: '10,000.00', valorSolicitado: '1,500.00', status: 'Pendente', comprovante: '' },
    { nome: 'Gabriel Campos', valorDisponivel: '8,500.00', valorSolicitado: '2,000.00', status: 'Aprovado', comprovante: 'logo-dark-2.png' },
    { nome: 'Gabriel Campos', valorDisponivel: '12,000.00', valorSolicitado: '3,000.00', status: 'Cancelado', comprovante: '' },
    { nome: 'Gabriel Campos', valorDisponivel: '9,200.00', valorSolicitado: '2,500.00', status: 'Pendente', comprovante: 'logo-dark-2.png' },
    { nome: 'Gabriel Campos', valorDisponivel: '15,000.00', valorSolicitado: '5,000.00', status: 'Aprovado', comprovante: '' },
    { nome: 'Gabriel Campos', valorDisponivel: '7,800.00', valorSolicitado: '1,200.00', status: 'Pendente', comprovante: 'logo-dark-2.png' },
    { nome: 'Gabriel Campos', valorDisponivel: '14,500.00', valorSolicitado: '4,500.00', status: 'Cancelado', comprovante: '' },
    { nome: 'Gabriel Campos', valorDisponivel: '6,500.00', valorSolicitado: '1,000.00', status: 'Aprovado', comprovante: 'logo-dark-2.png' }
];

const CustomAdvancedTable = () => {
    const [usersData, setUsersData] = useState(initialUsersData);
    const [responsiveModal, setResponsiveModal] = useState<boolean>(false); // Estado para o Modal

    // Função para alternar o estado de visibilidade do modal
    const toggleResponsiveModal = () => {
        setResponsiveModal(!responsiveModal);
    };

    const columns = [
        {
            Header: 'Nome',
            accessor: 'nome',
            sort: true,
            className: 'text-center',
        },
        {
            Header: 'Valor Disponível (R$)',
            accessor: 'valorDisponivel',
            sort: true,
            className: 'text-center',
        },
        {
            Header: 'Valor Solicitado (R$)',
            accessor: 'valorSolicitado',
            sort: true,
            className: 'text-center',
        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: false,
            className: 'text-center',
            Cell: ({ value }: any) => <span>{value}</span>, // Exibe apenas o status sem interação
        },
        {
            Header: 'Baixar Comprovante', // Coluna para download de comprovante
            accessor: 'comprovante',
            sort: false,
            className: 'text-center',
            Cell: ({ row }: any) => (
                   <a
                     className={`btn btn-light btn-sm ${!row.original.comprovante ? 'disabled' : ''}`} // Desabilita o botão se não houver comprovante
                     href={row.original.comprovante ? logoDark : '#'} // Caminho para o comprovante importado
                     download={row.original.comprovante ? 'logo-dark-2.png' : ''} // Habilita o download somente se o comprovante existir
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
                     {row.original.comprovante ? 'Baixar' : 'Baixar'}
                   </a>

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
        <>

            {/* Tabela de Solicitações */}
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
                                isSelectable={false}
                                tableClass="text-center"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CustomAdvancedTable;
