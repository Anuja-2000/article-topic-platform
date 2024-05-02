import Head from "next/head"
import LoginLayout2 from "../../../components/loginlayout2";
import styles from "../../../styles/writerSignUp.module.css";
import Link from "next/link";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

export default function WriterRegister() {

  const [values, setValues] = useState({
    username: "",
    email: "",
    usertype: "Writer",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    if (values.username == "" || values.email == "" || values.password == "" || values.confirmPassword == "") {
      alert("All fields must be filled out");
      return false;
    } else if (values.password != values.confirmPassword) {
      alert("Passwords do not match");
      return false;
    } else {
      return true;
    }

  };

  // const resetFields = (event) => {
  //   setValues({
  //     username: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: ""
  //   });
  // };

  const submit = (event) => {
    event.preventDefault();
    //console.log(values);
    if (validateForm()) {
      //console.log("Form is valid");
      saveUser();
    }
  };

  const saveUser = async () => {

    const userId = values.username + "-" + uuidv4();

    //Sending user details
    const response = axios.post("http://localhost:3001/api/user/signup", {
      userId: userId,
      email: values.email,
      name: values.username,
      type: 'Writer',
      password: values.password,
    }).then((response) => {
      if (response.status == 201) {
        alert("User created successfully");
        window.location.href = "/login";
      }
    }).catch((error) => {
      console.log(error.response.status);
      if (error.response.status == 409) {
        alert("User already exists");
      } else {
        alert("Error creating user. Please try again.");
      }


    })
  };

  return (
    <LoginLayout2>

      <Head>
        <title>Create an account</title>
      </Head>

      <section className={styles.section}>
        <div className={styles.title}>
          <h1 className={styles.title1}>Join our community <br/> to inspire the world!</h1>

        </div>
        {/*form*/}
        <form id="regForm" className={styles.form} onSubmit={submit}>
          <TextField
            onChange={handleChange}
            name="username"
            value={values.username}
            label="Username"
            type="text"
            variant="outlined"
            required
            margin="dense"
          />
          <TextField
            onChange={handleChange}
            name="email"
            value={values.email}
            label="Email"
            type="email"
            variant="outlined"
            required
            margin="dense"
          />
          
          <TextField
            onChange={handleChange}
            name="password"
            value={values.password}
            label="Password"
            type="password"
            variant="outlined"
            required
            margin="dense"
          />
          <TextField
            onChange={handleChange}
            name="confirmPassword"
            value={values.confirmPassword}
            label="Confirm Password"
            type="password"
            variant="outlined"
            required
            margin="dense"
          />
{/*login buttons */}
<div className={styles.raw2}>
  <div className="inputbutton">
    <button type="submit" className={styles.submit}>
      Create account
    </button>
  </div>
  <div className={styles.or}>OR</div>
  <div className={styles.socialLogin}>
    {/* Facebook sign-in */}
    <button 
      className={`${styles.socialButton} ${styles.facebookButton}`}
      onMouseOver={(e) => e.target.classList.add(styles.hoverEffect)}
      onMouseOut={(e) => e.target.classList.remove(styles.hoverEffect)}
    >
      <FacebookIcon />
      Sign in with Facebook
    </button>
    {/* Google sign-in */}
    <button 
      className={`${styles.socialButton} ${styles.googleButton}`}
      onMouseOver={(e) => e.target.classList.add(styles.hoverEffect)}
      onMouseOut={(e) => e.target.classList.remove(styles.hoverEffect)}
    >
      <GoogleIcon />
      Sign in with Google
    </button>
  </div>
</div>
</form>

        {/*bottom*/}
        <p className={styles.footer}>
          Already have an account?
          <Link href={"/WriterPages/signup/writerLogin"} className={styles.last}>
            Log in
          </Link>
        </p>
      </section>
    </LoginLayout2>
  )
}