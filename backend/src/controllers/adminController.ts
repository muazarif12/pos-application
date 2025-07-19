import{ Request, Response, NextFunction } from 'express';
import { Product } from '@/models/product.model'; 
import { IProduct } from '@/interfaces/IProduct';

export const checkAdmin = async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.decoded?.userType != "admin") {
        res.status(401).json({ message: "NOT ADMIN!" })
        return
    }
    else {
        next()
    }

}

export const addNewProduct = async function(req: Request, res: Response): Promise<void>{
    const {name,price,sku,category,stock,costPrice} = req.body

    try{
        const newProduct:IProduct|null = await Product.findOne({name});
        if(newProduct){
            res.status(409).json({ message: 'Product already exists.' })
            return
        }
        
         await Product.create({name,price,sku,category,stock,costPrice});
         res.status(201).json({message: 'Product added'})
    }

    catch(error){
        res.status(500).json({ message: "Internal server error",error })

    }

}


export const addProduct = async function(req:Request, res: Response): Promise<void>{
    const {}
}





export{ }