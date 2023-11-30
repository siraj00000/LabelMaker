import React, { useState } from "react";
import HeaderSection from "./HeaderSection";
import ActionSection from "./ActionSection";
import TableSection from "./TableSection";

type CommonLayoutProps = {
  title: string;
  screenWidth?: string;
  data: { data: any[]; pagination: any };
  columns: string[];
  addActionComponent: React.ReactNode;
  editActionComponent: React.ReactNode;
  itemViewComponent?: React.ReactNode;
  bulkActionComponent?: React.ReactNode;
  updateStatus: (id: string) => void;
  deleteRecord: (id: string) => void;
  deleteMultipleRecordHandler: (ids: string[]) => void
};

const CommonLayout: React.FC<CommonLayoutProps> = ({
  title,
  data,
  columns,
  addActionComponent,
  editActionComponent,
  bulkActionComponent,
  itemViewComponent,
  updateStatus,
  deleteRecord,
  deleteMultipleRecordHandler,
  screenWidth
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // Check if more than one item is selected and data length is not zero
  let isMultipleItemsSelected = data.data?.length > 0 && selectedIds.length > 1;

  return (
    <main className="py-4 px-10 max-sm:px-5 space-y-2">
      <HeaderSection title={title} />
      <ActionSection
        title={title}
        addActionComponent={addActionComponent}
        bulkActionComponent={bulkActionComponent}
        deleteMultipleRecordHandler={() => deleteMultipleRecordHandler(selectedIds)}
        isSelectAll={isMultipleItemsSelected}
        selectedIds={selectedIds}
        screenWidth={screenWidth}
      />
      <TableSection
        data={data}
        columns={columns}
        updateSelection={setSelectedIds}
        selectedIds={selectedIds}
        updateStatus={updateStatus}
        editActionComponent={editActionComponent}
        itemViewComponent={itemViewComponent}
        deleteRecord={deleteRecord}
        screenWidth={screenWidth}
      />
    </main>
  );
};

export default CommonLayout;
