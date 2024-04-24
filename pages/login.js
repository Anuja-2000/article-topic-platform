import Head from "next/head";
import LoginLayout from "../components/loginlayout";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import setAuthtoken from "./api/auth/axios-set-token";
import HomeNav from "../pages/HomePage/homeNav";
import urls from "../enums/url";

export default function Login() {

  const [values, setValues] = useState({ 
    username: "",
    email: "",
    password: "" 
    });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // if (validateForm()) {
    //   Submit the form data
    // }
    console.log(values);
    sendLoginReqest();

  };
  async function sendLoginReqest() {
    const response = axios.post(`${urls.BASE_URL_AUTH}login`, {
      username: values.username,
      email: values.email,
      password: values.password,
    }).then((response) => {
      if (response.status == 200) {
        const token = response.data.data.token;
        const type = response.data.data.type;
        const username = response.data.data.username;
        const email = response.data.data.email;
        const userId = response.data.data.userId;
        const imgUrl = response.data.data.imgUrl;
        localStorage.setItem("token", token);
        localStorage.setItem("type", type);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("userId", userId);
        localStorage.setItem("imgUrl", imgUrl);
        setAuthtoken(token);
        if(type == "Admin"){
          window.location.href = "/AdminPages/Dashboard";
        }else if (type == "Reader"){
          window.location.href = "/searchArticle/search";
        }else if (type == "Writer"){
          window.location.href = "/WriterPages/Dashboard";
        }
      }
    }).catch((error) => {
      console.log(error);
      if (error.response.status == 404) {
        alert("User not found! Please register first.");
      }else{
        alert("Invalid Login");
      }
      
    });

  }

  return (
  <>
  
    <HomeNav />  
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

        <form className={styles.form} onSubmit={handleSubmit}>

            <TextField
            onChange={handleChange}
            name="username"
            label="User Name"
            type="text"
            variant="outlined"
            required
            margin="dense"
          />
          <TextField
            onChange={handleChange}
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            required
            margin="dense"
          />

            <TextField
              onChange={handleChange}
              name="password"
              type="password"
              label="Password"
              required
              margin="dense"
            />

          <div className={styles.raw}>

            <div className={styles.forgot}><Link href={"/forgotPassword/forgotPassword"}>Forgot Password?</Link></div>
          </div>

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

        <p className={styles.footer}>
          Don&apos;t have an account?
          <Link href={"/register"} className={styles.last}>
            Sign Up
          </Link>
        </p>
      </section>
    </LoginLayout>
  </>
  );
}
