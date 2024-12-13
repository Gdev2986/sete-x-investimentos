import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner, Alert } from 'react-bootstrap';
import Table from '../../../components/Table';
import { getUsers } from '../../../helpers/api/users';


 interface TransformedUser {
        id: number;
        username: string;
        contato: string;
        totalAlocado: string;
        saldoAtual: string;
        email: string;
    }

const columns = [
    { Header: 'ID', accessor: 'id', sort: true },
    { Header: 'Nome', accessor: 'nome', sort: true },
    { Header: 'Contato', accessor: 'contato', sort: false },
    {
        Header: 'Total Alocado (R$)',
        accessor: 'totalAlocado',
        sort: true,
        Cell: ({ value }: any) =>
            value ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00',
    },
    {
        Header: 'Saldo Atual (R$)',
        accessor: 'saldoAtual',
        sort: true,
        Cell: ({ value }: any) =>
            value ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00',
    },
    { Header: 'Email', accessor: 'email', sort: false },
];

const CustomAdvancedTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);

            try {
                const response = await getUsers();
                console.log( response.data);

                const transformedData = response.data.map((user: TransformedUser) => ({
                    id: user.id,
                    nome: user.username,
                    contato: user.contato || 'Não informado',
                    totalAlocado: user.totalAlocado || 0,
                    saldoAtual: user.saldoAtual || 0,
                    email: user.email,
                }));

                console.log(transformedData)

                setData(transformedData);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const sizePerPageList = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: 'Todos', value: data.length },
    ];

    if (loading) {
        return (
            <Row>
                <Col className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </Spinner>
                </Col>
            </Row>
        );
    }

    if (error) {
        return (
            <Row>
                <Col>
                    <Alert variant="danger">Erro ao carregar os dados dos clientes. Tente novamente mais tarde.</Alert>
                </Col>
            </Row>
        );
    }

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h4 className="header-title">Clientes</h4>
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
