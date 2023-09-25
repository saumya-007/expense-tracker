import React, { useContext, useEffect, useState } from 'react'
import loginBg from '../../images/login-bg.jpg'
import { BsGoogle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { BrowserWindowOpenContext } from '../../Routing/LoginFlow';
import { AUTH_SERVICE_API_CALLS } from '../../utils/api-calls/auth-service';
import CustomGooglePopUpWindow from './CustomGooglePopUpWindow';
import ReactDOM from 'react-dom/client';
const { getSingUpLink, authenticateGoogleUser } = AUTH_SERVICE_API_CALLS;

function Register({ setStepsCovered }) {
  const navigate = useNavigate();
  const loginClickHandler = () => navigate('/login');
  const [signUpLink, setSignUpLink] = useState('');
  const [isGoogleUserAuthenticated, setIsGoogleUserAuthenticated] = useState(false);
  const setIsNewBrowserWindowOpen = useContext(BrowserWindowOpenContext);

  const handelSignUpLink = ({ api_response }) => {
    setSignUpLink(api_response);
  }
  const handelRegister = () => {
    getSingUpLink({ setResponse: handelSignUpLink })
  }

  useEffect(() => {
    console.log('called')

    if (isGoogleUserAuthenticated) {
      console.log('called in')
      setStepsCovered((prev) => {
        return { ...prev, first: true }
      })
      navigate('/authorization/set-password');
      console.log('nav complete ?')
    }
  }, [isGoogleUserAuthenticated])
;

  useEffect(() => {
    if (signUpLink.length) {
      const newWindow = window.open(signUpLink, '_blank', 'width=800,height=600');
      setIsNewBrowserWindowOpen(true)
      const intervalId = setInterval(() => {
        if (newWindow.closed) {
          setIsGoogleUserAuthenticated(true)
          setIsNewBrowserWindowOpen(false);
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }, [signUpLink])
  


  console.log({ isGoogleUserAuthenticated });
  return (
    <div className='registration'>
      <div className='registration-sign-up'>
        <p><span>Welcome to Expense Tracker !</span></p>
        <img src={loginBg} alt={'Login Background'} width={700} />
        <button onClick={handelRegister}><div className='register-button'><p>Get details from google</p><BsGoogle /></div></button>
        <p className='login-link'>Already have an account ? <span onClick={loginClickHandler} className='clickable'>Click here to Login</span></p>
      </div>
    </div>
  )
}

export default Register