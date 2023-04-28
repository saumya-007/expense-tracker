const Button = (props) => {
  const px = props.px ? props.px: 10;
  const py = props.py ? props.py: 2;
  const handler = props.handler;
  const buttonClass = `flex items-center justify-between px-${px} py-${py} text-sm font-medium leading-5 text-${props.buttonTextColor} transition-colors duration-150 bg-${props.buttonColor}-600 border border-transparent rounded-lg active:bg-${props.buttonColor}-600 hover:bg-${props.buttonColor}-700 focus:outline-none focus:shadow-outline-${props.buttonColor}`;
  return (
    <button onClick={handler} className={buttonClass}>
      {props.icon ? props.icon : null}
      <span>{props.buttonValue}</span>
    </button>
  );
};

export default Button;
