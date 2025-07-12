import { User } from "@/models/user.model";
import { Router, Request, Response } from 'express';
import { UserDocument, IUser, UserType } from "@/interfaces/IUser";
import jwt from "jsonwebtoken";


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

        res.status(201).json({ message: 'User created' });

    }
    catch (error) {
        console.error("Signup error", error);
        res.status(500).json({ message: "Internal server error" })

    }
}


export const signIn = async function signIn(req: Request, res: Response): Promise<void> {


    try {

        const { email, password} = req.body;

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

            const token: string = jwt.sign({
                email,
                createdAt: new Date(),
                userType: existingUser.userType,
            }, "MY_SECRET", { expiresIn: "1d" });

            res.status(200).json({ message: "Logged In", token });
        }
        catch (error) {
            console.error(error);
        }
    }



export { };
