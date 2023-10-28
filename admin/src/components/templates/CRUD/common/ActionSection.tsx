import React from "react";
import ActionButton from "../../Button/ActionButton";
import { AiOutlineDelete } from "react-icons/ai";
import { LuBadgePlus } from "react-icons/lu";
import CommonDrawer from "../../../drawer/common";
import useDrawer from "../../../../hooks/useDrawer";
import { useTranslation } from "react-i18next";
import DeleteModal from "../../../modal/DeleteModal";
import SearchInput from "../../Fields/SearchInput";
import Filter from "../../Fields/Filter";
import { GrCloudDownload, GrMultiple } from "react-icons/gr";
import LabelFilter from "../../../modal/LabelFilter";

type ActionSectionProps = {
  title: string;
  addActionComponent: React.ReactNode;
  bulkActionComponent?: React.ReactNode;
  isSelectAll: boolean;
  selectedIds?: string[];
  deleteMultipleRecordHandler: () => void,
  screenWidth?: string
};

const ActionSection: React.FC<ActionSectionProps> = ({ title, addActionComponent, bulkActionComponent, isSelectAll, deleteMultipleRecordHandler, screenWidth, selectedIds }) => {
  const { t } = useTranslation();
  const { drawerType, closeDrawer, toggleDrawer } = useDrawer();

  // Function to pass closeDrawer prop to child components
  const renderAddActionComponent = React.cloneElement(addActionComponent as React.ReactElement, { closeDrawer });
  const renderBulkActionComponent = bulkActionComponent && React.cloneElement(bulkActionComponent as React.ReactElement, { closeDrawer, selectedIds });

  return (
    <section className="flex items-end sm:justify-end max-sm:flex-wrap rounded-md py-3">
      <div className="flex items-center gap-2 mr-auto max-sm:w-full">
        <Filter />
        <SearchInput title={title} />
      </div>

      {/* CSV Download Button */}
      {title === 'label' &&
        <LabelFilter
          buttonTitle="label-filter"
          buttonLayout={
            <ActionButton
              Icon={GrCloudDownload}
              bg="bg-greenish hover:bg-greenish hover:text-blue-500 max-sm:bg-danger max-sm:text-white max-sm:w-full"
              title={t(`download-csv`)}
              onClick={() => null}
            />
          }
        />}

      {/* Delete Button */}
      <DeleteModal
        deleteHandler={deleteMultipleRecordHandler}
        deleteButtonTitle="delete all"
        buttonLayout={
          <ActionButton
            disabled={!isSelectAll}
            Icon={AiOutlineDelete}
            bg="bg-danger hover:bg-red-100 hover:text-red-500 max-sm:bg-danger max-sm:text-white max-sm:w-full"
            title={t(`delete-all`)}
            onClick={() => null}
          />
        }
      />
      {/* Bulk Button and Drawer */}
      {bulkActionComponent &&
        <CommonDrawer
          toggleButton={
            <ActionButton
              disabled={!isSelectAll}
              Icon={GrMultiple}
              bg="bg-primaryGreen hover:bg-secondaryLightBlue hover:text-primaryGreen max-sm:bg-secondaryLightBlue max-sm:text-primaryGreen max-sm:w-full"
              title={t(`bulk-${title}`)}
              onClick={() => toggleDrawer("bulk")}
            />
          }
          screenWidth={screenWidth}
          closeDrawer={closeDrawer}
          isDrawerOpen={drawerType === 'bulk'}
        >
          {renderBulkActionComponent}
        </CommonDrawer>
      }

      {/* Add Button and Drawer */}
      <CommonDrawer
        toggleButton={
          <ActionButton
            Icon={LuBadgePlus}
            bg="bg-primaryGreen hover:bg-secondaryLightBlue hover:text-primaryGreen max-sm:bg-secondaryLightBlue max-sm:text-primaryGreen max-sm:w-full"
            title={t(`add-${title}`)}
            onClick={() => toggleDrawer("add")}
          />
        }
        screenWidth={screenWidth}
        closeDrawer={closeDrawer}
        isDrawerOpen={drawerType === 'add'}
      >
        {renderAddActionComponent}
      </CommonDrawer>
    </section>
  );
};

export default ActionSection;
