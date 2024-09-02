import { useState } from 'react';
import { Card, Col, Row, Modal, Button } from 'react-bootstrap';
import Table from '../../../components/Table';
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
        text: 'Todos',
        value: data.length,
    },
];

const CustomAdvancedTable = () => {
    const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
    const [rotation, setRotation] = useState<number>(45); // Estado para controlar a rotação do ícone

    // Função para alternar o estado de visibilidade do modal e resetar a rotação ao fechar
    const toggleResponsiveModal = () => {
        setResponsiveModal(!responsiveModal);
        if (responsiveModal) {
            setRotation(45); // Reseta a rotação ao fechar o modal
        } else {
            toggleIconRotation(); // Alterna a rotação ao abrir o modal
        }
    };

    // Função para alternar a rotação entre 45 e 90 graus
    const toggleIconRotation = () => {
        setRotation((prevRotation) => (prevRotation === 45 ? 90 : 45));
    };

    return (
        <>
            {/* Botão para abrir o modal */}
            <Button
                variant="success"
                className="waves-effect waves-light mb-3 d-flex align-items-center "
                style={{borderRadius: "10px"}}
                onClick={toggleResponsiveModal} // Chama a função que abre o modal e altera a rotação
            >
                {/* Ícone MDI com rotação controlada pelo estado e transição suave */}
                <i
                    className="mdi mdi-close"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        marginRight: '10px',
                        transition: 'transform 0.3s ease',
                    }}
                ></i>
                Novo Rendimento
            </Button>

            {/* Modal Responsivo */}
            <Modal show={responsiveModal} onHide={toggleResponsiveModal} >
                <Modal.Header closeButton>
                    <h4 className="modal-title">Adicione um Novo Rendimento</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="field-1" className="form-label">
                                    Name
                                </label>
                                <input type="text" className="form-control" id="field-1" placeholder="John" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="field-2" className="form-label">
                                    Surname
                                </label>
                                <input type="text" className="form-control" id="field-2" placeholder="Doe" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label htmlFor="field-3" className="form-label">
                                    Address
                                </label>
                                <input type="text" className="form-control" id="field-3" placeholder="Address" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="field-4" className="form-label">
                                    City
                                </label>
                                <input type="text" className="form-control" id="field-4" placeholder="Boston" required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="field-5" className="form-label">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="field-5"
                                    placeholder="United States"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="field-6" className="form-label">
                                    Zip
                                </label>
                                <input type="text" className="form-control" id="field-6" placeholder="123456" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="">
                                <label htmlFor="field-7" className="form-label">
                                    Personal Info
                                </label>
                                <textarea
                                    className="form-control"
                                    id="field-7"
                                    placeholder="Write something about yourself"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer >
                    <Button variant="secondary" className="waves-effect" onClick={toggleResponsiveModal}>
                        Cancelar
                    </Button>
                    <Button type="submit" className="btn btn-info waves-effect waves-light">
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Tabela de Clientes */}
            <Row >
                <Col >
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
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CustomAdvancedTable;
