import styles from "./ui/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div>
          {/*<label> - Creates a label element (text description for an input field)*/}
          {/*htmlFor="username" - Connects this label to the input with id="username" */}
          {/*Uses htmlFor instead of for because for is a reserved keyword in JavaScript*/}
          {/* id is unique identifier, name is Form submission identifier */}
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username"></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password"></input>
        </div>
        <button type="submit">Submit</button>


      </form>
    </div>
  );
}
