import {Router } from 'express';
import { addNewProduct, checkAdmin } from '@/controllers/adminController';
import { getProducts } from '@/controllers/adminController';
// import verifyJw
export const adminRouter: Router = Router()

adminRouter.use(checkAdmin)

adminRouter.post("/addNewProduct",addNewProduct)

adminRouter.get("/getProducts", getProducts)

