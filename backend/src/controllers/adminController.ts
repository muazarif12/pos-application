import { Request, Response, NextFunction, response } from 'express';
import { Product } from '@/models/product.model';
import { IProduct } from '@/interfaces/IProduct';
import { DecodedJWT } from '@/interfaces/IUser';

export const checkAdmin = async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userType } = req.decoded as DecodedJWT;

    if (userType !== "admin") {
        res.status(403).json({
            message: "Admin privileges required",
            code: "FORBIDDEN"
        });
    }

    next();

}
export const getProducts = async function (req: Request, res: Response): Promise<void> {

    try {
        const productArray: IProduct[] | null = await Product.find({})

        if (!productArray || productArray.length === 0) {
            response.status(404).json({ message: "No Products Found" })
        }

        res.status(200).json(productArray)

    } catch
    (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addNewProduct = async function (req: Request, res: Response): Promise<void> {
    const { name, price, sku, category, stock, costPrice } = req.body

    try {
        const newProduct: IProduct | null = await Product.findOne({ name });
        if (newProduct) {
            res.status(409).json({ message: 'Product already exists.' })
            return
        }

        await Product.create({ name, price, sku, category, stock, costPrice });
        res.status(201).json({ message: 'Product added' })
    }

    catch (error) {
        res.status(500).json({ message: "Internal server error", error })

    }

}










export { }