import React from 'react'
import { useCheckout } from '@/hooks/useCheckout'

export const checkoutModal = ({ isOpen, onClose }) => {

    const { addProduct } = useCheckout()

    const handleAddProduct = (event: React.FormEvent) => {
        // Prevents the page from reloading when the form is submitted
        event.preventDefault();
        // Call the function from your hook
        addProduct();
    };
    return (
        <form onSubmit={handleAddProduct}>
            <input type="text" /* ... */ />
            <button type="submit">Add Product</button>
        </form>
        

    )
}
