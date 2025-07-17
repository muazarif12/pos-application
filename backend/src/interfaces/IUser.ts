import { HydratedDocument } from "mongoose";
import  { type JWTPayload } from "jose";

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

export interface DecodedJWT extends JWTPayload {
  email: string;
  createdAt: Date;
  userType: UserType;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      decoded?: DecodedJWT;
    }
  }
}

export type UserDocument = HydratedDocument<IUser>;
