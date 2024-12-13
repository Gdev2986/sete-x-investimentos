import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { APICore } from '../../../helpers/api/apiCore';
import swal from 'sweetalert2';

const api = new APICore();

// Função global para obter o ID do usuário logado
const getUserId = (): number | null => {
  const loggedInUser = api.getLoggedInUser();
  if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
    console.warn("Usuário não está logado ou ID não encontrado.");
    return null;
  }
  return loggedInUser.user.id;
};

const AdminPersonalData: React.FC = () => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    username: false,
    email: false,
    contact: false,
    first_name: false,
    last_name: false,
  });

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    contact: '',
    profileImage: '',
  });

  const [originalData, setOriginalData] = useState(formData);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateUsername = (username: string): boolean => {
    return !username.includes(' ');
  };

  const formatContact = (contact: string): string => {
    const cleaned = contact.replace(/\D/g, '');
    return cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  };

  useEffect(() => {
    const userId = getUserId();
    if (!userId) {
      setError('ID do usuário não encontrado. Por favor, faça login novamente.');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setFormData({
          ...response.data,
          contact: formatContact(response.data.contact),
        });
        setOriginalData({
          ...response.data,
          contact: formatContact(response.data.contact),
        });
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
        setError('Erro ao carregar os dados do usuário.');
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'contact' ? formatContact(value) : value });
  };

  const handleSaveChanges = async () => {
    const userId = getUserId();
    if (!userId) {
      setError('ID do usuário não encontrado. Por favor, faça login novamente.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('O email inserido não é válido.');
      return;
    }

    if (!validateUsername(formData.username)) {
      setError('O nome de usuário não pode conter espaços.');
      return;
    }

    try {
      const updatedData = {
        ...formData,
        contact: formData.contact.replace(/\D/g, ''), // Remove formatação antes de enviar ao banco
      };
      await axios.put(`/users/${userId}`, updatedData);
      setOriginalData(formData);
      swal.fire({
        title: 'Sucesso!',
        text: 'Dados atualizados com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (err) {
      console.error('Erro ao salvar os dados:', err);
      setError('Erro ao atualizar os dados.');
    }
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    const userId = getUserId();

    if (!userId) {
      setError('ID do usuário não encontrado. Por favor, faça login novamente.');
      return;
    }

    if (file) {
      const formDataImage = new FormData();
      formDataImage.append('profileImage', file);

      try {
        const response = await axios.post(`/users/${userId}/upload-profile-image`, formDataImage, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setFormData({ ...formData, profileImage: response.data.imageUrl });
        swal.fire({
          title: 'Sucesso!',
          text: 'Imagem de perfil atualizada com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (err) {
        console.error('Erro ao atualizar a imagem:', err);
        setError('Erro ao atualizar a imagem de perfil.');
      }
    }
  };

  const editableStyle = (isEditable: boolean) => ({
    borderColor: isEditable ? '#28a745' : '',
  });

  return (
    <div>
      <h4 className="text-center">Gerenciar Dados do Usuário</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="d-flex flex-column align-items-center mb-4">
        <img
          src={formData.profileImage || 'https://via.placeholder.com/100'}
          alt="Foto de Perfil"
          className="rounded-circle mb-3"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <Form.Group className="text-center">
          <Form.Label htmlFor="fileInput" className="btn btn-link p-0" style={{ cursor: 'pointer' }}>
            Alterar Imagem
          </Form.Label>
          <Form.Control type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} />
        </Form.Group>
      </div>
      <Form className="d-flex flex-column align-items-center">
        <div className="d-flex" style={{ gap: '20px' }}>
          <Form.Group className="mb-3 position-relative" controlId="formFirstName" style={{ width: '140px' }}>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              placeholder="Nome"
              value={formData.first_name}
              readOnly={!isEditing.first_name}
              onChange={handleChange}
              style={editableStyle(isEditing.first_name)}
            />
            <i
              className="mdi mdi-pencil position-absolute"
              style={{ right: '10px', top: '38px', cursor: 'pointer' }}
              onClick={() => handleEditToggle('first_name')}
            ></i>
          </Form.Group>
          <Form.Group className="mb-3 position-relative" controlId="formLastName" style={{ width: '140px' }}>
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Sobrenome"
              value={formData.last_name}
              readOnly={!isEditing.last_name}
              onChange={handleChange}
              style={editableStyle(isEditing.last_name)}
            />
            <i
              className="mdi mdi-pencil position-absolute"
              style={{ right: '10px', top: '38px', cursor: 'pointer' }}
              onClick={() => handleEditToggle('last_name')}
            ></i>
          </Form.Group>
        </div>
        <Form.Group className="mb-3 position-relative" controlId="formUsername" style={{ width: '300px' }}>
          <Form.Label>Nome de Usuário</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Nome de Usuário"
            value={formData.username}
            readOnly={!isEditing.username}
            onChange={handleChange}
            style={editableStyle(isEditing.username)}
          />
          <i
            className="mdi mdi-pencil position-absolute"
            style={{ right: '10px', top: '38px', cursor: 'pointer' }}
            onClick={() => handleEditToggle('username')}
          ></i>
        </Form.Group>
        <Form.Group className="mb-3 position-relative" controlId="formEmail" style={{ width: '300px' }}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            readOnly={!isEditing.email}
            onChange={handleChange}
            style={editableStyle(isEditing.email)}
          />
          <i
            className="mdi mdi-pencil position-absolute"
            style={{ right: '10px', top: '38px', cursor: 'pointer' }}
            onClick={() => handleEditToggle('email')}
          ></i>
        </Form.Group>
        <Form.Group className="mb-3 position-relative" controlId="formContact" style={{ width: '300px' }}>
          <Form.Label>Contato</Form.Label>
          <Form.Control
            type="text"
            name="contact"
            placeholder="Contato"
            value={formData.contact}
            readOnly={!isEditing.contact}
            onChange={handleChange}
            style={editableStyle(isEditing.contact)}
          />
          <i
            className="mdi mdi-pencil position-absolute"
            style={{ right: '10px', top: '38px', cursor: 'pointer' }}
            onClick={() => handleEditToggle('contact')}
          ></i>
        </Form.Group>
      </Form>
      <div className="text-center mt-4">
        <Button
          variant="success"
          onClick={handleSaveChanges}
          style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
        >
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default AdminPersonalData;
