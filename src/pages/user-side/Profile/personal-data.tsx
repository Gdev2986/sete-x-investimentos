import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { getUserById, updateUser } from '../../../helpers/api/users';

const PersonalData: React.FC = () => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    username: false,
    email: false,
    pixKey: false,
    agencyNumber: false,
    accountNumber: false,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    pixKey: '',
    bankName: '',
    agencyNumber: '',
    accountNumber: '',
    profileImage: '', // Caminho da imagem de perfil
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showEmailConfirmationMessage, setShowEmailConfirmationMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('user_id') || sessionStorage.getItem('user_id');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await getUserById(Number(userId));
          const user = response.data;
          setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            username: user.username || '',
            email: user.email || '',
            pixKey: user.pixKey || '',
            bankName: user.bankName || '',
            agencyNumber: user.agencyNumber || '',
            accountNumber: user.accountNumber || '',
            profileImage: user.profileImage || 'https://via.placeholder.com/100', // Imagem padrão
          });
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditToggle = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement & HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFormData({ ...formData, profileImage: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (userId) {
        const updateData = { ...formData };
        if (selectedFile) {
          // Envia a imagem para o backend
          const formData = new FormData();
          formData.append('profileImage', selectedFile);
          const uploadResponse = await fetch('/api/users/upload-profile-image', {
            method: 'POST',
            body: formData,
          });
          const uploadData = await uploadResponse.json();
          if (uploadResponse.ok) {
            updateData.profileImage = uploadData.imageUrl;
          }
        }
        await updateUser(Number(userId), updateData);
        if (formData.email !== updateData.email) {
          setShowEmailConfirmationMessage(true);
        } else {
          setShowEmailConfirmationMessage(false);
        }
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  const editableStyle = (isEditable: boolean) => ({
    borderColor: isEditable ? '#28a745' : '',
  });

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h4 className="text-center">Dados Pessoais</h4>
      <div className="d-flex flex-column align-items-center mb-4">
        <img
          src={formData.profileImage}
          alt="Foto de Perfil"
          className="rounded-circle mb-3"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <Form.Group className="text-center">
          <Form.Label htmlFor="fileInput" className="btn btn-link p-0" style={{ cursor: 'pointer' }}>
            Alterar Imagem
          </Form.Label>
          <Form.Control type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
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
        {/* Campos editáveis */}
        {/* Campos bancários */}
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
