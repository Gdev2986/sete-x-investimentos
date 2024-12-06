import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import Table from '../../../components/Table';
import { getUsers, updateUser } from '../../../helpers/api/users';

type User = {
    id: number;
    name: string;
    role: string;
};

const Permissions: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [originalUsers, setOriginalUsers] = useState<User[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Busca os usuários ao carregar a página
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
                setOriginalUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };
        fetchUsers();
    }, []);

    // Verifica se houve mudanças nos dados
    useEffect(() => {
        const isChanged = JSON.stringify(users) !== JSON.stringify(originalUsers);
        setHasChanges(isChanged);
    }, [users, originalUsers]);

    // Atualiza o papel do usuário localmente
    const handleRoleChange = (id: number, newRole: string) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, role: newRole } : user
            )
        );
    };

    // Salva as alterações no backend
    const handleSave = async () => {
        try {
            for (const user of users) {
                const originalUser = originalUsers.find((u) => u.id === user.id);
                if (originalUser && originalUser.role !== user.role) {
                    await updateUser(user.id, { role: user.role });
                }
            }
            setOriginalUsers(users);
            setHasChanges(false);
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao salvar permissões:', error);
        }
    };

    // Configuração das colunas da tabela
    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Nome',
            accessor: 'name',
            sort: true,
        },
        {
            Header: 'Permissão',
            accessor: 'role',
            Cell: ({ row }: any) => (
                <Form.Select
                    value={row.original.role}
                    onChange={(e) => handleRoleChange(row.original.id, e.target.value)}
                >
                    <option value="Usuário">Usuário</option>
                    <option value="Admin">Admin</option>
                </Form.Select>
            ),
        },
    ];

    const sizePerPageList = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: 'Todos', value: users.length },
    ];

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-4">Gerenciar Permissões de Usuários</h4>
                <Table
                    columns={columns}
                    data={users}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                />
                <div className="d-flex justify-content-end mt-3">
                    {hasChanges && (
                        <Button variant="secondary" onClick={() => setUsers(originalUsers)} className="me-2">
                            Cancelar
                        </Button>
                    )}
                    <Button
                        variant="success"
                        onClick={() => setShowModal(true)}
                        disabled={!hasChanges}
                    >
                        Salvar
                    </Button>
                </div>

                {/* Modal de Confirmação */}
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tem certeza de que deseja salvar as alterações?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="success" onClick={handleSave}>
                            Confirmar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default Permissions;
