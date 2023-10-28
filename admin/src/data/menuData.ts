import { BsCart3 } from "react-icons/bs";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { MdOutlineManageAccounts, MdOutlinePrecisionManufacturing } from "react-icons/md";
import { TbShoppingBag } from "react-icons/tb";
import { Menu } from "../types";

export const sidebarMenuData: Menu = {
  home: [
    {
      title: "eCommerce",
      path: "/dashboard",
      Icon: BsCart3,
      hasSubMenu: false,
      role: ['Company Admin', 'Manufacturer Admin', 'Super Admin']
    },
  ],
  Apps: [
    {
      title: "Ecommerce",
      path: "",
      Icon: LiaShoppingBasketSolid,
      hasSubMenu: true,
      role: ['Company Admin', 'Super Admin'],
      subMenus: [
        {
          title: "Products",
          path: "products",
          role: "Company Admin"
        },
        {
          title: "Brands",
          path: "brands",
          role: "Super Admin"
        },
        {
          title: "Categories",
          path: "categories",
          role: "Super Admin"
        },
        {
          title: "Sub Category",
          path: "sub-categories",
          role: "Super Admin"
        },
      ],
    },
    {
      title: "Producers",
      path: "",
      Icon: MdOutlinePrecisionManufacturing,
      hasSubMenu: true,
      role: ['Manufacturer Admin', 'Super Admin'],
      subMenus: [
        {
          title: "Label",
          path: "label",
          role: "Manufacturer Admin"
        },
        {
          title: "Companies",
          path: "companies",
          role: "Super Admin"
        },
        {
          title: "Manufacturers",
          path: "manufacturers",
          role: "Super Admin"
        }
      ],
    },
    {
      title: "Associates",
      path: "",
      Icon: MdOutlineManageAccounts,
      hasSubMenu: true,
      role: ['Super Admin'],
      subMenus: [
        {
          title: "Staff",
          path: "staff",
          role: "Super Admin"
        },
      ],
    },
    {
      title: "Accessibility",
      path: "",
      Icon: MdOutlineManageAccounts,
      hasSubMenu: true,
      role: ['Super Admin'],
      subMenus: [
        {
          title: "Role & Permission",
          path: "accessibility",
          role: "Super Admin"
        },
      ],
    },
    {
      title: "Online Store",
      path: "http://localhost:4000/",
      Icon: TbShoppingBag,
      hasSubMenu: false,
      role: ['Company Admin', 'Manufacturer Admin', 'Super Admin'],
    },
  ],
};
