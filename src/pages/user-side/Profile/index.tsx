import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';



const ProfileUser = () => {
    // set pagetitle
    usePageTitle({
        title: 'Profile',
        breadCrumbItems: [
            {
                path: 'user/profile',
                label: 'Profile',
                active: true,
            },
        ],
    });

    return (
        <Row>
            <Col sm={4}>

            </Col>
        </Row>
    );
};

export default ProfileUser;
