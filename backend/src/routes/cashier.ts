import {Router } from 'express';
import { checkCashier } from '@/controllers/cashierController';
import { getProduct } from '@/controllers/cashierController';
export const cashierRouter: Router = Router()



cashierRouter.use(checkCashier)

cashierRouter.get("/getProduct",getProduct)


