import { useState } from 'react';
import { Col, Row, Card, Nav, Tab, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// hooks
import { usePageTitle } from '../../../hooks';

// Importando dados de usuário do backend simulado
import { user, fakeBankDetails } from '../../../helpers/fake-backend';
import profile from '../../../assets/images/users/profile.jpg';

// Definindo o componente Profile
const Profile = () => {
    // Estados para edição
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
        username: false,
        email: false,
        pixKey: false,
    });

    const [formData, setFormData] = useState({
        firstName: 'Gabriel',
        lastName: 'Campos',
        username: user.username,
        email: user.email,
        pixKey: fakeBankDetails.pixKey,
    });

    const handleEditToggle = (field: string) => {
        setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = () => {
        console.log('Salvar alterações:', formData);
        // Adicionar a lógica para salvar os dados no backend aqui
    };

    // Definindo os conteúdos das abas
    const tabContents = [
        {
            title: 'Dados Pessoais',
            id: 1,
            text: (
                <div>
                    <h4 className="text-center">Dados Pessoais</h4>
                    <div className="d-flex flex-column align-items-center mb-4">
                        <img
                            src={profile} // Usando a variável importada 'profile' para a imagem
                            alt="Foto de Perfil"
                            className="rounded-circle mb-3"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <Form.Group className="text-center">
                            <Form.Label htmlFor="fileInput" className="btn btn-link p-0" style={{ cursor: 'pointer' }}>
                                Alterar Imagem
                            </Form.Label>
                            <Form.Control
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }} // Esconde o input de arquivo
                            />
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
                            />
                            <i
                                className="mdi mdi-pencil position-absolute"
                                style={{ right: '10px', top: '38px', cursor: 'pointer' }}
                                onClick={() => handleEditToggle('email')}
                            ></i>
                        </Form.Group>
                    </Form>

                    {/* Seção de Dados Bancários */}
                    <h4 className="mt-4 text-center">Dados Bancários</h4>
                    <Form className="d-flex flex-column align-items-center">
                        <Form.Group className="mb-3" controlId="formBankName" style={{ width: '300px' }}>
                            <Form.Label>Banco</Form.Label>
                            <Form.Control type="text" placeholder="Banco" value={fakeBankDetails.bankName} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAgencyNumber" style={{ width: '300px' }}>
                            <Form.Label>Agência</Form.Label>
                            <Form.Control type="text" placeholder="Agência" value={fakeBankDetails.agencyNumber} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAccountNumber" style={{ width: '300px' }}>
                            <Form.Label>Número da Conta</Form.Label>
                            <Form.Control type="text" placeholder="Número da Conta" value={fakeBankDetails.accountNumber} readOnly />
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
                            />
                            <i
                                className="mdi mdi-pencil position-absolute"
                                style={{ right: '10px', top: '38px', cursor: 'pointer' }}
                                onClick={() => handleEditToggle('pixKey')}
                            ></i>
                        </Form.Group>
                    </Form>
                    <div className="text-center mt-4">
                        <Button variant="primary" onClick={handleSaveChanges}>
                            Salvar Alterações
                        </Button>
                    </div>
                </div>
            ),
        },
        {
            title: 'Segurança',
            id: 2,
            text: 'Profile - Food truck quinoa dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
        },
        {
            title: 'Gerenciar Permissões',
            id: 3,
            text: 'Messages - Food truck quinoa dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        },
    ];

    usePageTitle({
        title: 'Perfil',
        breadCrumbItems: [
            {
                path: 'admin/profile',
                label: 'Profile',
                active: true,
            },
        ],
    });

    return (
        <Row>
            <Col sm={12}>
                <Card style={{ border: '1px solid transparent' }}>
                    <Card.Body>
                        <Tab.Container defaultActiveKey="Dados Pessoais">
                            <Nav
                                as="ul"
                                variant="tabs"
                                className="nav-bordered"
                                style={{
                                    display: 'flex',
                                    borderBottom: '1px solid #dee2e6',
                                    marginBottom: '-1px',
                                }}
                            >
                                {tabContents.map((tab, index) => (
                                    <Nav.Item as="li" key={index.toString()} style={{ flex: '1 1 0' }}>
                                        <Nav.Link
                                            as={Link}
                                            to="#"
                                            eventKey={tab.title}
                                            className="cursor-pointer text-center"
                                            style={{
                                                border: '1px solid transparent',
                                                borderBottom: '1px solid #dee2e6',
                                                flexGrow: 1,
                                                flexBasis: 0,
                                            }}
                                        >
                                            {tab.title}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>

                            <Tab.Content className="mt-3">
                                {tabContents.map((tab, index) => (
                                    <Tab.Pane
                                        eventKey={tab.title}
                                        id={String(tab.id)}
                                        key={index.toString()}
                                        style={{ padding: '10px' }}
                                    >
                                        {tab.text}
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Tab.Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Profile;
