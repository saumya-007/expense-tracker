import React, { useContext } from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import constants from '../../utils/constants';

import PageTitle from '../../components/PageTitle';
import Popup from '../../components/Popup';

import AddExpenseForm from '../Header/AddExpenseForm';
import UploadFileForm from '../Header/UploadFileForm';
import ExpenseList from './ExpenseList';
import NavigationBar from './NavigationBar';

import { popupTriggeredContext } from '../../App';

const Body = () => {

  console.log('Body Rendered');

  const expenseListTitle = constants.EXPENSE_LIST_TITLE;
  const graphPageTitle = constants.GRAPH_TITLE;

  const popupTriggeredCnxt = useContext(popupTriggeredContext);
  const clickHandler = () => {
    if (popupTriggeredCnxt.popupTriggered['addExpense']) popupTriggeredCnxt.popupTriggeredDispatch('addExpense');
    if (popupTriggeredCnxt.popupTriggered['uploadExpense']) popupTriggeredCnxt.popupTriggeredDispatch('uploadExpense');
  };

  return (
    <>
      <Popup triggered={popupTriggeredCnxt.popupTriggered['addExpense']}>
        <AddExpenseForm/>
      </Popup>
      <Popup triggered={popupTriggeredCnxt.popupTriggered['uploadExpense']}>
        <UploadFileForm/>
      </Popup>
      <NavigationBar/>
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
