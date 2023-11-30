import React, { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { LuChevronsUpDown } from 'react-icons/lu';
import { ListData } from '../../../types';
import Cookies from 'js-cookie';
import Loader from '../../skeleton/Skeleton';
import { FaBoxOpen } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

interface Props {
  data: ListData[] | [] | null; // Pass the data as a prop
  fetchRelatedData: () => void;
  id?: string;
  placeholder?: string;
  name: string;
  dataKey: string;
  label: string;
  selectKey: string;
  defaultData?: ListData[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void; // Add Formik's setFieldValue
}

export default function CustomSingleSelect({ id, data, name, dataKey, selectKey, label, setFieldValue, fetchRelatedData, placeholder, defaultData }: Props) {
  const [selectedItems, setSelectedItems] = useState<ListData[]>(defaultData || []);

  const lang = Cookies.get('i18next') || 'en';
  const { t } = useTranslation();

  // Filter the data to exclude the category with the specified ID
  const filteredData = data ? data.filter((item) => item[selectKey] !== id) : null; // Add this line

  const toggleItem = (item: ListData) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem[dataKey] === item[dataKey]
    );

    if (isSelected) {
      setSelectedItems([]);
      setFieldValue(name, "");
    } else {
      setSelectedItems([item]);
      setFieldValue(name, item[selectKey]);
    }
  };

  return (
    <div className="w-full">
      <Listbox as="div" className="flex items-center gap-5 w-full">
        <label
          className="w-1/4 text-primaryDarkGray font-jakartaPlus text-sm max-sm:text-xs font-medium capitalize"
        >
          {t(label)}
        </label>
        <div className="relative w-3/4 ml-auto">
          <Listbox.Button onClick={fetchRelatedData} className="relative w-full border border-secondaryLightGray rounded-md py-[10px] px-[14px] outline-none">
            {selectedItems.length === 0 ?
              <span className="block truncate text-left text-sm text-gray-400">{t(`select-${placeholder}`)}</span>
              : <div className="flex items-center gap-2 my-2">
                {selectedItems.map((selectedItem) => (
                  <div key={selectedItem[dataKey]} className="flex justify-between cursor-pointer">
                    <span
                      onClick={() => toggleItem(selectedItem)}
                      className='text-xs text-white bg-primaryGreen rounded-md p-2'
                    >
                      {selectedItem[dataKey]}
                    </span>
                  </div>
                ))}
              </div>
            }

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <LuChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
              {!filteredData ? (
                <Loader size={50} />
              ) : filteredData.length === 0 ? (
                <EmptyListOption />
              ) : (
                <ListOptionComponent
                  dataKey={dataKey}
                  data={filteredData}
                  lang={lang}
                  selectedItems={selectedItems}
                  toggleItem={toggleItem}
                />
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

const EmptyListOption = () => (
  <aside className='relative cursor-default select-none py-2 pl-10 pr-4 bg-white'>
    <span
      className={`truncate font-medium flex items-center gap-4 text-gray-400`}
    >
      <FaBoxOpen size={24} className='text-danger' /> Empty Category List
    </span>
  </aside >
)


type ListOptionComponentProps = {
  data: ListData[] | [];
  lang: string;
  dataKey: string;
  toggleItem: (item: ListData) => void;
  selectedItems: ListData[]
}

const ListOptionComponent: React.FC<ListOptionComponentProps> = ({ data, dataKey, toggleItem, selectedItems }) => (
  <>
    {data?.map((listData: ListData, listDataIdx: number) => (
      <Listbox.Option
        key={listDataIdx}
        className={({ active }) =>
          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
          }`
        }
        value={listData}
      >
        {({ selected }) => (
          <>
            <span
              className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
            >
              {listData[dataKey]}
            </span>
            <input
              type="checkbox"
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              checked={selectedItems.some(
                (selectedItem) => selectedItem[dataKey] === listData[dataKey]
              )}
              onChange={() => toggleItem(listData)}
            />
          </>
        )}
      </Listbox.Option>
    ))}
  </>
)