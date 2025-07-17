import{ Request, Response, NextFunction } from 'express';

export const checkCashier = async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.decoded?.userType != "cashier") {
        res.status(401).json({ message: "NOT CASHIER!" })
        return
    }
    else {
        next()
    }

}

export{ }