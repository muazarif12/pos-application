export enum UserType{
    ADMIN = 'admin',
    CASHIER = 'cashier'
}

export interface authFormDataType {
  email: string,
  name: string,
  password: string,
  userType: UserType
}

export interface AuthApiResponseType {
  message: string;
  token?: string;
}

export interface DecodedToken {
  email: string;
  createdAt: Date;
  userType: UserType;
  exp: number;

}


export{ }