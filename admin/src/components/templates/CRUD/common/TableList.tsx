// DynamicTable.tsx
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";

interface DynamicTableProps {
  data: any[]; // Replace 'any[]' with the actual type of your data
  columns: string[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ data, columns }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      const allIds = data.map((item) => item.id); // Replace 'id' with the actual ID property name in your data
      setSelectedIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleEditClick = () => {};
  const handleDeleteClick = () => {};

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
            {columns.map((column, index) => (
              <th key={index}>{column.replace(/_/g, " ")}</th>
            ))}
            <th>Action</th> {/* Add a new column for actions */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
              {columns.map((column, index) => (
                <td key={index}>{item[column]}</td>
              ))}
              <td>
                <BiEdit
                  className="text-blue-500 cursor-pointer mr-2"
                  onClick={() => handleEditClick()} // Implement your edit logic here
                />
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteClick()} // Implement your delete logic here
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
