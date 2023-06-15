import Head from "next/head";
import LoginLayout from "../components/loginlayout";
import styles from "../styles/login.module.css";
import Link from "next/link";


export default function Login() {
  
  return (
    <LoginLayout>
      <Head>
        <title>Login</title>
      </Head>
      <section className={styles.section}>
        <div className={styles.title}>
          <h1 className={styles.title1}>Login</h1>
          <p className={styles.word}>
            Welcome back! please enter your details.
          </p>
        </div>
        {/*form*/}
        <form className={styles.form}>
          <div className={styles.input1}>
            <input
              className={styles.email}
              type="email"
              name="email"
              placeholder="Email"
    
            />
            
          </div>

          <div className={styles.input2}>
            <input
              className={styles.password}
              type="Password"
              name="Password"
              placeholder="Password"
            />

            <div className={styles.raw}>
              <div className={styles.keep}>keep me log in</div>
              <div className={styles.forgot}>Forgot Password?</div>
            </div>
          </div>
          {/*login buttons */}
          <div className={styles.raw2}>
            <div className="inputbutton">
              <button type="submit" className={styles.submit}>
                Log in
              </button>
            </div>
            <div className={styles.or}>OR</div>
            <div className={styles.inputbutton2}>
              <button type="submit" className={styles.submit2}>
                Log in with Google
              </button>
            </div>
          </div>
        </form>

        {/*bottom*/}
        <p className={styles.footer}>
          Don&apos;t have an account?
          <Link href={"/register"} className={styles.last}>
            Sign Up
          </Link>
        </p>
      </section>
    </LoginLayout>
  );
}
