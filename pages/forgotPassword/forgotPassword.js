import styles from '../../styles/forgotPassword.module.css';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

const RestButton = styled(Button)({
  textTransform: 'none',
  marginTop: '22px',
  width: '500px',
  height: '55px',
  borderRadius: '20px',
  backgroundColor: '#0080FE',
  fontSize: '25px',
  fontFamily: 'sans-serif',
});


function ForgotPassword() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [message, setMessage] = React.useState('');

  const onSubmit = async (formData) => {
    const { name,email } = formData;
    try {
      console.log(name,email);
      const response = await axios.post('https://article-writing-backend.onrender.com/api/auth/reset-password', { name,email });

      if (response.data.success) {        
        setMessage({ text: 'Reset password email sent.', type: 'success' });
      } else {
        setMessage({ text: response.data.message, type: 'error' });
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
          <h1 className={styles.title}>Forgot<br /> Your Password?</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
               id="standard-basic"
               type="text" 
               name="name"
               label="User Name"
               variant="standard"
               required
               sx={{ mt: 4, ml:3, width: '60ch', fontFamily: 'FontAwesome' }}
              {...register('name', { required: true })} 
            /><br/>
            {errors.email && <span>Email is required</span>}
            <TextField
               id="standard-basic"
               type="email" 
               name="email"
               label="Email address"
               variant="standard"
               required
               sx={{ mt: 4, ml:3, width: '60ch', fontFamily: 'FontAwesome' }}
              {...register('email', { required: true })} 
            />
            <RestButton variant="contained"  type="submit" sx={{ml:3}}>
              Reset Password
            </RestButton>
          </form>
          {message && message.type === 'success' && <p style={{ color: 'green' }}>{message.text}</p>}
          {message && message.type === 'error' && <p style={{ color: 'red' }}>{message.text}</p>}
        </div>
      </div>
      <div className={styles.box2}>
        <Image src="/forgotPassword.jpg" width="800" height="708" alt='Forgot Password' />
      </div>
    </div>
  );
}

export default ForgotPassword;
