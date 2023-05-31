import { Outlet, Routes, Route, useNavigate } from 'react-router-dom';
import constants from '../../utils/constants';

import PageTitle from '../../components/PageTitle';
import Popup from '../../components/Popup';
import Button from '../../components/Button';
// import SpentLimitForm from '../../components/SpentLimitForm';

import AddExpenseForm from '../Header/AddExpenseForm';
import UploadFileForm from '../Header/UploadFileForm';
import ExpenseList from './ExpenseList';

const Body = (props) => {
  const expenseListTitle = constants.EXPENSE_LIST_TITLE;
  const graphPageTitle = constants.GRAPH_TITLE;
  const navigate = useNavigate();

  const clickHandler = () => {
    props.setIsAddExpensePopupTriggered(false)
    props.setIsUploadExpensePopupTriggered(false)
  };

  const homeClickHandler = () => {
    navigate('/dashboard/')
  }

  const listClickHandler = () => {
    console.log('called')
    navigate('/dashboard/list')
  }

  const graphClickHandler = () => {
    console.log('called 2')
    navigate('/dashboard/graph')
  }

  return (
    <>
      {/* Add File Popup */}
      <Popup triggered={props.isAddExpensePopupTriggered}>
        <AddExpenseForm
          setIsAddExpensePopupTriggered={props.setIsAddExpensePopupTriggered}
          isAddExpensePopupTriggered={props.isAddExpensePopupTriggered}
        />
      </Popup>
      {/* Upload File Popup */}
      <Popup triggered={props.isUploadExpensePopupTriggered}>
        <UploadFileForm
          setIsUploadExpensePopupTriggered={props.setIsUploadExpensePopupTriggered}
          isUploadExpensePopupTriggered={props.isUploadExpensePopupTriggered}
        />
      </Popup>
      {/* Navigation Bar */}
      <div className="container flex items-center justify-between h-3 px-6 py-4 mx-auto text-purple-600 dark:text-purple-300">
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <Button
              buttonValue={'Home'}
              buttonTextColor={'black'}
              onClick={homeClickHandler}
            />
          </li>
          <li className="relative">
            <Button
              buttonValue={'List'}
              buttonTextColor={'black'}
              onClick={listClickHandler}
            />
          </li>
          <li className="relative">
            <Button
              buttonValue={'Graph'}
              buttonTextColor={'black'}
              onClick={graphClickHandler}
            />
          </li>
        </ul>
      </div>
      {/* Navigation Display */}
      <main className="full-height overflow-y-auto" onClick={clickHandler}>
        <div className="container px-6 mx-auto grid">
          <Outlet />
          <Routes>
            <Route path="/" element={
              <>
                {'HOME'}
              </>
            } />
            <Route path="list" element={
              <>
                <div className='head-display'>
                  <PageTitle title={expenseListTitle} />
                  {/* <SpentLimitForm />  this will go in popup*/}
                </div>
                <div className='main-display'>
                  <div className="fixed-height w-full overflow-hidden rounded-lg shadow-xs">
                    <ExpenseList />
                  </div>
                </div>
              </>
            } />
            <Route path="graph" element={
              <>
                <PageTitle title={graphPageTitle} />
              </>
            } />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default Body;
