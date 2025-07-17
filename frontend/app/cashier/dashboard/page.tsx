"use client"

import { useAuth } from "@/hooks/useAuth"

export default function CashierDashboard() { // Also add a function name
  const { handleLogout } = useAuth() // Call the hook and destructure
  
  return (
    <div>
      <p>Cashier Dashboard</p>
      <div>
        <button onClick={handleLogout}> {/* Use the function, not the hook */}
          Logout
        </button>
      </div>
    </div>
  )
}