import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Modal, Button, Form } from 'react-bootstrap';
import Table from '../../../components/Table';
import swal from 'sweetalert2';
import { getUserDeposits, createDeposit } from '../../../helpers/api/deposits';

// Definindo o tipo para os depósitos
type Deposit = {
    id: number;
    dataDeposito: string;
    valorDepositado: number;
    status: string;
};

// Configurando as colunas da tabela
const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Data do Depósito',
        accessor: 'dataDeposito',
        sort: true,
    },
    {
        Header: 'Valor Depositado (R$)',
        accessor: 'valorDepositado',
        sort: true,
        Cell: ({ value }: any) => formatCurrency(value),
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
    },
];

// Função para formatar valores no formato R$ brasileiro
const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

// Função para formatar a data
const formatDate = (rawDate: string) => {
    const [datePart, timePart] = rawDate.split(', '); // Separa a data da hora
    const [day, month, year] = datePart.split('/'); // Divide o dia, mês e ano
    const [hour, minute] = timePart.split(':'); // Divide hora e minuto
    return `${day}/${month}/${year} ${hour}:${minute}`; // Retorna no formato desejado
};


const UserDeposits = () => {
    const [userDeposits, setUserDeposits] = useState<Deposit[]>([]);
    const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
    const [depositValue, setDepositValue] = useState<string>('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [showShake, setShowShake] = useState(false);

    // Alternar o modal
    const toggleResponsiveModal = () => setResponsiveModal(!responsiveModal);

    // Buscar depósitos do usuário
    const fetchUserDeposits = async () => {
        try {
            console.log("Iniciando busca dos depósitos do usuário...");
            const response = await getUserDeposits();
            console.log("Resposta completa da API:", response);

            // Garantindo que estamos lidando com os dados no formato correto
            const rawData = response || [];
            if (Array.isArray(rawData)) {
                const deposits = rawData.map((deposit) => ({
                    id: deposit.id,
                    dataDeposito: formatDate(deposit.dataDeposito), // Formata a data corretamente
                    valorDepositado: deposit.valorDepositado,
                    status: deposit.status,
                }));
                console.log("Dados transformados para a tabela:", deposits);
                setUserDeposits(deposits);
            } else {
                console.warn("Estrutura de dados inesperada:", rawData);
                setUserDeposits([]);
            }
        } catch (error) {
            console.error("Erro ao buscar depósitos:", error);
            swal.fire("Erro", "Não foi possível carregar os depósitos.", "error");
        }
    };

    useEffect(() => {
        fetchUserDeposits();
    }, []);

    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d.,]/g, '');
        setDepositValue(value);
        setIsInvalid(parseFloat(value.replace(',', '.')) < 100);
    };

    const handleCreateDeposit = async () => {
        const valorNumerico = parseFloat(depositValue.replace(',', '.'));
        if (valorNumerico < 100) {
            setShowShake(true);
            setTimeout(() => setShowShake(false), 300);
            return;
        }
    
        try {
            // Envia com a propriedade correta esperada pelo backend: amount
            await createDeposit({ amount: valorNumerico });
            swal.fire('Sucesso', 'Depósito criado com sucesso!', 'success');
            fetchUserDeposits(); // Atualiza a tabela após o depósito
            toggleResponsiveModal(); // Fecha o modal
            setDepositValue(''); // Limpa o valor do campo
        } catch (error) {
            swal.fire('Erro', 'Falha ao criar depósito.', 'error');
            console.error('Erro ao criar depósito:', error);
        }
    };
    

    return (
        <>
            <Button
                variant="success"
                className="waves-effect waves-light mb-3 d-flex align-items-center"
                style={{ borderRadius: '10px' }}
                onClick={toggleResponsiveModal}
            >
                <i
                    className="mdi mdi-close"
                    style={{
                        transform: `rotate(45deg)`,
                        marginRight: '10px',
                        transition: 'transform 0.3s ease',
                    }}
                ></i>
                Novo Depósito
            </Button>

            <Modal show={responsiveModal} onHide={toggleResponsiveModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Adicione um Novo Depósito</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="deposit-value" className="form-label">
                            Valor do Depósito (R$)
                        </label>
                        <Form.Control
                            type="text"
                            id="deposit-value"
                            value={depositValue}
                            onChange={handleValorChange}
                            isInvalid={isInvalid}
                            placeholder="Insira o valor do depósito (mínimo R$100,00)"
                            className={showShake && isInvalid ? 'shake' : ''}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            O valor mínimo para depósito é R$100,00
                        </Form.Control.Feedback>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleResponsiveModal}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="btn btn-info waves-effect waves-light"
                        style={{ backgroundColor: '#41C56D' }}
                        onClick={handleCreateDeposit}
                        disabled={!depositValue || isInvalid}
                    >
                        Confirmar Depósito
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Meus Depósitos</h4>
                            <Table
                                columns={columns}
                                data={userDeposits}
                                pageSize={5}
                                sizePerPageList={[
                                    { text: '5', value: 5 },
                                    { text: '10', value: 10 },
                                    { text: '25', value: 25 },
                                    { text: 'Todos', value: 50 },
                                ]}
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

export default UserDeposits;
