import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';

// component
import Statistics from './Statistics';
import SalesChart from './SalesChart';
import RevenueChart from './RevenueChart';
import CustomTable from './CustomTable';


const DashBoard1 = () => {
    // set pagetitle
    usePageTitle({
        title: 'DashBoard',
        breadCrumbItems: [
            {
                path: '/dashboard',
                label: 'DashBoard',
                active: true,
            },
        ],
    });

    return (
        <>

            <Row>
                
                <Col xl={12}>
                    <RevenueChart />
                </Col>
            </Row>

            <Statistics />

            <Row>
                <Col xl={8}>
                  <CustomTable />
                </Col>
                <Col xl={4}>
                    <SalesChart />
                </Col>
            </Row>
        </>
    );
};

export default DashBoard1;
