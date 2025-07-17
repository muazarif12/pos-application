import {Router } from 'express';
import { checkAdmin } from '@/controllers/adminController';
const adminRouter: Router = Router()

adminRouter.use(checkAdmin)


