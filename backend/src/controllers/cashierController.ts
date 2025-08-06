import { Request, Response, NextFunction } from 'express';
import { IProduct } from '@/interfaces/IProduct';
import { Product } from '@/models/product.model';


export const checkCashier = async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.decoded?.userType != "cashier") {
        res.status(401).json({ message: "NOT CASHIER!" })
        return
    }
    next()

}

export const getProductByName = async function (req: Request, res: Response): Promise<void> {

    try {
        const {name} = req.params
        const product: IProduct | null = await Product.findOne({name})

        if (!product) {
            res.status(404).json({ message: "Product not available" })
        }

        res.status(200).json({ message: "Following are the product details", product })

    } catch
    (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export { }