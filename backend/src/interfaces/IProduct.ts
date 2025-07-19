import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  sku: string;
  category: string;
  stock: number;
  costPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}