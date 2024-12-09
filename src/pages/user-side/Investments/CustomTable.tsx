import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Table from '../../../components/Table';
import { retiradas } from '../../../helpers/data'; // Dados das retiradas
//import { user } from '../../../helpers/fake-backend'; // Dados do usuário logado
let user: any = sessionStorage.getItem('setex_user');
user = JSON.parse(user);

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
        Cell: ({ value }: any) => <span>R${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>, // Formatação do valor
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        className: 'text-center',
        Cell: ({ value }: any) => <span>{value}</span>, // Exibe o status sem interação
    },
    {
        Header: 'Comprovante',
        accessor: 'comprovante',
        sort: false,
        className: 'text-center',
        Cell: ({ row }: any) => (
            <a
                className={`btn btn-light btn-sm ${!row.original.comprovante ? 'disabled' : ''}`} // Desabilita o botão se não houver comprovante
                href={row.original.comprovante ? row.original.comprovante : '#'} // Usa o link do comprovante
                download={row.original.comprovante ? 'comprovante.png' : ''} // Habilita o download somente se o comprovante existir
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
    { text: 'Todos', value: retiradas.length },
];

const CustomAdvancedTable = () => {
    const [userWithdrawals] = useState(
        retiradas.filter((retirada) => retirada.userId === user.user.id) // Filtra retiradas pelo userId do usuário logado
    );

    return (
        <>
            {/* Tabela de Retiradas */}
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
        </>
    );
};

export default CustomAdvancedTable;


