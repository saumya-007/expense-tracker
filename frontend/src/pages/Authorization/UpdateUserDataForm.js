import React from 'react'

function UpdateUserDataForm() {
  const imageUrl = 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png';
  return (
    <>
      <div className='set-password'>
        <div className='set-password-item-profile-pic'>
          <img
            className='set-profile-photo'
            src={imageUrl}
            alt='Profile Pic'
          />
          <label>Profile Photo </label>
        </div>
        <div className='set-password-item'>
          <label>Email </label>
          <input type='email' placeholder='' disabled></input>
        </div>
        <div className='set-password-item'>
          <label>First Name </label>
          <input type='password' placeholder=''></input>
        </div>
        <div className='set-password-item'>
          <label>Last password </label>
          <input type='password' placeholder=''></input>
        </div>
      </div>
    </>
  )
}

export default UpdateUserDataForm