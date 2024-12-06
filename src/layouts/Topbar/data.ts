import { Notification, ProfileMenu } from '../types';
import { user } from "../../helpers/fake-backend"
 
// get the notifications
const notifications: Notification[] = [
    {
        id: 1,
        text: 'Ana Silva solicitou uma retirada',
        subText: '5 min atrás',
        icon: 'mdi mdi-cash-refund',
        bgColor: 'success',
    },
    {
        id: 2,
        text: 'Gabriel Campos realizou um novo depósito',
        subText: '10 min atrás',
        icon: 'mdi mdi-cash-plus',
        bgColor: 'info',
    },
    {
        id: 3,
        text: 'Novo cliente cadastrado: João Pereira',
        subText: '30 min atrás',
        icon: 'mdi mdi-account-plus',
        bgColor: 'warning',
    },
    {
        id: 4,
        text: 'Rendimento atualizado para todos os clientes',
        subText: '2 horas atrás',
        icon: 'mdi mdi-chart-line',
        bgColor: 'primary',
    },
    {
        id: 5,
        text: 'Retirada de R$ 500 aprovada para Ana Silva',
        subText: '3 horas atrás',
        icon: 'mdi mdi-check',
        bgColor: 'success',
    },
    {
        id: 6,
        text: 'Alerta de segurança: Tentativa de login suspeita',
        subText: '6 horas atrás',
        icon: 'mdi mdi-alert-circle',
        bgColor: 'danger',
    },
    {
        id: 7,
        text: 'Carlos Oliveira comentou na página de suporte',
        subText: '1 dia atrás',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'info',
    },
    {
        id: 8,
        text: 'Pagamento via PIX recebido: R$ 1.200',
        subText: '2 dias atrás',
        icon: 'mdi mdi-cash-multiple',
        bgColor: 'success',
    },
    {
        id: 9,
        text: 'Cliente José Matos solicitou suporte',
        subText: '3 dias atrás',
        icon: 'mdi mdi-help-circle',
        bgColor: 'secondary',
    },
    {
        id: 10,
        text: 'Novo usuário admin adicionado: Maria Souza',
        subText: '4 dias atrás',
        icon: 'mdi mdi-account-star',
        bgColor: 'primary',
    },
];


// get the profilemenu
const profileMenus: ProfileMenu[] = [
    {
        label: 'Meu Perfil',
        icon: 'fe-user',
        redirectTo: `/${user.role}/profile` ,
    },
    {
        label: 'Sair',
        icon: 'fe-log-out',
        redirectTo: '/auth/logout',
    },
];



export { notifications, profileMenus };
