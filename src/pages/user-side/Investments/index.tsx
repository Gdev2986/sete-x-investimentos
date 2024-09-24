import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';
import CustomTable from './CustomTable';
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
                </Col>
            </Row>
        </>
    );
};

export default InvestmentsUser;
