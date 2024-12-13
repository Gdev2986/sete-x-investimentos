import React from 'react';
import { Col, Row, Card, Nav, Tab } from 'react-bootstrap';
import { usePageTitle } from '../../../hooks';

// Importando componentes
import AdminPersonalData from './personal-data';
import Security from './security';
import Permissions from './permissions';

const Profile: React.FC = () => {
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

  const tabContents = [
    { title: 'Dados Pessoais', id: 1, content: <AdminPersonalData /> },
    { title: 'Segurança', id: 2, content: <Security /> },
    { title: 'Permissões', id: 3, content: <Permissions /> },
  ];

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
                      eventKey={tab.title}
                      className="cursor-pointer text-center"
                      style={{
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
                  <Tab.Pane eventKey={tab.title} id={String(tab.id)} key={index.toString()} style={{ padding: '10px' }}>
                    {tab.content}
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
