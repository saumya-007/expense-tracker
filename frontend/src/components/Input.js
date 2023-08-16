const Input = (props) => {
  const defaultClassForInput = ""
  const convertToProperFormat = (yourDate) => {
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
    return yourDate.toISOString().split('T')[0]
  }
  const defaultValue = props.inputType === 'date' ?
    props.defaultValue ? convertToProperFormat(props.defaultValue) : ''
    : props.defaultValue ? props.defaultValue : '';
  const lableValue = props.lable;
  const ref = props.reference;
  const placeholder = props.placeholder;
  const inputType = props.inputType ? props.inputType : 'text';
  const classOfInput = props.className ? props.className : defaultClassForInput;
  const value = props.value;
  return (
    <label className="">
      <span className="">{lableValue}</span>
      <input
        defaultValue={defaultValue}
        className={classOfInput}
        placeholder={placeholder}
        ref={ref}
        type={inputType}
        value={value}
      />
    </label>
  );
};

export default Input;
