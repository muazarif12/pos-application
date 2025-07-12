import { signup,signIn } from "@/controllers/authController";
import { Router } from "express";

export const authRouter: Router = Router()  //mini-applications

authRouter.post("/signUp", signup)
authRouter.post("/signIn", signIn)


export { };
