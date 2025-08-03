"use client"

interface AuthTabsProps {
  isSignUp: boolean
  setIsSignUp: (value: boolean) => void
}

export function AuthTabs({ setIsSignUp }: AuthTabsProps) {
  return (
    <div style={{ display: 'flex', gap: '3rem', marginBottom: "3rem" }}>
      <button onClick={() => setIsSignUp(false)}>SignIn</button>
      <button onClick={() => setIsSignUp(true)}>SignUp</button>
    </div>
  )
}