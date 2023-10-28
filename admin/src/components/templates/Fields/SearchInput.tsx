import React from "react";
import { useTranslation } from "react-i18next";
import { IoSearchOutline } from "react-icons/io5";
import { Form, useLocation,  } from "react-router-dom";

type SearchInputProps = {
  title: string;
};

const SearchInput: React.FC<SearchInputProps> = ({ title }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name') as string | "";
  
  const { t } = useTranslation();
  return (
    <Form method="get" className="flex items-center gap-5 max-sm:w-full max-sm:my-2 border border-secondaryLightGray rounded-md p-2 mr-auto">
      <IoSearchOutline className="text-gray-400" />
      <input type="search" defaultValue={name} name="name" placeholder={t(`search-${title.toLocaleLowerCase()}`)} className="placeholder:capitalize placeholder:text-sm" />
    </Form>
  );
};

export default SearchInput;
