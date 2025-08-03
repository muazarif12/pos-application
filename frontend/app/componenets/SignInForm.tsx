"use client"
import { FormEvent } from "react"

interface SignInFormProps {
  formData: {
    email: string
    password: string
  }
  isLoading: boolean
  apiResponse: {
    message: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent) => Promise<void>
}

export function SignInForm({
  formData,
  isLoading,
  apiResponse,
  handleChange,
  handleSubmit
}: SignInFormProps) {
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required value={formData.email} onChange={handleChange} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} />
        </div>
      </div>
      <button style={{ marginTop: "1rem" }} type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : "Sign In"}
      </button>
      <div style={{ marginTop: "1rem" }}>{apiResponse.message}</div>
    </form>
  )
}