import React from 'react';
import { Link } from 'react-router-dom';
import { useRedux } from '../../hooks';
import * as layoutConstants from '../../constants/layout';
import { changeLayoutColor, changeSidebarTheme, changeTopbarTheme } from '../../redux/actions';

const ThemeSwitcher = () => {
    const { dispatch, appSelector } = useRedux();
    
    const { layoutColor, leftSideBarTheme, topbarTheme } = appSelector((state) => ({
        layoutColor: state.Layout.layoutColor,
        leftSideBarTheme: state.Layout.leftSideBarTheme,
        topbarTheme: state.Layout.topbarTheme,
    }));

    // Função para alternar o esquema de cores (Light/Dark)
    const toggleLayoutColor = () => {
        const newColor =
            layoutColor === layoutConstants.LayoutColor.LAYOUT_COLOR_LIGHT
                ? layoutConstants.LayoutColor.LAYOUT_COLOR_DARK
                : layoutConstants.LayoutColor.LAYOUT_COLOR_LIGHT;

        dispatch(changeLayoutColor(newColor));

        // Removendo qualquer classe existente antes de adicionar a nova
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(newColor === layoutConstants.LayoutColor.LAYOUT_COLOR_DARK ? 'dark' : 'light');
    };

    // Função para alternar o tema da barra lateral
    const toggleSidebarTheme = () => {
        const newTheme =
            leftSideBarTheme === layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT
                ? layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_DARK
                : layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT;

        dispatch(changeSidebarTheme(newTheme));

        const sidebar = document.querySelector('.left-side-menu');
        if (sidebar) {
            sidebar.classList.remove('light', 'dark');
            sidebar.classList.add(newTheme === layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_DARK ? 'dark' : 'light');
        }
    };

    // Função para alternar o tema da barra superior
    const toggleTopbarTheme = () => {
        const newTopbarTheme =
            topbarTheme === layoutConstants.TopbarTheme.TOPBAR_THEME_LIGHT
                ? layoutConstants.TopbarTheme.TOPBAR_THEME_DARK
                : layoutConstants.TopbarTheme.TOPBAR_THEME_LIGHT;

        dispatch(changeTopbarTheme(newTopbarTheme));
    };

    // Função para alternar todos os temas
    const handleThemeToggle = () => {
        toggleLayoutColor();
        toggleSidebarTheme();
        toggleTopbarTheme();
    };

    // Definindo o ícone com base no tema
    const iconClass = layoutColor === layoutConstants.LayoutColor.LAYOUT_COLOR_LIGHT
        ? 'mdi mdi-lightbulb-on-outline' // Ícone para o tema claro
        : 'mdi mdi-lightbulb-on'; // Ícone para o tema escuro

    return (
        <div>
            {/* Ícone para alternar o tema */}
            <Link to="#" className="nav-link waves-effect waves-light" onClick={handleThemeToggle}>
                <i className={`noti-icon ${iconClass}`}></i>
            </Link>
        </div>
    );
};

export default ThemeSwitcher;
