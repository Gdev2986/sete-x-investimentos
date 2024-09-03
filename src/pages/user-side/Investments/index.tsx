import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';

// component
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
                </Col>
            </Row>
        </>
    );
};

export default InvestmentsUser;
