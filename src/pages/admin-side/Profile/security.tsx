import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Security: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSavePassword = async () => {
    // Verifica se as novas senhas coincidem
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError('As senhas não coincidem.');
      return;
    }

    try {
      // Verifica a senha atual no backend
      const verifyResponse = await axios.post('/api/auth/verify-password', {
        currentPassword: passwordData.currentPassword,
      });

      if (!verifyResponse.data.valid) {
        setPasswordError('Senha atual incorreta.');
        return;
      }

      // Atualiza a senha no backend
      await axios.put('/api/auth/update-password', {
        newPassword: passwordData.newPassword,
      });

      setPasswordError(null);
      setSuccessMessage('Senha alterada com sucesso!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      setPasswordError('Erro ao atualizar a senha. Tente novamente.');
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
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Button variant="primary" onClick={handleSavePassword}>
          Salvar Nova Senha
        </Button>
      </Form>
    </div>
  );
};

export default Security;