"use client"

import { useAuth } from "@/hooks/useAuth"

export default function CashierDashboard() { // Also add a function name
  const {handleLogout} = useAuth()
    return (
      <div>
        <p>Cashier Dashboard</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }