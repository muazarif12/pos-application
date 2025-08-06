import { useState } from "react";
import { AddProductFormType, AddNewProductApiResponseType } from "@/interfaces/productInterface"
import { adminService } from "@/services/admin";
import { AxiosError } from "axios"


export function useAddProduct() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<AddProductFormType>({
        name: "",
        price: 0,
        sku: "",
        category: "",
        stock: 0,
        costPrice: 0
    })

    const [apiResponse, setApiResponse] = useState<AddNewProductApiResponseType>({
        message: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setApiResponse({ message: "" })
        setIsLoading(true)
        try {
            const response = await adminService.addProduct(formData)
            setApiResponse({ message: response.message })
        }
        catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>
            setApiResponse({
                message: axiosError.response?.data?.message || "New Product not added!"
            })
        } finally {
            setIsLoading(false)
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
     return {
    isLoading,
    apiResponse,
    formData,
    handleChange,
    handleSubmit,
  }
}

