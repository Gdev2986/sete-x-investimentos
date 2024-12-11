import { Col, Row } from 'react-bootstrap';
import React from 'react';
import { Card } from 'react-bootstrap';


type StatisticsWidget1Props = {
    title: string;
    color: string;
    stats: string;
    subTitle: string;
};

type StatisticsWidget2Props = {
    title: string;
    color: string;
    stats: string;
    subTitle: string;
};

type StatisticsWidget3Props = {
    title: string;
    color: string;
    stats: string;
    subTitle: string;
};

type StatisticsWidget4Props = {
    title: string;
    color: string;
    stats: string;
    subTitle: string;
};

const StatisticsWidget1 = ({ title, stats, subTitle }: StatisticsWidget1Props) => {


    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-4">{title}</h4>
                <div className="widget-chart-1">
                    <div className="widget-detail-1 text-end">
                        {/* Adicionando o ícone mdi-cash-lock ao lado do valor */}
                        <div className="d-flex align-items-center justify-content-between">
                            <i className="mdi mdi-cash-lock" style={{ fontSize: '40px', width: "50px", height: "50px", color: '#6c757d',}}></i>
                            <h2 className="fw-normal pt-2 mb-1 ">{stats}</h2>
                        </div>
                        <p className="text-muted mb-1">{subTitle}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

const StatisticsWidget2 = ({ title, stats, subTitle }: StatisticsWidget2Props) => {

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-4">{title}</h4>
                <div className="widget-chart-1">
                    <div className="widget-detail-1 text-end">
                        {/* Adicionando o ícone mdi-cash-lock ao lado do valor */}
                        <div className="d-flex align-items-center justify-content-between">
                            <i className="mdi mdi-wallet-outline" style={{ fontSize: '40px', width: "50px", height: "50px", color: '#6c757d',}}></i>
                            <h2 className="fw-normal pt-2 mb-1 ">{stats}</h2>
                        </div>
                        <p className="text-muted mb-1">{subTitle}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

const StatisticsWidget3 = ({ title, stats, subTitle }: StatisticsWidget3Props) => {


    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-4">{title}</h4>
                <div className="widget-chart-1">
                    <div className="widget-detail-1 text-end">
                        {/* Adicionando o ícone mdi-cash-lock ao lado do valor */}
                        <div className="d-flex align-items-center justify-content-between">
                            <i className="mdi mdi-chart-timeline-variant" style={{ fontSize: '40px', width: "50px", height: "50px", color: '#6c757d',}}></i>
                            <h2 className="fw-normal pt-2 mb-1 ">{stats}</h2>
                        </div>
                        <p className="text-muted mb-1">{subTitle}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

const StatisticsWidget4 = ({ title, stats, subTitle }: StatisticsWidget4Props) => {

   return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-4">{title}</h4>
                <div className="widget-chart-1">
                    <div className="widget-detail-1 text-end">
                        {/* Adicionando o ícone mdi-cash-lock ao lado do valor */}
                        <div className="d-flex align-items-center justify-content-between">
                            <i className="mdi mdi-cash-multiple" style={{ fontSize: '40px', width: "50px", height: "50px", color: '#41c56d',}}></i>
                            <h2 className="fw-normal pt-2 mb-1 " style={{color: '#41c56d'}}>{stats}</h2>
                        </div>
                        <p className="text-muted mb-1">{subTitle}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

const Statistics = () => {
    return (
        <Row style={{justifyContent: "space-between"}}>
            <Col xl={3} md={6}>
                <StatisticsWidget1
                    title="Total Alocado"
                    stats={"R$50.000"}
                    color={'#f05050'}
                    subTitle="Valor Total"
                />
            </Col>
            <Col xl={3} md={6}>
                <StatisticsWidget2
                    title="Total Rendimento"
                    stats={"R$12.000"}
                    color={'#f05050'}
                    subTitle="Todos os valores"
                />
            </Col>
            <Col xl={3} md={6}>
                <StatisticsWidget3
                    title="Rendimento Médio Empresa"
                    stats={"5%"}
                    color={'#f05050'}
                    subTitle="Rendimento por dia útil"
                />
            </Col>
            <Col xl={3} md={6}>
                <StatisticsWidget4
                    title="Saldo Atual"
                    stats={"R$62.000"}
                    color={'#f05050'}
                    subTitle="Total Empresa"
                />
            </Col>
        </Row>
    );
};

export default Statistics;
