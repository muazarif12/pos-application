import React from 'react'
import { useState } from 'react'
import { checkOutApiResponseType, Product } from '@/interfaces/checkOutInterface'
import { AxiosError } from "axios"
import { cashierService } from '@/services/cashier'

export const useCheckout = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [totalCost, setTotalCost] = useState<number>(0)
    const [productNameInput, setProductNameInput] = useState<string>('')
    const [error, setError] = useState('')
    const [apiResponse, setApiResponse] = useState<checkOutApiResponseType>()

    const addProduct = async () => {
        if (!productNameInput.trim()) {
            return
        }


        setLoading(true)
        setError('')

        try {
            const response = await cashierService.getProductByName(productNameInput.trim())
            const newProduct = response.data.product
            setApiResponse({ message: response.data.message, name: response.data.product.name, price: response.data.product.price })

            if (newProduct) {
                const updatedProducts = [...products, newProduct]
                setProducts(updatedProducts)

                const newTotalCost = updatedProducts.reduce((acc, product) => acc + product.price, 0);
                setTotalCost(newTotalCost);
            }

        }
        catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>
            setApiResponse({ message: axiosError.response?.data?.message || "Product not added in checkout" })
        }
        finally {
            setLoading(false)
            setProductNameInput('')
        }
        
    }
    return {
            addProduct,
            loading,
            products,
            totalCost,
            productNameInput,
            setProductNameInput,
            error,
            apiResponse
        }
}

