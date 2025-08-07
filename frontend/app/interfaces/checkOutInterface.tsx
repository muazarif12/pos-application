export interface Product {

  name: string;
  price: number;
  sku: string;
  category: string;
  stock: number;
  costPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface checkOutApiResponseType {
  message: string;
  name?: string;
  price?: number
}