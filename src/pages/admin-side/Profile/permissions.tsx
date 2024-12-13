// Componente: Permissões (Admin)
import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import Table from '../../../components/Table';
import { getUsers, updateUserRole } from '../../../helpers/api/users';

type User = {
  id: number;
  nome: string; // Alterado para usar `username`
  permissao: string;
};

const Permissions: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const intervalRef = useRef<number | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      console.log('Usuários recebidos:', response.data);

      const formattedUsers = response.data
        .map((user: any) => ({
          id: user.id,
          nome: user.username, // Alterado para `username`
          permissao: user.permissao || 'user',
        }))
        .sort((a: User, b: User) => a.id - b.id);

      setUsers(formattedUsers);
      setOriginalUsers(formattedUsers);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsers();

    intervalRef.current = window.setInterval(() => {
      fetchUsers();
    }, 60000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleRoleChange = (id: number, newRole: string) => {
    setSelectedUserId(id);
    setSelectedRole(newRole);
    setShowModal(true);
  };

  const saveRoleChange = async () => {
    if (selectedUserId !== null) {
      try {
        console.log(`Atualizando permissão para usuário ${selectedUserId} com role ${selectedRole}`);
        await updateUserRole(selectedUserId, selectedRole);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUserId ? { ...user, permissao: selectedRole } : user
          )
        );
        setOriginalUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUserId ? { ...user, permissao: selectedRole } : user
          )
        );
        setShowModal(false);
      } catch (error) {
        console.error('Erro ao atualizar permissão:', error);
      }
    }
  };

  const columns = [
    { Header: 'ID', accessor: 'id', sort: true },
    { Header: 'Usuário', accessor: 'nome', sort: true },
    {
      Header: 'Permissão',
      accessor: 'permissao',
      Cell: ({ row }: any) => (
        <Form.Select
          value={row.original.permissao}
          onChange={(e) => handleRoleChange(row.original.id, e.target.value)}
        >
          <option value="user">Usuário</option>
          <option value="admin">Admin</option>
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
          <Modal.Body>Tem certeza de que deseja alterar a permissão do usuário?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={saveRoleChange}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default Permissions;
