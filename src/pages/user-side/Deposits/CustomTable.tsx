import { useState } from 'react';
import { Card, Col, Row, Modal, Button } from 'react-bootstrap';
import Table from '../../../components/Table';
import AdmintoDatepicker from '../../../components/Datepicker'; // Importando o Datepicker
import { rendimentos } from './datatable'; // Importando dados dos rendimentos

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Data',
        accessor: 'data',
        sort: true,
    },
    {
        Header: 'Valor Alocado (R$)',
        accessor: 'valorAlocado',
        sort: true,
    },
    {
        Header: 'Lucro Bruto (R$)',
        accessor: 'lucroBruto',
        sort: true,
    },
    {
        Header: 'Impostos (R$)',
        accessor: 'impostos',
        sort: true,
    },
    {
        Header: '% Clientes (R$)',
        accessor: 'percentualClientes',
        sort: true,
    },
    {
        Header: 'Lucro Real (R$)',
        accessor: 'lucroReal',
        sort: true,
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
        value: rendimentos.length,
    },
];

const CustomAdvancedTable = () => {
    const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
    const [rotation, setRotation] = useState<number>(45); // Estado para controlar a rotação do ícone
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 1))); // Estado para controlar a data selecionada

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

    // Função para atualizar a data selecionada
    const handleDateChange = (date: Date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    return (
        <>
            {/* Botão para abrir o modal */}
            <Button
                variant="success"
                className="waves-effect waves-light mb-3 d-flex align-items-center "
                style={{ borderRadius: "10px" }}
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
                Novo Deposito
            </Button>

            {/* Modal Responsivo */}
            <Modal show={responsiveModal} onHide={toggleResponsiveModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Adicione um Novo Rendimento</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Data do Rendimento</label> <br />
                                <AdmintoDatepicker
                                    hideAddon={true}
                                    value={selectedDate}
                                    onChange={(date: Date) => handleDateChange(date)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="field-1" className="form-label">
                                    Valor Alocado
                                </label>
                                <input type="number" className="form-control" id="field-1" placeholder="Insira o valor" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="field-2" className="form-label">
                                    Lucro Bruto
                                </label>
                                <input type="number" className="form-control" id="field-2" placeholder="Insira o valor" required />
                            </div>
                        </div>
                    </div>
                    
                </Modal.Body>

                <Modal.Footer >
                    <Button variant="secondary" className="waves-effect" onClick={toggleResponsiveModal} >
                        Cancelar
                    </Button>
                    <Button type="submit" className="btn btn-info waves-effect waves-light" style={{ backgroundColor :'#41C56D'}}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Tabela de Rendimentos */}
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Rendimentos</h4>
                            <Table
                                columns={columns}
                                data={rendimentos}
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
