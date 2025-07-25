"use client"
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()
 
  const handleLogout = () => {
    // Clear the cookie by setting it to expire in the past
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
    
    // Redirect to login page
    router.push('/')
  }
 
  return { handleLogout }
}

export{ }