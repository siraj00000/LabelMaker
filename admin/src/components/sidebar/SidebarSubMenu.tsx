import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TbPoint } from "react-icons/tb";
import { BiChevronDown } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import { roleTypes } from "../../types";

type SubMenu = {
  title: string;
  path: string;
  role: roleTypes
};

type SidebarSubMenuProps = {
  subMenus?: SubMenu[];
  title: string;
  Icon: React.ElementType<any>;
};

const SidebarSubMenu: React.FC<SidebarSubMenuProps> = ({
  Icon,
  subMenus,
  title,
}) => {
  const { role } = useAuth();
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleSubMenuToggle = () => {
    setShowSubMenu(!showSubMenu);
  };

  let filterSubMenu = subMenus?.filter(i => i.role === role);

  return (
    <div>
      <button
        onClick={handleSubMenuToggle}
        className={`${showSubMenu ? "activeMenuAdditional" : "inactiveMenuAdditional"
          } sidebarMenuItem w-full `}
      // className={`w-full flex justify-between bg-white hover:bg-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75`}
      >
        <span className="w-4/5 flex items-center gap-3">
          <Icon size={20} /> {title}
        </span>
        <BiChevronDown
          size={20}
          className={`transform ${showSubMenu ? "rotate-180" : "rotate-0"
            } transition-transform duration-500 ease-in-out`}
        />
      </button>
      <div
        className={`pl-3 transition-all duration-500 ease-in-out ${showSubMenu ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"
          }`}
      >
        {showSubMenu && (
          <div className="space-y-3 py-5">
            {filterSubMenu &&
              filterSubMenu.map((menu) => (
                <div
                  key={menu.title}
                  className="text-gray-600 hover:text-primaryGreen text-sm flex items-center gap-3 cursor-pointer"
                >
                  <TbPoint size={20} />{" "}
                  <NavLink to={menu.path}>{menu.title}</NavLink>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarSubMenu;
