import {Router } from 'express';
import { checkCashier } from '@/controllers/cashierController';
const adminRouter: Router = Router()



adminRouter.use(checkCashier)


