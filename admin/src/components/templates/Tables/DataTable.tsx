import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import Cookies from "js-cookie";
import ToggleSwitch from "../../switch/Switch";
import Checkbox from "../Fields/Checkbox";
import CommonDrawer from "../../drawer/common";
import { useTranslation } from "react-i18next";
import useDrawer from "../../../hooks/useDrawer";
import useModal from "../../../hooks/useModal";
import DeleteModal from "../../modal/DeleteModal";

interface DynamicTableProps {
  data: any[]; // Replace 'any[]' with the actual type of your data
  columns: string[];
  screenWidth?: string;
  updateSelection: React.Dispatch<React.SetStateAction<string[]>>;
  selectedIds: string[];
  updateStatus: (id: string) => void;
  editActionComponent: React.ReactNode;
  deleteRecord: (id: string) => void;
}

interface ColumnComponentMap {
  [key: string]: React.FC<{ item: any }>; // Explicitly type components with React.FC
}

const DataTable: React.FC<DynamicTableProps> = ({ data, columns, updateSelection, selectedIds, updateStatus, editActionComponent, deleteRecord, screenWidth }) => {
  const { t } = useTranslation();
  const { drawerType, closeDrawer, toggleDrawer } = useDrawer();
  const { handleOpenModal } = useModal();

  const lang = Cookies.get('i18next') || 'en';
  let isAllSelected = data?.length > 0 && selectedIds.length === data?.length;

  const toggleSelectAll = () => {
    const allIds = data?.map((item) => item._id);

    if (isAllSelected) {
      // Deselect all
      updateSelection([])
    } else {
      // Select all
      updateSelection(allIds)
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      updateSelection(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      updateSelection([...selectedIds, id]);
    }
  };

  // Define a mapping of column names to their corresponding components or render functions
  const columnComponentMap: ColumnComponentMap = {
    status: ({ item }) => (
      <ToggleSwitch
        status={['show', 'active'].includes(item.status) ? true : false}
        onStatusChange={() => handleStatusChange(item._id)}
      />
    ),
    // Add more columns as needed
  };

  const handleStatusChange = (id: string) => {
    updateStatus(id)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed max-sm:table-auto">
        <thead>
          <tr className="text-left bg-transparent border-b uppercase border-secondaryLightGray h-10 text-xs font-normal text-primaryDarkGray rounded-md">
            <th className="pl-5 w-[5%]" colSpan={1}>
              <Checkbox
                label=""
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="pl-5" colSpan={1}>ID</th>
            {columns.map((column, index) => (
              <th colSpan={['description', 'email'].includes(column) ? 2 : 1} key={index} className={`pl-2`}>{column.replace(/_/g, " ")}</th>
            ))}
            <th colSpan={1} className="relative right-2 text-right w-28">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-secondaryLightGray">
          {data?.map((item) => (
            <tr key={item._id} className="h-16 text-gray-600 text-sm">
              <td className="pl-5" colSpan={1}>
                <Checkbox
                  label=""
                  checked={selectedIds.includes(item._id)}
                  onChange={() => handleCheckboxChange(item._id)}
                />
              </td>
              <td className="pl-5 font-semibold" colSpan={1}>
                {item._id.toString().slice(-4)}
              </td>
              {columns.map((column, index) => (
                <td key={index} colSpan={['description', 'email'].includes(column) ? 2 : 1} className="px-2">
                  {columnComponentMap[column] ? (
                    // Use the mapped component or render function
                    columnComponentMap[column]({ item }) // Pass 'item' as a prop
                  ) : ['images', 'imagesURLs'].includes(column) && Array.isArray(item[column]) ? (
                    // Handle the "images" column specifically
                    item[column].length > 0 ? (
                      <div className="max-sm:w-14">
                        <img
                          src={item[column][0]} // Display the first image link
                          alt={item[column][0]}
                          className="rounded-full w-12 h-12 object-cover shadow"
                        />
                      </div>
                    ) : (
                      // If the "images" array is empty, display some default content or message
                      <div>
                        <img
                          src={require("../../../assets/png/placeholder-image.png")} alt="placeholder"
                          className="rounded-full w-12 h-12 object-cover object-center shadow"
                        />
                      </div>
                    )
                  ) : item[column] && typeof item[column] === 'string' ? (
                    item[column].startsWith('https') ? (
                      // If the value is a string starting with 'https', treat it as a link to an image
                      < div className="max-sm:w-14">
                        <img
                          src={item[column]}
                          alt={item[column]}
                          className="rounded-full w-12 h-12 object-cover shadow"
                        />
                      </div>
                    ) : (
                      // Display the value as-is
                      item[column]
                    )
                  ) : item[column] instanceof Object ? (
                    item[column][lang] // Assuming 'lang' is the selected language
                  ) : (
                    item[column]
                  )}
                </td>
              ))}

              <td className="flex items-center justify-end gap-2 px-2 h-16" colSpan={1}>
                <CommonDrawer
                  toggleButton={
                    <BiEdit
                      size={20}
                      className="text-slate-400 hover:scale-110 cursor-pointer"
                      title={t('bulk-action')}
                      onClick={() => toggleDrawer("edit" + item._id)} // Implement your edit logic here
                    />
                  }
                  closeDrawer={closeDrawer}
                  isDrawerOpen={drawerType === 'edit' + item._id}
                  screenWidth={screenWidth}
                >
                  {React.cloneElement(editActionComponent as React.ReactElement, { item, closeDrawer })} {/* Pass 'item' as a prop */}
                </CommonDrawer>

                <DeleteModal
                  deleteHandler={() => deleteRecord(item._id)}
                  deleteButtonTitle="delete"
                  buttonLayout={
                    <button onClick={() => handleOpenModal("delete")}>
                      <RiDeleteBin5Line size={20} className="text-red-500 hover:scale-110" />
                    </button>
                  }
                />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
};

export default DataTable;
