import { Col, Row } from 'react-bootstrap';
import React from 'react';
// hooks
import { usePageTitle } from '../../../hooks';
import CustomTable from './CustomTable';
import CustomTable2 from './CustomTable 2';
import Statistics from './Statistics';


const InvestmentsUser = () => {

    usePageTitle({
        title: 'Investimentos',
        breadCrumbItems: [
            {
                path: '/dashboard-user/investments',
                label: 'Investimentos',
                active: true,
            },
        ],
    });

    return (
        <>
            <Statistics />

            <Row>
                <Col xl={12}>
                    <CustomTable />
                    <CustomTable2 />
                </Col>
            </Row>
        </>
    );
};

export default InvestmentsUser;
