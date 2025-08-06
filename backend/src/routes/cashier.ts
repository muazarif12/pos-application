import {Router } from 'express';
import { checkCashier } from '@/controllers/cashierController';
import { getProductByName } from '@/controllers/cashierController';
export const cashierRouter: Router = Router()



cashierRouter.use(checkCashier)

cashierRouter.get("/getProduct/:name", getProductByName)


