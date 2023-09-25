import React, { useState, createContext } from 'react'
import { Outlet, Routes, Route } from 'react-router-dom';
import Timeline from './Timeline';
import Register from '../pages/Authorization/Register';
import UpdateDetails from '../pages/Authorization/UpdateDetails';
import SetPasswordForm from '../pages/Authorization/SetPasswordForm';
import UpdateUserDataForm from '../pages/Authorization/UpdateUserDataForm';

export const  BrowserWindowOpenContext = createContext();

function LoginFlow() {
  const [isNewBrowserWindowOpen, setIsNewBrowserWindowOpen] = useState(false);
  const [stepsCovered, setStepsCovered] = useState({
    first: false,
    second: false,
    third: true,
  });
  return (
    <>
      <BrowserWindowOpenContext.Provider value={setIsNewBrowserWindowOpen}>
        {!isNewBrowserWindowOpen ?
          <>
            <Timeline stepsCovered={stepsCovered} />
            <Outlet />
            <Routes>
              <Route path="/" element={<Register setStepsCovered={setStepsCovered} />} />
              <Route path="set-password" element={
                <UpdateDetails
                  title={'Reset Password !'}
                  buttonTitle={'Reset Password'}
                >
                  <SetPasswordForm />
                </UpdateDetails>
              } />
              <Route path="verify-details" element={
                <UpdateDetails
                  title={'Please verify your details !'}
                  buttonTitle={'Continue'}
                >
                  <UpdateUserDataForm />
                </UpdateDetails>
              } />
            </Routes>
          </>
          :
          <div className='oauth-loader'>Please close the google oauth process and Continue the registration process !</div>
        }

      </BrowserWindowOpenContext.Provider>
    </>
  )
}

export default LoginFlow