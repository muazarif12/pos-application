import express, { Request, Response, NextFunction, Router } from 'express';
const adminRouter: Router = Router()

adminRouter.use(async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.decoded?.userType != "admin") {
        res.status(401).json({ message: "NOT ADMIN!" })
        return
    }
    else {
        next()
    }

})


