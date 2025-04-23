import { useState, useEffect } from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import { setToken } from "./services/setToken";
import './App.css'
import Login from './pages/Login';
import Home from './pages/Home';
import SendVerificationCode from "./pages/SendVerificationCode";
import ForgotPassword from "./pages/ForgotPassword";
import ClientSearch from "./pages/ClientSearch";

function App() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setToken(user);
      setUser(user);
    };
  },[]);

  return (
    <Routes>
      <Route path="/login" element={
        <Login 
          user={user} 
          setUser={setUser} 
          errorMessage={errorMessage} 
          setErrorMessage={setErrorMessage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          socket={socket}
          setSocket={setSocket}
        />} 
      />
      <Route path="/sendverification" element={
        <SendVerificationCode 
          errorMessage={errorMessage} 
          setErrorMessage={setErrorMessage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          email={email}
          setEmail={setEmail}
        />} 
      />
      <Route path="/forgotpassword" element={
        <ForgotPassword 
          errorMessage={errorMessage} 
          setErrorMessage={setErrorMessage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          email={email}
          setEmail={setEmail}
        />} 
      />
      <Route path="/client" element={
        <ClientSearch/>} 
      /> 
      <Route path="/*" element={
          user ? <Home 
            user={user} 
            setUser={setUser}  
            isLoading={isLoading} 
            setIsLoading={setIsLoading} 
            socket={socket}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}     
          /> : <Navigate to="/login" />
        }/>
  </Routes> 
  )
}

export default App
