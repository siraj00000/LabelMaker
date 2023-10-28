import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsCheckLg, BsChevronDown } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

type HorizontalSingleSelectDropdownProp = {
    title: string;
    defaultValue?: string;
    updateOption: any;
    options: {
        name: string;
    }[],
    setKeyName: string;
    onChange?: () => void;
}

export default function HorizontalSingleSelectDropdown({ title, setKeyName, defaultValue, updateOption, options, onChange }: HorizontalSingleSelectDropdownProp) {
    const { t } = useTranslation();
    let oldVal = options.findIndex(option => option.name === defaultValue);
    const [selected, setSelected] = useState(options[oldVal] || options[0])
    const handleSelect = (e: { name: string }) => {
        setSelected(e);
        updateOption(setKeyName, e.name || defaultValue);
        onChange && onChange();
    }
    return (
        <div className="flex items-center gap-5 w-full">
            <Listbox value={selected} onChange={handleSelect}>
                <label className="w-1/4 text-primaryDarkGray font-jakartaPlus text-sm max-sm:text-xs font-medium capitalize">
                    {t(title)}
                </label>
                <div className="relative w-3/4 ml-auto">
                    <Listbox.Button className="relative w-full border border-secondaryLightGray rounded-md py-[10px] px-[14px] outline-none">
                        <span className={`block truncate text-left text-sm ${selected ? "text-primaryDarkGray" : "text-gray-400"}`}>{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsChevronDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white z-40 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((item, itemIdx) => (
                                <Listbox.Option
                                    key={itemIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={item}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {item.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <BsCheckLg className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
