import { User } from "@/models/user.model";
import { Router, Request, Response } from 'express';
import { UserDocument, IUser, UserType } from "@/interfaces/IUser";
import jwt from "jsonwebtoken";
import { SignJWT } from "jose";


export const authRouter: Router = Router()  //mini-applications

interface SignUpRequestBody {
    email: string;
    name: string;  // properties or members of the interface
    password: string;
    userType: UserType;
}

export const signup = async function signUp(req: Request<{}, {}, SignUpRequestBody>,
    res: Response  // Express Request and Response interface with generic type parameters
): Promise<void> {  //resolves to no value
    // The Promise completes successfully, but it doesn’t provide any meaningful 
    // data when it resolves.
    // The actual response is sent via res.json(), not by returning a value.
    // TypeScript enforces that you don’t accidentally return something useless.

    try {
        const { email, name, password, userType } = req.body;

        const existingUser: UserDocument | null = await User.findOne({ email });  // pauses function until findOne returns

        if (existingUser) {
            res.status(409).json({ message: 'User with email already exists' })
            return
        }

        await User.create({ email, name, password, userType });
        console.log(email)
        console.log(name)
        console.log(userType)

        res.status(201).json({ message: 'User created' });

    }
    catch (error) {

        res.status(500).json({ message: "Internal server error" })

    }
}


export const signIn = async function signIn(req: Request, res: Response): Promise<void> {


    try {

        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        const existingUser: UserDocument | null = await User.findOne({ email });

        if (!existingUser) {
            res.status(404).json({ message: "User not found" })
            return
        }

        const passwordCheck: boolean = await existingUser.comparePassword(password)
        if (!passwordCheck) {
            res.status(401).json({ message: "Incorrect Password" })
            return
        }

        // 1. Convert the secret into a Uint8Array (required by `jose`)
        const secret = new TextEncoder().encode("MY_SECRET");

        // 2. Create and sign the JWT
        const token: string = await new SignJWT({
            email,
            createdAt: new Date().toISOString(),
            userType: existingUser.userType,
        })
            .setProtectedHeader({ alg: 'HS256' }) // algorithm (HS256 by default)
            .setIssuedAt() 
            .setExpirationTime('1d') 
            .sign(secret); 


        // Set cookie
        res.cookie('authToken', token, {
            httpOnly: false,  // Done false for checking at localhost
            secure: false, // HTTPS only in production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({ message: "Logged In", token });

    }
    catch (error) {
        console.error(error);
    }
}



export { };
