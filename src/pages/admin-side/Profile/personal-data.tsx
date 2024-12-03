import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const PersonalData: React.FC = () => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    username: false,
    email: false,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    profileImage: '',
  });

  const [originalData, setOriginalData] = useState(formData); // Dados originais para comparação
  const [showEmailConfirmationMessage, setShowEmailConfirmationMessage] = useState(false);

  const userId = localStorage.getItem('user_id') || sessionStorage.getItem('user_id'); // Obtendo o ID do usuário

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setFormData(response.data);
        setOriginalData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        alert('Erro ao carregar os dados do usuário.');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditToggle = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const { firstName, lastName, username, email } = formData;
      await axios.put(`/api/users/${userId}`, { firstName, lastName, username, email });

      if (email !== originalData.email) {
        setShowEmailConfirmationMessage(true);
      } else {
        setShowEmailConfirmationMessage(false);
      }

      setOriginalData(formData);
      alert('Dados pessoais atualizados com sucesso.');
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      alert('Erro ao atualizar os dados.');
    }
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formDataImage = new FormData();
      formDataImage.append('profileImage', file);

      try {
        const response = await axios.post(`/api/users/${userId}/upload-profile-image`, formDataImage, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setFormData({ ...formData, profileImage: response.data.imageUrl });
        alert('Imagem de perfil atualizada com sucesso.');
      } catch (error) {
        console.error('Erro ao atualizar a imagem:', error);
        alert('Erro ao atualizar a imagem de perfil.');
      }
    }
  };

  const editableStyle = (isEditable: boolean) => ({
    borderColor: isEditable ? '#28a745' : '',
  });

  return (
    <div>
      <h4 className="text-center">Dados Pessoais</h4>
      <div className="d-flex flex-column align-items-center mb-4">
        <img
          src={formData.profileImage || 'https://via.placeholder.com/100'} // Imagem padrão se não houver
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
          <Form.Group className="mb-3" controlId="formFirstName" style={{ width: '140px' }}>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Nome"
              value={formData.firstName}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName" style={{ width: '140px' }}>
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Sobrenome"
              value={formData.lastName}
              readOnly
            />
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
          {showEmailConfirmationMessage && (
            <Alert variant="info" className="mt-2">
              Um email de confirmação foi enviado para {formData.email}.
            </Alert>
          )}
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

export default PersonalData;
