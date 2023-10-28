import { AiOutlineTags, AiOutlinePoweroff } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import SidebarSubMenu from "./SidebarSubMenu";
import { sidebarMenuData } from "../../data/menuData";
import Avatar from "../profile/Avatar";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";
import { logout } from "../../utils/authActions";
import useAuth from "../../hooks/useAuth";
import { filterMenuDataByRole } from "../../utils/menuFilter";

type SidebarProps = {
  isOpen: boolean;
  toggleSideBar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSideBar }) => {
  const { role } = useAuth()
  const filteredSidebarMenu = filterMenuDataByRole(sidebarMenuData, role);

  return (
    <aside
      className={`${isOpen ? "w-96 max-sm:w-4/5" : "absolute -left-96 hidden"
        } max-w-md relative max-sm:absolute left-0 bg-white dark:bg-primaryDarkGray border-r z-40 border-secondaryLightGray h-screen`}
    >
      <NavLink to="/" className="flex items-center gap-2 text-primaryDarkGray text-xl font-jakartaPlus font-semibold text-center mb-6 px-5 pt-5 hover:scale-105 cursor-pointer">
        <AiOutlineTags size={30} /> <span>Label Makers</span>
      </NavLink>

      {/* Collapse Button */}
      <button
        onClick={toggleSideBar}
        className="text-primaryGreen  z-50 bg-white rounded-full text-4xl absolute hidden max-sm:block -right-5 top-5"
      >
        {!isOpen ? <FaCircleChevronRight /> : <FaCircleChevronLeft />}
      </button>

      <div className="h-4/5 p-5 overflow-y-auto">
        <div className="space-y-8 px-2 pb-16">
          {Object.entries(filteredSidebarMenu).map(
            ([key, menuItems], _menuIndex) => (
              <div key={key} className="space-y-2">
                <h6 className="text-primaryDarkGray text-xs font-bold uppercase">
                  {key}
                </h6>
                <nav className="space-y-2">
                  {menuItems.map(({ Icon, ...rest }, _menuItemIndex) => (
                    <div key={rest.title} className="space-x-2">
                      {rest.hasSubMenu ? (
                        <SidebarSubMenu
                          title={rest.title}
                          subMenus={rest.subMenus}
                          Icon={Icon}
                        />
                      ) : (
                        <NavLink
                          to={rest.path}
                          key={key}
                          className={({ isActive }) => `
                            ${isActive
                              ? "activeMenuAdditional"
                              : "inactiveMenuAdditional"
                            } sidebarMenuItem
                        `}
                        >
                          <Icon size={20} /> {rest.title}
                        </NavLink>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            )
          )}
        </div>
      </div>

      <div
        className={`${isOpen ? "left-0" : "-left-96"
          } p-5 absolute bottom-0 w-full bg-white`}
      >
        <div className="flex items-center gap-5 bg-greenish rounded-md p-3">
          <Avatar />
          <div>
            <span className="block text-lg font-semibold">Mathew</span>
            <span className="block text-sm">Designer</span>
          </div>
          <AiOutlinePoweroff
            onClick={logout}
            className="ml-auto mr-3 text-primaryGreen hover:drop-shadow-md shadow-black hover:scale-125 cursor-pointer"
            size={20}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
