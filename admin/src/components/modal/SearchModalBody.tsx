import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Assuming you're using React Router for navigation

// Define your menu data here
import { sidebarMenuData } from '../../data/menuData'; // Import your menu data

interface SubMenu {
  title: string;
  path: string;
}

interface MenuItem {
  title: string;
  path: string;
  Icon: React.ElementType;
  hasSubMenu: boolean;
  subMenus?: SubMenu[];
}

interface SearchQuickLinksProps {
  onClose: () => void;
}

const SearchQuickLinks: React.FC<SearchQuickLinksProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLinks: MenuItem[] = Object.values(sidebarMenuData)
    .flatMap((items) => items)
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subMenus &&
        item.subMenus.some((subItem) =>
          subItem.title.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    );

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white p-4 shadow-md">
      <input
        type="text"
        placeholder="Search..."
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mb-4 text-xl font-semibold">Quick Links</div>
      <ul>
        {filteredLinks.map((item) => (
          <li key={item.path} className="mb-2">
            {item.hasSubMenu ? (
              <ul>
                {item.subMenus?.map((subItem) => (
                  <li key={subItem.path}>
                    <NavLink to={subItem.path} onClick={handleLinkClick}>
                      {subItem.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <NavLink to={item.path} onClick={handleLinkClick}>
                <div className="flex items-center">
                  <item.Icon className="mr-2" />
                  {item.title}
                </div>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchQuickLinks;
