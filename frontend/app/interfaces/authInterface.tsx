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

export interface ApiResponseType {
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