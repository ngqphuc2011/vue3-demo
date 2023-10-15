import { UploadIcon, HomeIcon, NewsIcon } from 'vue-tabler-icons';

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
        icon: HomeIcon,
        to: '/'
    },
    {
        title: 'News',
        icon: NewsIcon,
        to: '/news'
    },
    {
        title: 'Post',
        icon: UploadIcon,
        to: '/post'
    },
];

export default sidebarItem;
