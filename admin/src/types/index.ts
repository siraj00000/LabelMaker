export type PrivateRouteProps = {
  token: boolean;
  component: JSX.Element;
  path: string;
};

export interface ListData {
  [key: string]: string;
  _id: string;
}

export interface CategoryQueryParams {
  name?: string;
  page?: string;
  limit?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface QueryParams {
  lang?: 'en' | 'fr'; // Make 'lang' a required parameter
  en?: string;
  fr?: string;
  name?: string;
  page?: string;
  limit?: string;
  sortOrder?: 'asc' | 'desc';
}

export type InputProps = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onFocus?: (
    event:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.FocusEvent<HTMLTextAreaElement, Element>
  ) => void;
  onBlur?: (
    event:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.FocusEvent<HTMLTextAreaElement, Element>
  ) => void;
  errormessage?: string;
  inputRef?: any;
  className?: string;
  readOnly?: boolean;
};

export type roleTypes = 'Super Admin' | 'Company Admin' | 'Manufacturer Admin' | 'User'

export type SubMenu = {
  title: string;
  path: string;
  role: roleTypes
};

export type MenuItem = {
  title: string;
  path: string;
  Icon: React.ElementType;
  hasSubMenu: boolean;
  role: roleTypes[]
  subMenus?: SubMenu[];
};

export type Menu = {
  [key: string]: MenuItem[];
};