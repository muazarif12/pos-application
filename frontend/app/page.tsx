"use client"

import { useAuth } from "./hooks/useAuth"
import { SignInForm } from "./componenets/authentication/SignInForm"
import { AuthTabs } from "./componenets/authentication/AuthTab"
import { SignUpForm } from "./componenets/authentication/SignUpForm"
import { Layout } from "./componenets/authentication/layout"
export default function Home() {
  const {
    isLoading,
    apiResponse,
    isSignUp,
    formData,
    setIsSignUp,
    handleChange,
    handleSubmit
  } = useAuth()

  return (
      <div style={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column"
      }}>
        <AuthTabs isSignUp={isSignUp} setIsSignUp={setIsSignUp} />

        {isSignUp ? (
          <SignUpForm
            formData={formData}
            isLoading={isLoading}
            apiResponse={apiResponse}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <SignInForm
            formData={formData}
            isLoading={isLoading}
            apiResponse={apiResponse}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
  )
}


// ┌─────────────┐     ┌─────────────┐    ┌─────────────┐
// │   AuthTabs   │ →  │  setIsSignUp│ →  │  page.tsx   │
// └─────────────┘     └─────────────┘    └─────────────┘
//        ↑                                     ↓
//        │                               ┌─────────────┐
//        │                               │  useAuth.ts │
//        │                               └─────────────┘
//        │                                     ↑
//        │                                     │
// ┌─────────────┐    ┌─────────────┐     ┌─────────────┐
// │ SignInForm  │ ←  │ formData    │ ←   │ handleChange│
// │ SignUpForm  │    │ handleSubmit│     │ (user input)│
// └─────────────┘    └─────────────┘     └─────────────┘
//        ↓
// ┌─────────────┐
// │ authService │ (API calls)
// └─────────────┘
//        ↓
// ┌─────────────┐
// │   API/DB    │
// └─────────────┘