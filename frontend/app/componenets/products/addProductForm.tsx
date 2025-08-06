import { useAddProduct } from '@/hooks/useAddProduct';
import { X } from 'lucide-react';
import { useRef } from 'react';

interface AddProductFormProps { onClose: () => void }

export function AddProductForm({ onClose }: AddProductFormProps) {
    const { isLoading, apiResponse, formData, handleChange, handleSubmit } = useAddProduct()

    const modalRef = useRef<HTMLDivElement>(null)

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => { if (modalRef.current === e.target) { onClose(); } }

    return (

        <div ref={modalRef}
            onClick={closeModal}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
        >
            <form onSubmit={handleSubmit} >
                <div>
                    <button onClick={onClose}><X /></button>  {/* when I click on the X the onClose fuction is called */}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" required value={formData.price} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="sku">SKU</label>
                        <input type="text" id="sku" name="sku" required value={formData.sku} onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category" name="category" required value={formData.category} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="stock">Stock</label>
                        <input type="number" id="stock" name="stock" required value={formData.stock} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="costPrice">Cost Price</label>
                        <input type="text" id="costPrice" name="costPrice" required value={formData.costPrice} onChange={handleChange}/>
                    </div>
                    <button type='submit' disabled={isLoading}> Add Product</button>
                    <div style={{ marginTop: "1rem" }}>{apiResponse.message}</div>

                </div>
            </form>
        </div>
    )
}