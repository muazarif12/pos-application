import {Router } from 'express';
import { createProduct, checkAdmin,getProducts, updateProduct, deleteProduct } from '@/controllers/adminController';
// import verifyJw
export const adminRouter: Router = Router()

adminRouter.use(checkAdmin)

adminRouter.post("/addNewProduct",createProduct)

adminRouter.get("/getProducts", getProducts)

adminRouter.put('/products/:id', updateProduct)

adminRouter.delete('/deleteProduct/:id', deleteProduct)

