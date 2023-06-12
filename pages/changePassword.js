import React from 'react';
import Style from '../styles/changePassword.module.css'
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
                
                <div className={Style.nPassword}>
                     <TextField id="standard-basic" label="New Password" variant="standard"   sx={{ mt: 4, width: '55ch',fontFamily: 'FontAwesome'}} /><br/>
                </div>
                <div className={Style.rtPassword}> 
                    <TextField id="standard-basic" label="Confirm Password" variant="standard"   sx={{ mt: 2, width: '55ch',fontFamily: 'FontAwesome'}} /><br/>
                </div>
                
                <div className={Style.code}>{/*
                    <TextField id="standard-basic" label="Code" variant="standard"   sx={{ mt: 4, width: '60ch',fontFamily: 'FontAwesome'}} /><br/>
                    */}
                </div> 
                
                <div className={Style.resetButton}>
                    <RestButton variant="contained" href="changePassword">Change Password</RestButton>
                </div>
            </div>
               
           </div>
           
       </div>
    );

}

export default ChangePassword;