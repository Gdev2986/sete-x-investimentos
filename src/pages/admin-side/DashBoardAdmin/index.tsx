import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';

// component
import Statistics from './Statistics';
import SalesChart from './SalesChart';
import SplineAreaChart from './SplineAreaChart';
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
            <Statistics />

            <Row>
                
                <Col xl={8}>
                    <SplineAreaChart />
                </Col>
                <Col xl={4}>
                    <SalesChart />
                </Col>
            </Row>


            <Row>
                <Col xl={12}>
                  <CustomTable />
                </Col>
                
            </Row>
        </>
    );
};

export default DashBoard1;
