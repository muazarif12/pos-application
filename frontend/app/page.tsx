"use client"
import { useState } from "react"
import { formDataType, UserType, ApiResponseType } from "./interfaces/authInterface"
import { authService } from "./services/auth";
import { AxiosError } from "axios";
import { decodeToken } from "./utils/auth";
import { useRouter } from "next/navigation";
export default function Home() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<ApiResponseType>({
    message: "",
    token: ""
  })
  const [IsSignUp, setIsSignUp] = useState<boolean>(false)
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    email: "",
    password: "",
    userType: UserType.CASHIER
  })
 
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
    setApiResponse({ message: "", token: "" })
    setIsLoading(true)

    let response: ApiResponseType

    try {

      if (IsSignUp) {

        response = await authService.signUp(formData)
        setApiResponse({ message: response.message})
        
      }

      else {
        response = await authService.signIn({ email: formData.email, password: formData.password })
        setApiResponse({ message: response.message, token: response.token })
        const decodedToken = decodeToken(response.token as string)
        if (!decodedToken) {
          return
        }
        else {
          const userType: UserType = decodedToken.userType
          switch (userType) {
            case "admin":
              router.push('/admin/dashboard');
              break
    
            case "cashier":
              router.push('/cashier/dashboard');
              break
    
            default:
              router.push('/');
              break;
          }
        }
      }
    }
    catch (error) {

      const axiosError = error as AxiosError<{ message?: string }>;
      setApiResponse({
        message: axiosError.response?.data?.message ||
          (IsSignUp ? 'Sign up failed' : 'Login failed')
      })

    } finally {
      setIsLoading(false); // Stop loading (runs in all cases)
    }


  }

  return (


    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column" }}>
      <div style={{ display: 'flex', gap: '3rem', marginBottom: "3rem" }} >
        <button onClick={() => {
          setIsSignUp(false)

        }}
        > SignIn</button>

        <div>
          <button onClick={() => {
            setIsSignUp(true)
          }}>SignUp</button>

        </div>
      </div>
      {IsSignUp ?

        (<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" ,marginBottom: "1rem" }} >
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
          <button style={{marginTop: "1rem"}} type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : ""}
            Sign Up
          </button>
          <div style={{marginTop:"1rem"}}>{apiResponse.message}</div>
        </form>

        ) :


        (<form onSubmit={handleSubmit} style={{  display: "flex", flexDirection: "column", alignItems: "center" ,marginBottom: "1rem"}} >
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
          <button style={{marginTop: "1rem"}} type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : ""}
            Sign In
          </button>
          <div style={{marginTop:"1rem"}}>{apiResponse.message}</div>
        </form>)}



    </div>


  )

}