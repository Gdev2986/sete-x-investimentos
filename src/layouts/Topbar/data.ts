import { Notification, ProfileMenu } from '../types';
import { user } from "../../helpers/fake-backend"
 
// images
import avatar1 from '../../assets/images/users/user-1.jpg';
import avatar4 from '../../assets/images/users/user-4.jpg';


// get the notifications
const notifications: Notification[] = [
    {
        id: 1,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        avatar: avatar1,
    },
    {
        id: 2,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary',
    },
    {
        id: 3,
        text: 'Karen Robinson',
        subText: 'Wow ! this admin looks good and awesome design',
        avatar: avatar4,
    },
    {
        id: 4,
        text: 'New user registered.',
        subText: '5 hours ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'warning',
    },
    {
        id: 5,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'info',
    },
    {
        id: 6,
        text: 'Carlos Crouch liked Admin',
        subText: '13 days ago',
        icon: 'mdi mdi-heart',
        bgColor: 'secondary',
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
        label: 'Bloqueio',
        icon: 'fe-lock',
        redirectTo: '/auth/lock-screen',
    },
    {
        label: 'Sair',
        icon: 'fe-log-out',
        redirectTo: '/auth/logout',
    },
];



export { notifications, profileMenus };
