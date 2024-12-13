import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert2';

const Security: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const togglePasswordVisibility = (field: string) => {
    setIsPasswordVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Pelo menos uma letra maiúscula e 8 caracteres
    return passwordRegex.test(password);
  };

  const handleSavePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError('As senhas não coincidem.');
      return;
    }

    if (!validatePassword(passwordData.newPassword)) {
      setPasswordError('A nova senha deve ter pelo menos 8 caracteres e uma letra maiúscula.');
      return;
    }

    try {
      const verifyResponse = await axios.post('/api/auth/verify-password', {
        currentPassword: passwordData.currentPassword,
      });

      if (!verifyResponse.data.valid) {
        setPasswordError('Senha atual incorreta.');
        return;
      }

      await axios.put('/api/auth/update-password', {
        newPassword: passwordData.newPassword,
      });

      setPasswordError(null);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });

      swal.fire({
        title: 'Sucesso!',
        text: 'Senha alterada com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      swal.fire({
        title: 'Erro!',
        text: 'Não foi possível atualizar a senha. Tente novamente.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      <h4 className="text-center">Alterar Senha</h4>
      <Form className="d-flex flex-column align-items-center">
        <Form.Group className="mb-3" controlId="formCurrentPassword" style={{ width: '300px' }}>
          <Form.Label>Senha Atual</Form.Label>
          <InputGroup>
            <Form.Control
              type={isPasswordVisible.currentPassword ? 'text' : 'password'}
              name="currentPassword"
              placeholder="Senha Atual"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
            <Button
              variant="outline-secondary"
              onClick={() => togglePasswordVisibility('currentPassword')}
            >
              <i
                className={`mdi ${isPasswordVisible.currentPassword ? 'mdi-eye-off' : 'mdi-eye'}`}
              ></i>
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNewPassword" style={{ width: '300px' }}>
          <Form.Label>Nova Senha</Form.Label>
          <InputGroup>
            <Form.Control
              type={isPasswordVisible.newPassword ? 'text' : 'password'}
              name="newPassword"
              placeholder="Nova Senha"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <Button variant="outline-secondary" onClick={() => togglePasswordVisibility('newPassword')}>
              <i className={`mdi ${isPasswordVisible.newPassword ? 'mdi-eye-off' : 'mdi-eye'}`}></i>
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmNewPassword" style={{ width: '300px' }}>
          <Form.Label>Confirme a Nova Senha</Form.Label>
          <InputGroup>
            <Form.Control
              type={isPasswordVisible.confirmNewPassword ? 'text' : 'password'}
              name="confirmNewPassword"
              placeholder="Confirme a Nova Senha"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
            />
            <Button
              variant="outline-secondary"
              onClick={() => togglePasswordVisibility('confirmNewPassword')}
            >
              <i
                className={`mdi ${
                  isPasswordVisible.confirmNewPassword ? 'mdi-eye-off' : 'mdi-eye'
                }`}
              ></i>
            </Button>
          </InputGroup>
        </Form.Group>

        {passwordError && (
          <p className="text-danger" style={{ marginBottom: '15px' }}>
            {passwordError}
          </p>
        )}

        <Button variant="primary" onClick={handleSavePassword}>
          Salvar Nova Senha
        </Button>
      </Form>
    </div>
  );
};

export default Security;
