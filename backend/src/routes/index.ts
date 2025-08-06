import { Router, Request, Response, NextFunction } from 'express';
import { authRouter } from './auth';
import { adminRouter } from './admin';
import { cashierRouter } from './cashier';
import { DecodedJWT } from '@/interfaces/IUser';
import { jwtVerify } from 'jose';

export const router: Router = Router()

router.use("/auth", authRouter);

router.use(
    async function verifyJwt(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                res.status(401).json({ message: "No authorization header" });
                return
            }
            // Prepare the secret (must be Uint8Array)
            const secret = new TextEncoder().encode("MY_SECRET");

            // Verify with jose (async/await required)
            const token = authHeader.split(" ")[1];
            const { payload } = await jwtVerify(token, secret);

            // Type assertion (if using TypeScript)
            req.decoded = payload as DecodedJWT;

            next()
        } catch (e) {
            res.json({ message: "TOKEN NOT FOUND / INVALID" })
        }



    })

router.use("/admin", adminRouter);
router.use("/cashier",cashierRouter)


