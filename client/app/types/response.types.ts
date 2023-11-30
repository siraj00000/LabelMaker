export type SupportDetailTypes = {
  reOrderLink: string;
  survey: {
    isSupport: boolean;
    via: string | null;
  };
};

export type CarouselDetailTypes = {
  carousel_images: string[];
  carousel_headings: string[];
  carousel_text: string[];
};

export type ProductDetailTypes = {
  name: string;
  brandName: string;
  image: string;
  variants: string[];
  description: string;
  feature: {
    [key: string]: string; // Dynamic keys like 'battery timing', 'tourch', etc.
  };
  warranty: boolean;
  helpRequest: boolean;
  isAlreadyReg: string | null;
  company_id: string;
  dsN: string;
  link: string;
};

export type ContactDetails = {
  [key: string]: {
    isSupport: boolean;
    via: string | null;
  };
};

export type LabelDetails = {
  brand_id: string,
  product_id: string,
}

export type ProductDetailsResponseTypes = {
  success: boolean;
  data: {
    isOwnerMobileNumberFound: string;
    ownerMobile: string;
    supportDetails: SupportDetailTypes;
    carouselDetails: CarouselDetailTypes;
    productDetails: ProductDetailTypes;
    contactDetails: ContactDetails;
    labelDetails: LabelDetails
  };
};

export type WarrantyFetchResponseType = {
  success: boolean,
  data: {
    warranty_activated: boolean;
    purchase_date: string;
    store_name: string;
    store_pin_code: string;
    warranty_duration: string;
    invoice_number: string;
    invoice_image: string;
    pincode: string;
    address1: string;
    address2?: string;
  }
}
