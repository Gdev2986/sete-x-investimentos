import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Table from '../../../components/Table';
import { getUsers } from '../../../helpers/api/users'; // Ajuste o caminho conforme sua estrutura

const columns = [
    { Header: 'ID', accessor: 'id', sort: true },
    { Header: 'Nome', accessor: 'nome', sort: true },
    { Header: 'Contato', accessor: 'contato', sort: false },
    { Header: 'Total Alocado (R$)', accessor: 'totalAlocado', sort: true },
    { Header: 'Saldo Atual (R$)', accessor: 'saldoAtual', sort: true },
    { Header: 'Email', accessor: 'email', sort: false },
];

const CustomAdvancedTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getUsers()
            .then(response => {
                // response.data deve ser o array de usuários transformados pelo backend
                setData(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    }, []);

    const sizePerPageList = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: 'Todos', value: data.length },
    ];

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h4 className="header-title">Clientes</h4><br />
                        <Table
                            columns={columns}
                            data={data}
                            pageSize={5}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            pagination={true}
                            isSearchable={true}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default CustomAdvancedTable;
