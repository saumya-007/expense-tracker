import React from 'react'

function SetPasswordForm() {
  return (
    <>
      <div className='set-password'>
        <div className='set-password-item'>
          <label>Enter new password </label>
          <input type='password' placeholder='Enter Password'></input>
        </div>
        <div className='set-password-item'>
          <label>Re-enter password </label>
          <input type='password' placeholder='Re-enter Password'></input>
        </div>
      </div>
    </>
  )
}

export default SetPasswordForm