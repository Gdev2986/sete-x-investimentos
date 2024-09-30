import { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// helpers
import { getMenuItems } from '../helpers/menu';
import { user } from '../helpers/fake-backend'; // Importando o user do backend fake

// components
import Scrollbar from '../components/Scrollbar';
import AppMenu from './Menu';

// images
import profileImg from '../assets/images/users/user-1.jpg';

/* Função para filtrar itens de menu por role */
const filterMenuByRole = (menuItems: any[], userRole: string) => {
    return menuItems.filter((item) => !item.role || item.role === userRole); // Filtra por role ou exibe se o item não tiver role
};

/* user box */
const UserBox = () => {
    // Menu de perfil

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    /*
     * toggle dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="user-box text-center">
            <img src={profileImg} alt="" title={user.username} className="rounded-circle img-thumbnail avatar-md" />
            <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle
                    id="dropdown-notification"
                    to={`/${user.role}/profile`}
                    as={Link}
                    onClick={toggleDropdown}
                    className="user-name h5 mt-2 mb-1 d-block"
                >
                    {user.username}
                </Dropdown.Toggle>
              
            </Dropdown>
            <p className="text-muted left-user-info">{user.role}</p> {/* Exibe o role do usuário */}
        </div>
    );
};

/* sidebar content */
const SideBarContent = () => {
    const filteredMenuItems = filterMenuByRole(getMenuItems(), user.role); // Filtra os itens com base no role

    return (
        <>
            <UserBox />

            <div id="sidebar-menu">
                <AppMenu menuItems={filteredMenuItems} /> {/* Renderiza itens filtrados */}
            </div>

            <div className="clearfix" />
        </>
    );
};

type LeftSidebarProps = {
    isCondensed: boolean;
};

const LeftSidebar = ({ isCondensed }: LeftSidebarProps) => {
    const menuNodeRef: any = useRef(null);

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e: any) => {
        if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, []);

    return (
        <div className="left-side-menu" ref={menuNodeRef}>
            {!isCondensed ? (
                <Scrollbar style={{ maxHeight: '100%' }}>
                    <SideBarContent />
                </Scrollbar>
            ) : (
                <SideBarContent />
            )}
        </div>
    );
};

LeftSidebar.defaultProps = {
    isCondensed: false,
};

export default LeftSidebar;
