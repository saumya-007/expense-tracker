const Button = (props) => {
  const px = props.px ? props.px: 10;
  const py = props.py ? props.py: 2;
  const borderType = props.borderType ? props.borderType : 'transparent'
  const onClick = props.onClick;
  const buttonClass = `flex items-center justify-between px-${px} py-${py} text-sm font-medium leading-5 text-${props.buttonTextColor} transition-colors duration-150 bg-${props.buttonColor}-600 border border-${borderType} rounded-lg active:bg-${props.buttonColor}-600 hover:bg-${props.buttonColor}-700 focus:outline-none focus:shadow-outline-${props.buttonColor}`;
  return (
    <button onClick={onClick} className={buttonClass}>
      {props.icon ? props.icon : null}
      <span>{props.buttonValue}</span>
    </button>
  );
};

export default Button;
