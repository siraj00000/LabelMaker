import { useTranslation } from "react-i18next";
import { InputProps } from "../../../types";


export const HorizontalInputField = (props: InputProps) => {
  const { t } = useTranslation();
  const { label, id, errormessage } = props;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-5 w-full">
        <label
          htmlFor={id}
          className="w-1/4 text-primaryDarkGray font-jakartaPlus text-sm max-sm:text-xs font-medium capitalize"
        >
          {t(label)}
        </label>
        <input
          {...props}
          className="w-3/4 ml-auto border border-secondaryLightGray text-sm rounded-md placeholder:capitalize py-[10px] px-[14px] outline-none"
        />
      </div>
      {!!errormessage && (
        <p className="mt-2 text-sm text-red-600 font-medium pl-1 text-right">
          {errormessage}
        </p>
      )}
    </div>
  );
};
