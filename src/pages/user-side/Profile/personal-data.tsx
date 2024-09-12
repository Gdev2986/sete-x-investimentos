import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import profile from '../../../assets/images/users/profile.jpg';
import { user, fakeBankDetails } from '../../../helpers/fake-backend';

const PersonalData: React.FC = () => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    username: false,
    email: false,
    pixKey: false,
    agencyNumber: false,
    accountNumber: false,
  });

  const [formData, setFormData] = useState({
    firstName: 'Gabriel',
    lastName: 'Campos',
    username: user.username,
    email: user.email,
    pixKey: fakeBankDetails.pixKey,
    bankName: fakeBankDetails.bankName,
    agencyNumber: fakeBankDetails.agencyNumber,
    accountNumber: fakeBankDetails.accountNumber,
  });

  const [showEmailConfirmationMessage, setShowEmailConfirmationMessage] = useState(false); // Novo estado para a mensagem

  const handleEditToggle = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement & HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log('Salvar alterações:', formData);
    if (formData.email !== user.email) {
      setShowEmailConfirmationMessage(true); // Mostra a mensagem de confirmação
    } else {
      setShowEmailConfirmationMessage(false); // Não mostra a mensagem de confirmação se o email não foi alterado
    }
    // Adicionar a lógica para salvar os dados no backend aqui
  };

  const editableStyle = (isEditable: boolean) => ({
    borderColor: isEditable ? '#28a745' : '', // verde similar ao dropdown
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

      {/* Seção de Dados Bancários */}
      <h4 className="mt-4 text-center">Dados Bancários</h4>
      <Form className="d-flex flex-column align-items-center">
        <Form.Group className="mb-3" controlId="formBankName" style={{ width: '300px' }}>
          <Form.Label>Banco</Form.Label>
          <Form.Select
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
          >
            <option value="Banco do Brasil">Banco do Brasil</option>
            <option value="Itaú Unibanco">Itaú Unibanco</option>
            <option value="Bradesco">Bradesco</option>
            <option value="Caixa Econômica Federal">Caixa Econômica Federal</option>
            <option value="Santander Brasil">Santander Brasil</option>
            <option value="Banco Safra">Banco Safra</option>
            <option value="BTG Pactual">BTG Pactual</option>
            <option value="Banco Inter">Banco Inter</option>
            <option value="Banco Original">Banco Original</option>
            <option value="Nubank">Nubank</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 position-relative" controlId="formAgencyNumber" style={{ width: '300px' }}>
          <Form.Label>Agência</Form.Label>
          <Form.Control
            type="text"
            name="agencyNumber"
            placeholder="Agência"
            value={formData.agencyNumber}
            readOnly={!isEditing.agencyNumber}
            onChange={handleChange}
            style={editableStyle(isEditing.agencyNumber)}
          />
          <i
            className="mdi mdi-pencil position-absolute"
            style={{ right: '10px', top: '38px', cursor: 'pointer' }}
            onClick={() => handleEditToggle('agencyNumber')}
          ></i>
        </Form.Group>
        <Form.Group className="mb-3 position-relative" controlId="formAccountNumber" style={{ width: '300px' }}>
          <Form.Label>Número da Conta</Form.Label>
          <Form.Control
            type="text"
            name="accountNumber"
            placeholder="Número da Conta"
            value={formData.accountNumber}
            readOnly={!isEditing.accountNumber}
            onChange={handleChange}
            style={editableStyle(isEditing.accountNumber)}
          />
          <i
            className="mdi mdi-pencil position-absolute"
            style={{ right: '10px', top: '38px', cursor: 'pointer' }}
            onClick={() => handleEditToggle('accountNumber')}
          ></i>
        </Form.Group>
        <Form.Group className="mb-3 position-relative" controlId="formPixKey" style={{ width: '300px' }}>
          <Form.Label>Chave Pix</Form.Label>
          <Form.Control
            type="text"
            name="pixKey"
            placeholder="Chave Pix"
            value={formData.pixKey}
            readOnly={!isEditing.pixKey}
            onChange={handleChange}
            style={editableStyle(isEditing.pixKey)}
          />
          <i
            className="mdi mdi-pencil position-absolute"
            style={{ right: '10px', top: '38px', cursor: 'pointer' }}
            onClick={() => handleEditToggle('pixKey')}
          ></i>
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
