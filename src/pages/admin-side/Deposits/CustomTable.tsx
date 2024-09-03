import { Card, Col, Row, Form } from 'react-bootstrap';
import Table from '../../../components/Table';
import { records as data } from '../../tables/AdvancedTable/data';
import GreenDropdownButton from './GreenDropdownButton';  // Importando o botão verde 

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
        Header: 'Comprovante',  // Nova coluna para o input de arquivo
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
        value: data.length,
    },
];

const CustomAdvancedTable = () => {
    return (
        <>
            {/* Tabela de Solicitações de Retiradas */}
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="header-title">Historico de Depositos</h4>
                                <GreenDropdownButton /> {/* Botão verde */}
                            </div>
                            <br />
                           
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CustomAdvancedTable;
