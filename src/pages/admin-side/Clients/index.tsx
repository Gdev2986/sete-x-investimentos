import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';

// component
import Statistics from './Statistics';
import CustomTable from './CustomTable';


const Clients = () => {
    // set pagetitle
    usePageTitle({
        title: 'Clientes',
        breadCrumbItems: [
            {
                path: '/dashboard-admin/clients',
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
                  <CustomTable />
                </Col>
            </Row>
        </>
    );
};

export default Clients;
