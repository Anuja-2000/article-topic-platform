import Head from "next/head"
import LoginLayout from "../components/loginlayout"
import styles from "../styles/register.module.css";
import Link from "next/link";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import HomeNav from "./HomePage/homeNav";

export default function Register() {

  const [values, setValues] = useState({
    username: "",
    email: "",
    usertype: "",
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

  const resetFields = (event) => {
    setValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };



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

    const response = axios.post("http://localhost:3001/api/auth/signup", {
      userId: userId,
      email: values.email,
      name: values.username,
      // type: values.usertype,
      type: "Reader",
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
    <>
    <HomeNav />
    <LoginLayout>

      <Head>
        <title>Create an account</title>
      </Head>

      <section className={styles.section}>
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
          />

          {/* <FormControl variant="outlined" margin="dense" required sx={{minWidth:"120px"}}>
          <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="usertype"
            name="usertype"
            value={values.usertype}
            label="User Type"
            onChange={handleChange}
          >
            <MenuItem value={"Reader"}>Reader</MenuItem>
            <MenuItem value={"Writer"}>Writer</MenuItem>
          </Select>
          </FormControl> */}
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
            <div className={styles.inputbutton2}>
              <button type="submit" className={styles.submit2}>
                Sign up with Google
              </button>
            </div>
          </div>
        </form>

        {/*bottom*/}
        <p className={styles.footer}>
          Already have an account?
          <Link href={"/login"} className={styles.last}>
            Log in
          </Link>
        </p>
      </section>
    </LoginLayout>
    </>
  )
}