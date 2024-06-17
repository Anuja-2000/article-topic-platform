import Head from "next/head";
import LoginLayout from "../components/loginlayout";
import styles from "../styles/register.module.css";
import Link from "next/link";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import HomeNav from "./HomePage/homeNav";
import urls from "../enums/url";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    usertype: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });


  const validatePassword = (password) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return pattern.test(password);
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern
    return pattern.test(email);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    let error = '';
    if (name === 'email' && !validateEmail(value)) {
      error = 'Please enter a valid email address.';
    } else if (name === 'password' && !validatePassword(value)) {
      error = 'Password must contain at least 8 characters, one uppercase, one lowercase, and one number.';
    } else if (name === 'confirmPassword' && value !== values.password) {
      error = 'Passwords do not match.';
    }

    // Update state for values and errors
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    if (
      values.username == "" ||
      values.email == "" ||
      values.password == "" ||
      values.confirmPassword == ""
    ) {
      alert("All fields must be filled out");
      return false;
    } else if (errors.email !== '' || errors.password !== '' || errors.confirmPassword !== '') {
      alert("Please correct the errors in the form.");
      return false;
    } else {
      return true;
    }
  };

  const resetFields = (event) => {
    setValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const submit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      saveUser();
    }
  };

  const saveUser = async () => {
    const userId = uuidv4();

    const response = axios
      .post(`${urls.BASE_URL_AUTH}signup`, {
        userId: userId,
        email: values.email,
        name: values.username,
        type: "Reader",
        password: values.password,
      })
      .then((response) => {
        if (response.status == 201) {
          alert("User created successfully");
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.message);
        if (error.response.status == 409) {
          alert("User already exists");
        } else {
          alert("Error creating user. Please try again.");
        }
      });
  };

  return (
    <>
      <HomeNav />
      <LoginLayout>
        <Head>
          <title>Create an account</title>
        </Head>

        <section className={styles.section} style={{width:"300px"}}>
          <div className={styles.title}>
            <h1 className={styles.title1}>Create an account</h1>
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
              error={!!errors.email}
              helperText={errors.email}
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
              error={!!errors.password}
              helperText={errors.password}
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
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            <div className={styles.raw2}>
              <div className="inputbutton">
                <button type="submit" className={styles.submit}>
                  Create account
                </button>
              </div>
              {/* <div className={styles.or}>OR</div>
              <div className={styles.inputbutton2}>
                <button type="submit" className={styles.submit2}>
                  Sign up with Google
                </button>
              </div> */}
            </div>
          </form>

          <p className={styles.footer}>
            Already have an account?
            <Link href={"/login"} className={styles.last} style={{marginLeft:'5px'}}>
              Log in
            </Link>
          </p>
        </section>
      </LoginLayout>
    </>
  );
}
