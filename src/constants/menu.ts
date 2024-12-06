export type MenuItemTypes = {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
      variant: string;
      text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemTypes[];
    role?: string; 
  };

const MENU_ITEMS: MenuItemTypes[] = [
    { key: 'navigation', label: 'Visão Geral', isTitle: true },
    // Admin Sidebar
    {
        key: 'admin/dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard-outline',
        url: 'admin/dashboard',
        role: 'admin', // Somente Admin pode ver
    },
    {
        key: 'yields',
        label: 'Rendimentos',
        isTitle: false,
        icon: 'mdi mdi-chart-line',
        url: 'admin/yields',
        role: 'admin', // Somente Admin pode ver
    },
    {
        key: 'clients',
        label: 'Clientes',
        isTitle: false,
        icon: 'mdi mdi-account',
        url: 'admin/clients',
        role: 'admin', // Somente Admin pode ver
    },
    {
        key: 'deposits',
        label: 'Depositos',
        isTitle: false,
        icon: 'mdi mdi-cash-plus',
        url: 'admin/deposits',
        role: 'admin', // Somente Admin pode ver
    },
    {
        key: 'withdrawals',
        label: 'Retiradas',
        isTitle: false,
        icon: 'mdi mdi-cash-refund',
        url: 'admin/withdrawals',
        role: 'admin', // Somente Admin pode ver
    },
    // User Sidebar
    {
        key: 'dashboard-user',
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard-outline',
        url: 'user/dashboard',
        role: 'user', // Somente User pode ver
    },
    {
        key: 'investments',
        label: 'Investimentos',
        isTitle: false,
        icon: 'mdi mdi-chart-line',
        url: 'user/investments',
        role: 'user', // Somente User pode ver
    },
    {
        key: 'deposits',
        label: 'Depositos',
        isTitle: false,
        icon: 'mdi mdi-cash-plus',
        url: 'user/deposits',
        role: 'user', // Somente User pode ver
    },
];


export { MENU_ITEMS };
