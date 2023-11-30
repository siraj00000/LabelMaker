type FormFieldProps = {
    type?: React.HTMLInputTypeAttribute | undefined
    name: string;
    label: string;
    placeholder: string;
}
export const WARRANTY_FORM_FIELD_LIST: FormFieldProps[] = [
    {
        type: "text",
        name: "store_name",
        placeholder: "Enter store name",
        label: "Store Name"
    },
    {
        type: "text",
        name: "store_pin_code",
        placeholder: "Enter store pin code",
        label: "Store Pin Code"
    },
    {
        type: "date",
        name: "purchase_date",
        placeholder: "Select purchase date",
        label: "Purchase Date"
    },
    {
        type: "text",
        name: "warranty_duration",
        placeholder: "Enter warranty duration (e.g., 1 year)",
        label: "Warranty Duration"
    },
    {
        type: "text",
        name: "invoice_number",
        placeholder: "Enter invoice number",
        label: "Invoice Number"
    },
    {
        type: "text",
        name: "pincode",
        placeholder: "Enter delivery pincode",
        label: "Delivery Pincode"
    },
    {
        type: "text",
        name: "address1",
        placeholder: "Enter address line 1",
        label: "Address Line 1"
    },
    {
        type: "text",
        name: "address2",
        placeholder: "Enter address line 2 (optional)",
        label: "Address Line 2"
    }
];

export const WARRANTY_EDITFORM_FIELD_LIST: FormFieldProps[] = [
    {
        type: "text",
        name: "pincode",
        placeholder: "Enter delivery pincode",
        label: "Delivery Pincode"
    },
    {
        type: "text",
        name: "address1",
        placeholder: "Enter address line 1",
        label: "Address Line 1"
    },
    {
        type: "text",
        name: "address2",
        placeholder: "Enter address line 2 (optional)",
        label: "Address Line 2"
    }
];

export const REPORT_ERROR_FIELD_LIST: FormFieldProps[] = [
    {
        type: "text",
        name: "store_and_location",
        placeholder: "Enter store name or location",
        label: "Store Location"
    },
    {
        type: "date",
        name: "purchase_date",
        placeholder: "Select purchase date",
        label: "Purchase Date"
    },
    {
        type: "text",
        name: "store_pin_code",
        placeholder: "Enter store pincode",
        label: "Store Pincode"
    }
];

export const REQUEST_HELP_FIELD_LIST: FormFieldProps[] = [
    {
        type: "text",
        name: "address",
        placeholder: "Enter name or location",
        label: "Address"
    },
    {
        type: "date",
        name: "request_date",
        placeholder: "Select request date",
        label: "Request Date"
    },
    {
        type: "text",
        name: "help_ref_num",
        placeholder: "Enter reference number",
        label: "Help Reference Number"
    },
    {
        type: "text",
        name: "pincode",
        placeholder: "Enter pincode",
        label: "Pincode"
    }
];

export const AUTH_FORM_LIST: FormFieldProps[] = [
    {
        type: "tel",
        name: "phonenumber",
        placeholder: "Enter phone number",
        label: "Phone number"
    },
]