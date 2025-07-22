export const SignIn =  ()=> {

    return(

        <form style={{ marginBottom: "1rem" }} >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="passworf">Password</label>
            <input type="passwrof" id="password" name="password" />
          </div>
        </div>
      </form>
    )
}


export{ }