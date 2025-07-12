import { HydratedDocument } from "mongoose";

export enum UserType{
    ADMIN = 'admin',
    CASHIER = 'cashier'
}


export interface IUser {
    email: string;
    name: string;
    password: string;
    userType: UserType;
    comparePassword(candidatePassword:string):Promise<boolean>;
}

export interface DecodedJWT {
  email: string;
  createdAt: Date;
  userType: UserType;
}

declare global {
  namespace Express {
    interface Request {
      decoded?: DecodedJWT;
    }
  }
}

export type UserDocument = HydratedDocument<IUser>;
