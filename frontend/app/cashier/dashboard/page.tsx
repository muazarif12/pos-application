"use client"
import React, { useState } from 'react';
import { useAuth } from "@/hooks/useAuth"
import { CheckoutModal } from '@/componenets/cashier/checkoutModal';

export default function CashierDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
 
  // Also add a function name
  const {handleLogout} = useAuth()
    return (
      <div>
        <p>Cashier Dashboard</p>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={openModal}>Open Checkout Modal</button>
        <CheckoutModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    );
  }