import AppTitle from '../../../components/AppTitle';
import SearchBar from '../../../components/SearchBar';
import ProfilePhoto from '../../../components/ProfilePhoto';
import Icon from '../../../components/Icon';
import Button from '../../../components/Button';

const Header = (props) => {
  const excelSheetIcon = (
    <Icon iconClass="fa fa-file-excel-o" fontSize="17px" fontColor="white" />
  );
  const addIcon = (
    <Icon iconClass="fa fa-plus" fontSize="17px" fontColor="white" />
  );

  const searchHandler = (e) => {
    console.log('Handle Searched Clicked');
    console.log(e.target.value);
  };

  const addExpenseHandler = () => {
    console.log('add handler called');
  }
  return (
    <>
      <div>
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
            <AppTitle />
            <SearchBar handler={searchHandler}/>
            <ul className="flex items-center flex-shrink-0 space-x-6">
              <li className="relative">
                <Button
                  icon={addIcon}
                  buttonValue="Add Expence"
                  buttonColor="purple"
                  buttonTextColor="white"
                  handler={addExpenseHandler}
                />
              </li>
              <li className="relative">
                <Button
                  icon={excelSheetIcon}
                  buttonValue="Upload File"
                  buttonColor="purple"
                  buttonTextColor="white"
                />
              </li>
              <li className="relative">
                <ProfilePhoto />
              </li>
            </ul>
          </div>
        </header>
        {/* <div className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center hidden">
          <div
            // @click.away="closeModal"
            // @keydown.escape="closeModal"
            className="w-full px-6 py-4 my-auto overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
            role="dialog"
            id="modal"
          >
            <header className="flex justify-end">
              <button
                className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
                aria-label="close"
                // @click="closeModal"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  role="img"
                  aria-hidden="true"
                >
                  <path
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </header>
            <div className="mt-4 mb-6">
              <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                Modal header
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum et eligendi repudiandae voluptatem tempore!
              </p>
            </div>
            <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800">
              <button
                // @click="closeModal"
                className="w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
              >
                Cancel
              </button>
              <button className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Accept
              </button>
            </footer>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Header;
