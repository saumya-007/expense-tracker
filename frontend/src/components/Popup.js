const Popup = (props) => {
  return (props.triggered) ? (
    <div className='popup'>
        <div className='popup-inner'>
            {props.children}
        </div>    
    </div>
  ) : "";
}

export default Popup

