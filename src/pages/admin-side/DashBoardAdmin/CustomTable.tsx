import { Card, Col, Row } from 'react-bootstrap';
import Table from '../../../components/Table';
import { Link } from 'react-router-dom';

import { records as data } from '../../tables/AdvancedTable/data';

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
        text: 'All',
        value: data.length,
    },
];

const CustomAdvancedTable = () => {
    return (
        <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">
                              <Link to="/admin/clients" className="text-decoration-none text-dark">
                                Clientes
                              </Link>
                            </h4>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
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
