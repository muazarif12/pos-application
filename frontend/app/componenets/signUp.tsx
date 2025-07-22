export const SignUp =  ()=> {

    return(

        <form style={{ marginBottom: "1rem" }} >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="passworf">Password</label>
            <input type="passwrof" id="password" name="password" />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="userType">User Type:</label>
            <select name="userType" id="userType">
              <option value="cashier">Cashier</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </form>
    )
}


export{ }