import { Col, Row } from 'react-bootstrap';
import CustomTable from './CustomTable';
// hooks
import { usePageTitle } from '../../../hooks';



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
            <Row>
                <Col xl={12} >
                  <CustomTable />
                </Col>
            </Row>
        </>
    );
};

export default DepositsUser;
