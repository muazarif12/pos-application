import { useState } from "react"
import { formDataType, UserType, ApiResponseType } from "@/interfaces/authInterface"
import { authService } from "@/services/auth"
import { AxiosError } from "axios"
import { decodeToken } from "@/utils/auth"
import { useRouter } from "next/navigation"
export function useAuth() {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [apiResponse, setApiResponse] = useState<ApiResponseType>({
    message: "",
    token: ""
  })
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  const [formData, setFormData] = useState<formDataType>({
    name: "",
    email: "",
    password: "",
    userType: UserType.CASHIER
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiResponse({ message: "", token: "" })
    setIsLoading(true)

    try {
      let response: ApiResponseType

      if (isSignUp) {
        response = await authService.signUp(formData)
        setApiResponse({ message: response.message })
      } else {
        response = await authService.signIn({ email: formData.email, password: formData.password })
        setApiResponse({ message: response.message, token: response.token })
        const decodedToken = decodeToken(response.token as string)

        if (decodedToken) {
          const userType: UserType = decodedToken.userType
          switch (userType) {
            case "admin":
              router.push('/admin/dashboard')
              break
            case "cashier":
              router.push('/cashier/dashboard')
              break
            default:
              router.push('/')
              break
          }
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      setApiResponse({
        message: axiosError.response?.data?.message ||
          (isSignUp ? 'Sign up failed' : 'Login failed')
      })
    } finally {
      setIsLoading(false)
    }


  }
  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    // Clear the cookie (match original cookie settings)
    document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=Strict';

    // Redirect
    router.push("/");
  };

  return {
    isLoading,
    apiResponse,
    isSignUp,
    formData,
    setIsSignUp,
    handleChange,
    handleSubmit,
    handleLogout
  }


}