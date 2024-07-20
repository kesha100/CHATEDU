import { IconType } from 'react-icons/lib';

export interface SubMenuItemType {
    name: string;
    description?: string;
    href: string;
    badge?: string;
}

export interface ItemType {
    name: string;
    icon: IconType;
    href?: string;
    description?: string;
    badge?: string;
    subMenuItems?: SubMenuItemType[];
}

export interface MenuItemsType {
    id: string;
    name: string;
    title: string;
    icon: IconType;
    menuItems: ItemType[];
}