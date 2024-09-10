import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';

// component
import Statistics from './Statistics';
import SplineAreaChart from './RevenueChart';


const DashBoardUser = () => {

    usePageTitle({
        title: 'DashBoard',
        breadCrumbItems: [
            {
                path: 'user/dashboard',
                label: 'DashBoard',
                active: true,
            },
        ],
    });

    return (
        <>
            <Statistics />

            <Row>
                <Col xl={12}>
                    <SplineAreaChart />
                </Col>
            </Row>
        </>
    );
};

export default DashBoardUser;
