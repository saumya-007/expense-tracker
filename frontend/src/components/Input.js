const Input = (props) => {
  const defaultClassForInput = "block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"

  const defaultValue = props.inputType === 'date' ? 
    props.defaultValue ? `${props.defaultValue.getFullYear()}-${props.defaultValue.getMonth().toString().length < 2 ? '0' + props.defaultValue.getMonth() : props.defaultValue.getMonth()}-${props.defaultValue.getDate()}` : ''
    : props.defaultValue ? props.defaultValue : '';
  const lableValue = props.lable;
  const ref = props.reference;
  const placeholder = props.placeholder;
  const inputType = props.inputType ? props.inputType : 'text';
  const classOfInput = props.className ? props.className : defaultClassForInput;
  console.log(defaultValue);
  return (
    <label className="block text-sm py-3">
      <span className="text-gray-700 dark:text-gray-400">{lableValue}</span>
      <input
        defaultValue={defaultValue}
        className={classOfInput}
        placeholder={placeholder}
        ref={ref}
        type={inputType}
      />
    </label>
  );
};

export default Input;
