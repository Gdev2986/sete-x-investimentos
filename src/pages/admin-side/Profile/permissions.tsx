import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import Table from '../../../components/Table'; // Usando o componente de tabela que você forneceu

type User = {
  id: number;
  name: string;
  role: string;
};

const Permissions: React.FC = () => {
  const initialUsers: User[] = [
    { id: 1, name: 'Gabriel Campos', role: 'Usuário' },
    { id: 2, name: 'Ana Silva', role: 'Usuário' },
    { id: 3, name: 'Carlos Souza', role: 'Admin' },
    { id: 4, name: 'Mariana Oliveira', role: 'Usuário' },
    { id: 5, name: 'Lucas Pereira', role: 'Admin' },
    { id: 6, name: 'Fernanda Lima', role: 'Usuário' },
    { id: 7, name: 'Pedro Santos', role: 'Usuário' },
    { id: 8, name: 'João Almeida', role: 'Usuário' },
    { id: 9, name: 'Beatriz Costa', role: 'Admin' },
    { id: 10, name: 'Rafael Menezes', role: 'Usuário' },
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [originalUsers, setOriginalUsers] = useState<User[]>(initialUsers); // Para comparação
  const [showModal, setShowModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false); // Verifica se houve alteração nos dados

  useEffect(() => {
    const isChanged = JSON.stringify(users) !== JSON.stringify(originalUsers);
    setHasChanges(isChanged);
  }, [users, originalUsers]);

  const handleRoleChange = (id: number, newRole: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const handleSave = () => {
    setShowModal(false);
    setOriginalUsers(users);
    console.log('Permissões atualizadas:', users);
    // Adicionar lógica para salvar no backend
  };

  const handleCancel = () => {
    setUsers(originalUsers);
    setHasChanges(false);
  };

  // Configuração da tabela
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
          className="border-0 p-0"
          style={{
            backgroundColor: 'var(--bs-body-bg)',  // Variável que acompanha o tema
            color: 'var(--bs-body-color)',         // Variável para a cor do texto
            padding: '0.375rem 1.75rem 0.375rem 0.75rem',
            marginBottom: '0',
          }}
        >
          <option value="Usuário">Usuário</option>
          <option value="Admin">Admin</option>
        </Form.Select>
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
      text: 'Todos',
      value: users.length,
    },
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
          searchBoxClass="mb-3" // Ajuste para adicionar busca
        />

        {/* Botões de Salvar e Cancelar */}
        <div className="d-flex justify-content-end mt-3">
          {hasChanges && (
            <Button variant="secondary" onClick={handleCancel} className="me-2">
              Cancelar
            </Button>
          )}
          <Button variant="success" onClick={() => setShowModal(true)} disabled={!hasChanges}>
            Salvar
          </Button>
        </div>

        {/* Modal de Confirmação */}
        <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false} centered>
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
