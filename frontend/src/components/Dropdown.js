import React, { useState } from 'react'
import {BiDownArrow} from 'react-icons/bi';

function Dropdown({dropDownItems, handleDropDownItemClick, dropdownLable = 'Dropdown'}) {
  const [labelValue, setLabelValue] = useState(dropdownLable);
  const handelClick = (item) => {
    setLabelValue(item);
    handleDropDownItemClick(item);
  };
  return (
    <div className='dropdown'>
      <button className='dropbtn'>{labelValue} <span className="button-icon"><BiDownArrow/></span></button>
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