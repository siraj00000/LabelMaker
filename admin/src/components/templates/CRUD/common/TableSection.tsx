// components/TableSection.tsx
import React from "react";
import DataTable from "../../Tables/DataTable";
import Pagination from "../../Tables/Pagination";
import { PaginationTypes } from "../../../../types/response.type";

type TableSectionProps = {
  data: {
    data: any[];
    pagination: PaginationTypes
  }; // Update this type as per your data structure
  columns: string[];
  updateSelection: React.Dispatch<React.SetStateAction<string[]>>;
  selectedIds: string[];
  updateStatus: (id: string) => void;
  editActionComponent: React.ReactNode;
  itemViewComponent?: React.ReactNode;
  deleteRecord: (id: string) => void;
  screenWidth?: string
};

const TableSection: React.FC<TableSectionProps> = ({ data, columns, updateSelection, selectedIds, updateStatus, editActionComponent, itemViewComponent, deleteRecord, screenWidth }) => {
  return (
    <section className="border border-secondaryLightGray rounded-md overflow-hidden">
      <DataTable
        data={data.data}
        columns={columns}
        updateSelection={updateSelection}
        selectedIds={selectedIds}
        updateStatus={updateStatus}
        editActionComponent={editActionComponent}
        itemViewComponent={itemViewComponent}
        deleteRecord={deleteRecord}
        screenWidth={screenWidth}
      />
      <Pagination {...data.pagination} />
    </section>
  );
};

export default TableSection;
