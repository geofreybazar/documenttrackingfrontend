import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { setToken } from "../services/setToken";
import LoadingButton from "@mui/lab/LoadingButton";
import logo from "../assets/logo.svg";
import SaveIcon from "@mui/icons-material/Save";
import { Button, TextField, Typography } from "@mui/material";
import "@fontsource/roboto/500.css";
import { io } from "socket.io-client";

function Login({
  user,
  setUser,
  errorMessage,
  setErrorMessage,
  isLoading,
  setIsLoading,
  socket,
  setSocket,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // setSocket(io("https://bfpncrdts.com"));
    // setSocket(io("http://localhost:3001"));
    // setSocket(io("http://localhost:3001"), {
    //   reconnection: true,
    //   reconnectionAttempts: Infinity,
    //   reconnectionDelay: 1000,
    //   reconnectionDelayMax: 5000,
    //   pingInterval: 25000,
    //   pingTimeout: 60000,
    //   timeout: 20000,
    // });

    setSocket(io("https://bfpncrdts.com"), {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      pingInterval: 25000,
      pingTimeout: 60000,
      timeout: 20000,
    });
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    setErrorMessage("");
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const credentials = {
      accountNumber: email,
      password,
    };

    userService
      .login(credentials)
      .then((res) => {
        window.localStorage.setItem("loggedUser", JSON.stringify(res));
        console.log(res);
        setUser(res);
        setToken(res);
        navigate("/");
        setEmail("");
        setPassword("");
        setIsLoading(false);
        socket.emit("newUser", res.officeId);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
        setIsLoading(false);
      });
  };

  const handleForgotPassword = () => {
    navigate("/sendverification");
  };

  return (
    <div className='h-screen w-screen bg-offwhite flex flex-col gap-5 justify-center items-center'>
      <img className='h-32' src={logo} alt='' />
      <div className='flex justify-center items-center gap-10 h-96'>
        <div className='flex flex-col justify-center'>
          <div>
            <Typography variant='h5'>BFP-NCR</Typography>
            <Typography variant='h5'>Document Tracking</Typography>
            <Typography variant='h5'>System</Typography>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center h-71 border-l border-bluelight p-6'>
          <form onSubmit={handleLogin} className='flex flex-col gap-1 w-60'>
            <TextField
              required
              id='fullWidth'
              size='small'
              autoComplete='yes'
              className='w-full'
              margin='dense'
              label='Account Number'
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Your Account Number'
              // type="email"
            />
            <TextField
              required
              size='small'
              autoComplete='yes'
              className='w-full'
              margin='dense'
              id='filled-password-input'
              label='Password'
              variant='outlined'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Your Password'
              type='password'
            />
            {isLoading ? (
              <LoadingButton
                loading
                loadingPosition='start'
                startIcon={<SaveIcon />}
                variant='contained'
                type='submit'
              >
                Login
              </LoadingButton>
            ) : (
              <Button variant='contained' type='submit'>
                Login
              </Button>
            )}
            <div className='text-center text-red-700 font-bold'>
              {errorMessage}
            </div>
          </form>
          <button className='text-blue-500' onClick={handleForgotPassword}>
            Forgotten password?
          </button>
        </div>
      </div>

      <Typography variant='overline'>
        Information Technology and Communication Unit, BFP-NCR CY2024
      </Typography>
    </div>
  );
}

export default Login;
