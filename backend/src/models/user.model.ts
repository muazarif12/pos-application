import {Schema, model} from "mongoose";
import { UserDocument,UserType } from "@/interfaces/IUser";
import bcrypt from 'bcrypt-ts'

const userSchema = new Schema<UserDocument>({
    
    //type,default,required,enum etc are called schema properties
    email:{type: String, required: true},
    name: {type: String, required: true},
    password:{type: String, required: true},
    userType:{
        type:String, 
        enum:Object.values(UserType), 
        default: UserType.CASHIER, 
        required: true
    }
    
    
})


userSchema.pre<UserDocument>('save',              // run this middleware before saving to database
    async function hashPassword(){                // run this function 
        if(!this.isModified('password'))
            return;
        this.password = await bcrypt.hash(this.password, 10);
})


userSchema.methods.comparePassword =        //comparePassword function created , now it can be called with User.comparePassword
    async function(candidatePassword:string): Promise<boolean>{
        return await bcrypt.compare(candidatePassword, this.password)
    }

export const User = model<UserDocument>('User', userSchema);