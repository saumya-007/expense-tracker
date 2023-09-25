import React from 'react'

function UpdateDetails({title, children, buttonTitle}) {
  return (
    <>
      <div className='registration'>
      <div className='registration-set-password'>
        <span>{title}</span>
          {children}
        <button><div className='register-button'><p>{buttonTitle}</p></div></button>
      </div>
    </div>
    </>
  )
}

export default UpdateDetails