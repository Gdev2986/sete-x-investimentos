import React, { useState } from "react";
// components
import ThemeSwitcher from "../../components/topbar/ThemeSwitcher"; // Importando o ThemeSwitcher
import NotificationDropdown from "../../components/topbar/NotificationDropdown";
import ProfileDropdown from "../../components/topbar/ProfileDropdown";
// hooks
import { useRedux } from "../../hooks";

// constants
import { LayoutTypes } from "../../constants";

// dummy data
import { notifications, profileMenus } from "./data";

// images
import logoSm from "../../assets/images/logo-sm.png";
import avatar1 from "../../assets/images/users/profileImg.jpg";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

import { Link } from "react-router-dom";
import classNames from "classnames";
let user: any = sessionStorage.getItem('setex_user');
user = JSON.parse(user);

type TopbarProps = {
  openLeftMenuCallBack: () => void;
  containerClass?: string;
};

const Topbar = ({ openLeftMenuCallBack, containerClass }: TopbarProps) => {
  const { dispatch, appSelector } = useRedux(); // Utilizando Redux para obter o estado
  const [isopen, setIsopen] = useState<boolean>(false);

  // Obtendo os estados do layout e título da página
  const { layout, pageTitle } = appSelector((state) => ({
    layout: state.Layout.layoutType,
    pageTitle: state.PageTitle.pageTitle,
  }));

  /**
   * Toggle the left menu when having mobile screen
   */
  const handleLeftMenuCallBack = () => {
    setIsopen(!isopen);
    if (openLeftMenuCallBack) openLeftMenuCallBack();
  };

  return (
    <div className="navbar-custom">
      <div className={containerClass}>
        <ul className="list-unstyled topnav-menu float-end mb-0">
          {/* Theme Switcher */}
          <li
            className="dropdown notification-list"
            style={{ marginTop: "-3px" }}
          >
            <ThemeSwitcher />{" "}
            {/* Usando o ThemeSwitcher para alternar o tema */}
          </li>

          <li className="dropdown notification-list topbar-dropdown">
            <NotificationDropdown notifications={notifications} />
          </li>
          <li className="dropdown notification-list topbar-dropdown">
            {/* User */}
            <ProfileDropdown
              userImage={avatar1}
              username={user.user.username}
              userId={user.user.id} // Aqui você passa o ID do usuário
              menuItems={profileMenus}
            />
          </li>
        </ul>

        {/* LOGO  */}
        <div className="logo-box">
          <Link to="/" className="logo logo-dark text-center">
            <span className="logo-sm">
              <img src={logoSm} alt="logo-sm" height="60" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="logo-dark" height="60" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light text-center">
            <span className="logo-sm">
              <img src={logoSm} alt="logo-sm" height="60" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="logo-light" height="60" />
            </span>
          </Link>
        </div>

        <ul className="list-unstyled topnav-menu topnav-menu-left mb-0">
          {layout === LayoutTypes.LAYOUT_VERTICAL ? (
            <>
              {/* Mobile menu toggle (Vertical Layout) */}
              <li onClick={handleLeftMenuCallBack}>
                <button className="button-menu-mobile disable-btn waves-effect">
                  <i className="fe-menu"></i>
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Mobile menu toggle (Horizontal Layout) */}
              <li>
                <Link
                  to="#"
                  className={classNames("navbar-toggle nav-link", {
                    open: isopen,
                  })}
                  onClick={handleLeftMenuCallBack}
                >
                  <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Link>
              </li>
            </>
          )}

          {layout === LayoutTypes.LAYOUT_VERTICAL && (
            <li>
              <h4 className="page-title-main">{pageTitle.title}</h4>
            </li>
          )}
        </ul>

        <div className="clearfix"></div>
      </div>
    </div>
  );
};

export default Topbar;
