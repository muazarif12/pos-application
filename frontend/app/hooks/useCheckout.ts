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



        const response = cashierService.getProductByName(productNameInput.trim());
        // const newProduct = response.data.product;
        console.log("Full API response object:", response); // 🚀 This will print the object
        

    }

    return {
    
        addProduct
            
        
    }
}


