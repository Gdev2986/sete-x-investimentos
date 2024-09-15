import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const Security: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError('As senhas não coincidem.');
    } else {
      setPasswordError(null);
      console.log('Salvar nova senha:', passwordData);
      // Adicionar a lógica para salvar a nova senha no backend aqui
    }
  };

  return (
    <div>
      <h4 className="text-center">Alterar Senha</h4>
      <Form className="d-flex flex-column align-items-center">
        <Form.Group className="mb-3" controlId="formCurrentPassword" style={{ width: '300px' }}>
          <Form.Label>Senha Atual</Form.Label>
          <Form.Control
            type="password"
            name="currentPassword"
            placeholder="Senha Atual"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNewPassword" style={{ width: '300px' }}>
          <Form.Label>Nova Senha</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="Nova Senha"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConfirmNewPassword" style={{ width: '300px' }}>
          <Form.Label>Confirme a Nova Senha</Form.Label>
          <Form.Control
            type="password"
            name="confirmNewPassword"
            placeholder="Confirme a Nova Senha"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        {passwordError && <Alert variant="danger">{passwordError}</Alert>}
        <Button variant="primary" onClick={handleSavePassword}>
          Salvar Nova Senha
        </Button>
      </Form>
    </div>
  );
};

export default Security;
