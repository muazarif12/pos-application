import { X } from 'lucide-react';
import { useRef } from 'react';
interface AddProductFormProps{
    onClose: () => void
}
export function AddProductForm({onClose}: AddProductFormProps ) {

const modelRef = useRef<HTMLDivElement>(null)

const closeModal = (e:React.MouseEvent<HTMLDivElement>) => {
    console.log("Clicked element:", e.target);
    console.log("Modal ref element:", modelRef.current);
    if(modelRef.current === e.target){
        onClose();
    }
}
    return (

        <div ref={modelRef}
            onClick={closeModal}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}
        >
        <form action="" >
            <div>
                <button onClick={onClose}><X/></button>  {/* when I click on the X the onClose fuction is called */}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name"/>
                </div>

                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" name="price"  />
                </div>

                <div>
                    <label htmlFor="sku">SKU</label>
                    <input type="text" id="sku" name="sku" />
                </div>
                
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" name="category" />
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input type="number" id="stock" name="stock" />
                </div>
                <div>
                    <label htmlFor="costprice">Cost Price</label>
                    <input type="text" id="costprice" name="costprice" />
                </div>

                
            </div>
        </form>
        </div>
    )
}