import React from 'react'

function Dropdown({dropDownItems, handleDropDownItemClick, dropdownLable = 'Dropdown'}) {
  const handelClick = (item) => {
    handleDropDownItemClick(item);
  };
  return (
    <div className='dropdown'>
      <button className='dropbtn'>{dropdownLable}</button>
      <div className='dropdown-content'>
        {
          dropDownItems.map((item) => {
            return <p  onClick={() => handelClick(item)} key={item}>{item}</p>
          })
        }
      </div>
    </div>
  )
}

export default Dropdown