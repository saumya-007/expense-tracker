import React, { useContext } from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import Popup from '../components/Popup';

// import AddExpenseForm from '../pages/Header/AddExpenseForm';
// import UploadFileForm from '../pages/Header/UploadFileForm';
// import ExpenseList from '../pages/Dashboard/ExpenseList';
import NavigationBar from './NavigationBar';
import Home from '../pages/Home/Home'
import Graphs from '../pages/Graphs/Graphs';
import Dashboard from '../pages/Dashboard/Dashboard';

const Body = () => {
  
  // const popupTriggeredCnxt = useContext(popupTriggeredContext);
  // const clickHandler = () => {
  //   if (popupTriggeredCnxt.popupTriggered['addExpense']) popupTriggeredCnxt.popupTriggeredDispatch('addExpense');
  //   if (popupTriggeredCnxt.popupTriggered['uploadExpense']) popupTriggeredCnxt.popupTriggeredDispatch('uploadExpense');
  // };

  return (
    <>
      <NavigationBar />
      <Outlet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="list" element={<Dashboard />} />
        <Route path="graph" element={<Graphs />} />
      </Routes>
    </>
  );
};

export default Body;
