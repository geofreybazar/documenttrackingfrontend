import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import documentService from '../services/documentService';
import LoadingButton from '@mui/lab/LoadingButton';
import logo from '../assets/logo.svg';
import SaveIcon from '@mui/icons-material/Save';
import { Button, TextField, Typography } from '@mui/material';
import '@fontsource/roboto/500.css';

function SendVerificationCode({isLoading, setIsLoading, errorMessage, setErrorMessage, email, setEmail}) {
   
    const navigate = useNavigate();
  
    const handleSendVerificationCode = (e) => {
        e.preventDefault()
        setIsLoading(true);
        const emailAdd = {
            email,
        };
        userService.sendVerificationCode(emailAdd).then((res) => {
            alert(res)
            setIsLoading(false)
            navigate('/forgotpassword')
        }).catch((error) => {
            setErrorMessage(error.response.data)
            setIsLoading(false)
        });
    };
    
  return (
    <div className='h-screen w-screen bg-offwhite flex flex-col gap-5 justify-center items-center'>
        <img className="h-32" src={logo} alt="" /> 
            <div className='flex justify-center items-center gap-10 h-96'>            
                <div className='flex flex-col justify-center'>           
                    <div>    
                        <Typography>
                            Enter your registered email address to receive a verification code
                        </Typography>
                        <form onSubmit={handleSendVerificationCode}
                        className='w-full flex flex-col gap-1 w-60'>                        
                            <TextField
                                size="small"
                                autoComplete='yes'
                                className="w-full"
                                margin="dense"
                                id="filled-password-input"
                                label="Email Address"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email"
                                type="email"
                            />
                            {isLoading ?
                                <LoadingButton  loading
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                                type="submit">
                                Send Verification Code
                            </LoadingButton>  
                            : <Button variant="contained" type="submit">
                            Send Verification Code
                            </Button>}
                            <div className='text-center text-red-700 font-bold'>
                            {errorMessage}
                            </div>                        
                        </form>
                    </div>            
                </div>
                
            </div>
            
            <Typography variant="overline">
            Information Technology and Communication Unit, BFP-NCR CY2024
            </Typography>
    </div>
  )
}

export default SendVerificationCode