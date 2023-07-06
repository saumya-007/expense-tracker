import React from "react";
import { motion } from "framer-motion";

const Popup = (props) => {
  return (props.triggered) ? (
    <motion.div
      className='popup'
      initial={{ opacity: 0 }}
      animate={{
        transform: ["translatex(100px)", "translatex(0px)"],
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 200,
      }}
      exit={{
        opacity: 0,
      }}
    >
      {props.children}
    </motion.div>
  ) : "";
}

export default React.memo(Popup);

