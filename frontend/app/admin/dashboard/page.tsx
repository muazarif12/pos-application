"use client"
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the cookie (match original cookie settings)
    document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=Strict';
    
    // Redirect
    router.push("/");
  };

  return (
    <div>
      <p>Admin Dashboard</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}