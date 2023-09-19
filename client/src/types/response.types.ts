export type LoginResponse = {
  data: {
    accountInfo: {
      role: "Super Admin" | "Company Admin" | "Manufacturer Admin";
    };
    success: boolean;
    token: string;
  };
  response: {
    data: {
      error: string;
    };
  };
};
