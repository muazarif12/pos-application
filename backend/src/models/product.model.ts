import { IProduct } from "@/interfaces/IProduct"
import { Schema, model } from "mongoose"

    
//type,default,required,enum etc are called schema properties
export const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true, default: 'Uncategorized' },
  stock: { type: Number, required: true, min: 0, default: 0 },
  costPrice: { type: Number, min: 0 }, // For profit calculation
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field on save
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});    
    
    
export const Product = model<IProduct>('Product', productSchema);