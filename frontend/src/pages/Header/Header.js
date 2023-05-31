import AppTitle from '../../components/AppTitle';
import SearchBar from '../../components/SearchBar';
import ProfilePhoto from '../../components/ProfilePhoto';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

const Header = (props) => {
  const excelSheetIcon = <Icon iconClass="fa fa-file-excel-o" fontSize="17px" fontColor="white" />
  const addIcon = <Icon iconClass="fa fa-plus" fontSize="17px" fontColor="white" />

  const searchHandler = (e) => {
    console.log(e.target.value);
  };

  const addExpenseHandler = () => {
    props.setIsAddExpensePopupTriggered(!props.isAddExpensePopupTriggered)
  }

  const importExpenseHandler = () => {
    props.setIsUploadExpensePopupTriggered(!props.isAddExpensePopupTriggered)
  }
  return (
    <>
      <div>
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
            <AppTitle />
            <SearchBar onClick={searchHandler} />
            <ul className="flex items-center flex-shrink-0 space-x-6">
              <li className="relative">
                <Button
                  icon={addIcon}
                  buttonValue="Add Expence"
                  buttonColor="purple"
                  buttonTextColor="white"
                  onClick={addExpenseHandler}
                />
              </li>
              <li className="relative">
                <Button
                  icon={excelSheetIcon}
                  buttonValue="Upload File"
                  buttonColor="purple"
                  buttonTextColor="white"
                  onClick={importExpenseHandler}
                />
              </li>
              <li className="relative">
                <ProfilePhoto />
              </li>
            </ul>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
