import React from 'react'
import { useCheckout } from '@/hooks/useCheckout'

export const checkoutModal = () => {

    const {addProduct} = useCheckout()
  return (
    
    {addProduct}
    
  )
}
