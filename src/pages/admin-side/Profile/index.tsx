import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';


const Profile = () => {
    // set pagetitle
    usePageTitle({
        title: 'Profile',
        breadCrumbItems: [
            {
                path: 'admin/profile',
                label: 'Profile',
                active: true,
            },
        ],
    });

    return (
        <Row>
            <Col sm={8}>
                
            </Col>
        </Row>
    );
};

export default Profile;
