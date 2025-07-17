import { Router, Request, Response, NextFunction } from 'express';
import { authRouter } from './auth';
import { DecodedJWT } from '@/interfaces/IUser';
export const router: Router = Router()
import { jwtVerify } from 'jose';

router.use("/auth", authRouter);

router.use(
    async function verifyJwt(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                res.status(401).json({ message: "No authorization header" });
                return
            }
            // 1. Prepare the secret (must be Uint8Array)
            const secret = new TextEncoder().encode("MY_SECRET");

            // 2. Verify with jose (async/await required)
            const token = authHeader.split(" ")[1];
            const { payload } = await jwtVerify(token, secret);

            // 3. Type assertion (if using TypeScript)
            req.decoded = payload as DecodedJWT;

            next()
        } catch (e) {
            res.json({ message: "TOKEN NOT FOUND / INVALID" })
        }



    })


