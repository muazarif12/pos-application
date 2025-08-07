import React from 'react'
import { useState } from 'react'
import { Product } from '@/interfaces/checkOutInterface'
import { Axios, AxiosError } from 'axios'
import { cashierService } from '@/services/cashier'

export const useCheckout = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [totalCost, setTotalCost] = useState<number>(0)
    const [productNameInput, setProductNameInput] = useState<string>('')
    const [error, setError] = useState('')

    const addProduct = async () => {
        if (!productNameInput.trim()) {
            return
        }
        setLoading(true)
        setError('Input is empty')
        try {
            const response = await cashierService.getProductByName(productNameInput.trim());
            const newProduct = response.data.product;

            if (newProduct) {
                // Update the products array with the new product
                const updatedProducts = [...products, newProduct];
                setProducts(updatedProducts);

                // Recalculate the total cost
                const newTotalCost = updatedProducts.reduce((acc, product) => acc + product.price, 0);
                setTotalCost(newTotalCost);
            }

        } catch (err) {
            console.error(err);
            setError("Product not found or an error occurred.");
        } finally {
            setLoading(false);
            // Clear the input field for the next entry
            setProductNameInput('');
        }
    }

    return {

        addProduct


    }
}


