"use client"
import { FormEvent } from "react"
import { formDataType } from "@/interfaces/authInterface"

interface SignUpFormProps {
  formData: formDataType
  isLoading: boolean
  apiResponse: {
    message: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSubmit: (e: FormEvent) => Promise<void>
}


export function SignUpForm({
  formData,
  isLoading,
  apiResponse,
  handleChange,
  handleSubmit
}: SignUpFormProps) {
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />

        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required value={formData.email} onChange={handleChange} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="userType">User Type:</label>
          <select id="userType" name="userType" value={formData.userType} onChange={handleChange}>
            <option value="cashier">Cashier</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      <button style={{ marginTop: "1rem" }} type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : "Sign Up"}
      </button>
      <div style={{ marginTop: "1rem" }}>{apiResponse.message}</div>
    </form>
  )
}