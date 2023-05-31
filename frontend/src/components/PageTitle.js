const PageTitle = (props) => {
  const title = props.title;
  return (
    <h2 className="my-6 mx-20 text-xl text-gray-700 dark:text-gray-200">
      {title}
    </h2>
  );
};

export default PageTitle;
