import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import profile from '../../../assets/images/users/user-1.jpg';
import { user } from '../../../helpers/fake-backend';

const PersonalData: React.FC = () => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    username: false,
    email: false,
  });

  const [formData, setFormData] = useState({
    firstName: 'Gabriel',
    lastName: 'Campos',
    username: user.username,
    email: user.email,
  });

  const [showEmailConfirmationMessage, setShowEmailConfirmationMessage] = useState(false);

  const handleEditToggle = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log('Salvar alterações:', formData);
    if (formData.email !== user.email) {
      setShowEmailConfirmationMessage(true);
    } else {
      setShowEmailConfirmationMessage(false);
    }
    // Adicionar a lógica para salvar os dados no backend aqui
  };

  const editableStyle = (isEditable: boolean) => ({
    borderColor: isEditable ? '#28a745' : '',
  });

  return (
    <div>
      <h4 className="text-center">Dados Pessoais</h4>
      <div className="d-flex flex-column align-items-center mb-4">
        <img
          src={profile}
          alt="Foto de Perfil"
          className="rounded-circle mb-3"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <Form.Group className="text-center">
          <Form.Label htmlFor="fileInput" className="btn btn-link p-0" style={{ cursor: 'pointer' }}>
            Alterar Imagem
          </Form.Label>
          <Form.Control type="file" id="fileInput" style={{ display: 'none' }} />
        </Form.Group>
      </div>
      <Form className="d-flex flex-column align-items-center">
        <div className="d-flex" style={{ gap: '20px' }}>
          <Form.Group className="mb-3" controlId="formFirstName" style={{ width: '140px' }}>
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Nome" value={formData.firstName} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName" style={{ width: '140px' }}>
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control type="text" placeholder="Sobrenome" value={formData.lastName} readOnly />
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
        <Button variant="success" onClick={handleSaveChanges} style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}>
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default PersonalData;
