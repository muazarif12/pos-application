"use client"

import { useState, useEffect } from "react"
import styles from "./ui/Home.module.css"
import { authService } from "./services/auth"
import { formDataType, UserType, apiResponseType } from "./interfaces/authInterface"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { decodeToken } from "./utils/auth"




export default function Home() {
  const router = useRouter();
  const [IsSignUp, setIsSignUp] = useState<boolean>(false)
  const [formData, setFormData] = useState<formDataType>({

    email: "",
    name: "",
    password: "",
    userType: UserType.ADMIN
  })

  function Redirect(token: string): void {

    const decodedToken = decodeToken(token)
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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<apiResponseType>({
    message: "",
    token: ""
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
    setApiResponse({ message: "", token: "" })
    setIsLoading(true); // Start loading state
    let response: apiResponseType;

    try {
      if (IsSignUp) {
        // Sign Up Case
        response = await authService.signUp(formData);
        setApiResponse({
          message: response.message,
        })

        // Success: Redirect or show message here

      } else {

        // Sign In Case

        response = await authService.signIn({
          email: formData.email,
          password: formData.password
        });

        setApiResponse({
          message: response.message,
          token: response.token
        })
        
        Redirect(response.token as string)
        // console.log("Token form response.toke",response.token )
      }

    } catch (error) {

      // Error Handling

      const axiosError = error as AxiosError<{ message?: string }>;
      setApiResponse({
        message: axiosError.response?.data?.message ||
          (IsSignUp ? 'Sign up failed' : 'Login failed')
      })

    } finally {
      setIsLoading(false); // Stop loading (runs in all cases)
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <button
          onClick={() => {
            setIsSignUp(false); // Schedule update (but doesn't happen yet)
            //console.log(`value of IsSignUp is: ${IsSignUp}`) // Still false (old value)
          }}
        >
          SignIn
        </button>

        <button
          onClick={() => {
            setIsSignUp(true); // Schedule update (but doesn't happen yet)
            //console.log(`value of IsSignUp is: ${IsSignUp}`)
          }}
        >
          SignUp
        </button>
      </div>

      {IsSignUp ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Sign Up</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email"
              required
              value={formData.email}
              onChange={handleChange}>
            </input>

          </div>

          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name"
              required
              value={formData.name}
              onChange={handleChange}>
            </input>
          </div>


          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password"
              required
              value={formData.password}
              onChange={handleChange}>
            </input>
          </div>


          <div>
            <label htmlFor="userType">UserType: </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value={UserType.CASHIER}>Cashier</option>
              <option value={UserType.ADMIN}>Admin</option>
            </select>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : ""}
            Sign Up
          </button>
          <div>{apiResponse.message}</div>
        </form>

      ) : (


        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Sign In</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email"
              required
              value={formData.email}
              onChange={handleChange}>
            </input>
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password"
              required
              value={formData.password}
              onChange={handleChange}>
            </input>
          </div>


          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : ""}
            Sign In
          </button>
          <div>{apiResponse.message}</div>
        </form>
      )}
    </div>
  );

}