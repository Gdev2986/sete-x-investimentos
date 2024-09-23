import { Col, Row } from 'react-bootstrap';
import CustomTable from './CustomTable';
// hooks
import { usePageTitle } from '../../../hooks';

const WithdrawalsUser = () => {

    usePageTitle({
        title: 'Retiradas',
        breadCrumbItems: [
            {
                path: '/dashboard-user',
                label: 'Retiradas',
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

export default WithdrawalsUser;
