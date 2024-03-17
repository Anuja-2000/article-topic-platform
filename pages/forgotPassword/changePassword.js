import React, { useState } from 'react';
import Style from '../../styles/changePassword.module.css';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

const RestButton = styled(Button)({
  textTransform: 'none',
  marginTop: '22px',
  width: '450px',
  height: '55px',
  borderRadius: '20px',
  backgroundColor: '#0080FE',
  fontSize: '25px',
  fontFamily: 'sans-serif',
});

const ShowHideButton = styled('button')({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});


function ChangePassword() {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    watch,
    reset,
  } = useForm({ mode: 'onChange' });

  const password = watch('newPass', '');
  const confirmPassword = watch('confPass', '');
  const [showPassword, setShowPassword] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const handleSuccessAlertClose = () => {
    setOpenSuccessAlert(false);
  };

  const handleErrorAlertClose = () => {
    setOpenErrorAlert(false);
  };
  const onSubmit = async (formData) => {
    const { newPass, confPass, email } = formData;

    if (newPass !== confPass) {
      return;
    }

    try {
      const response = await fetch(`/api/auth/reset-password`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log(response);
        setOpenSuccessAlert(true);
        reset(); // Reset the form fields
      } else {
        setOpenErrorAlert(true);
        // Handle error response
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setOpenErrorAlert(true);
      // Handle error
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={Style.box}>
      <div className={Style.pic}>
        <Image src="/reset.jpg" width="700" height="500" alt="Reset Password" />
      </div>
      <div className={Style.box1}>
        <div className={Style.innerBox}>
          <div className={Style.box2}>
            <h1 className={Style.title}>Reset <br /> Your Password</h1>
          </div>
          <Snackbar
            open={openSuccessAlert}
            autoHideDuration={5000}
            onClose={handleSuccessAlertClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleSuccessAlertClose} severity="success" sx={{ width: '100%' }}>
              Password is reset
            </Alert>
          </Snackbar>
          <Snackbar
            open={openErrorAlert}
            autoHideDuration={5000}
            onClose={handleErrorAlertClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleErrorAlertClose} severity="error" sx={{ width: '100%' }}>
              Error occurred. Please try again.
            </Alert>
          </Snackbar>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={Style.nPassword}>
              <TextField
                id="standard-basic"
                label="New Password"
                name="newPass"
                variant="standard"
                type={showPassword ? 'text' : 'password'}
                sx={{ mt: 4, width: '55ch', fontFamily: 'FontAwesome' }}
                {...register('newPass', { required: true })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ShowHideButton type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </ShowHideButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
            </div>
            <div className={Style.rtPassword}>
              <TextField
                id="standard-basic"
                label="Confirm Password"
                variant="standard"
                name="confPass"
                type={showPassword ? 'text' : 'password'}
                sx={{ mt: 2, width: '55ch', fontFamily: 'FontAwesome' }}
                {...register('confPass', {
                  required: true,
                  validate: (value) => value === password,
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ShowHideButton type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </ShowHideButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              {errors.confPass && errors.confPass.type === 'validate' && (
                <span style={{ color: 'red' }}>Passwords don't match</span>
              )}
            </div>
            <div className={Style.resetButton}>
              <RestButton
                variant="contained"
                type="submit"
                disabled={!isDirty || !isValid}
              >
                Change Password
              </RestButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
