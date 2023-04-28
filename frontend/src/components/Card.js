const Card = (props) => {
  const children = props.children;
  return (
    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      {children}
    </div>
  );
};

export default Card;
