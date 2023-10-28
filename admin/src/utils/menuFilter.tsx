import { Menu, roleTypes } from "../types";

export const filterMenuDataByRole = (menuData: Menu, userRole: roleTypes) => {
    const filteredMenu: Menu = {}; // Explicitly define the type as Menu

    for (const [key, menuItems] of Object.entries(menuData)) {
        const filteredItems = menuItems.filter((menuItem) => {
            return menuItem.role.includes(userRole);
        });

        if (filteredItems.length > 0) {
            filteredMenu[key] = filteredItems;
        }
    }

    return filteredMenu;
};
