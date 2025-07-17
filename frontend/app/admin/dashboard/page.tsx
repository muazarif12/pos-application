"use client"
import { useAuth } from "@/hooks/useAuth"

export default function AdminDashboard() { // Also add a function name
  const { handleLogout } = useAuth() // Call the hook and destructure
  
  return (
    <div>
      <p>Admin Dashboard</p>
      <div>
        <button onClick={handleLogout}> {/* Use the function, not the hook */}
          Logout
        </button>
      </div>
    </div>
  )
}