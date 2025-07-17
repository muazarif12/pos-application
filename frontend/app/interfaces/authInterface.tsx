export enum UserType{
    ADMIN = 'admin',
    CASHIER = 'cashier'
}

export interface formDataType {
  email: string,
  name: string,
  password: string,
  userType: UserType
}

export interface apiResponseType {
  message: string;
  token?: string;
}

export{ }