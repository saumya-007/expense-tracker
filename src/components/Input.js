const Input = (props) => {
  const lableValue = props.lable;
  const handler = props.handler;
  const placeholder = props.placeholder;
  const inputType = props.inputType ? props.inputType : 'text';

  return (
    <label className="block text-sm py-3">
      <span className="text-gray-700 dark:text-gray-400">{lableValue}</span>
      <input
        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
        placeholder={placeholder}
        onChange={handler}
        type={inputType}
      />
    </label>
  );
};

export default Input;
