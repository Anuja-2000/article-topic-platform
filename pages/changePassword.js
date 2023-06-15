import React from 'react';
import Style from '../styles/changePassword.module.css'
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";

const RestButton = styled(Button)({
    textTransform: 'none' ,
    marginTop: '22px',
    width: '450px',
    height: '55px',
    borderRadius: '20px',
    backgroundColor:'#060606',
    fontSize: '25px',
    fontFamily:  'sans-serif',
    
});


function ChangePassword(){
    const [newPasswordValue, setNewPasswordValue] = React.useState(false);
    const [confirmPasswordValue, setConfirmPasswordValue] = React.useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [message, setMessage] = React.useState('');

      const onSubmit = async (formData) => {
        const { newPass } = formData;
        const { confPass } = formData;
        const authentication = () =>{
            
            if(newPass !== confPass){
                setMessage({ text: 'Passwords do not match', type: 'match' });
                setConfirmPasswordValue(true);
            }
        }  
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
    
      
      }

    return(
       <div className={Style.box}>
           <div className={Style.pic}>
             <Image src="/../public/reset.jpg" width="700" height="500" alt='Reset Password'/>
           </div>
           <div className={Style.box1}>
            <div className={Style.innerBox}>
                 <div className={Style.box2}>
                    <h1 className={Style.title}>Reset <br /> Your Password</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={Style.nPassword}>
                        <TextField id="standard-basic" label="New Password" name="newPass"
                         variant="standard"  type='password' 
                        sx={{ mt: 4, width: '55ch',fontFamily: 'FontAwesome'}}  
                        {...register('newPass', { required: true })} /><br/>
                        {errors.newPass && <span>Password is required</span>}
                    </div>
                    <div className={Style.rtPassword}> 
                        <TextField id="standard-basic" label="Confirm Password" variant="standard" name="confPass" type='password'  
                        sx={{ mt: 2, width: '55ch',fontFamily: 'FontAwesome'}}  
                        {...register('confPass', { required: true })}
                        /><br/>
                        {errors.confPass && <span>Please enter confirm password</span>}
                        {message && message.type === 'match' && <p style={{ color: 'red' }}>{message.text}</p>}
                    </div>
                    
                    
                    <div className={Style.resetButton}>
                        <RestButton variant="contained" href="changePassword" onSubmit={authentication}>Change Password</RestButton>
                    </div>
                </form>
                
            </div>
               
           </div>
           
       </div>
    );

}

export default ChangePassword;