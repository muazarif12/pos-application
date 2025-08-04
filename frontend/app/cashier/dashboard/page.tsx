"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation";

export default function CashierDashboard() { // Also add a function name
  const router = useRouter();
  
    const handleLogout = () => {
      // Clear the cookie (match original cookie settings)
      document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=Strict';
      
      // Redirect
      router.push("/");
    };
  
    return (
      <div>
        <p>Cashier Dashboard</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }