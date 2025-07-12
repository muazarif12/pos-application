import express, {Router,Request,Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { authRouter} from './auth';
import { UserType, DecodedJWT } from '@/interfaces/IUser';
export const router: Router = Router()


router.use("/auth", authRouter);

router.use(
    async function verifyJwt(req:Request, res:Response, next: NextFunction): Promise<void> {
        try{
            const authHeader = req.headers.authorization;

            if(!authHeader){
                res.status(401).json({message:"No authorization header"});
                return
            }
            const token : DecodedJWT = jwt.verify(authHeader.split(" ")[1],"MY_SECRET") as DecodedJWT;
            req.decoded = token
            
            next()
        } catch(e){
            res.json({message:"TOKEN NOT FOUND / INVALID"})
        }

        
    
})


