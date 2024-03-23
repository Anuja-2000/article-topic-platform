import Head from "next/head";
import LoginLayout2 from "../../../components/loginlayout2";
import styles from "../../../styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import setAuthtoken from "../../api/auth/axios-set-token";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function WriterLogin() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
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
    const response = axios
      .post("http://localhost:3001/api/auth/login", {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.status == 200) {
          const token = response.data.data.token;
          const type = response.data.data.type;
          const username = response.data.data.username;
          const email = response.data.data.email;
          const userId = response.data.data.userId;
          localStorage.setItem("token", token);
          localStorage.setItem("type", type);
          localStorage.setItem("username", username);
          localStorage.setItem("email", email);
          localStorage.setItem("userId", userId);

          setAuthtoken(token);
          if (type == "Admin") {
            window.location.href = "/AdminPages/Dashboard";
          } else if (type == "Reader") {
            window.location.href = "/searchArticle/search";
          } else if (type == "Writer") {
            window.location.href = "/WriterPages/Dashboard";
          }
        }
      })

      .catch((error) => {
        console.log(error);
        if (error.response.status == 404) {
          alert("User not found! Please register first.");
        } else {
          alert("Invalid Login");
        }
      });
  }

  return (
    <LoginLayout2>
      <Head>
        <title>Login</title>
      </Head>
      <section className={styles.section}>
        <div className={styles.title}>
          <h1 className={styles.title1}>Writer Login</h1>
          <p className={styles.word}>
            Join our dynamic blogging community to inspire the world!
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
            margin="dense"
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
        ``
        {/*bottom*/}
        <p className={styles.footer}>
          Don&apos;t have an account?
          <Link
            href={"/WriterPages/signup/writerRegister"}
            className={styles.last}
          >
            Sign Up
          </Link>
        </p>
      </section>
    </LoginLayout2>
  );
}
