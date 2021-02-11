import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    navMenu;
    menuConfig = [
        {
            ID: 1,
            TAG: "M:A",
            PARENT_TAG: "MAIN",
            TITLE: "A Title"
        },
        {
            ID: 2,
            TAG: "AS1",
            PARENT_TAG: "M:A",
            TITLE: "A Subtitle 1"
        },
        {
            ID: 3,
            TAG: "AS2",
            PARENT_TAG: "M:A",
            TITLE: "A Subtitle 2"
        },
        {
            ID: 4,
            TAG: "AS3",
            PARENT_TAG: "M:A",
            TITLE: "A Subtitle 3"
        },
        {
            ID: 5,
            TAG: "M:B",
            PARENT_TAG: "MAIN",
            TITLE: "B Title"
        },
        {
            ID: 6,
            TAG: "BS1",
            PARENT_TAG: "M:B",
            TITLE: "B Subtitle 1"
        },
        {
            ID: 7,
            TAG: "BS2",
            PARENT_TAG: "M:B",
            TITLE: "B Subtitle 2"
        },
        {
            ID: 8,
            TAG: "M:C",
            PARENT_TAG: "MAIN",
            TITLE: "C Title"
        },
        {
            ID: 8,
            TAG: "CS1",
            PARENT_TAG: "M:C",
            TITLE: "C Subtitle 1"
        },
        {
            ID: 9,
            TAG: "M:D",
            PARENT_TAG: "MAIN",
            TITLE: "D Title"
        },
        {
            ID: 10,
            TAG: "DS1",
            PARENT_TAG: "M:D",
            TITLE: "D Subtitle 1"
        },
        {
            ID: 11,
            TAG: "DS2",
            PARENT_TAG: "M:D",
            TITLE: "D Subtitle 2"
        },
        {
            ID: 12,
            TAG: "DI1",
            PARENT_TAG: "DS1",
            TITLE: "D Inner Title 1"
        },
        {
            ID: 13,
            TAG: "DI2",
            PARENT_TAG: "DS1",
            TITLE: "D Inner Title 2"
        },
        {
            ID: 14,
            TAG: "DI3",
            PARENT_TAG: "DS2",
            TITLE: "D Inner Title 3"
        },
        {
            ID: 15,
            TAG: "DI4",
            PARENT_TAG: "DS2",
            TITLE: "D Inner Title 4"
        },
        {
            ID: 16,
            TAG: "M:E",
            PARENT_TAG: "MAIN",
            TITLE: "E Title"
        },

    ]

    constructor() {
        this.navMenu = this.getMenu();
        console.log(JSON.stringify(this.navMenu, null, 3));
        this.closeMenus();
    }

    getMenu() {
        let grouped = _.groupBy(this.menuConfig, "PARENT_TAG");
        return this.getItems(grouped.MAIN, grouped);

    }

    getItems(items, grouped) {
        let subMenu = [];
        _.forEach(items, (item) => {
            let newItem = this.getItem(item, grouped)
            if (newItem) {
                subMenu.push(newItem);
            }
        });
        return subMenu;
    }

    getItem(item, grouped) {
        if (grouped[item.TAG]) {
            let subMenu = this.getItems(grouped[item.TAG], grouped);
            if (subMenu && subMenu.length) {
                return {
                    title: item.TITLE,
                    menu: subMenu
                }
            }
        } else {
            let newItem = {
                title: item.TITLE
            }
            return newItem;
        }
    }

    openMenu(menu) {
        this.closeMenus();
        menu.isOpen = true;
    }

    openSubMenu(subMenu) {
        _.each(this.navMenu, (menu) => {
            _.each(menu.menu, (innerMenu) => {
                innerMenu.isOpen = false;
            })
        })
        subMenu.isOpen = true;
    }

    closeMenus() {
        _.each(this.navMenu, (menu) => {
            menu.isOpen = false;
            _.each(menu.menu, (subMenu) => {
                subMenu.isOpen = false;
            })
        })
    }
}