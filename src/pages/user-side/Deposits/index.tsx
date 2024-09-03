import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';

// component
import Statistics from './Statistics';
import RevenueChart from './RevenueChart';


const DepositsUser = () => {

    usePageTitle({
        title: 'Depositos',
        breadCrumbItems: [
            {
                path: '/dashboard-user',
                label: 'Depositos',
                active: true,
            },
        ],
    });

    return (
        <>
            <Statistics />

            <Row>
                <Col xl={12}>
                    <RevenueChart />
                </Col>
            </Row>
        </>
    );
};

export default DepositsUser;
