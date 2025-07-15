"use client"
import { useState } from "react"
import styles from "./ui/Home.module.css"

interface formData {
  email: string,
  name?: string,
  password: string,
  UserType?: string
}

export default function Home() {
  const [IsSignUp, setIsSignUp] = useState<boolean>(false)
  const [formData, setFormData] = useState<formData>({
    email: "",
    name: "",
    password: "",
    UserType: "cashier"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev,[name]: value}));
  };


  return (
    <div className={styles.container}>

      <div>
        <button
          onClick={() => setIsSignUp(false)}
        >
          SignIn
        </button>

        <button
          onClick={() => setIsSignUp(true)}
        >
          SignUp
        </button>

      </div>
      {IsSignUp ? (
        <form className={styles.form}>
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
              value={formData.UserType}
              onChange={handleChange}
            >
              <option value="cashier">Cashier</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      ) : (

        <form className={styles.form}>
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


          <button type="submit">Sign In</button>
        </form>
      )}
    </div>
  );
}













{/*<label> - Creates a label element (text description for an input field)*/ }
{/*htmlFor="username" - Connects this label to the input with id="username" */ }
{/*Uses htmlFor instead of for because for is a reserved keyword in JavaScript*/ }
{/* id is unique identifier, name is Form submission identifier */ }