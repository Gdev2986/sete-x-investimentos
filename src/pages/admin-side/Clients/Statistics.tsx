import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { getUsers } from '../../../helpers/api/users';

type StatisticsWidgetProps = {
    title: string;
    color: string;
    stats: string;
    subTitle: string;
};

const StatisticsWidget1 = ({ title, stats, subTitle }: StatisticsWidgetProps) => {
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-4">{title}</h4>
                <div className="widget-chart-1">
                    <div className="widget-detail-1 text-end">
                        <div className="d-flex align-items-center justify-content-between">
                            <i
                                className="mdi mdi-cash-lock"
                                style={{ fontSize: '40px', width: '50px', height: '50px', color: '#6c757d' }}
                            ></i>
                            <h2 className="fw-normal pt-2 mb-1">{stats}</h2>
                        </div>
                        <p className="text-muted mb-1">{subTitle}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

const StatisticsWidget3 = ({ title, stats, subTitle }: StatisticsWidgetProps) => {
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-4">{title}</h4>
                <div className="widget-chart-1">
                    <div className="widget-detail-1 text-end">
                        <div className="d-flex align-items-center justify-content-between">
                            <i
                                className="mdi mdi-chart-timeline-variant"
                                style={{ fontSize: '40px', width: '50px', height: '50px', color: '#6c757d' }}
                            ></i>
                            <h2 className="fw-normal pt-2 mb-1 ">{stats}</h2>
                        </div>
                        <p className="text-muted mb-1">{subTitle}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

const Statistics = () => {
    const [totalAlocado, setTotalAlocado] = useState<number>(0);

    useEffect(() => {
        getUsers()
            .then(response => {
                const users = response.data;
                const onlyUsers = users.filter((user: any) => user.role !== 'admin');
                const somaTotalAlocado = onlyUsers.reduce((acc: number, user: any) => acc + (user.totalAlocado || 0), 0);
                setTotalAlocado(somaTotalAlocado);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    }, []);

    return (
        <Row style={{ justifyContent: 'space-between' }}>
            <Col xl={6} md={6}>
                <StatisticsWidget1
                    title="Total Alocado"
                    stats={`R$${totalAlocado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    color={'#f05050'}
                    subTitle="Valor Total"
                />
            </Col>

            <Col xl={6} md={6}>
                <StatisticsWidget3
                    title="Rendimento Médio Empresa"
                    stats={'5%'}
                    color={'#f05050'}
                    subTitle="Rendimento por dia útil"
                />
            </Col>
        </Row>
    );
};

export default Statistics;
