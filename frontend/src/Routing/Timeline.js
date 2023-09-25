import React from 'react'
import { TiTick } from "react-icons/ti";
import {BiRightArrowAlt} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function Timeline({ stepsCovered }) {

  const navigate = useNavigate();
  const registerClickHandler = () => navigate('/authorization/');
  const setPasswordClickHandler = () => navigate('/authorization/set-password');
  const loginClickHandler = () => navigate('/authorization/verify-details');

  return (
    <>
      <div className='timeline'>
        <div className='timeline-items'>
          <span className={`timeline-step ${stepsCovered.first ? 'done' : ''}`} onClick={registerClickHandler}>{stepsCovered.first ? <TiTick/> : 1}</span>
        </div>
        <div className='timeline-items'>
          <span className='timeline-break'><BiRightArrowAlt/></span>
        </div>
        <div className='timeline-items'>
          <span className='timeline-step' onClick={setPasswordClickHandler}>2</span>
        </div>
        <div className='timeline-items'>
          <span className='timeline-break'><BiRightArrowAlt/></span>
        </div>
        <div className='timeline-items'>
          <span className='timeline-step' onClick={loginClickHandler}>3</span>
        </div>
      </div>
    </>
  )
}

export default Timeline