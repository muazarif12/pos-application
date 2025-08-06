// hooks/useGetProducts.ts
import { useState, useEffect } from "react";
import { adminService } from "@/services/admin";
import { AxiosError } from "axios";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  sku: string;
  category: string;
  stock: number;
  costPrice: number;
}

interface GetProductsApiResponse {
  message: string;
  productArray?: IProduct[];
}

export function useGetProducts() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [apiResponse, setApiResponse] = useState<GetProductsApiResponse>({
    message: "",
  });

  const fetchProducts = async () => {
    setApiResponse({ message: "" });
    setIsLoading(true);
    try {
      const response = await adminService.getProducts();
      setProducts(response.productArray || []);
      setApiResponse({ message: response.message });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setApiResponse({
        message: axiosError.response?.data?.message || "Failed to fetch products!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    isLoading,
    apiResponse,
    products,
    refetch: fetchProducts,
  };
}