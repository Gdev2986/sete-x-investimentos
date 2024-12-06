import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// hooks
import { useToggle } from '../../hooks/';

// types
import { ProfileMenu } from '../../layouts/types';

type ProfileDropdownProps = {
    userImage: string;
    username: string;
    userId: number; // Adicionando o ID do usuário como prop
    menuItems: ProfileMenu[];
};

const ProfileDropdown = ({ userImage, username, userId, menuItems }: ProfileDropdownProps) => {
    const [isOpen, show, hide] = useToggle();

    /*
     * toggle apps-dropdown
     */
    const toggleDropdown = () => {
        isOpen ? hide() : show();
    };

    return (
        <Dropdown show={isOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                as="a"
                variant=""
                className="nav-link nav-user me-0 waves-effect waves-light"
                id="page-header-user-dropdown"
                onClick={toggleDropdown}
            >
                <img src={userImage} alt="user" className="rounded-circle" />
                <span className="pro-user-name ms-1">
                    {username}
                    <i className="mdi mdi-chevron-down ms-1"></i> {/* Setinha do dropdown */}
                </span>
                {/* Exibir ID do usuário abaixo do nome */}
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="profile-dropdown">
                <div onClick={toggleDropdown}>
                    <Dropdown.Header className="noti-title">
                        <h6 className="text-overflow m-0">Bem-vindo !</h6>
                        <div style={{ fontSize: '0.75rem', marginTop: '0px', marginBottom: '-15px', color: '#6c757d' }}>id: {userId}</div>
                    </Dropdown.Header>

                    {(menuItems || []).map((menu, i) => {
                        return (
                            <React.Fragment key={i + '-menu'}>
                                {i === menuItems.length - 1 && <Dropdown.Divider as="div" />}
                                <Link
                                    to={menu.redirectTo}
                                    className="dropdown-item notify-item"
                                    key={i + '-profile-menu'}
                                >
                                    <i className={classNames(menu.icon, 'me-1')}></i>
                                    <span>{menu.label}</span>
                                </Link>
                            </React.Fragment>
                        );
                    })}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
