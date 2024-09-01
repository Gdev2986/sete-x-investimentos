import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';

// component
import CustomTable from './CustomTable';


const Yields = () => {
    // set pagetitle
    usePageTitle({
        title: 'Retiradas',
        breadCrumbItems: [
            {
                path: '/dashboard-admin/withdrawals',
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

export default Yields;
