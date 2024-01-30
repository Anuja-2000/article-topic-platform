import Head from "next/head";
import LoginLayout from "../components/loginlayout";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import setAuthtoken from "./api/auth/axios-set-token";


export default function Login() {

  const [values, setValues] = useState({ 
    email: "",
    password: "" 
    });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const resetFields = (event) => {
    setValues({
      email: "",
      password: ""
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (validateForm()) {
    //   Submit the form data
    // }
    sendLoginReqest();

  };
  async function sendLoginReqest() {
    const response = axios.post("http://localhost:3001/api/user/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response.data.data.token);
      if (response.status == 200) {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        setAuthtoken(token);
        window.location.href = "/AdminPages/Dashboard";
      }
    }).catch((error) => {
      console.log(error);
      alert("Invalid Login");
    });

  }

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
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* <input
              className={styles.email}
              type="email"
              name="email"
              placeholder="Email"
            /> */}
          <TextField
            onChange={handleChange}
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            required
            margin="normal"
          />

          {/* <div className={styles.input2}>
            <input
              className={styles.password}
              type="Password"
              name="Password"
              placeholder="Password"
              value={values.password}
            /> */}

            <TextField
              onChange={handleChange}
              name="password"
              type="password"
              label="Password"
              required
            />

          <div className={styles.raw}>
            <div className={styles.keep}>keep me log in</div>
            <div className={styles.forgot}>Forgot Password?</div>
          </div>
          {/* </div> */}
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
