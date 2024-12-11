import { Col, Row } from 'react-bootstrap';
import React from 'react';

// hooks
import { usePageTitle } from '../../../hooks';

// component
import CustomTable from './CustomTable';


const Yields = () => {
    // set pagetitle
    usePageTitle({
        title: 'Depositos',
        breadCrumbItems: [
            {
                path: '/dashboard-admin/deposits',
                label: 'Depositos',
                active: true,
            },
        ],
    });

    return (
        <>
            <Row>
                <Col xl={12} >
                  <CustomTable />
                </Col>
            </Row>
        </>
    );
};

export default Yields;
