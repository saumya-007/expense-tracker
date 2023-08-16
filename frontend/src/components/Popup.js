import React from 'react';
import { motion } from 'framer-motion';
import { RiCloseCircleFill } from 'react-icons/ri'

const Popup = (props) => {
  return (props.triggered) ? (
    <div className='popup-wrapper'>
      <motion.div
        className='popup'
        initial={{ opacity: 0 }}
        animate={{
          transform: ['translatex(100px)', 'translatex(0px)'],
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          type: 'spring',
          stiffness: 200,
        }}
        exit={{
          opacity: 0,
        }}
      >
        <div className='popup-close'><button onClick={() => props.closePopup()}><RiCloseCircleFill /></button></div>
        {props.children}
      </motion.div>
    </div>
  ) : '';
}

export default Popup;

