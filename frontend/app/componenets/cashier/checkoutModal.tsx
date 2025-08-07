import React from 'react'
import { useCheckout } from '@/hooks/useCheckout'

// interface checkOutProps { onClose: () => void }
interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {

    const {
        addProduct,
        loading,
        products,
        totalCost,
        productNameInput,
        setProductNameInput,
        error, // Note: You should handle error state in the hook
        apiResponse
    } = useCheckout();

    if (!isOpen) return null;

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        addProduct();
    }

    return (



        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Checkout</h2>
                <form onSubmit={handleAddProduct}>
                    <input
                        type="text"
                        value={productNameInput}
                        onChange={(e) => setProductNameInput(e.target.value)}
                        placeholder="Enter product name"
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </form>

                {apiResponse && <p>{apiResponse.message}</p>}

                <ul>
                    {products.map((product, index) => (
                        <li key={index}>
                            {product.name} - ${product.price.toFixed(2)}
                        </li>
                    ))}
                </ul>

                <h3>Total: ${totalCost.toFixed(2)}</h3>
                <button onClick={onClose}>Close</button>
            </div>
        </div>)
}

