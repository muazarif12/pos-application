import{ Request, Response, NextFunction } from 'express';

export const checkAdmin = async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.decoded?.userType != "admin") {
        res.status(401).json({ message: "NOT ADMIN!" })
        return
    }
    else {
        next()
    }

}

export{ }