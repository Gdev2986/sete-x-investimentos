import { Card, Col, Row } from 'react-bootstrap';
import Table from '../../../components/Table';
import { usePageTitle } from '../../../hooks';


import { records as data } from '../../tables/AdvancedTable/data';

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Name',
        accessor: 'name',
        sort: true,
    },
    {
        Header: 'Phone Number',
        accessor: 'phone',
        sort: false,
    },
    {
        Header: 'Age',
        accessor: 'age',
        sort: true,
    },
    {
        Header: 'Company',
        accessor: 'company',
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
        text: 'Todos',
        value: data.length,
    },
];

const CustomAdvancedTable = () => {
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
