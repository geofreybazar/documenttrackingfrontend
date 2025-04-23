import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import LoadingButton from '@mui/lab/LoadingButton';
import logo from '../assets/logo.svg';
import SaveIcon from '@mui/icons-material/Save';
import { Button, TextField, Typography } from '@mui/material';
import '@fontsource/roboto/500.css';

function ForgotPassword({isLoading, setIsLoading, errorMessage, setErrorMessage, email, setEmail}) {
  
  const [verificationcode, setVerificationcode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!email){
      navigate('/login');          
    }
}, []);
  
  const handleChangePassword = (e) => {
    e.preventDefault()
    setIsLoading(true);

    const newCredentials = {
      email: email,
      verificationcode: verificationcode,
      newPassword: newPassword,
    };
    userService.forgotPassword(newCredentials).then ((res) => {
      alert(res)
      setIsLoading(false)
      setEmail("");
      navigate('/')
    }).catch((error) => {
      setErrorMessage(error.response.data)
      setIsLoading(false)
  });
  }
    
  return (
    <div className='h-screen w-screen bg-offwhite flex flex-col gap-5 justify-center items-center'>
        <img className="h-32" src={logo} alt="" /> 
            <div className='flex justify-center items-center gap-10 h-96'>  
              <form onSubmit={handleChangePassword}  className='flex flex-col justify-center w-96'>       
                <Typography>
                    Enter necessary details
                </Typography>
                <div>           
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
                <TextField
                    size="small"
                    autoComplete='yes'
                    className="w-full"
                    margin="dense"
                    id="filled-password-input"
                    label="Verification Code"
                    variant="outlined"
                    value={verificationcode}
                    onChange={(e) => setVerificationcode(e.target.value)}
                    placeholder="Enter the Verification Code"
                    type="text"
                />
                <TextField
                    size="small"
                    autoComplete='yes'
                    className="w-full"
                    margin="dense"
                    id="filled-password-input"
                    label="New Password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    type="text"
                />
                </div>
                {isLoading ?
                <LoadingButton  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  type="submit">
                  Submit
                </LoadingButton>  
                : <Button variant="contained" type="submit">
                  Submit
                </Button>}
                  <div className='text-center text-red-700 font-bold'>
                  {errorMessage}
                </div>  
              </form>   
                
            </div>
            
            <Typography variant="overline">
            Information Technology and Communication Unit, BFP-NCR CY2024
            </Typography>
    </div>
  )
}

export default ForgotPassword