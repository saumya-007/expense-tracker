import constants from "../utils/constants";

const AppTitle = () => {
  return (
    <p className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
      {constants.APP_TITLE}
    </p>
  );
};

export default AppTitle;
