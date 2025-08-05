"use client"
import { useAuth } from "@/hooks/useAuth";
import { AddProductForm } from "@/componenets/products/addProductForm";
import { useState } from "react";
export default function AdminDashboard() {
  const { handleLogout } = useAuth()

  const [showModel, setShowModal] = useState<boolean>(false)

  return (
    <div>
      <p>Admin Dashboard</p>
      <button onClick={handleLogout}>Logout</button>

      <div>
        <button onClick={() => setShowModal(true)}> Add Product</button>
        {showModel && <AddProductForm onClose={() => setShowModal(false)} />}
      </div>

    </div>
  );
}