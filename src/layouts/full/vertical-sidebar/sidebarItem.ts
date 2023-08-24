import { LayoutDashboardIcon, TypographyIcon } from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'Dashboard' },
    {
        title: 'Home',
        icon: LayoutDashboardIcon,
        to: '/'
    },
    {
        title: 'News',
        icon: TypographyIcon,
        to: '/news'
    }
];

export default sidebarItem;
