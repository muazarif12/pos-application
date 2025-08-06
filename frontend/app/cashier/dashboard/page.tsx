"use client"
import React, { useState } from 'react';
import { useAuth } from "@/hooks/useAuth"

export default function CashierDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  // Also add a function name
  const {handleLogout} = useAuth()
    return (
      <div>
        <p>Cashier Dashboard</p>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white p-3 rounded">
        Open Checkout
      </button>
      </div>
    );
  }