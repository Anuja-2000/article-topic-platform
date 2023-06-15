import styles from '../styles/forgotPassword.module.css';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from "react-hook-form";

const RestButton = styled(Button)({
  textTransform: 'none',
  marginTop: '22px',
  width: '500px',
  height: '55px',
  borderRadius: '20px',
  backgroundColor: '#060606',
  fontSize: '25px',
  fontFamily: 'sans-serif',
});


function forgotPassword() {
  const [email, setEmail] = React.useState('');
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [message, setMessage] = React.useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = async (formData) => {
    const { email } = formData;
    try {
      const response = await fetch(`/api/auth/reset-password`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json()
      if (response.ok) {
        console.log(response);  
        setMessage({ text: 'Reset password email sent.', type: 'success' });
      } else {
        setMessage({ text: data.error, type: 'error' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage({ text: 'An error occurred while sending the reset password email.', type: 'error' });
    }
  
  };

  return (
    <div className={styles.box}>
      <div className={styles.box1}>
        <div className={styles.innerBox}>
          <h1 className={styles.title}>Forget<br /> Your Password?</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
               id="standard-basic"
               type="email" 
               name="email"
               label="Email address"
               variant="standard"
               sx={{ mt: 4, width: '60ch', fontFamily: 'FontAwesome' }}
               onChange={handleEmail}
              {...register('email', { required: true })} 
            /><br/>
            {errors.email && <span>Email is required</span>}
          
            <RestButton variant="contained"  type="submit">
              Reset Password
            </RestButton>
          </form>
          {message && message.type === 'success' && <p style={{ color: 'green' }}>{message.text}</p>}
          {message && message.type === 'error' && <p style={{ color: 'red' }}>{message.text}</p>}
        </div>
      </div>
      <div className={styles.box2}>
        <Image src="/../public/forgotPassword.jpg" width="800" height="708" alt='Forgot Password' />
      </div>
    </div>
  );
}

export default forgotPassword;
